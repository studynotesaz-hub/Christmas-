
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

const WishLantern: React.FC = () => {
  const [wish, setWish] = useState('');
  const [released, setReleased] = useState(false);

  const release = () => {
    if (!wish.trim()) return;
    setReleased(true);
    setTimeout(() => {
      setReleased(false);
      setWish('');
    }, 6000);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 text-center">
      <h3 className="font-serif text-3xl md:text-5xl italic text-[#7A746E] mb-8">The Wish Lantern</h3>
      <p className="text-[#7A746E] mb-12 opacity-80 italic">Type a secret wish for 2026 and release it to the stars...</p>
      
      <div className="relative group">
        <textarea
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          disabled={released}
          placeholder="I wish for..."
          className="w-full h-40 p-8 rounded-[30px] bg-white border border-[#EBE3D5] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none transition-all font-handwriting text-2xl md:text-3xl text-[#4A453E] resize-none shadow-sm disabled:opacity-50"
        />
        
        <button
          onClick={release}
          disabled={!wish.trim() || released}
          className="absolute bottom-4 right-4 p-4 bg-[#D4AF37] text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-0 disabled:scale-0"
        >
          <Send size={24} />
        </button>
      </div>

      <AnimatePresence>
        {released && (
          <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
            <motion.div
              initial={{ y: '80vh', x: '50vw', scale: 1, opacity: 1 }}
              animate={{ 
                y: '-20vh', 
                x: ['50vw', '45vw', '55vw', '50vw'],
                scale: [1, 0.5],
                opacity: [1, 1, 0.8, 0]
              }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="absolute -translate-x-1/2 flex flex-col items-center"
            >
              <div className="w-20 h-28 bg-[#D4AF37] rounded-t-full rounded-b-lg shadow-[0_0_50px_rgba(212,175,55,0.8)] relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/50 to-transparent rounded-t-full" />
                <div className="w-6 h-6 bg-orange-400 rounded-full blur-md animate-pulse" />
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 font-handwriting text-xl text-[#D4AF37] drop-shadow-md whitespace-nowrap"
              >
                Wish Released
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WishLantern;
