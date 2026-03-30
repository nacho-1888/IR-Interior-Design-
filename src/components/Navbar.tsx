import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Hide the navbar when scrolling down, show when scrolling up with a threshold
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    if (latest > previous + 30 && latest > 300) {
      // Scrolling down past the hero with a 30px threshold - Hide
      setIsHidden(true);
    } else if (previous - latest > 60) {
      // Scrolling up with a snappy 60px threshold - Show
      setIsHidden(false);
    } else if (latest < 50) {
      // Near top - Always show
      setIsHidden(false);
    }
  });

  // Transition Range: 0 to 600px for a much slower, weighted feel
  const range = [0, 600];

  // Static Bubble appearance logic: appears later and spans proportionally
  const bubbleScale = useTransform(scrollY, [300, 600], [0.98, 1]);
  const bubbleOpacity = useTransform(scrollY, [300, 450], [0, 1]);
  const bubbleWidth = useTransform(scrollY, range, ["100%", "94%"]);
  
  // Navigation Links Opacity
  const navOpacity = useTransform(scrollY, [100, 400], [0.5, 1]);

  // Scaling/Positioning for the logo (Always visible and anchored left)
  const logoScale = useTransform(scrollY, range, [0.9, 0.40]); 
  const logoY = useTransform(scrollY, [0, 400], ["15vh", "0vh"]); 
  const logoX = useTransform(scrollY, range, ["0vw", "0vw"]);

  return (
    <>
      <motion.nav 
        animate={{ y: isHidden ? "-150%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 flex flex-col items-center pointer-events-none pt-6 md:pt-10 lg:pt-12 px-3 md:px-6"
      >
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

          {/* THE CONTENT - Flex for branding, Absolute for contact avoids layout overflow */}
          <div className="relative z-10 w-full h-full flex items-center pl-4 md:pl-6 flex-nowrap overflow-visible">
            {/* BRANDING */}
            <motion.div
              style={{ 
                scale: logoScale,
                y: logoY,
                x: logoX,
                transformOrigin: "left center"
              }}
              className="flex flex-col items-start"
            >
              <Link 
                to="/" 
                className="text-6xl md:text-[8rem] lg:text-[10rem] branding-font font-bold leading-none tracking-tight block whitespace-nowrap uppercase text-white"
              >
                Isabel Römer
              </Link>
              <span className="text-[10px] md:text-sm uppercase tracking-[0.8em] font-medium text-white/40 ml-1 md:ml-3 mt-2 md:mt-4">
                Interior Design
              </span>
            </motion.div>

            {/* CONTACT BUTTON - Absolute right positioning ignores the unscaled text width */}
            <motion.div
              style={{ opacity: bubbleOpacity }}
              className="absolute right-8 md:right-16 lg:right-24 flex items-center"
            >
              <a 
                href="#contact" 
                className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] text-white/90 px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-500 whitespace-nowrap"
              >
                Contact
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>

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
