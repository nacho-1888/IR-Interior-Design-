import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  // Transition Range: 0 to 600px for a much slower, weighted feel
  const range = [0, 600];

  // Bubble appearance logic
  const bubbleScale = useTransform(scrollY, [0, 300], [1.1, 1]);
  const bubbleOpacity = useTransform(scrollY, [50, 250], [0, 1]);
  const bubblePadding = useTransform(scrollY, [0, 600], ["2rem 4rem", "0.75rem 2.5rem"]);
  const navMargin = useTransform(scrollY, [0, 600], ["2rem", "1rem"]);
  const navOpacity = useTransform(scrollY, [100, 400], [0.4, 1]);

  // Scaling/Positioning for the logo inside the bubble
  const logoScale = useTransform(scrollY, range, [1, 0.32]); 
  const logoY = useTransform(scrollY, range, [40, 0]); 

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
        <motion.div 
          style={{ 
            opacity: bubbleOpacity,
            scale: bubbleScale,
            padding: bubblePadding,
            marginTop: navMargin,
            width: "calc(100% - 4rem)"
          }}
          className="flex justify-between items-center text-white liquid-glass pointer-events-auto max-w-[1400px]"
        >
          {/* Left Side: Logo (No all-caps, Helvetica) */}
          <div className="flex items-center">
            <motion.div
              style={{ 
                scale: logoScale,
                y: logoY,
                transformOrigin: "top left"
              }}
              className="z-50"
            >
              <Link to="/" className="text-6xl md:text-[8rem] lg:text-[10rem] font-medium leading-[0.85] font-sans tracking-tight block ml-[-4px] md:ml-[-8px]">
                Isabel Romer
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Links (Contact Me only, Helvetica) */}
          <div className="flex items-center gap-8 lg:gap-12 pl-12">
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
        </motion.div>
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
