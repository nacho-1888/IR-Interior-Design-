import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  // Background opacity for the header
  const headerBg = useTransform(scrollY, [0, 200], ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]);
  const headerBlur = useTransform(scrollY, [0, 200], ["blur(0px)", "blur(20px)"]);
  
  // Font size and position scaling
  // At scroll 0: huge (Hero style)
  // At scroll 200: small (Header style)
  const logoScale = useTransform(scrollY, [0, 200], [1, 0.2]); // Scaling down
  const logoY = useTransform(scrollY, [0, 200], [40, 0]); // Moving from lower hero position to header top
  const logoX = useTransform(scrollY, [0, 200], [0, 0]); // Keep centered or move if needed
  
  const navPadding = useTransform(scrollY, [0, 200], ["2rem 2rem", "1rem 2rem"]);
  const navOpacity = useTransform(scrollY, [0, 200], [0.5, 1]); // Links always visible faintly

  return (
    <>
      <motion.nav 
        style={{ 
          backgroundColor: headerBg, 
          backdropFilter: headerBlur,
          padding: navPadding 
        }}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center text-white"
      >
        <motion.div 
          style={{ opacity: navOpacity }}
          className="flex gap-8 text-[10px] font-semibold tracking-widest uppercase items-center hidden md:flex"
        >
          <Link to="#about" className="hover:opacity-100 transition-opacity">About Me</Link>
          <Link to="#portfolio" className="hover:opacity-100 transition-opacity">Portfolio</Link>
        </motion.div>

        <motion.div
           style={{ 
             scale: logoScale,
             y: logoY,
             transformOrigin: "center center"
           }}
           className="z-50"
        >
          <Link to="/" className="text-6xl md:text-[8rem] lg:text-[10rem] font-normal leading-none display-font tracking-tight uppercase whitespace-nowrap block">
            Isabel Romer
          </Link>
        </motion.div>

        <div className="flex items-center gap-8">
          <motion.div 
            style={{ opacity: navOpacity }}
            className="flex gap-8 text-[10px] font-semibold tracking-widest uppercase items-center hidden md:flex"
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
        <Link to="#about" onClick={() => setIsOpen(false)} className="text-4xl display-font font-bold uppercase transition-all hover:tracking-widest">About Me</Link>
        <Link to="#portfolio" onClick={() => setIsOpen(false)} className="text-4xl display-font font-bold uppercase transition-all hover:tracking-widest">Portfolio</Link>
        <Link to="#contact" onClick={() => setIsOpen(false)} className="text-4xl display-font font-bold uppercase transition-all hover:tracking-widest">Contact Me</Link>
        
        <div className="absolute bottom-12 text-center space-y-2">
          <p className="text-xs tracking-widest uppercase opacity-50">Madrid, Spain</p>
          <p className="text-xs tracking-widest uppercase opacity-50">isabel@romer.com</p>
        </div>
      </motion.div>
    </>
  );
}
