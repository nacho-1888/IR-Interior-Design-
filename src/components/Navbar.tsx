import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center text-white glass-panel transition-all duration-500 ${scrolled ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="flex gap-8 text-xs font-semibold tracking-widest uppercase items-center hidden md:flex opacity-80">
          <Link to="#about" className="hover:opacity-100 transition-opacity">About Me</Link>
          <Link to="#portfolio" className="hover:opacity-100 transition-opacity">Portfolio</Link>
        </div>

        <Link to="/" className="text-3xl font-bold tracking-tight uppercase display-font mx-auto md:mx-0">
          Isabel Romer
        </Link>

        <div className="flex gap-8 text-xs font-semibold tracking-widest uppercase items-center hidden md:flex opacity-80">
          <Link to="#contact" className="hover:opacity-100 transition-opacity">Contact Me</Link>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 focus:outline-none md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

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
