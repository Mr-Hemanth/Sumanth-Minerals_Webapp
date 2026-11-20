'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Phone, Mail, MessageCircle, Download, LogOut, RefreshCw, Search, X, Link2,
  Trash2, CalendarClock, Package, FileText, StickyNote, Check, ExternalLink, Flame,
} from 'lucide-react';
import { parseTonnes } from '@/lib/leadScore';
import s from './admin.module.css';

// ─── Constants ──────────────────────────────────────────────────────────
const PIPELINE = ['New', 'Contacted', 'Sample Sent', 'Quoted', 'Won', 'Lost'];
const OPEN = ['New', 'Contacted', 'Sample Sent', 'Quoted'];
const INCOTERMS = ['EXW', 'FCA', 'FOB', 'CFR', 'CIF', 'DAP'];
const CURRENCIES = ['USD', 'INR', 'EUR', 'AED'];
const HOT = 60; // lead score at or above this is flagged
const VIEWS = [
  { id: 'today', label: 'Today' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'leads', label: 'All leads' },
  { id: 'insights', label: 'Insights' },
];

// ─── Helpers ────────────────────────────────────────────────────────────
const tonnes = (l) => Math.max(parseTonnes(l.quantity), parseTonnes(l.monthlyRequirement));
const fmtT = (n) => `${Math.round(n).toLocaleString('en-IN')} t`;
// Must match leadRef() in src/lib/tracking.js so buyer and desk see the same reference.
const ref = (l) => `SM-${String(l._id || l.trackingToken || '').slice(-6).toUpperCase()}`;
const digits = (p) => String(p || '').replace(/\D/g, '');
const endOfToday = () => { const d = new Date(); d.setHours(23, 59, 59, 999); return d; };
const isOpen = (l) => OPEN.includes(l.status || 'New');

function ago(date) {
  const ms = Date.now() - new Date(date).getTime();
  const m = Math.round(ms / 60000);
  if (m < 60) return `${Math.max(1, m)} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} h ago`;
  const d = Math.round(h / 24);
  if (d < 30) return `${d} d ago`;
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '');
const toInputDate = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '');
const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); d.setHours(10, 0, 0, 0); return d.toISOString(); };

