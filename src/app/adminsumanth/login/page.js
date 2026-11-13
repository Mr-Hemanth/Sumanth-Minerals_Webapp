'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from '../admin.module.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid username or password');
      setLoading(false);
    } else {
      router.push('/adminsumanth');
      router.refresh();
    }
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.loginLogo}>
          <h2>SUMANTH <span>ADMIN</span></h2>
        </div>
        <p>Access the Lead Intelligence Dashboard</p>
        
        {error && <div className={styles.loginError}>{error}</div>}
        
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input 
            type="email" 
            autoComplete="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
            placeholder="admin@yourdomain.com"
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input 
            type="password" 
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="••••••••"
          />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Authenticating...' : 'Secure Login'}
        </button>
      </form>
    </div>
  );
}
