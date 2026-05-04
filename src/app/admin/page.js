'use client';
import { useState, useEffect } from 'react';
import { Database, Clock, Globe, User, Briefcase, Mail, MessageSquare, Trash2, CheckCircle, Download, Award, FlaskConical } from 'lucide-react';
import styles from './admin.module.css';

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (authorized) {
      fetchInquiries();
    }
  }, [authorized]);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiry');
      const result = await res.json();
      if (result.success) {
        setInquiries(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries');
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Date,Type,Name,Company,Email,WhatsApp,Quantity,Country,Score,Status\n'];
    const rows = inquiries.map(i => 
      `${new Date(i.createdAt).toLocaleDateString()},${i.type},${i.name},${i.company},${i.email},${i.whatsapp},${i.quantity || ''},${i.country},${i.leadScore},${i.status}\n`
    );
    const blob = new Blob([headers, ...rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kanaka_leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'kanaka2024') {
      setAuthorized(true);
    } else {
      alert('Invalid Credentials');
    }
  };

  if (!authorized) {
    return (
      <div className={styles.loginPage}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <h2>Admin Login</h2>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }

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
              <button className="btn btn-outline" onClick={exportToCSV}>
                <Download size={18} /> Export CSV
              </button>
              <div className={styles.stats}>
                <span>Total: {inquiries.length}</span>
                <span>High Quality: {inquiries.filter(i => i.leadScore > 50).length}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
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
                  <th>Requirements</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inq) => (
                  <tr key={inq._id} className={inq.leadScore > 50 ? styles.highLead : ''}>
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
                          <span>{inq.company}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={styles.contactCell}>
                        <a href={`mailto:${inq.email}`}><Mail size={14} /> {inq.email}</a>
                        <a href={`https://wa.me/${inq.whatsapp}`} target="_blank"><MessageSquare size={14} /> {inq.whatsapp}</a>
                      </div>
                    </td>
                    <td>
                      <div className={styles.reqCell}>
                        <p><Globe size={14} /> {inq.country}</p>
                        <p><Briefcase size={14} /> {inq.quantity || 'N/A'}</p>
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.statusTag} ${styles[inq.status.toLowerCase().replace(' ', '')]}`}>
                        {inq.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.actionBtn} title="Mark as Contacted"><CheckCircle size={18} /></button>
                        <button className={styles.deleteBtn} title="Delete"><Trash2 size={18} /></button>
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
