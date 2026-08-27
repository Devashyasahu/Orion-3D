import React from 'react';
import { motion } from 'framer-motion';

interface OrionLoaderProps {
  active: boolean;
}

export const OrionLoader: React.FC<OrionLoaderProps> = ({ active }) => {
  if (!active) return null;

  return (
    <motion.div
      className="orion-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Loading Orion 3D"
    >
      <div className="orion-loader__stage">
        <div className="orion-loader__mark">
          <span>ORION</span>
          <small>3D</small>
        </div>
        <div className="orion-loader__print">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <p>DIGITAL WORLD MATERIALIZING</p>
      </div>
    </motion.div>
  );
};
