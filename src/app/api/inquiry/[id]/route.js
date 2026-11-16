import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Inquiry, { INQUIRY_STATUSES, INCOTERMS, CURRENCIES } from '@/models/Inquiry';
import { requireAdmin } from '@/lib/auth';
import { newTrackingToken } from '@/lib/tracking';

// Next.js 16: route params are a Promise and must be awaited.
async function getId(params) {
  const { id } = await params;
  return mongoose.isValidObjectId(id) ? id : null;
}

const text = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : undefined);
const date = (v) => {
  if (v === null || v === '') return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? undefined : d;
};

/**
 * Body may contain any of:
 *   status, followUpAt (ISO|null), note (string, appended), buyerMessage,
 *   quote { pricePerMT, currency, incoterm, port, validUntil, terms },
 *   sample { courier, trackingNumber, dispatchedAt }, ensureToken (true)
 */
export async function PATCH(req, { params }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = await getId(params);
  if (!id) return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 });

  let body;
  try { body = await req.json(); } catch { body = {}; }

  try {
    await dbConnect();
    const lead = await Inquiry.findById(id);
    if (!lead) return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });

    if (body.status !== undefined) {
      if (!INQUIRY_STATUSES.includes(body.status)) {
        return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
      }
      if (body.status !== lead.status) {
        lead.status = body.status;
        lead.statusHistory.push({ status: body.status, at: new Date() });
        if (body.status === 'Sample Sent' && !lead.sample?.dispatchedAt) {
          lead.set('sample.dispatchedAt', new Date());
        }
      }
    }

    if ('followUpAt' in body) {
      const d = date(body.followUpAt);
      if (d === undefined) return NextResponse.json({ success: false, error: 'Invalid follow-up date' }, { status: 400 });
      lead.followUpAt = d;
    }

    const note = text(body.note, 2000);
    if (note) lead.notes.push({ text: note, at: new Date() });

    if ('buyerMessage' in body) lead.buyerMessage = text(body.buyerMessage, 1500) ?? '';

    if (body.quote && typeof body.quote === 'object') {
      const q = body.quote;
      const price = q.pricePerMT === '' || q.pricePerMT === null ? undefined : Number(q.pricePerMT);
      if (price !== undefined && (!Number.isFinite(price) || price < 0)) {
        return NextResponse.json({ success: false, error: 'Price must be a positive number' }, { status: 400 });
      }
      lead.quote = {
        pricePerMT: price,
        currency: CURRENCIES.includes(q.currency) ? q.currency : 'USD',
        incoterm: INCOTERMS.includes(q.incoterm) ? q.incoterm : undefined,
        port: text(q.port, 120),
        validUntil: date(q.validUntil) || undefined,
        terms: text(q.terms, 1000),
      };
    }

    if (body.sample && typeof body.sample === 'object') {
      const s = body.sample;
      lead.sample = {
        courier: text(s.courier, 80),
        trackingNumber: text(s.trackingNumber, 80),
        dispatchedAt: date(s.dispatchedAt) || lead.sample?.dispatchedAt,
      };
    }

    if (body.ensureToken && !lead.trackingToken) lead.trackingToken = newTrackingToken();
    if (!lead.statusHistory?.length) lead.statusHistory = [{ status: lead.status, at: lead.createdAt }];

    lead.updatedAt = new Date();
    await lead.save();
    return NextResponse.json({ success: true, data: lead.toObject() });
  } catch (err) {
    console.error('Inquiry update failed:', err.message);
    const status = err.name === 'ValidationError' ? 400 : 500;
    return NextResponse.json({ success: false, error: status === 400 ? 'Some values are invalid' : 'Update failed' }, { status });
  }
}

export async function DELETE(req, { params }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = await getId(params);
  if (!id) return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 });

  try {
    await dbConnect();
    const inquiry = await Inquiry.findByIdAndDelete(id);
    if (!inquiry) return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    return NextResponse.json({ success: true, message: 'Inquiry deleted' });
  } catch (err) {
    console.error('Inquiry delete failed:', err.message);
    return NextResponse.json({ success: false, error: 'Delete failed' }, { status: 500 });
  }
}
