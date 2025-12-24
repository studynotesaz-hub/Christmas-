
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Volume2, VolumeX, Gift, Music, Moon, Sparkles as SparklesIcon, Wand2 } from 'lucide-react';
import Snowfall from './components/Snowfall';
import Section from './components/Section';
import Confetti from './components/Confetti';
import SantaSleigh from './components/SantaSleigh';
import NewYearBloom from './components/NewYearBloom';
import HolidayFortune from './components/HolidayFortune';
import ResolutionSparkler from './components/ResolutionSparkler';

const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hugs, setHugs] = useState<{id: number, x: number, delay: number}[]>([]);

  const playJingle = useCallback(() => {
    if (isMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      
      const playNote = (freq: number, startTime: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };

      const now = ctx.currentTime;
      const tempo = 0.35;
      
      const melody = [659.25, 659.25, 659.25, 659.25, 659.25, 659.25, 659.25, 783.99, 523.25, 587.33, 659.25];
      const timings = [0, 1, 2, 3.5, 4.5, 5.5, 7, 8, 9, 10, 11];
      
      melody.forEach((freq, i) => {
        playNote(freq, now + timings[i] * tempo, tempo * 0.9);
      });
      
    } catch (e) { console.debug("Audio blocked"); }
  }, [isMuted]);

  const handleOpen = () => {
    playJingle();
    setIsOpened(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 6000);
  };

  const triggerHug = () => {
    if (!isMuted) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
    
    // Generate multiple hearts across the whole width
    const newHugs = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 94 + 3, // Spread across screen width
      delay: i * 0.15
    }));

    setHugs(prev => [...prev, ...newHugs]);
    setTimeout(() => setHugs(prev => prev.filter(h => !newHugs.find(nh => nh.id === h.id))), 4000);
  };

  return (
    <div className="relative min-h-screen text-[#4A453E] selection:bg-[#D4AF37]/30 bg-[#FDFBF7] overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7] via-white to-[#F2E8DA]" />
        <Snowfall />
      </div>

      <Confetti active={showConfetti} />

      {/* Heart Burst across full screen */}
      <div className="fixed inset-0 pointer-events-none z-[60] w-screen h-screen overflow-hidden">
        <AnimatePresence>
          {hugs.map(hug => (
            <motion.div
              key={hug.id}
              initial={{ opacity: 0, y: '100vh', scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                y: '-20vh', 
                scale: [1, 2.8, 1.8],
                x: `${hug.x}vw` 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 4, ease: "easeOut", delay: hug.delay }}
              className="absolute text-red-400/80 drop-shadow-md"
              style={{ left: 0 }}
            >
              <Heart fill="currentColor" size={52} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="p-4 rounded-full glass hover:bg-white transition-all text-[#4A453E] shadow-xl border border-white"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.section
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
            className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-6"
          >
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="mb-8 cursor-pointer"
              onClick={handleOpen}
            >
              <Star className="w-24 h-24 text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.8)]" fill="currentColor" />
            </motion.div>

            <div className="space-y-6 max-w-2xl mb-12">
              <h1 className="text-4xl md:text-7xl font-serif italic text-[#7A746E] leading-tight">
                A Winter Journey
              </h1>
              <p className="text-lg md:text-2xl font-light text-[#A63D40] tracking-[0.4em] uppercase">
                To 2026 and Beyond
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="px-12 py-6 md:px-20 md:py-8 bg-white shadow-2xl border-2 border-[#EBE3D5] rounded-full text-[#4A453E] font-bold tracking-[0.2em] uppercase transition-all flex items-center gap-6 text-xl"
            >
              <Gift size={32} className="text-[#A63D40]" />
              Step Into the Magic
            </motion.button>
          </motion.section>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-20"
          >
            {/* Christmas Note */}
            <Section className="max-w-4xl mx-auto pt-24 pb-16 px-6">
              <div className="bg-[#FFFCF9] p-8 md:p-24 rounded-[40px] md:rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.06)] border border-white/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-[#D4AF37]/5 rounded-bl-[100%] pointer-events-none" />
                <div className="relative z-10 font-handwriting text-3xl md:text-5xl leading-[1.8] text-[#4A453E] space-y-8 md:space-y-12 text-center">
                  <p>In the quiet of winter, we find the things that truly matter.</p>
                  <p>Warmth isn't just a fire in the hearth; it's the kindness we share and the laughter of those we hold dear.</p>
                  <p>May your home be filled with peace, your heart with joy, and your spirit with the magic that only this season brings.</p>
                  <div className="pt-16">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      className="text-[#A63D40] text-6xl md:text-8xl mb-4 drop-shadow-sm"
                    >
                      Merry Christmas 🎄
                    </motion.div>
                    <p className="text-xl md:text-2xl opacity-50 font-serif italic">A simple wish, sent with love</p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Fun Interaction: Holiday Fortune */}
            <Section className="py-24 text-center px-6">
              <h3 className="font-serif text-3xl text-[#7A746E] mb-12 italic">Shake the Magic Snowball</h3>
              <HolidayFortune />
            </Section>

            {/* Santa's Journey Segment */}
            <Section className="py-32 relative overflow-hidden">
              <div className="max-w-5xl mx-auto px-6 text-center">
                <div className="relative inline-block mb-12">
                   <Moon className="w-48 h-48 md:w-64 md:h-64 text-[#D4AF37]/10 fill-current" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <SantaSleigh />
                   </div>
                </div>
                <h3 className="font-serif text-3xl md:text-5xl italic text-[#7A746E]">The magic is in the air...</h3>
                <p className="mt-6 text-[#A63D40] font-light tracking-widest uppercase text-sm md:text-base">Watching the stars for a midnight flight</p>
              </div>
            </Section>

            {/* New Year 2026 Segment */}
            <Section className="py-32 bg-white/30 backdrop-blur-sm border-y border-[#EBE3D5]/40">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <NewYearBloom />
                <h3 className="text-4xl md:text-6xl font-serif text-[#4A453E] mb-8">Looking Toward 2026</h3>
                <div className="space-y-6 text-lg md:text-2xl font-light leading-relaxed text-[#7A746E] max-w-2xl mx-auto">
                  <p>As the year draws to a close, let's look forward with hope.</p>
                  <p>May 2026 be a canvas for your dreams, a year of soft landings and bold new starts.</p>
                  <p>May it bring you more of what makes you feel alive.</p>
                </div>
                
                <div className="mt-16">
                  <ResolutionSparkler />
                </div>

                <div className="mt-20 flex justify-center gap-4">
                   <SparklesIcon className="text-[#D4AF37] animate-pulse" size={24} />
                   <span className="font-serif italic text-2xl text-[#D4AF37]">A Bright 2026 Awaits</span>
                   <SparklesIcon className="text-[#D4AF37] animate-pulse" size={24} />
                </div>
              </div>
            </Section>

            {/* Send a Hug Interaction */}
            <Section className="py-24 text-center">
               <div className="mb-10 flex justify-center gap-8 text-5xl md:text-7xl">
                 <motion.span animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 2 }}>🎁</motion.span>
                 <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3 }}>🎅</motion.span>
                 <motion.span animate={{ rotate: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 4 }}>🎆</motion.span>
               </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerHug}
                className="px-10 py-5 bg-[#A63D40] text-white rounded-full font-bold shadow-2xl hover:shadow-[#A63D40]/40 transition-all flex items-center gap-4 mx-auto text-lg md:text-2xl"
              >
                <Heart fill="currentColor" size={24} />
                <span>Send a Magical Hug!</span>
              </motion.button>
              <p className="mt-6 text-lg italic text-[#7A746E] opacity-70">Tap to fill the sky with love</p>
            </Section>

            <footer className="py-24 flex flex-col items-center gap-6 text-[#7A746E]">
              <div className="text-4xl">❄️</div>
              <p className="text-lg md:text-2xl font-serif italic opacity-70 px-6 text-center leading-relaxed max-w-2xl">
                May your Christmas be as bright as your smile.
              </p>
              <div className="text-center mt-10">
                <p className="text-[10px] tracking-[1.5em] uppercase opacity-40">Happy New Year 2026</p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
