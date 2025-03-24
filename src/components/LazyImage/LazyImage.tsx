import React, { lazy, Suspense } from 'react';
import styles from './LazyImage.module.scss';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

const createImageComponent = (imageSrc: string) =>
  new Promise<{ default: React.ComponentType<LazyImageProps> }>((resolve) => {
    const img = new window.Image();
    img.src = imageSrc;
    img.onload = () => {
      resolve({
        default: ({ src, alt, className }: LazyImageProps) => (
          <img 
            src={src} 
            alt={alt} 
            className={className}
            loading="lazy"
            decoding="async"
          />
        ),
      });
    };
  });

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className }) => {
  const Image = lazy(() => createImageComponent(src));

  return (
    <Suspense 
      fallback={
        <div className={`${styles.placeholder} ${className}`} />
      }
    >
      <Image src={src} alt={alt} className={className} />
    </Suspense>
  );
};

export default LazyImage; 