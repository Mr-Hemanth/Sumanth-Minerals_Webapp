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
      setError('That email and password do not match. Check both and try again.');
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
          <span className={styles.mark} aria-hidden="true" />
          <h2>Sumanth Minerals <span>Sales desk</span></h2>
        </div>
        <p>Sign in to see today&apos;s calls, deals and buyer requests.</p>
        
        {error && <div className={styles.loginError} role="alert">{error}</div>}
        
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
        
        <button type="submit" className={styles.loginBtn} disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
