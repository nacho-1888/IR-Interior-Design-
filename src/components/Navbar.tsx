import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  // Transition Range: 0 to 600px for a much slower, weighted feel
  const range = [0, 600];

  // Background and thinness transitions
  const headerBg = useTransform(scrollY, range, ["rgba(255,255,255,0)", "rgba(255,255,255,0.05)"]);
  const headerBlur = useTransform(scrollY, range, ["blur(0px)", "blur(50px)"]);
  const navPadding = useTransform(scrollY, range, ["3rem 2rem", "0.75rem 2rem"]);
  
  // Scaling and Position: Start at Left (Hero size), transit to readable header size
  const logoScale = useTransform(scrollY, range, [1, 0.35]); 
  const logoY = useTransform(scrollY, range, [0, 0]); 
  
  // Navigation Links Opacity
  const navOpacity = useTransform(scrollY, [100, 400], [0.4, 1]);

  return (
    <>
      <motion.nav 
        style={{ 
          backgroundColor: headerBg, 
          backdropFilter: headerBlur,
          padding: navPadding 
        }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center text-white border-b border-white/0 transition-all duration-700 liquid-glass"
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
        <div className="flex items-center gap-8 lg:gap-12 pl-12 pr-4">
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
