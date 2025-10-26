import { useNavigate } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.landing}>
      {/* Hero Section with Wave */}
      <section className={styles.hero}>
        <div className={styles.heroWave}></div>
        <div className={styles.heroCircle}></div>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>TicketFlow</h1>
            <p className={styles.heroDescription}>
              Streamline your support ticket management with our powerful and
              intuitive platform
            </p>
            <div className={styles.heroActions}>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/auth/login")}
              >
                Get Started
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/auth/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Why Choose TicketFlow?</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚀</div>
              <h3>Fast & Efficient</h3>
              <p>Manage tickets quickly with our streamlined interface</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔒</div>
              <h3>Secure</h3>
              <p>Your data is protected with enterprise-grade security</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3>Responsive</h3>
              <p>Works perfectly on desktop, tablet, and mobile devices</p>
            </div>
          </div>
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

export default Landing;
