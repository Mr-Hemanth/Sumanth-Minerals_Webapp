'use client';
import { useState } from 'react';
import { MapPin, Map } from 'lucide-react';
import styles from './MapEmbed.module.css';

const EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5228.136085202641!2d77.72241779895305!3d15.027798327013643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1777921676226!5m2!1sen!2sin';
const OPEN_URL = 'https://www.google.com/maps/search/?api=1&query=15.027798,77.722418';

// Google Maps pulls ~460 KB of script. Load it only when the visitor asks for it;
// until then show a lightweight placeholder with a direct "open in Maps" link.
export default function MapEmbed() {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <iframe
        title="Sumanth Minerals mine location on Google Maps"
        src={EMBED_SRC}
        className={styles.frame}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className={styles.placeholder}>
      <MapPin size={34} aria-hidden="true" />
      <p className={styles.title}>Our mine at Lakshupalli, Peddavaduguru</p>
      <p className={styles.sub}>Andhra Pradesh – 515405</p>
      <div className={styles.actions}>
        <button type="button" className="btn btn-primary" onClick={() => setShow(true)}>
          <Map size={18} /> Show map
        </button>
        <a href={OPEN_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
