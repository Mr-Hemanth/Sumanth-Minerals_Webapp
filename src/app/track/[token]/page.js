import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import { Archivo } from 'next/font/google';
import { MessageCircle, Phone, Mail, FileText, Award, Package, Receipt, Lock } from 'lucide-react';
import dbConnect from '@/lib/db';
import Inquiry from '@/models/Inquiry';
import { publicView, BUYER_STEPS, buyerProgress, typePhrase } from '@/lib/tracking';
import { PHONE_PRIMARY, EMAIL_SALES, whatsappUrl } from '@/data/contact';
import { LAB_REPORT } from '@/data/specs';
import s from './track.module.css';

const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-desk', display: 'swap' });

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Your request | Sumanth Minerals',
  robots: { index: false, follow: false },
};

async function findLead(token) {
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(token)) return null;
  try {
    const conn = await dbConnect();
    if (conn) {
      const doc = await Inquiry.findOne({ trackingToken: token }).lean();
      if (doc) return doc;
    }
  } catch (err) {
    console.error('Tracking lookup failed:', err.message);
  }
  try {
    const list = JSON.parse(await fs.readFile(path.join(process.cwd(), 'inquiries_fallback.json'), 'utf8'));
    return list.find((l) => l.trackingToken === token) || null;
  } catch {
    return null;
  }
}

const fmt = (d) => (d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null);
const money = (n, c) => {
  try { return new Intl.NumberFormat('en-US', { style: 'currency', currency: c || 'USD', maximumFractionDigits: 2 }).format(n); }
  catch { return `${c} ${n}`; }
};

