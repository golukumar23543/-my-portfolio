import fs from 'fs';

const content = fs.readFileSync('src/components/IndependenceDay.tsx', 'utf-8');

const newModal = `{showModal && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            
            {/* Glowing Backdrop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute w-[300px] h-[300px] bg-gradient-to-br from-[#FF9933]/30 via-white/10 to-[#138808]/30 rounded-full blur-[80px] pointer-events-none"
            />

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", damping: 20, stiffness: 300 }
              }}
              exit={{ 
                scale: 0.8, 
                opacity: 0, 
                y: 40,
                transition: { duration: 0.2 }
              }}
              className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="h-3 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />
              
              <div className="p-6 sm:p-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                    className="w-12 h-12 rounded-full border-[2.5px] border-[#000080] flex shrink-0 items-center justify-center relative shadow-inner"
                  >
                     <div className="w-1.5 h-1.5 rounded-full bg-[#000080] absolute z-10"></div>
                     {Array.from({ length: 24 }).map((_, i) => (
                       <div key={i} className="w-full h-[1px] bg-[#000080]/60 absolute" style={{ transform: \`rotate(\${i * 7.5}deg)\` }}></div>
                     ))}
                  </motion.div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] via-white to-[#138808]">
                      78th Independence Day
                    </h2>
                    <h3 className="text-white/60 font-medium text-sm mt-1">15 August 1947</h3>
                  </div>
                </div>
                
                <div className="space-y-4 text-gray-300 leading-relaxed text-sm sm:text-base bg-white/5 p-5 rounded-2xl border border-white/5 shadow-inner">
                  <p>
                    On August 15, 1947, India awoke to life and freedom, breaking the chains of British rule after a long, arduous struggle.
                  </p>
                  <p>
                    This day is a tribute to the countless brave souls who sacrificed their lives so we could breathe in a free nation. Let us honor their memory by working towards a brighter, more united India.
                  </p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="font-semibold text-white/90 italic">
                      "Freedom is never dear at any price. It is the breath of life. What would a man not pay for living?"
                    </p>
                    <p className="text-right text-[#FF9933] mt-2 text-sm font-medium">— Mahatma Gandhi</p>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-center">
                   <motion.button 
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={() => setShowModal(false)}
                     className="px-10 py-3 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] text-[#0f172a] font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all uppercase tracking-wider"
                   >
                     Jai Hind 🇮🇳
                   </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}`;

const regex = /{showModal && \([\s\S]*?\)\s*}\s*<\/AnimatePresence>/;

const replaced = content.replace(regex, newModal + '\n      </AnimatePresence>');
fs.writeFileSync('src/components/IndependenceDay.tsx', replaced);
