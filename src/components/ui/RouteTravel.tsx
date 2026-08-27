import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const accentForPath = (pathname: string) => {
  if (pathname.includes('anime')) return '#f59e0b';
  if (pathname.includes('dc')) return '#38bdf8';
  if (pathname.includes('mcu')) return '#ef4444';
  if (pathname.includes('harry-potter')) return '#fbbf24';
  if (pathname.includes('cartoon') || pathname.includes('tom')) return '#34d399';
  if (pathname.includes('custom')) return '#f0abfc';
  return '#7dd3fc';
};

export const RouteTravel: React.FC = () => {
  const location = useLocation();
  const accent = accentForPath(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="route-travel"
        style={{ '--travel-accent': accent } as React.CSSProperties}
        initial={{ opacity: 0, scaleX: 0.1 }}
        animate={{ opacity: [0, 0.9, 0], scaleX: [0.1, 1, 1.14] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div />
      </motion.div>
    </AnimatePresence>
  );
};
