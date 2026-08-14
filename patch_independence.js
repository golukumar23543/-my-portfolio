import fs from 'fs';

const content = `import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function IndependenceDay() {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoisting, setIsHoisting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setIsHoisting(true);

    const timer = setTimeout(() => {
      setIsHoisting(false);
    }, 7000);

    const duration = 7 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      const tricolor = ['#FF9933', '#FFFFFF', '#138808'];
      
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: tricolor,
        zIndex: 300
      });
      
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: tricolor,
        zIndex: 300
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    setTimeout(frame, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <AnimatePresence>
        {isHoisting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-[200] flex items-end justify-center pb-12 sm:pb-20 bg-black/90 backdrop-blur-md overflow-hidden"
          >
            <div className="w-2 sm:w-3 h-[70vh] bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 rounded-t-full relative shadow-2xl">
              <div className="absolute -bottom-4 -left-8 sm:-left-10 w-16 sm:w-24 h-8 sm:h-10 bg-gradient-to-b from-gray-600 to-gray-800 rounded-t-xl z-20 shadow-lg border-t border-white/10"></div>
              <div className="absolute -bottom-8 -left-12 sm:-left-16 w-24 sm:w-36 h-6 sm:h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-t-lg z-10 shadow-xl border-t border-white/5"></div>
              
              <motion.div
                initial={{ y: '60vh' }}
                animate={{ y: 0 }}
                transition={{ duration: 5, ease: "easeOut" }}
                className="absolute left-full top-2 ml-1 w-48 sm:w-72 h-32 sm:h-48 flex flex-col shadow-2xl origin-left"
              >
                <div className="flex-1 bg-[#FF9933] shadow-inner"></div>
                <div className="flex-1 bg-white flex items-center justify-center relative shadow-inner">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-[1.5px] sm:border-2 border-[#000080] flex items-center justify-center relative"
                  >
                     {Array.from({ length: 12 }).map((_, i) => (
                       <div key={i} className="w-full h-[1px] bg-[#000080] absolute" style={{ transform: \`rotate(\${i * 15}deg)\` }}></div>
                     ))}
                  </motion.div>
                </div>
                <div className="flex-1 bg-[#138808] shadow-inner"></div>
              </motion.div>
            </div>
            
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 2, duration: 1 }}
               className="absolute top-[15%] sm:top-1/4 text-center px-4 w-full"
            >
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-white to-[#138808] drop-shadow-2xl mb-4 sm:mb-6">Happy Independence Day</h1>
              <p className="text-white text-lg sm:text-2xl font-medium drop-shadow-md">Jai Hind! 🇮🇳</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isHoisting && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowModal(true);
              confetti({
                particleCount: 40,
                spread: 70,
                origin: { y: 0.8 },
                colors: ['#FF9933', '#FFFFFF', '#138808'],
                zIndex: 300
              });
            }}
            className="fixed bottom-24 left-4 sm:left-6 z-50 flex items-center gap-3 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] p-[2px] rounded-full shadow-2xl"
          >
            <div className="bg-primary-dark/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 hover:bg-primary-dark/70 transition-colors">
              <span className="text-xl">🇮🇳</span>
              <span className="text-white font-bold text-sm hidden sm:block">15 August</span>
              <Info size={16} className="text-white/70" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-secondary-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="h-2 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
              
              <div className="p-6 sm:p-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Happy Independence Day!</h2>
                <h3 className="text-accent-blue font-medium mb-6">15 August</h3>
                
                <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base">
                  <p>
                    On August 15, 1947, India awoke to life and freedom, breaking the chains of British rule after a long, arduous struggle.
                  </p>
                  <p>
                    This day is a tribute to the countless brave souls who sacrificed their lives so we could breathe in a free nation. Let us honor their memory by working towards a brighter, more united, and prosperous India.
                  </p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="font-semibold text-white/90 italic">
                      "Freedom is never dear at any price. It is the breath of life. What would a man not pay for living?"
                    </p>
                    <p className="text-right text-accent-blue mt-2">— Mahatma Gandhi</p>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                   <button 
                     onClick={() => setShowModal(false)}
                     className="px-8 py-2.5 bg-gradient-to-r from-[#FF9933] via-white/80 to-[#138808] text-primary-dark font-bold rounded-xl shadow-lg hover:opacity-90 transition-opacity"
                   >
                     Jai Hind 🇮🇳
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
`;

fs.writeFileSync('src/components/IndependenceDay.tsx', content);
