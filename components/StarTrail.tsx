
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StarTrail: React.FC = () => {
  const [trail, setTrail] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newStar = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setTrail((prev) => [...prev.slice(-15), newStar]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[90]">
      <AnimatePresence>
        {trail.map((star) => (
          <motion.div
            key={star.id}
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute text-[#D4AF37]/40 text-[10px]"
            style={{ left: star.x, top: star.y }}
          >
            ★
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default StarTrail;
