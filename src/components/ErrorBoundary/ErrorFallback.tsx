import { FallbackProps } from 'react-error-boundary';
import styles from './ErrorFallback.module.scss';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className={styles.errorContainer}>
      <h2>Что-то пошло не так:</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Попробовать снова</button>
    </div>
  );
};

export default ErrorFallback; 