
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiProps {
  active: boolean;
}

const Confetti: React.FC<ConfettiProps> = ({ active }) => {
  const particles = Array.from({ length: 40 });

  return (
    <AnimatePresence>
      {active && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {particles.map((_, i) => {
            const size = Math.random() * 15 + 10;
            const x = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const duration = Math.random() * 2 + 2;
            const color = Math.random() > 0.5 ? '#D4AF37' : '#A63D40';
            const shape = Math.random() > 0.5 ? '★' : '❤';

            return (
              <motion.div
                key={i}
                initial={{ 
                  y: -20, 
                  x: `${x}%`, 
                  opacity: 1,
                  rotate: 0,
                  scale: 0
                }}
                animate={{ 
                  y: '110vh', 
                  opacity: [1, 1, 0],
                  rotate: 720,
                  scale: [0, 1, 0.5]
                }}
                transition={{ 
                  duration, 
                  delay,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                className="absolute"
                style={{ 
                  fontSize: size, 
                  color,
                  textShadow: '0 0 5px rgba(255,255,255,0.5)'
                }}
              >
                {shape}
              </motion.div>
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};

export default Confetti;
