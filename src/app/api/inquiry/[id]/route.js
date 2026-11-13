import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Inquiry, { INQUIRY_STATUSES } from '@/models/Inquiry';
import { requireAdmin } from '@/lib/auth';

// Next.js 16: route params are a Promise and must be awaited.
async function getId(params) {
  const { id } = await params;
  return mongoose.isValidObjectId(id) ? id : null;
}

export async function PATCH(req, { params }) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const id = await getId(params);
  if (!id) return NextResponse.json({ success: false, error: 'Invalid id' }, { status: 400 });

  let body;
  try { body = await req.json(); } catch { body = {}; }
  // Only the status can be changed from the dashboard.
  if (!INQUIRY_STATUSES.includes(body.status)) {
    return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
  }

  try {
    await dbConnect();
    const inquiry = await Inquiry.findByIdAndUpdate(id, { status: body.status }, { new: true, runValidators: true });
    if (!inquiry) return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: inquiry });
  } catch (err) {
    console.error('Inquiry update failed:', err.message);
    return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
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
