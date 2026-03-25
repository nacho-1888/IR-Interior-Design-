import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-white">
      <Link to="/" className="text-2xl font-light tracking-[0.2em] uppercase serif">
        Isabel Romer
      </Link>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 focus:outline-none"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Full screen menu */}
      <motion.div 
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : "100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 bg-luxury-black text-luxury-paper flex flex-col items-center justify-center space-y-8 z-40"
      >
        <Link to="/" onClick={() => setIsOpen(false)} className="text-5xl serif hover:italic transition-all">Home</Link>
        <Link to="/about" onClick={() => setIsOpen(false)} className="text-5xl serif hover:italic transition-all">About</Link>
        <Link to="/contact" onClick={() => setIsOpen(false)} className="text-5xl serif hover:italic transition-all">Contact</Link>
        
        <div className="absolute bottom-12 text-center space-y-2">
          <p className="text-xs tracking-widest uppercase opacity-50">Madrid, Spain</p>
          <p className="text-xs tracking-widest uppercase opacity-50">isabel@romer.com</p>
        </div>
      </motion.div>
    </nav>
  );
}
