import { useState, useEffect, lazy } from 'react';
import styles from './LazyImage.module.scss';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const LazyImage = ({ src, alt, className }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoaded(true);
      setHasError(false);
    };
    
    img.onerror = () => {
      setHasError(true);
      setIsLoaded(false);
    };
  }, [src]);

  if (hasError) {
    return (
      <div className={`${styles.errorPlaceholder} ${className || ''}`}>
        <span>Error while loading image</span>
      </div>
    );
  }

  return (
    <div className={`${styles.imageContainer} ${className || ''}`}>
      {!isLoaded && <div className={styles.skeleton} />}
      <img
        src={src}
        alt={alt}
        className={`${styles.image} ${isLoaded ? styles.loaded : ''}`}
      />
    </div>
  );
};

export default lazy(() => Promise.resolve({ default: LazyImage })); 