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
    
    const tricolor = ['#FF9933', '#FFFFFF', '#138808'];

    // 1. Side fireworks (Patake) during hoisting
    const sideInterval = setInterval(() => {
      // Left side burst
      confetti({
        particleCount: 25,
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
        particleCount: 25,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.9 },
        colors: tricolor,
        startVelocity: 65,
        gravity: 1.1,
        zIndex: 300,
        ticks: 200
      });
    }, 700);

    // 2. Stop hoisting and start website fireworks
    const timer = setTimeout(() => {
      setIsHoisting(false);
      clearInterval(sideInterval);

      // Website fireworks (random bursts after hoisting)
      const duration = 6 * 1000;
      const end = Date.now() + duration;

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
        }
      };
      
      randomFireworks();
      
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearInterval(sideInterval);
    };
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
            
            {/* Realistic Base Pedestal */}
            <div className="absolute bottom-12 sm:bottom-20 flex flex-col items-center z-10 drop-shadow-2xl">
               <div className="w-16 sm:w-20 h-4 sm:h-5 bg-gradient-to-b from-gray-400 to-gray-600 rounded-t-md shadow-xl border-t border-b border-white/30 border-b-black/50"></div>
               <div className="w-24 sm:w-32 h-5 sm:h-6 bg-gradient-to-b from-gray-500 to-gray-700 rounded-t-md shadow-xl border-t border-b border-white/20 border-b-black/50"></div>
               <div className="w-32 sm:w-48 h-6 sm:h-10 bg-gradient-to-b from-gray-600 to-gray-900 rounded-t-md shadow-xl border-t border-white/20"></div>
            </div>

            {/* Realistic Metal Pole */}
            <div className="w-3 sm:w-4 h-[75vh] bg-gradient-to-r from-gray-900 via-gray-300 to-gray-700 relative shadow-[5px_0_15px_rgba(0,0,0,0.5)] z-20 rounded-t-full">
              
              {/* Finial (Golden Ball at top) */}
              <div className="absolute -top-8 -left-[10px] sm:-left-[14px] w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-yellow-100 via-yellow-500 to-yellow-800 shadow-[0_0_25px_rgba(250,204,21,0.7)] border-[1.5px] border-yellow-300 z-30">
                 <div className="absolute top-1 left-2 w-3 h-3 bg-white/50 rounded-full blur-[2px]"></div>
              </div>
              
              {/* Rope Details */}
              <div className="absolute top-0 bottom-0 left-[-3px] w-[2px] bg-white/40 shadow-sm mix-blend-overlay"></div>
              <div className="absolute top-0 bottom-0 right-[-3px] w-[2px] bg-black/40 shadow-sm mix-blend-overlay"></div>
              
              {/* Realistic Flag Fabric */}
              <motion.div
                initial={{ y: '65vh' }}
                animate={{ y: 20 }}
                transition={{ duration: 5, ease: "easeOut" }}
                className="absolute left-[100%] top-0 ml-[2px] w-[240px] h-[160px] sm:w-[360px] sm:h-[240px] flex flex-col shadow-2xl origin-left z-30 perspective-[1000px]"
                style={{ filter: 'drop-shadow(15px 25px 20px rgba(0,0,0,0.5))' }}
              >
                {/* Wavy fabric wrapper with 3D transforms */}
                <motion.div
                  animate={{ 
                    rotateY: [-5, 15, -5],
                    rotateX: [0, 4, 0],
                    skewY: [-4, 4, -4]
                  }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-full h-full flex flex-col relative rounded-r-lg overflow-hidden border-y border-r border-white/10"
                >
                  {/* Fabric shadow overlays to simulate folds */}
                  <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-r from-black/5 via-black/20 to-white/10 mix-blend-overlay"></div>
                  <div className="absolute inset-0 z-40 pointer-events-none bg-gradient-to-b from-white/20 via-transparent to-black/40"></div>
                  <div className="absolute inset-0 z-40 pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(0,0,0,0.2) 20%, rgba(255,255,255,0.2) 40%, rgba(0,0,0,0.2) 60%, rgba(255,255,255,0.2) 80%, rgba(0,0,0,0.2) 100%)', backgroundSize: '200% 100%', opacity: 0.4 }}></div>
                  
                  {/* Saffron */}
                  <div className="flex-1 bg-[#FF9933] relative"></div>
                  {/* White & Chakra */}
                  <div className="flex-1 bg-[#FFFFFF] flex items-center justify-center relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-[2px] sm:border-[2.5px] border-[#000080] flex items-center justify-center relative z-30 shadow-inner"
                    >
                       <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#000080] absolute z-10"></div>
                       {Array.from({ length: 12 }).map((_, i) => (
                         <div key={i} className="w-full h-[1.5px] bg-[#000080] absolute" style={{ transform: \`rotate(\${i * 15}deg)\` }}></div>
                       ))}
                    </motion.div>
                  </div>
                  {/* Green */}
                  <div className="flex-1 bg-[#138808] relative"></div>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Title Text */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 2, duration: 1 }}
               className="absolute top-[12%] sm:top-[20%] text-center px-4 w-full z-50 pointer-events-none"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-white to-[#138808] mb-4 sm:mb-6 tracking-tight drop-shadow-[0_4px_10px_rgba(0,0,0,1)]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
                Happy Independence Day
              </h1>
              <p className="text-white text-2xl sm:text-4xl font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Jai Hind! 🇮🇳</p>
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
