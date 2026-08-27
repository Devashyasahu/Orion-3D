import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCursor } from '../../context/CursorContext';
import { FlipWord } from './FlipWord';

interface ImageHoverRevealProps {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  category?: string;
  targetUrl: string;
  aspectRatio?: string;
  accentColor?: string;
  badge?: string;
  cursorLabel?: string;
  className?: string;
}

export const ImageHoverReveal: React.FC<ImageHoverRevealProps> = ({
  src,
  alt,
  title,
  subtitle,
  category,
  targetUrl,
  aspectRatio = 'aspect-[3/4]',
  accentColor = '#00f2fe',
  badge,
  cursorLabel = 'EXPLORE',
  className = '',
}) => {
  const navigate = useNavigate();
  const { setCursor, resetCursor } = useCursor();

  const handleClick = () => {
    resetCursor();
    navigate(targetUrl);
  };

  return (
    <motion.div
      onClick={handleClick}
      onMouseEnter={() => setCursor(cursorLabel, 'image')}
      onMouseLeave={resetCursor}
      initial={{ opacity: 0, y: 38, clipPath: 'polygon(12% 8%, 88% 0, 100% 84%, 4% 100%)' }}
      whileInView={{ opacity: 1, y: 0, clipPath: 'polygon(0 0, 100% 4%, 94% 100%, 5% 94%)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group portal-3d relative overflow-hidden bg-transparent cursor-pointer ${aspectRatio} ${className}`}
    >
      <div className="portal-3d__depth" />
      <div className="portal-3d__strata" />
      <div className="portal-3d__rift" style={{ background: `linear-gradient(115deg, transparent, ${accentColor}55, transparent)` }} />
      {/* Background Image with Zoom & Sharpness shift */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105 transition-all duration-700 ease-out group-hover:scale-[1.055] group-hover:brightness-110 group-hover:contrast-115"
          loading="lazy"
        />
      </div>

      {/* Dark Gradient Overlay for Atmospheric Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#040406]/86 via-[#040406]/18 to-transparent opacity-72 transition-opacity duration-500 group-hover:opacity-58" />

      {/* Dynamic Glow aura on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 60%, ${accentColor}25 0%, transparent 70%)`,
        }}
      />

      {/* Light Sweep Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-20deg] pointer-events-none" />

      {/* Subtle Glowing Border Highlight on Hover */}
      {/* Metadata & Editorial Typography */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
        {/* Top Metadata / Category / Badge */}
        <div className="flex items-center justify-between">
          {category && (
            <span className="text-[10px] md:text-xs font-space font-semibold tracking-[0.25em] text-white/60 uppercase">
              {category}
            </span>
          )}
          {badge && (
            <span className="text-[9px] font-space tracking-widest px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/20 backdrop-blur-md uppercase">
              {badge}
            </span>
          )}
        </div>

        {/* Bottom Content Reveal */}
        <div>
          {subtitle && (
            <span
              className="block text-[11px] font-space tracking-[0.2em] font-medium uppercase mb-1 transition-all duration-300 transform group-hover:-translate-y-1"
              style={{ color: accentColor }}
            >
              {subtitle}
            </span>
          )}

          <h3 className="text-2xl md:text-4xl font-syne font-semibold tracking-normal text-white transition-all duration-300 transform group-hover:-translate-y-1 group-hover:text-cyan-200">
            <FlipWord text={title} accentColor={accentColor} syncOnGroup />
          </h3>

          {/* Minimal Text Action Link instead of button */}
          <div className="mt-4 flex items-center space-x-2 text-xs font-space tracking-[0.2em] text-white/70 opacity-80 group-hover:opacity-100 group-hover:text-cyan-300 transition-all duration-300">
            <span>DISCOVER</span>
            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">-&gt;</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
