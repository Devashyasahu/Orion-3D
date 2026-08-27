import React from 'react';

interface FlipWordProps {
  text: string;
  accentColor?: string;
  className?: string;
  altClassName?: string;
  syncOnGroup?: boolean;
}

export const FlipWord: React.FC<FlipWordProps> = ({
  text,
  accentColor = '#7dd3fc',
  className = '',
  altClassName = '',
  syncOnGroup = false,
}) => {
  const letters = text.split('');

  return (
    <span
      className={`word-flip ${syncOnGroup ? 'word-flip-sync' : ''} ${className}`}
      style={{ '--flip-accent': accentColor } as React.CSSProperties}
      data-text={text}
      aria-label={text}
    >
      <span className="word-flip-face word-flip-front" aria-hidden="true">
        {text}
      </span>
      <span className={`word-flip-face word-flip-back ${altClassName}`} aria-hidden="true">
        {letters.map((letter, index) => (
          <span key={`${letter}-${index}`} style={{ '--letter-index': index } as React.CSSProperties}>
            {letter === ' ' ? '\u00a0' : letter}
          </span>
        ))}
      </span>
    </span>
  );
};