export default async function TrackPage({ params }) {
  const { token } = await params;
  const raw = await findLead(token);
  if (!raw) notFound();
  const lead = publicView(raw);
  const progress = buyerProgress(lead.status);

  // Date each buyer-facing step was reached, from the stage history.
  const reachedAt = BUYER_STEPS.map((step, i) => {
    if (i === 0) return lead.createdAt;
    const h = [...lead.statusHistory].reverse().find((x) => step.statuses.includes(x.status));
    return h?.at || null;
  });

  const facts = [
    ['Size', lead.preferredSize], ['Quantity', lead.quantity], ['Monthly need', lead.monthlyRequirement],
    ['Industry', lead.industry], ['Packaging', lead.packaging], ['Delivery', lead.deliveryPort], ['Country', lead.country],
  ].filter(([, v]) => v);

  const waText = `Hello Sumanth Minerals, I am following up on my request ${lead.ref}.`;
  const quoteExpired = lead.quote?.validUntil && new Date(lead.quote.validUntil) < new Date();

  return (
    <div className={`${archivo.variable} ${s.page}`}>
      <header className={s.head}>
        <div className={s.wrap}>
          <p className={s.ref}>Request {lead.ref}</p>
          <h1>Hello {lead.name.split(' ')[0]}, here is where your {typePhrase(lead.type)} stands</h1>
          <p className={s.lede}>
            {lead.company ? `${lead.company}, ` : ''}received {fmt(lead.createdAt)}.
            {lead.updatedAt && lead.updatedAt !== lead.createdAt ? ` Last updated ${fmt(lead.updatedAt)}.` : ''}
          </p>
        </div>
      </header>

      <div className={s.wrap}>
        {lead.buyerMessage && (
          <section className={s.note} aria-label="Message from our sales desk">
            <p className={s.noteFrom}>From the Sumanth Minerals sales desk</p>
            <p className={s.noteText}>{lead.buyerMessage}</p>
          </section>
        )}

        <section className={s.progressBlock} aria-label="Progress">
          {progress.closed ? (
            <div className={s.closed}>
              <h2>This request is closed</h2>
              <p>If you would like to reopen it or place a new order, message us on WhatsApp and quote {lead.ref}.</p>
            </div>
          ) : (
            <ol className={s.steps}>
              {BUYER_STEPS.map((step, i) => {
                // A step before the current one that has no history entry was skipped
                // (e.g. a quote sent without a sample) — never claim it happened.
                const state = i === progress.index ? 'current'
                  : i > progress.index ? 'todo'
                  : reachedAt[i] ? 'done' : 'skipped';
                return (
                  <li key={step.key} className={s.step} data-state={state} aria-current={state === 'current' ? 'step' : undefined}>
                    <span className={s.dot} aria-hidden="true">{state === 'skipped' ? '–' : i + 1}</span>
                    <span className={s.stepLabel}>{step.label}</span>
                    <span className={s.stepDate}>{state === 'todo' ? 'Pending' : state === 'skipped' ? 'Skipped' : fmt(reachedAt[i])}</span>
                  </li>
                );
              })}
            </ol>
          )}
        </section>

        <div className={s.grid}>
          <section className={s.block}>
            <h2><Receipt size={18} aria-hidden="true" /> Quotation</h2>
            {lead.quote ? (
              <>
                <p className={s.price}>
                  {money(lead.quote.pricePerMT, lead.quote.currency)}<span> per tonne</span>
                </p>
                <p className={s.priceTerms}>
                  {[lead.quote.incoterm, lead.quote.port].filter(Boolean).join(' ')}
                </p>
                {lead.quote.validUntil && (
                  <p className={quoteExpired ? s.expired : s.valid}>
                    {quoteExpired ? `Expired on ${fmt(lead.quote.validUntil)}. Ask us for an updated price.` : `Valid until ${fmt(lead.quote.validUntil)}`}
                  </p>
                )}
                {lead.quote.terms && <p className={s.terms}>{lead.quote.terms}</p>}
              </>
            ) : (
              <p className={s.waiting}>Your price will appear here as soon as our sales desk prepares it.</p>
            )}
          </section>

          <section className={s.block}>
            <h2><Package size={18} aria-hidden="true" /> Sample shipment</h2>
            {lead.sample ? (
              <dl className={s.facts}>
                {lead.sample.courier && <div><dt>Courier</dt><dd>{lead.sample.courier}</dd></div>}
                {lead.sample.trackingNumber && <div><dt>Tracking number</dt><dd className={s.mono}>{lead.sample.trackingNumber}</dd></div>}
                {lead.sample.dispatchedAt && <div><dt>Dispatched</dt><dd>{fmt(lead.sample.dispatchedAt)}</dd></div>}
              </dl>
            ) : (
              <p className={s.waiting}>
                {lead.type === 'Sample Request'
                  ? 'The courier and tracking number will appear here once your sample leaves the mine.'
                  : 'Want to test our quartz first? Ask us for a sample on WhatsApp.'}
              </p>
            )}
          </section>

          <section className={s.block}>
            <h2>What you asked for</h2>
            <dl className={s.facts}>
              {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
          </section>

          <section className={s.block}>
            <h2>Quality documents</h2>
            <ul className={s.docs}>
              <li>
                <a href={LAB_REPORT.pdf} target="_blank" rel="noopener noreferrer">
                  <FileText size={18} aria-hidden="true" />
                  <span><strong>Chemical analysis report</strong><small>{LAB_REPORT.lab}, report {LAB_REPORT.reportNo}</small></span>
                </a>
              </li>
              <li>
                <a href="/lab-certificate.png" target="_blank" rel="noopener noreferrer">
                  <Award size={18} aria-hidden="true" />
                  <span><strong>Lab certificate</strong><small>Image, issued {fmt(LAB_REPORT.issued)}</small></span>
                </a>
              </li>
            </ul>
          </section>
        </div>

        <section className={s.contact}>
          <div>
            <h2>Questions about this request?</h2>
            <p>Quote <strong>{lead.ref}</strong> and we will pick it up straight away.</p>
          </div>
          <div className={s.contactActions}>
            <a className={s.wa} href={whatsappUrl(waText)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18} /> WhatsApp us</a>
            <a className={s.alt} href={`tel:${PHONE_PRIMARY.tel}`}><Phone size={18} /> {PHONE_PRIMARY.display}</a>
            <a className={s.alt} href={`mailto:${EMAIL_SALES}?subject=${encodeURIComponent(`Request ${lead.ref}`)}`}><Mail size={18} /> Email</a>
          </div>
        </section>

        <p className={s.private}><Lock size={14} aria-hidden="true" /> This page is private to you. Anyone with the link can view it, so please don&apos;t share it publicly.</p>
      </div>
    </div>
  );
}
