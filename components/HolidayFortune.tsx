
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fortunes = [
  "You will find joy in the smallest moments this winter.",
  "A surprise gift of kindness is coming your way.",
  "2026 will be your year of growth and laughter.",
  "The stars are aligning for your biggest dream.",
  "A cozy evening with someone special is near.",
  "Success follows your brave heart into the new year.",
  "You'll make a memory this week that lasts a lifetime.",
  "Peace will find its way to your home this season."
];

const HolidayFortune: React.FC = () => {
  const [fortune, setFortune] = useState<string | null>(null);
  const [shaking, setShaking] = useState(false);

  const getFortune = () => {
    setShaking(true);
    setFortune(null);
    setTimeout(() => {
      setShaking(false);
      setFortune(fortunes[Math.floor(Math.random() * fortunes.length)]);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={shaking ? { 
          x: [-10, 10, -10, 10, 0],
          rotate: [-5, 5, -5, 5, 0]
        } : {}}
        transition={{ duration: 0.1, repeat: shaking ? 8 : 0 }}
        onClick={getFortune}
        className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-white via-[#FDFBF7] to-[#D4AF37]/20 rounded-full shadow-[0_20px_50px_rgba(212,175,55,0.3)] border-2 border-[#D4AF37]/30 flex items-center justify-center cursor-pointer relative group overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_0%,_transparent_70%)] opacity-50" />
        <span className="text-5xl md:text-6xl z-10 select-none group-hover:scale-110 transition-transform">🔮</span>
        <div className="absolute bottom-2 w-full text-center text-[10px] font-bold tracking-tighter opacity-20 uppercase">Shake Me</div>
      </motion.div>

      <div className="h-20 mt-8">
        <AnimatePresence mode="wait">
          {fortune && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl md:text-2xl font-serif italic text-[#A63D40] max-w-xs md:max-w-md px-4"
            >
              "{fortune}"
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HolidayFortune;
