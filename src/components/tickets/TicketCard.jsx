import styles from './TicketCard.module.css';

const TicketCard = ({ ticket, onEdit, onDelete }) => {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.titleSection}>
          <h3 className={styles.title}>{ticket.title}</h3>
          <span className={styles.priority}>
            {getPriorityIcon(ticket.priority)} {ticket.priority}
          </span>
        </div>
        <span className={`${styles.status} ${styles[ticket.status]}`}>
          {ticket.status.replace('_', ' ')}
        </span>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.description}>
          {ticket.description || 'No description provided'}
        </p>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.dates}>
          <span className={styles.date}>
            Created: {formatDate(ticket.createdAt)}
          </span>
          {ticket.updatedAt !== ticket.createdAt && (
            <span className={styles.date}>
              Updated: {formatDate(ticket.updatedAt)}
            </span>
          )}
        </div>
        
        <div className={styles.actions}>
          <button 
            className={styles.editButton}
            onClick={() => onEdit(ticket)}
            title="Edit ticket"
          >
            ✏️
          </button>
          <button 
            className={styles.deleteButton}
            onClick={() => onDelete(ticket.id)}
            title="Delete ticket"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;