
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface PhotoCardProps {
  src: string;
  caption?: string;
  rotation?: number;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ src, caption, rotation = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, rotate: rotation }}
      whileInView={{ opacity: 1, scale: 1, rotate: rotation }}
      viewport={{ once: true, margin: "0px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative z-30 group w-full max-w-[min(90vw,500px)]"
    >
      {/* Wholesome Decorations (Desktop Only or Subtle) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute -inset-8 pointer-events-none hidden md:block"
          >
            <motion.div 
              animate={{ scale: [1, 1.4, 1], y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute -top-6 -left-6 text-red-500"
            >
              <Heart size={44} fill="currentColor" />
            </motion.div>
            <motion.div 
              animate={{ opacity: [0, 1, 0], scale: [0.8, 1.4, 0.8] }} 
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="absolute -bottom-6 -right-6 text-[#D4AF37]"
            >
              <Sparkles size={44} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Polaroid Frame - Made responsive */}
      <div className="bg-[#FFFCF9] p-4 pb-12 md:p-8 md:pb-20 rounded-[4px] shadow-[0_30px_80px_rgba(0,0,0,0.1)] border border-[#EBE3D5] photo-glow transition-all duration-500">
        <div className="relative overflow-hidden w-full aspect-[3/4] bg-white rounded-[2px] shadow-inner">
          <img 
            src={src} 
            alt="Christmas Memory" 
            className="w-full h-full object-cover block"
            loading="eager"
            onError={(e) => {
              // Detailed logging if image fails to load
              console.error("Image load failed for source:", src);
            }}
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
        </div>
        
        {caption && (
          <div className="pt-6 md:pt-10 text-center">
            <p className="font-handwriting text-3xl md:text-5xl text-[#4A453E] tracking-tight leading-none px-2">
              {caption}
            </p>
          </div>
        )}
      </div>

      {/* Decorative Tape */}
      <div className="absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 w-24 md:w-36 h-10 md:h-14 bg-white/70 backdrop-blur-md border border-white/40 rotate-[2deg] shadow-sm z-40 flex items-center justify-center">
        <div className="w-12 md:w-20 h-px bg-[#D4AF37]/20" />
      </div>
    </motion.div>
  );
};

export default PhotoCard;
