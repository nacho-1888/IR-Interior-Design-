import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after 30 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000); 
    
    // For local testing convenience, you can lower this to 5 seconds by uncommenting below:
    // const timer = setTimeout(() => setIsOpen(true), 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-luxury-black/40 backdrop-blur-sm"
        >
          {/* Glassy Modal Container */}
          <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden flex flex-col font-sans"
          >
            {/* Top Section (Form) */}
            <div className="relative p-8 md:p-12 pb-8 flex flex-col justify-end min-h-[160px]">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-white hover:opacity-70 transition-opacity"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
              
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mt-8">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full border-b border-white pb-2 bg-transparent outline-none text-white placeholder:text-white/60 text-lg md:text-xl font-light"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="flex-shrink-0 font-bold uppercase tracking-[0.2em] text-white hover:text-white/70 transition-colors"
                >
                  SUBSCRIBE
                </button>
              </div>
            </div>

            {/* Bottom Section (Image & Hero Text) */}
            <div className="relative h-[400px] w-full mt-4">
              <img 
                src="https://images.unsplash.com/photo-1618220179428-2b79f10f6f66?q=80&w=1200&auto=format&fit=crop" 
                alt="Luxury Interior" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-6xl md:text-7xl font-serif text-white tracking-wide mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  STAY UPDATED
                </h2>
                <p className="text-white/90 text-sm md:text-lg max-w-md font-light leading-relaxed">
                  Receive first access to exclusive designs, inspiration and the latest news.
                </p>
              </div>
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
