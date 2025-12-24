
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const jokes = [
  { q: "What do you call an elusive reindeer?", a: "A " + "rein-disappear!" },
  { q: "What do you call an old snowman?", a: "Water!" },
  { q: "Why did Santa's helper see the doctor?", a: "Because he had a low " + "elf-esteem!" },
  { q: "What do snowmen eat for breakfast?", a: "Snowflakes!" },
  { q: "What do you get when you cross a snowman and a vampire?", a: "Frostbite!" }
];

const ChristmasCracker: React.FC = () => {
  const [isPopped, setIsPopped] = useState(false);
  const [currentJoke, setCurrentJoke] = useState(jokes[0]);

  const pop = () => {
    if (isPopped) {
        setIsPopped(false);
        setTimeout(() => {
            setCurrentJoke(jokes[Math.floor(Math.random() * jokes.length)]);
        }, 300);
    } else {
        setIsPopped(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative flex items-center justify-center h-24 w-64 md:w-80 cursor-pointer" onClick={pop}>
        <motion.div
          animate={isPopped ? { x: -60, rotate: -15, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
          className="absolute left-0 w-1/2 h-full bg-[#A63D40] rounded-l-full border-r-2 border-white/20 flex items-center justify-start pl-4"
        >
          <div className="w-8 h-8 rounded-full border-2 border-white/30" />
        </motion.div>
        
        <motion.div
          animate={isPopped ? { x: 60, rotate: 15, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
          className="absolute right-0 w-1/2 h-full bg-[#A63D40] rounded-r-full border-l-2 border-white/20 flex items-center justify-end pr-4"
        >
          <div className="w-8 h-8 rounded-full border-2 border-white/30" />
        </motion.div>

        {!isPopped && (
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="z-10 bg-white px-4 py-1 rounded-full text-[10px] uppercase tracking-widest text-[#A63D40] font-bold shadow-sm"
          >
            Pull Me
          </motion.div>
        )}
      </div>

      <div className="h-32 flex flex-col items-center justify-center">
        <AnimatePresence>
          {isPopped && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-2"
            >
              <p className="text-[#A63D40] font-bold text-lg">{currentJoke.q}</p>
              <p className="text-[#4A453E] italic text-xl font-handwriting">{currentJoke.a}</p>
              <button 
                onClick={(e) => { e.stopPropagation(); pop(); }}
                className="mt-4 text-[10px] uppercase tracking-widest text-[#7A746E] hover:text-[#A63D40] transition-colors"
              >
                Reset Cracker
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChristmasCracker;
