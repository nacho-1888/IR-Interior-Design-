import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  // Transition Range: 0 to 600px for a much slower, weighted feel
  const range = [0, 600];

  // Bubble appearance logic (ONLY for the background)
  const bubbleScale = useTransform(scrollY, [0, 600], [0.95, 1]);
  const bubbleOpacity = useTransform(scrollY, [50, 250], [0, 1]);
  const bubbleWidth = useTransform(scrollY, [0, 600], ["100%", "95%"]);
  
  // Navigation Links Opacity
  const navOpacity = useTransform(scrollY, [100, 400], [0.5, 1]);

  // Scaling/Positioning for the logo (Always visible)
  const logoScale = useTransform(scrollY, range, [1, 0.3]); 
  const logoY = useTransform(scrollY, range, [0, 0]); 
  const logoX = useTransform(scrollY, range, [0, 0]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-col items-center pointer-events-none p-4 md:p-8">
        <div className="relative w-full max-w-[1400px] flex items-center justify-between pointer-events-auto min-h-[80px]">
          
          {/* THE BUBBLE BACKGROUND - Separate layer so it can fade in independently */}
          <motion.div 
            style={{ 
              opacity: bubbleOpacity,
              scale: bubbleScale,
              width: bubbleWidth,
            }}
            className="absolute inset-0 z-0 liquid-glass rounded-full"
          />

          {/* THE CONTENT - Always visible, scales into the bubble */}
          <div className="relative z-10 w-full flex justify-between items-center px-12 py-6">
            {/* Left Side: Logo (One line, Helvetica) */}
            <div className="flex items-center">
              <motion.div
                style={{ 
                  scale: logoScale,
                  y: logoY,
                  transformOrigin: "top left"
                }}
                className="z-50"
              >
                <Link 
                  to="/" 
                  className="text-6xl md:text-[8rem] lg:text-[10rem] font-medium leading-none font-sans tracking-tight block whitespace-nowrap ml-[-4px] md:ml-[-8px] text-white"
                >
                  Isabel Romer
                </Link>
              </motion.div>
            </div>

            {/* Right Side: Links (Contact Me only, Helvetica) */}
            <div className="flex items-center gap-8 lg:gap-12 lg:pr-4">
              <motion.div 
                style={{ opacity: navOpacity }}
                className="flex gap-8 text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase items-center hidden md:flex font-sans"
              >
                <Link to="#contact" className="hover:opacity-100 transition-opacity">Contact Me</Link>
              </motion.div>

              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 focus:outline-none md:hidden"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full screen menu for mobile */}
      <motion.div 
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-luxury-black/95 backdrop-blur-xl text-luxury-paper flex flex-col items-center justify-center space-y-8 z-40"
      >
        <Link to="/" onClick={() => setIsOpen(false)} className="text-4xl display-font font-bold uppercase transition-all hover:tracking-widest">Home</Link>
        <Link to="#contact" onClick={() => setIsOpen(false)} className="text-4xl display-font font-bold uppercase transition-all hover:tracking-widest">Contact Me</Link>
        
        <div className="absolute bottom-12 text-center space-y-2">
          <p className="text-xs tracking-widest uppercase opacity-50">Madrid, Spain</p>
          <p className="text-xs tracking-widest uppercase opacity-50">isabel@romer.com</p>
        </div>
      </motion.div>
    </>
  );
}
