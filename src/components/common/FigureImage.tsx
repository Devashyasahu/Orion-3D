import { useState } from 'react';

interface FigureImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  width?: number;
  height?: number;
}

export function FigureImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width = 900,
  height = 1200,
}: FigureImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`figure-image-fallback ${className}`} role="img" aria-label={alt}>
        <span>IMAGE PREVIEW</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
