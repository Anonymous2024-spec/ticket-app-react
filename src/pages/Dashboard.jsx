import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTickets } from '../hooks/useTickets';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { tickets, loading } = useTickets();
  const navigate = useNavigate();

  // Calculate statistics
  const totalTickets = tickets.length;
  const openTickets = tickets.filter(ticket => ticket.status === 'open').length;
  const inProgressTickets = tickets.filter(ticket => ticket.status === 'in_progress').length;
  const closedTickets = tickets.filter(ticket => ticket.status === 'closed').length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div>
              <h1 className={styles.title}>Dashboard</h1>
              <p className={styles.welcome}>Welcome back, {user?.name}!</p>
            </div>
            <div className={styles.headerActions}>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/tickets')}
              >
                Manage Tickets
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Ticket Overview</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statTotal}`}>
                📊
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>{totalTickets}</h3>
                <p className={styles.statLabel}>Total Tickets</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statOpen}`}>
                🔓
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>{openTickets}</h3>
                <p className={styles.statLabel}>Open Tickets</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statProgress}`}>
                ⚡
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>{inProgressTickets}</h3>
                <p className={styles.statLabel}>In Progress</p>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.statClosed}`}>
                ✅
              </div>
              <div className={styles.statContent}>
                <h3 className={styles.statNumber}>{closedTickets}</h3>
                <p className={styles.statLabel}>Resolved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Tickets Section */}
      <section className={styles.recentSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Recent Tickets</h2>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/tickets')}
            >
              View All Tickets
            </button>
          </div>
          
          {tickets.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🎫</div>
              <h3>No tickets yet</h3>
              <p>Create your first ticket to get started</p>
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/tickets')}
              >
                Create Ticket
              </button>
            </div>
          ) : (
            <div className={styles.ticketsList}>
              {tickets.slice(0, 5).map(ticket => (
                <div key={ticket.id} className={styles.ticketItem}>
                  <div className={styles.ticketMain}>
                    <h4 className={styles.ticketTitle}>{ticket.title}</h4>
                    <p className={styles.ticketDescription}>
                      {ticket.description || 'No description provided'}
                    </p>
                  </div>
                  <div className={styles.ticketMeta}>
                    <span className={`${styles.statusTag} ${styles[ticket.status]}`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <span className={styles.ticketDate}>
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; 2024 TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;