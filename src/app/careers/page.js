import { Briefcase, MapPin, Clock } from 'lucide-react';
import styles from './careers.module.css';

export const metadata = {
  title: 'Careers | Join Sumanth Minerals Team',
  description: 'Explore career opportunities at Sumanth Minerals in mining, engineering, and logistics in Andhra Pradesh.',
};

const jobs = [
  {
    title: 'Senior Mining Engineer',
    location: 'Tadipatri Mine Site',
    type: 'Full-Time',
    dept: 'Operations'
  },
  {
    title: 'Quality Control Lab Technician',
    location: 'Lakshupalli Office',
    type: 'Full-Time',
    dept: 'Quality Assurance'
  },
  {
    title: 'Logistics Coordinator',
    location: 'Anantapur HQ',
    type: 'Full-Time',
    dept: 'Export Logistics'
  }
];

export default function Careers() {
  return (
    <div className={styles.careersPage}>
      <section className={styles.pageHeader}>
        <div className="container">
          <h1>Grow with us</h1>
          <p>Join a team that’s redefining industrial mineral supply in India.</p>
        </div>
      </section>

      <section className={styles.whyJoin}>
        <div className="container">
          <div className={styles.introBox}>
            <h2>Why Sumanth Minerals?</h2>
            <p>We provide a safe, innovative, and growth-oriented work environment. At Sumanth, you’re not just an employee; you’re a key player in the global industrial supply chain.</p>
          </div>
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <h3>Safety First</h3>
              <p>Uncompromising focus on site safety and worker health protocols.</p>
            </div>
            <div className={styles.benefit}>
              <h3>Global Exposure</h3>
              <p>Work with international clients and learn about global trade standards.</p>
            </div>
            <div className={styles.benefit}>
              <h3>Community Growth</h3>
              <p>Be part of a company that actively invests in its local region.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.openings}>
        <div className="container">
          <div className="section-title">
            <h2>Current Openings</h2>
            <p>Find your next challenge at our mining or corporate sites.</p>
          </div>
          <div className={styles.jobList}>
            {jobs.map((job, idx) => (
              <div key={idx} className={styles.jobCard}>
                <div className={styles.jobMain}>
                  <h3>{job.title}</h3>
                  <div className={styles.jobMeta}>
                    <span><MapPin size={16} /> {job.location}</span>
                    <span><Clock size={16} /> {job.type}</span>
                    <span><Briefcase size={16} /> {job.dept}</span>
                  </div>
                </div>
                <a
                  className="btn btn-primary"
                  href={`mailto:sales@sumanthminerals.com?subject=${encodeURIComponent(`Job application: ${job.title}`)}`}
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cv}>
        <div className="container">
          <div className={styles.cvBox}>
            <h3>Don’t see a matching role?</h3>
            <p>Send your CV to <strong>hr@sumanthminerals.com</strong> and we’ll contact you when a suitable position opens.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
