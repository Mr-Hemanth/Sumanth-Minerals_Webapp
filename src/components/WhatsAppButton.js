import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppButton.module.css';

const WhatsAppButton = () => {
  const phoneNumber = '919876543210'; // Replace with actual number
  const message = 'Hello Kanaka Minerals, I am interested in your Quartz products.';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.button}>
      <MessageCircle size={30} />
      <span className={styles.tooltip}>Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;
