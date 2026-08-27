import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-cyan-200 via-fuchsia-300 to-amber-200 shadow-[0_0_22px_rgba(125,211,252,0.65)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};