const csvCell = (v) => {
  let x = String(v ?? '');
  if (/^[=+\-@\t\r]/.test(x)) x = `'${x}`;
  return `"${x.replace(/"/g, '""')}"`;
};
const safeUrl = (u) => (/^https?:\/\//i.test(u || '') ? u : null);

function waLink(lead, text) {
  const t = text ?? `Hello ${lead.name}, this is the sales desk at Sumanth Minerals regarding your ${String(lead.type || 'inquiry').toLowerCase()} (ref ${ref(lead)}).`;
  return `https://wa.me/${digits(lead.whatsapp)}?text=${encodeURIComponent(t)}`;
}
const mailLink = (lead) =>
  `mailto:${lead.email}?subject=${encodeURIComponent(`Your quartz ${String(lead.type || 'inquiry').toLowerCase()} — ref ${ref(lead)}`)}`;

function countBy(list, fn, top = 8) {
  const m = new Map();
  for (const l of list) {
    const k = (fn(l) || 'Not given').trim() || 'Not given';
    m.set(k, (m.get(k) || 0) + 1);
  }
  const rows = [...m.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);
  if (rows.length <= top) return rows;
  const rest = rows.slice(top - 1).reduce((a, r) => a + r.value, 0);
  return [...rows.slice(0, top - 1), { label: 'All others', value: rest }];
}

// ─── Page ───────────────────────────────────────────────────────────────
export default function SalesDesk() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [source, setSource] = useState('');
  const [view, setView] = useState('today');
  const [openId, setOpenId] = useState(null);
  const [toast, setToast] = useState('');
  const router = useRouter();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiry', { cache: 'no-store' });
      if (res.status === 401) { router.replace('/adminsumanth/login'); return; }
      const r = await res.json();
      if (!r.success) throw new Error(r.error);
      setLeads(r.data.map((l, i) => ({ ...l, _key: l._id || `local-${i}`, status: l.status || 'New' })));
      setSource(r.source);
      setError('');
    } catch {
      setError('Leads could not be loaded. Check your internet connection, then refresh.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data fetch
  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore saved view after hydration
    try { const v = localStorage.getItem('desk-view'); if (VIEWS.some((x) => x.id === v)) setView(v); } catch {}
  }, []);
  const changeView = (v) => { setView(v); try { localStorage.setItem('desk-view', v); } catch {} };

  const flash = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2600); };

  const patch = async (id, body, okMsg) => {
    const res = await fetch(`/api/inquiry/${id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    });
    const r = await res.json().catch(() => ({}));
    if (!res.ok) { flash(r.error || 'Save failed'); return null; }
    setLeads((prev) => prev.map((l) => (l._id === id ? { ...r.data, _key: l._key } : l)));
    if (okMsg) flash(okMsg);
    return r.data;
  };

  const remove = async (id) => {
    const res = await fetch(`/api/inquiry/${id}`, { method: 'DELETE' });
    if (res.ok) { setLeads((p) => p.filter((l) => l._id !== id)); setOpenId(null); flash('Lead deleted'); }
    else flash('Delete failed');
  };

  const exportCSV = () => {
    const head = ['Ref', 'Date', 'Type', 'Stage', 'Score', 'Name', 'Job title', 'Company', 'Website', 'Email', 'WhatsApp', 'Country', 'Industry', 'Size', 'Quantity', 'Monthly', 'Packaging', 'Delivery', 'Follow-up', 'Quote/MT', 'Incoterm', 'Message', 'Address'];
    const rows = leads.map((l) => [
      ref(l), fmtDate(l.createdAt), l.type, l.status, l.leadScore, l.name, l.jobTitle, l.company, l.website, l.email,
      l.whatsapp, l.country, l.industry, l.preferredSize || l.grade, l.quantity, l.monthlyRequirement, l.packaging,
      l.deliveryPort, fmtDate(l.followUpAt), l.quote?.pricePerMT ? `${l.quote.currency || 'USD'} ${l.quote.pricePerMT}` : '',
      l.quote?.incoterm, l.message, l.address,
    ].map(csvCell).join(','));
    const csv = '﻿' + [head.map(csvCell).join(','), ...rows].join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = `sumanth-leads-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Derived numbers ───
  const stats = useMemo(() => {
    const open = leads.filter(isOpen);
    const eod = endOfToday();
    const due = open.filter((l) => l.followUpAt && new Date(l.followUpAt) <= eod)
      .sort((a, b) => new Date(a.followUpAt) - new Date(b.followUpAt));
    const fresh = leads.filter((l) => l.status === 'New' && !(l.followUpAt && new Date(l.followUpAt) <= eod))
      .sort((a, b) => (b.leadScore || 0) - (a.leadScore || 0) || new Date(b.createdAt) - new Date(a.createdAt));
    const won = leads.filter((l) => l.status === 'Won').length;
    const lost = leads.filter((l) => l.status === 'Lost').length;
    const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);
    return {
      open,
      openTonnes: open.reduce((a, l) => a + tonnes(l), 0),
      due, fresh,
      // eslint-disable-next-line react-hooks/purity -- "this week" is relative to now by design
      newThisWeek: leads.filter((l) => Date.now() - new Date(l.createdAt) < 7 * 864e5).length,
      wonThisMonth: leads.filter((l) => l.status === 'Won' && new Date(l.updatedAt || l.createdAt) >= monthStart).length,
      winRate: won + lost ? Math.round((won / (won + lost)) * 100) : null,
    };
  }, [leads]);

  const current = leads.find((l) => l._key === openId) || null;
  const readOnly = source === 'fallback';

  return (
    <div className={s.desk}>
      <header className={s.top}>
        <div className={s.brand}>
          <span className={s.mark} aria-hidden="true" />
          <div>
            <strong>Sumanth Minerals</strong>
            <span>Sales desk</span>
          </div>
        </div>
        <nav className={s.tabs} aria-label="Dashboard views">
          {VIEWS.map((v) => (
            <button key={v.id} className={view === v.id ? s.tabOn : s.tab} onClick={() => changeView(v.id)} aria-current={view === v.id ? 'page' : undefined}>
              {v.label}
              {v.id === 'today' && stats.due.length + stats.fresh.length > 0 && (
                <span className={s.tabCount}>{stats.due.length + stats.fresh.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className={s.topActions}>
          <button className={s.iconBtn} onClick={load} title="Refresh leads" aria-label="Refresh leads"><RefreshCw size={17} /></button>
          <button className={s.iconBtn} onClick={exportCSV} title="Download all leads as CSV" aria-label="Download CSV"><Download size={17} /></button>
          <button className={s.iconBtn} onClick={() => signOut({ callbackUrl: '/adminsumanth/login' })} title="Sign out" aria-label="Sign out"><LogOut size={17} /></button>
        </div>
      </header>

      <main className={s.main}>
        {readOnly && (
          <p className={s.banner} role="alert">
            The database is unreachable, so you are seeing leads saved to the backup file. They can be read and exported, but not edited, until the database is back.
          </p>
        )}
        {error && <p className={s.banner} role="alert">{error}</p>}

        <section className={s.summary} aria-label="Summary">
          <div className={s.hero}>
            <span className={s.heroLabel}>Tonnage in open deals</span>
            <span className={s.heroValue}>{fmtT(stats.openTonnes)}</span>
            <span className={s.heroSub}>across {stats.open.length} open {stats.open.length === 1 ? 'lead' : 'leads'}</span>
          </div>
          <dl className={s.kpis}>
            <div><dt>Follow-ups due</dt><dd>{stats.due.length}</dd></div>
            <div><dt>Not yet contacted</dt><dd>{leads.filter((l) => l.status === 'New').length}</dd></div>
            <div><dt>New this week</dt><dd>{stats.newThisWeek}</dd></div>
            <div><dt>Won this month</dt><dd>{stats.wonThisMonth}</dd></div>
            <div><dt>Win rate</dt><dd>{stats.winRate === null ? '—' : `${stats.winRate}%`}</dd></div>
          </dl>
        </section>

        {loading && leads.length === 0 ? (
          <p className={s.empty}>Loading leads…</p>
        ) : view === 'today' ? (
          <TodayView stats={stats} onOpen={setOpenId} />
        ) : view === 'pipeline' ? (
          <PipelineView leads={leads} onOpen={setOpenId} />
        ) : view === 'leads' ? (
          <LeadsView leads={leads} onOpen={setOpenId} />
        ) : (
          <InsightsView leads={leads} />
        )}
      </main>

      {current && (
        <LeadDrawer
          key={current._key}
          lead={current}
          readOnly={readOnly || !current._id}
          onClose={() => setOpenId(null)}
          onPatch={patch}
          onDelete={remove}
          flash={flash}
        />
      )}

      <div className={s.toast} role="status" aria-live="polite" data-show={toast ? 'true' : 'false'}>
        {toast && <><Check size={16} /> {toast}</>}
      </div>
    </div>
  );
}

// ─── Shared bits ────────────────────────────────────────────────────────
function Score({ value }) {
  const hot = (value || 0) >= HOT;
  return (
    <span className={hot ? s.scoreHot : s.score} title={`Lead score ${value || 0} of 100${hot ? ' — priority' : ''}`}>
      {hot && <Flame size={12} aria-hidden="true" />}{value || 0}
    </span>
  );
}

function Stage({ status }) {
  const cls = status === 'Won' ? s.stageWon : status === 'Lost' ? s.stageLost : s.stage;
  return <span className={cls}>{status}</span>;
}

function want(l) {
  return [l.preferredSize || l.grade, tonnes(l) ? fmtT(tonnes(l)) : null, l.industry].filter(Boolean).join(', ');
}

function QuickActions({ lead, compact }) {
  return (
    <div className={compact ? s.quickCompact : s.quick}>
      {lead.whatsapp && (
        <a className={s.qWa} href={waLink(lead)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${lead.name}`}>
          <MessageCircle size={16} /><span>WhatsApp</span>
        </a>
      )}
      {lead.whatsapp && (
        <a className={s.qBtn} href={`tel:+${digits(lead.whatsapp)}`} aria-label={`Call ${lead.name}`}>
          <Phone size={16} /><span>Call</span>
        </a>
      )}
      {lead.email && (
        <a className={s.qBtn} href={mailLink(lead)} aria-label={`Email ${lead.name}`}>
          <Mail size={16} /><span>Email</span>
        </a>
      )}
    </div>
  );
}

// ─── Today ──────────────────────────────────────────────────────────────
function TodayView({ stats, onOpen }) {
  const nothing = stats.due.length === 0 && stats.fresh.length === 0;
  return (
    <div className={s.today}>
      {nothing && (
        <div className={s.emptyBlock}>
          <h2>Nothing waiting on you</h2>
          <p>Every new lead has been contacted and no follow-ups are due. New website inquiries will appear here.</p>
        </div>
      )}
      {stats.due.length > 0 && (
        <CallList title="Follow-ups due" hint="Promised calls, oldest first" items={stats.due} onOpen={onOpen} showDue />
      )}
      {stats.fresh.length > 0 && (
        <CallList title="Waiting for first contact" hint="Highest score first" items={stats.fresh} onOpen={onOpen} />
      )}
    </div>
  );
}

function CallList({ title, hint, items, onOpen, showDue }) {
  return (
    <section className={s.callList}>
      <div className={s.sectionHead}>
        <h2>{title} <span className={s.count}>{items.length}</span></h2>
        <p>{hint}</p>
      </div>
      <ol className={s.calls}>
        {items.map((l) => {
          const overdue = showDue && new Date(l.followUpAt) < new Date(new Date().setHours(0, 0, 0, 0));
          return (
            <li key={l._key} className={s.call}>
              <Score value={l.leadScore} />
              <button className={s.callMain} onClick={() => onOpen(l._key)}>
                <strong>{l.company || l.name}</strong>
                <span>{[l.company ? l.name : null, l.country].filter(Boolean).join(', ')}</span>
                <span className={s.callWant}>{l.type}{want(l) ? `: ${want(l)}` : ''}</span>
              </button>
              <span className={overdue ? s.when + ' ' + s.overdue : s.when}>
                {showDue ? (overdue ? `Overdue since ${fmtDate(l.followUpAt)}` : 'Due today') : ago(l.createdAt)}
              </span>
              <QuickActions lead={l} compact />
            </li>
          );
        })}
      </ol>
    </section>
  );
}

// ─── Pipeline ───────────────────────────────────────────────────────────
function PipelineView({ leads, onOpen }) {
  const cols = PIPELINE.map((st) => {
    const items = leads.filter((l) => l.status === st || (st === 'Won' && l.status === 'Resolved'))
      .sort((a, b) => (b.leadScore || 0) - (a.leadScore || 0));
    return { st, items, t: items.reduce((a, l) => a + tonnes(l), 0) };
  });
  return (
    <div className={s.boardWrap}>
      <div className={s.board}>
        {cols.map(({ st, items, t }) => (
          <section key={st} className={s.col} aria-label={`${st}: ${items.length} leads`}>
            <header className={s.colHead}>
              <h2>{st}</h2>
              <span>{items.length} {items.length === 1 ? 'lead' : 'leads'}{t ? `, ${fmtT(t)}` : ''}</span>
            </header>
            <div className={s.colBody}>
              {items.length === 0 && <p className={s.colEmpty}>No leads at this stage</p>}
              {items.map((l) => (
                <button key={l._key} className={s.card} onClick={() => onOpen(l._key)}>
                  <span className={s.cardTop}>
                    <strong>{l.company || l.name}</strong>
                    <Score value={l.leadScore} />
                  </span>
                  <span className={s.cardMeta}>{[l.country, l.type].filter(Boolean).join(', ')}</span>
                  {want(l) && <span className={s.cardWant}>{want(l)}</span>}
                  <span className={s.cardFoot}>
                    {l.followUpAt && isOpen(l) ? <><CalendarClock size={13} /> {fmtDate(l.followUpAt)}</> : ago(l.createdAt)}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

// ─── All leads ──────────────────────────────────────────────────────────
function LeadsView({ leads, onOpen }) {
  const [q, setQ] = useState('');
  const [stage, setStage] = useState('');
  const [type, setType] = useState('');
  const [sort, setSort] = useState('new');

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const r = leads.filter((l) =>
      (!stage || l.status === stage) &&
      (!type || l.type === type) &&
      (!needle || [l.name, l.company, l.email, l.country, l.whatsapp, l.industry, ref(l)].join(' ').toLowerCase().includes(needle)));
    const by = {
      new: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      score: (a, b) => (b.leadScore || 0) - (a.leadScore || 0),
      tonnes: (a, b) => tonnes(b) - tonnes(a),
    }[sort];
    return r.sort(by);
  }, [leads, q, stage, type, sort]);

  return (
    <section>
      <div className={s.filters}>
        <label className={s.searchBox}>
          <Search size={16} aria-hidden="true" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, company, country, phone or ref" aria-label="Search leads" />
        </label>
        <select value={stage} onChange={(e) => setStage(e.target.value)} aria-label="Filter by stage">
          <option value="">All stages</option>
          {[...PIPELINE, 'Resolved'].map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by type">
          <option value="">All types</option>
          {['Bulk RFQ', 'Sample Request', 'Inquiry'].map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort leads">
          <option value="new">Newest first</option>
          <option value="score">Highest score</option>
          <option value="tonnes">Largest tonnage</option>
        </select>
      </div>
      <p className={s.resultCount}>{rows.length} of {leads.length} leads</p>
      {rows.length === 0 ? (
        <div className={s.emptyBlock}>
          <h2>{leads.length ? 'No leads match these filters' : 'No leads yet'}</h2>
          <p>{leads.length ? 'Clear the search or choose “All stages”.' : 'Inquiries, sample requests and RFQs from the website will be listed here.'}</p>
        </div>
      ) : (
        <div className={s.tableWrap}>
          <table className={s.table}>
            <thead>
              <tr><th>Score</th><th>Buyer</th><th>Wants</th><th>Type</th><th>Stage</th><th>Received</th><th><span className="sr-only">Contact</span></th></tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l._key} onClick={() => onOpen(l._key)}>
                  <td><Score value={l.leadScore} /></td>
                  <td>
                    <button className={s.rowLink} onClick={(e) => { e.stopPropagation(); onOpen(l._key); }}>{l.company || l.name}</button>
                    <span className={s.rowSub}>{[l.company ? l.name : null, l.country].filter(Boolean).join(', ')}</span>
                  </td>
                  <td className={s.rowWant}>{want(l) || '—'}</td>
                  <td>{l.type}</td>
                  <td><Stage status={l.status} /></td>
                  <td className={s.nowrap}>{ago(l.createdAt)}</td>
                  <td onClick={(e) => e.stopPropagation()}><QuickActions lead={l} compact /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

// ─── Insights ───────────────────────────────────────────────────────────
function InsightsView({ leads }) {
  const weeks = useMemo(() => {
    const out = [];
    const start = new Date(); start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7)); // Monday this week
    for (let i = 11; i >= 0; i--) {
      const from = new Date(start); from.setDate(from.getDate() - i * 7);
      const to = new Date(from); to.setDate(to.getDate() + 7);
      const n = leads.filter((l) => { const d = new Date(l.createdAt); return d >= from && d < to; }).length;
      out.push({ label: from.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }), value: n });
    }
    return out;
  }, [leads]);

  const funnel = useMemo(() => {
    const reached = (l, idx) => {
      if (l.status === 'Won' || l.status === 'Resolved') return true;
      const hist = (l.statusHistory || []).map((h) => PIPELINE.indexOf(h.status));
      const cur = PIPELINE.indexOf(l.status);
      return Math.max(cur === 5 ? 0 : cur, ...hist.filter((h) => h !== 5)) >= idx;
    };
    return ['New', 'Contacted', 'Sample Sent', 'Quoted', 'Won'].map((st, i) => ({
      label: i === 0 ? 'Received' : st, value: leads.filter((l) => reached(l, i)).length,
    }));
  }, [leads]);

  if (leads.length === 0) {
    return (
      <div className={s.emptyBlock}>
        <h2>No data yet</h2>
        <p>Charts appear once the first website leads arrive.</p>
      </div>
    );
  }

  return (
    <div className={s.insights}>
      <Panel title="Leads per week" sub="Last 12 weeks" wide>
        <WeekBars data={weeks} />
      </Panel>
      <Panel title="How far leads get" sub="Leads that reached each stage, as a share of all leads received" wide>
        <BarList data={funnel} showShare />
      </Panel>
      <Panel title="Where buyers are" sub="Leads by country">
        <BarList data={countBy(leads, (l) => l.country)} />
      </Panel>
      <Panel title="What they make" sub="Leads by industry">
        <BarList data={countBy(leads, (l) => l.industry)} />
      </Panel>
      <Panel title="Grades asked for" sub="Leads by size">
        <BarList data={countBy(leads, (l) => l.preferredSize || l.grade)} />
      </Panel>
      <Panel title="How they reached you" sub="Leads by form">
        <BarList data={countBy(leads, (l) => l.type)} />
      </Panel>
    </div>
  );
}

function Panel({ title, sub, wide, children }) {
  return (
    <section className={wide ? `${s.panel} ${s.panelWide}` : s.panel}>
      <h2>{title}</h2>
      <p className={s.panelSub}>{sub}</p>
      {children}
    </section>
  );
}

function BarList({ data, showShare }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const first = data[0]?.value || 1;
  return (
    <ul className={showShare ? `${s.barList} ${s.barListShare}` : s.barList}>
      {data.map((d) => (
        <li key={d.label} className={s.barRow} title={`${d.label}: ${d.value}`}>
          <span className={s.barLabel}>{d.label}</span>
          <span className={s.barTrack} aria-hidden="true">
            <span className={s.barFill} style={{ width: `${(d.value / max) * 100}%` }} />
          </span>
          <span className={s.barValue}>
            {d.value}{showShare && first ? <small> {Math.round((d.value / first) * 100)}%</small> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

function WeekBars({ data }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const total = data.reduce((a, d) => a + d.value, 0);
  return (
    <figure className={s.weeks}>
      <div className={s.weekPlot} role="img" aria-label={`Leads per week for the last 12 weeks, ${total} in total`}>
        {data.map((d, i) => (
          <div key={i} className={s.weekCol} tabIndex={0} aria-label={`Week of ${d.label}: ${d.value} leads`}>
            <span className={s.weekTip}>Week of {d.label}: <strong>{d.value}</strong></span>
            <span className={s.weekBar} style={{ height: `${(d.value / max) * 100}%` }} data-zero={d.value === 0 ? 'true' : 'false'} />
          </div>
        ))}
      </div>
      <div className={s.weekAxis} aria-hidden="true">
        {data.map((d, i) => <span key={i}>{i % 2 === 0 || i === data.length - 1 ? d.label : ''}</span>)}
      </div>
      <figcaption className="sr-only">{data.map((d) => `${d.label}: ${d.value}`).join(', ')}</figcaption>
    </figure>
  );
}

// ─── Lead drawer ────────────────────────────────────────────────────────
function LeadDrawer({ lead, readOnly, onClose, onPatch, onDelete, flash }) {
  const [note, setNote] = useState('');
  const [quote, setQuote] = useState({
    pricePerMT: lead.quote?.pricePerMT ?? '', currency: lead.quote?.currency || 'USD',
    incoterm: lead.quote?.incoterm || 'FOB', port: lead.quote?.port || '',
    validUntil: toInputDate(lead.quote?.validUntil), terms: lead.quote?.terms || '',
  });
  const [sample, setSample] = useState({ courier: lead.sample?.courier || '', trackingNumber: lead.sample?.trackingNumber || '' });
  const [buyerMsg, setBuyerMsg] = useState(lead.buyerMessage || '');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose]);

  const run = async (body, msg) => { setBusy(true); const r = await onPatch(lead._id, body, msg); setBusy(false); return r; };
  const stageIdx = PIPELINE.indexOf(lead.status);
  const advanceTo = (target) => (PIPELINE.indexOf(target) > stageIdx && stageIdx < 4 ? { status: target } : {});

  const buyerLink = lead.trackingToken ? `${window.location.origin}/track/${lead.trackingToken}` : null;
  const shareLink = async (how) => {
    let token = lead.trackingToken;
    if (!token) { const r = await run({ ensureToken: true }); token = r?.trackingToken; if (!token) return; }
    const url = `${window.location.origin}/track/${token}`;
    if (how === 'copy') {
      try { await navigator.clipboard.writeText(url); flash('Buyer link copied'); } catch { flash(url); }
    } else {
      window.open(waLink(lead, `Hello ${lead.name}, you can follow your request (ref ${ref(lead)}) with Sumanth Minerals here: ${url}`), '_blank', 'noopener');
    }
  };

  const details = [
    ['Contact', lead.name + (lead.jobTitle ? `, ${lead.jobTitle}` : '')],
    ['Company', lead.company], ['Email', lead.email], ['WhatsApp', lead.whatsapp],
    ['Country', lead.country], ['Industry', lead.industry], ['Size', lead.preferredSize || lead.grade],
    ['Quantity', lead.quantity], ['Monthly need', lead.monthlyRequirement], ['Packaging', lead.packaging],
    ['Delivery', lead.deliveryPort], ['Address', lead.address],
  ].filter(([, v]) => v);

  return (
    <div className={s.overlay} onClick={onClose}>
      <aside className={s.drawer} role="dialog" aria-modal="true" aria-label={`Lead: ${lead.company || lead.name}`} onClick={(e) => e.stopPropagation()}>
        <header className={s.dHead}>
          <div>
            <p className={s.dRef}>{ref(lead)}, {lead.type}, received {fmtDate(lead.createdAt)}</p>
            <h2>{lead.company || lead.name}</h2>
            <p className={s.dSub}>{[lead.company ? lead.name : null, lead.country].filter(Boolean).join(', ')}</p>
          </div>
          <div className={s.dHeadRight}>
            <Score value={lead.leadScore} />
            <button className={s.iconBtn} onClick={onClose} aria-label="Close"><X size={18} /></button>
          </div>
        </header>

        <div className={s.dBody}>
          <QuickActions lead={lead} />
          {safeUrl(lead.website) && (
            <a className={s.webLink} href={safeUrl(lead.website)} target="_blank" rel="noopener noreferrer nofollow">
              <ExternalLink size={14} /> {lead.website.replace(/^https?:\/\//, '')}
            </a>
          )}

          <section className={s.dSection}>
            <h3>Stage</h3>
            <div className={s.stepper} role="group" aria-label="Deal stage">
              {PIPELINE.map((st, i) => (
                <button
                  key={st}
                  disabled={readOnly || busy}
                  className={lead.status === st ? (st === 'Lost' ? s.stepLost : st === 'Won' ? s.stepWon : s.stepOn) : i < stageIdx && st !== 'Lost' && lead.status !== 'Lost' ? s.stepDone : s.step}
                  aria-pressed={lead.status === st}
                  onClick={() => run({ status: st }, `Moved to ${st}`)}
                >
                  {st}
                </button>
              ))}
            </div>
          </section>

          <section className={s.dSection}>
            <h3><CalendarClock size={16} /> Next follow-up</h3>
            <div className={s.followRow}>
              <input type="date" disabled={readOnly} value={toInputDate(lead.followUpAt)} onChange={(e) => run({ followUpAt: e.target.value ? new Date(`${e.target.value}T10:00:00`).toISOString() : null }, 'Follow-up saved')} aria-label="Follow-up date" />
              {[['Tomorrow', 1], ['In 3 days', 3], ['Next week', 7]].map(([label, n]) => (
                <button key={label} className={s.chip} disabled={readOnly} onClick={() => run({ followUpAt: addDays(n) }, `Follow-up set for ${label.toLowerCase()}`)}>{label}</button>
              ))}
              {lead.followUpAt && <button className={s.chipQuiet} disabled={readOnly} onClick={() => run({ followUpAt: null }, 'Follow-up cleared')}>Clear</button>}
            </div>
          </section>

          <section className={s.dSection}>
            <h3>What they asked for</h3>
            <dl className={s.facts}>
              {details.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
            </dl>
            {lead.message && <blockquote className={s.message}>{lead.message}</blockquote>}
          </section>

          <section className={s.dSection + ' ' + s.shared}>
            <div className={s.sharedHead}>
              <h3>Buyer&apos;s tracking page</h3>
              <p>Everything in this box is visible to the buyer on their private page.</p>
              <div className={s.linkRow}>
                <button className={s.chip} disabled={readOnly} onClick={() => shareLink('copy')}><Link2 size={14} /> {buyerLink ? 'Copy buyer link' : 'Create buyer link'}</button>
                <button className={s.chip} disabled={readOnly || !lead.whatsapp} onClick={() => shareLink('wa')}><MessageCircle size={14} /> Send link on WhatsApp</button>
                {buyerLink && <a className={s.chipQuiet} href={buyerLink} target="_blank" rel="noopener noreferrer">Preview</a>}
              </div>
            </div>

            <form className={s.subForm} onSubmit={(e) => { e.preventDefault(); run({ quote, ...advanceTo('Quoted') }, 'Quotation saved'); }}>
              <h4><FileText size={15} /> Quotation</h4>
              <div className={s.grid3}>
                <label>Price per tonne<input type="number" min="0" step="0.01" inputMode="decimal" value={quote.pricePerMT} onChange={(e) => setQuote({ ...quote, pricePerMT: e.target.value })} disabled={readOnly} required /></label>
                <label>Currency<select value={quote.currency} onChange={(e) => setQuote({ ...quote, currency: e.target.value })} disabled={readOnly}>{CURRENCIES.map((c) => <option key={c}>{c}</option>)}</select></label>
                <label>Incoterm<select value={quote.incoterm} onChange={(e) => setQuote({ ...quote, incoterm: e.target.value })} disabled={readOnly}>{INCOTERMS.map((c) => <option key={c}>{c}</option>)}</select></label>
                <label>Port or place<input value={quote.port} onChange={(e) => setQuote({ ...quote, port: e.target.value })} placeholder="Krishnapatnam" disabled={readOnly} /></label>
                <label>Valid until<input type="date" value={quote.validUntil} onChange={(e) => setQuote({ ...quote, validUntil: e.target.value })} disabled={readOnly} /></label>
              </div>
              <label>Terms<textarea rows={2} value={quote.terms} onChange={(e) => setQuote({ ...quote, terms: e.target.value })} placeholder="Payment 30% advance, balance against BL. 1 MT jumbo bags." disabled={readOnly} /></label>
              <button className={s.save} disabled={readOnly || busy}>Save quotation</button>
            </form>

            <form className={s.subForm} onSubmit={(e) => { e.preventDefault(); run({ sample, ...advanceTo('Sample Sent') }, 'Sample details saved'); }}>
              <h4><Package size={15} /> Sample shipment</h4>
              <div className={s.grid2}>
                <label>Courier<input value={sample.courier} onChange={(e) => setSample({ ...sample, courier: e.target.value })} placeholder="DHL, Blue Dart…" disabled={readOnly} /></label>
                <label>Tracking number<input value={sample.trackingNumber} onChange={(e) => setSample({ ...sample, trackingNumber: e.target.value })} disabled={readOnly} /></label>
              </div>
              <button className={s.save} disabled={readOnly || busy}>Save sample details</button>
            </form>

            <form className={s.subForm} onSubmit={(e) => { e.preventDefault(); run({ buyerMessage: buyerMsg }, 'Message to buyer saved'); }}>
              <h4><MessageCircle size={15} /> Message to the buyer</h4>
              <textarea rows={3} value={buyerMsg} onChange={(e) => setBuyerMsg(e.target.value)} placeholder="Shown at the top of their page, e.g. “Your sample left our mine today. Expect delivery in 5 working days.”" disabled={readOnly} aria-label="Message to the buyer" />
              <button className={s.save} disabled={readOnly || busy}>Save message</button>
            </form>
          </section>

          <section className={s.dSection}>
            <h3><StickyNote size={16} /> Internal notes</h3>
            <form className={s.noteForm} onSubmit={async (e) => { e.preventDefault(); if (note.trim() && await run({ note }, 'Note added')) setNote(''); }}>
              <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Only your team sees these. E.g. “Wants 0.25% Fe max, will confirm after trial melt.”" disabled={readOnly} aria-label="New note" />
              <button className={s.save} disabled={readOnly || busy || !note.trim()}>Add note</button>
            </form>
            <ol className={s.timeline}>
              {[
                ...(lead.notes || []).map((n) => ({ at: n.at, text: n.text, kind: 'note' })),
                ...(lead.statusHistory || []).map((h) => ({ at: h.at, text: `Stage set to ${h.status}`, kind: 'stage' })),
              ].sort((a, b) => new Date(b.at) - new Date(a.at)).map((e, i) => (
                <li key={i} className={e.kind === 'note' ? s.tNote : s.tStage}>
                  <time>{new Date(e.at).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</time>
                  <p>{e.text}</p>
                </li>
              ))}
            </ol>
          </section>

          {!readOnly && (
            <section className={s.danger}>
              {confirmDelete ? (
                <>
                  <p>Delete this lead permanently? This cannot be undone.</p>
                  <button className={s.deleteBtn} onClick={() => onDelete(lead._id)}><Trash2 size={15} /> Yes, delete</button>
                  <button className={s.chipQuiet} onClick={() => setConfirmDelete(false)}>Keep it</button>
                </>
              ) : (
                <button className={s.deleteLink} onClick={() => setConfirmDelete(true)}><Trash2 size={14} /> Delete lead</button>
              )}
            </section>
          )}
        </div>
      </aside>
    </div>
  );
}
