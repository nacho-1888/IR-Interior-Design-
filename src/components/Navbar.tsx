import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  // Transition Range: 0 to 600px for a much slower, weighted feel
  const range = [0, 600];

  // Static Bubble appearance logic: appears later and spans proportionally
  const bubbleScale = useTransform(scrollY, [300, 600], [0.98, 1]);
  const bubbleOpacity = useTransform(scrollY, [300, 450], [0, 1]);
  const bubbleWidth = useTransform(scrollY, range, ["100%", "94%"]);
  
  // Navigation Links Opacity
  const navOpacity = useTransform(scrollY, [100, 400], [0.5, 1]);

  // Scaling/Positioning for the logo (Always visible and anchored left)
  const logoScale = useTransform(scrollY, range, [0.85, 0.40]); 
  const logoY = useTransform(scrollY, [0, 300], [0, 0]); 
  const logoX = useTransform(scrollY, range, [0, 0]);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex flex-col items-center pointer-events-none pt-12 md:pt-16 lg:pt-20 px-3 md:px-6">
        <motion.div 
          style={{ 
            width: bubbleWidth,
            scale: bubbleScale,
            transformOrigin: "left center" 
          }}
          className="relative pointer-events-auto transition-all duration-700 h-18 md:h-20 lg:h-24 flex items-center justify-start"
        >
          {/* THE BUBBLE BACKGROUND - Static long capsule anchored left */}
          <motion.div 
            style={{ 
              opacity: bubbleOpacity,
            }}
            className="absolute inset-0 z-0 liquid-glass rounded-full border border-white/5"
          />

          {/* THE CONTENT - Branding Left, Contact Right */}
          <div className="relative z-10 w-full flex items-center justify-between px-8 md:px-12 flex-nowrap overflow-visible">
            {/* BRANDING */}
            <motion.div
              style={{ 
                scale: logoScale,
                transformOrigin: "left center"
              }}
              className="flex items-center"
            >
              <Link 
                to="/" 
                className="text-6xl md:text-[8rem] lg:text-[10rem] font-medium leading-none font-sans tracking-tight block whitespace-nowrap uppercase text-white ml-[-4px] md:ml-[-8px]"
              >
                Isabel Romer
              </Link>
            </motion.div>

            {/* CONTACT BUTTON - Fades in with the bubble */}
            <motion.div
              style={{ opacity: bubbleOpacity }}
              className="flex items-center"
            >
              <a 
                href="#contact" 
                className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-white/90 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-500 whitespace-nowrap ml-4"
              >
                Contact
              </a>
            </motion.div>
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
