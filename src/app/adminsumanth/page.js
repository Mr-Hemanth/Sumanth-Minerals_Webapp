'use client';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { Database, Clock, Globe, User, Briefcase, Mail, MessageSquare, Trash2, CheckCircle, Download, Award, FlaskConical, LogOut } from 'lucide-react';
import styles from './admin.module.css';

const STATUSES = ['New', 'Contacted', 'Sample Sent', 'Quoted', 'Won', 'Lost', 'Resolved'];

// Escape a value for CSV: wrap in quotes, double inner quotes, and neutralise
// spreadsheet formulas (=, +, -, @) so a malicious lead can't run code in Excel.
const csvCell = (v) => {
  let s = String(v ?? '');
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};
const safeUrl = (u) => (/^https?:\/\//i.test(u || '') ? u : null);

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiry');
      if (res.status === 401) {
        window.location.href = '/adminsumanth/login';
        return;
      }
      const result = await res.json();
      if (result.success) {
        setInquiries(result.data);
        setSource(result.source);
        setError('');
      } else {
        setError(result.error || 'Failed to load inquiries');
      }
    } catch (error) {
      setError('Failed to load inquiries — check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/inquiry/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchInquiries();
      } else {
        const result = await res.json().catch(() => ({}));
        alert(result.error || 'Update failed');
      }
    } catch (error) {
      alert('Update failed — check your connection.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/inquiry/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchInquiries();
      } else {
        const result = await res.json().catch(() => ({}));
        alert(result.error || 'Delete failed');
      }
    } catch (error) {
      alert('Delete failed — check your connection.');
    }
  };

  const exportToCSV = () => {
    const header = ['Date', 'Type', 'Name', 'Job Title', 'Company', 'Website', 'Email', 'WhatsApp', 'Industry', 'Monthly Req', 'Size', 'Quantity', 'Packaging', 'Delivery', 'Country', 'Address', 'Message', 'Score', 'Status'];
    const rows = inquiries.map(i => [
      new Date(i.createdAt).toLocaleDateString(), i.type, i.name, i.jobTitle, i.company, i.website, i.email, i.whatsapp,
      i.industry, i.monthlyRequirement, i.preferredSize || i.grade, i.quantity, i.packaging, i.deliveryPort, i.country,
      i.address, i.message, i.leadScore, i.status,
    ].map(csvCell).join(','));
    const csv = '\uFEFF' + [header.map(csvCell).join(','), ...rows].join('\r\n'); // BOM so Excel reads UTF-8
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sumanth_leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };


  return (
    <div className={styles.adminPage}>
      <header className={styles.adminHeader}>
        <div className="container">
          <div className={styles.headerFlex}>
            <div className={styles.headerInfo}>
              <h1>Lead Intelligence Dashboard</h1>
              <p>Tracking bulk inquiries and sample requests globally.</p>
            </div>
            <div className={styles.headerActions}>
              <div className={styles.stats}>
                <span>Total: {inquiries.length}</span>
                <span>High Quality: {inquiries.filter(i => i.leadScore > 50).length}</span>
              </div>
              <button className="btn btn-outline" onClick={exportToCSV}>
                <Download size={18} /> Export CSV
              </button>
              <button className={styles.logoutBtn} onClick={() => signOut()}>
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        {source === 'fallback' && (
          <p className={styles.loading} role="alert">⚠ Database unreachable — showing leads from the local fallback file. Status changes are disabled until MongoDB is back.</p>
        )}
        {error && <p className={styles.loading} role="alert">{error}</p>}
        {loading ? (
          <p className={styles.loading}>Loading inquiries...</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Score</th>
                  <th>Inquiry Type</th>
                  <th>Customer</th>
                  <th>Contact Details</th>
                  <th>Specifications</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
 {inquiries.length === 0 && (
                  <tr><td colSpan={7} className={styles.loading}>No inquiries yet.</td></tr>
                )}
                {inquiries.map((inq, idx) => (
                  <tr key={inq._id || `fallback-${idx}`} className={inq.leadScore > 50 ? styles.highLead : ''}>
                    <td>
                      <div className={styles.scoreBadge} title="Lead Intelligence Score">
                        {inq.leadScore}
                      </div>
                    </td>
                    <td>
                      <div className={styles.typeCell}>
                        {inq.type === 'Sample Request' ? <FlaskConical size={16} /> : <Briefcase size={16} />}
                        <span>{inq.type}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.userCell}>
                        <User size={16} />
                        <div>
                          <strong>{inq.name}</strong>
                          <span className={styles.jobTitle}>{inq.jobTitle}</span>
                          <span>{inq.company}</span>
                          {safeUrl(inq.website) && <a href={safeUrl(inq.website)} target="_blank" rel="noopener noreferrer nofollow" className={styles.webLink}>{inq.website.replace(/^https?:\/\//, '')}</a>}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.contactCell}>
                        <a href={`mailto:${inq.email}`}><Mail size={14} /> {inq.email}</a>
                        <a href={`https://wa.me/${String(inq.whatsapp || '').replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"><MessageSquare size={14} /> {inq.whatsapp}</a>
                      </div>
                    </td>
                    <td>
                      <div className={styles.reqCell}>
                        <p><strong>Country:</strong> {inq.country}</p>
                        <p><strong>Industry:</strong> {inq.industry || 'N/A'}</p>
                        <p><strong>Monthly Req:</strong> {inq.monthlyRequirement || 'N/A'}</p>
                        <p><strong>Size:</strong> {inq.preferredSize || inq.grade || 'N/A'}</p>
                        {inq.quantity && <p><strong>Qty:</strong> {inq.quantity}</p>}
                        {inq.deliveryPort && <p><strong>Delivery:</strong> {inq.deliveryPort}</p>}
                        {inq.message && <p className={styles.addressLine}><strong>Msg:</strong> {inq.message}</p>}
                        {inq.address && <p className={styles.addressLine}><strong>Addr:</strong> {inq.address}</p>}
                      </div>
                    </td>
                    <td>
                      <select 
                        value={inq.status || 'New'} 
                        disabled={!inq._id}
                        onChange={(e) => handleStatusUpdate(inq._id, e.target.value)}
                        className={`${styles.statusSelect} ${styles[(inq.status || 'New').toLowerCase().replace(' ', '')] || ''}`}
                      >
                        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.deleteBtn} disabled={!inq._id} onClick={() => handleDelete(inq._id)} title="Delete"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
