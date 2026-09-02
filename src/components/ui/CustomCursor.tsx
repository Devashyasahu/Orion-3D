import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../../context/CursorContext';

export const CustomCursor: React.FC = () => {
  const { cursorText, cursorVariant } = useCursor();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch desktop screens
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible || cursorVariant === 'hidden') return null;

  const isImageHover = cursorVariant === 'image' || Boolean(cursorText);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 hidden lg:block"
      animate={{
        x: mousePosition.x - (isImageHover ? 10 : 4),
        y: mousePosition.y - (isImageHover ? 10 : 4),
        scale: 1,
      }}
      transition={{
        type: 'spring',
        damping: 34,
        stiffness: 720,
        mass: 0.18,
      }}
    >
      {isImageHover ? (
        <div className="flex items-center gap-2">
          <span className="block h-5 w-5 rounded-full border border-white/70 bg-white/20 shadow-[0_0_14px_rgba(255,255,255,0.28)]" />
          <span className="translate-y-4 text-[8px] font-space tracking-[0.18em] font-semibold uppercase text-white/90 bg-black/55 backdrop-blur-sm px-1.5 py-0.5">
            {cursorText || 'EXPLORE'}
          </span>
        </div>
      ) : (
        <div className="w-2 h-2 rounded-full bg-white/90 shadow-[0_0_10px_rgba(255,255,255,0.65)]" />
      )}
    </motion.div>
  );
};
