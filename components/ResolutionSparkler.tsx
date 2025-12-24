
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2 } from 'lucide-react';

const resolutions = [
  "Be kinder to myself.",
  "Learn a new skill that excites me.",
  "Take more sunset walks.",
  "Finally finish that one project.",
  "Travel to a place I've never seen.",
  "Spend more time offline.",
  "Read 12 books that inspire me.",
  "Start every morning with gratitude."
];

const ResolutionSparkler: React.FC = () => {
  const [res, setRes] = useState<string | null>(null);

  const generate = () => {
    setRes(resolutions[Math.floor(Math.random() * resolutions.length)]);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generate}
        className="flex items-center gap-3 px-8 py-3 bg-white border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-white transition-all font-serif italic text-lg shadow-sm"
      >
        <Wand2 size={20} />
        Spark a 2026 Resolution
      </motion.button>

      <div className="h-12 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {res && (
            <motion.div
              key={res}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="text-2xl md:text-3xl text-[#4A453E] font-handwriting"
            >
              {res}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResolutionSparkler;
