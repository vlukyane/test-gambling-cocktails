import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Oops! Page not found</p>
        <p className={styles.description}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className={styles.link}>
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 