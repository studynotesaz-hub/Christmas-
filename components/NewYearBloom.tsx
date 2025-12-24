
import React from 'react';
import { motion } from 'framer-motion';

const NewYearBloom: React.FC = () => {
  const particles = Array.from({ length: 14 });

  return (
    <div className="relative h-40 flex items-center justify-center mb-10">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        className="relative"
      >
        {particles.map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: Math.cos(i * (Math.PI * 2 / particles.length)) * 120,
              y: Math.sin(i * (Math.PI * 2 / particles.length)) * 120,
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 0.12,
              ease: "easeOut"
            }}
            className="absolute w-2 h-2 bg-[#D4AF37] rounded-full blur-[1px]"
          />
        ))}
        <motion.div
           animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.8, 0.4] }}
           transition={{ duration: 2.5, repeat: Infinity }}
           className="flex items-center justify-center"
        >
          <div className="w-6 h-6 bg-[#D4AF37] rounded-full blur-lg absolute" />
          <span className="relative z-10 font-serif text-3xl font-bold text-[#D4AF37]">2026</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NewYearBloom;
