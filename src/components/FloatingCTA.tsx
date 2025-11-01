import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, X } from 'lucide-react';

interface FloatingCTAProps {
  onBookClick: () => void;
}

const FloatingCTA = ({ onBookClick }: FloatingCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 200);
      
      if (scrollY > 100) {
        setShowScrollPrompt(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
          <AnimatePresence>
            {isVisible && (
              <div className="perspective-3d fixed bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto max-w-sm md:max-w-none" style={{ perspective: '1000px' }}>
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.button
                    onClick={onBookClick}
                    whileHover={typeof window !== 'undefined' && window.innerWidth > 768 ? {
                      scale: 1.1,
                      rotateY: 5,
                      rotateX: 5,
                      boxShadow: "0 25px 50px rgba(217, 119, 68, 0.5)",
                      transition: { type: "spring", stiffness: 300 }
                    } : { scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 10px 30px rgba(217, 119, 68, 0.3)",
                        "0 20px 40px rgba(217, 119, 68, 0.5)",
                        "0 10px 30px rgba(217, 119, 68, 0.3)"
                      ]
                    }}
                    transition={{
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                    className="w-full bg-gradient-to-r from-primary-600 via-primary-500 to-story-600 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-lg md:rounded-xl shadow-2xl hover:shadow-primary-600/30 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-sm sm:text-base md:text-lg lg:text-xl active:scale-95 min-h-[52px] md:min-h-[60px] touch-manipulation border border-primary-500/20 magnetic gradient-animate"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Ticket className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 flex-shrink-0" />
                  </motion.div>
                  <span className="whitespace-nowrap">Book Your Ticket Now</span>
                </motion.button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

      {/* Scroll Prompt - disappears after scrolling */}
      {showScrollPrompt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm"
          >
            Scroll to explore
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default FloatingCTA;
