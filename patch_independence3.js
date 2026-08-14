import fs from 'fs';

const content = `import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function IndependenceDay() {
  const [showModal, setShowModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const tricolor = ['#FF9933', '#FFFFFF', '#138808'];

    const duration = 7 * 1000;
    const end = Date.now() + duration;

    // Side fireworks (Patake) over the website
    const sideInterval = setInterval(() => {
      // Left side burst
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.9 },
        colors: tricolor,
        startVelocity: 65,
        gravity: 1.1,
        zIndex: 300,
        ticks: 200
      });
      // Right side burst
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.9 },
        colors: tricolor,
        startVelocity: 65,
        gravity: 1.1,
        zIndex: 300,
        ticks: 200
      });
    }, 800);

    // Random fireworks across the screen
    const randomFireworks = () => {
      confetti({
        particleCount: 40,
        spread: 120,
        origin: { 
          x: Math.random() * 0.8 + 0.1, 
          y: Math.random() * 0.5 + 0.1 
        },
        colors: tricolor,
        startVelocity: 40,
        gravity: 0.8,
        zIndex: 100,
        ticks: 300
      });

      if (Date.now() < end) {
        setTimeout(randomFireworks, 400 + Math.random() * 300);
      } else {
        clearInterval(sideInterval);
      }
    };
    
    randomFireworks();

    return () => {
      clearInterval(sideInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <AnimatePresence>
        <motion.button
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setShowModal(true);
            confetti({
              particleCount: 50,
              spread: 80,
              origin: { y: 0.8 },
              colors: ['#FF9933', '#FFFFFF', '#138808'],
              zIndex: 300,
              startVelocity: 40
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
