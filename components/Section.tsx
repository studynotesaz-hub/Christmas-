
import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ children, className = "" }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ 
        duration: 1.2, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default Section;
