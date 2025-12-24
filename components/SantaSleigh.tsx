
import React from 'react';
import { motion } from 'framer-motion';

const SantaSleigh: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none">
      <motion.div
        initial={{ x: '-150%', y: 20, rotate: -5, opacity: 0 }}
        animate={{ 
          x: '250%', 
          y: [-20, 20, -20],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "linear",
          y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
        }}
        className="text-6xl md:text-8xl filter grayscale opacity-60 flex items-center gap-2"
      >
        <span style={{ filter: 'brightness(0.2)' }}>🛷</span>
        <span style={{ filter: 'brightness(0.2)', fontSize: '0.6em' }}>🦌🦌🦌</span>
      </motion.div>
    </div>
  );
};

export default SantaSleigh;
