import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// The preview card shown when the site is shared on WhatsApp, LinkedIn, X, Slack
// or in Google Discover. Built once at build time from the real stockpile photo.
export const alt = 'Sumanth Minerals – 99.27% SiO₂ quartz lumps and grit, direct from our mine in Andhra Pradesh, India';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const photo = await readFile(join(process.cwd(), 'public/hero-stockpile.jpg'));
  const src = `data:image/jpeg;base64,${photo.toString('base64')}`;

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', fontFamily: 'sans-serif' }}>
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img src={src} width={1200} height={630} style={{ position: 'absolute', top: 0, left: 0, width: 1200, height: 630, objectFit: 'cover' }} />
        <div
          style={{
            position: 'absolute', top: 0, left: 0, width: 1200, height: 630, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: '64px 72px',
            background: 'linear-gradient(90deg, rgba(0,31,64,0.94) 0%, rgba(0,51,102,0.82) 55%, rgba(0,51,102,0.35) 100%)',
            color: 'white',
          }}
        >
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 4, color: '#e2c97e', fontWeight: 700 }}>SUMANTH MINERALS</div>
          <div style={{ display: 'flex', fontSize: 66, fontWeight: 800, lineHeight: 1.05, marginTop: 18, maxWidth: 900 }}>
            Quartz lumps &amp; grit, direct from our mine
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 34, fontSize: 28 }}>
            <div style={{ display: 'flex', background: '#b5401c', padding: '10px 22px', borderRadius: 8, fontWeight: 700 }}>99.27% SiO₂ lab-tested</div>
            <div style={{ display: 'flex', border: '2px solid rgba(255,255,255,0.6)', padding: '8px 22px', borderRadius: 8 }}>Andhra Pradesh, India</div>
          </div>
          <div style={{ display: 'flex', height: 8, marginTop: 40, width: 360, background: 'linear-gradient(90deg, #b5401c, #c8a84b, #1f6ac2)', borderRadius: 4 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
