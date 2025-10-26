import { useEffect } from 'react';
import styles from './Toast.module.css';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      <div className={styles.content}>
        <span className={styles.message}>{message}</span>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;