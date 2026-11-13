import { MessageCircle } from 'lucide-react';
import styles from './WhatsAppButton.module.css';
import { PHONE_PRIMARY, PHONE_SECONDARY, whatsappUrl } from '@/data/contact';

const WhatsAppButton = () => {
  const message = 'Hello Sumanth Minerals, I am interested in your Quartz products.';
  const url = whatsappUrl(message);

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.button}>
      <MessageCircle size={30} />
      <span className={styles.tooltip}>Chat with us</span>
    </a>
  );
};

export default WhatsAppButton;
