import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ onContactOpen }: { onContactOpen?: () => void }) {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);

  // Hide the navbar when scrolling down, show when scrolling up with a threshold
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    if (latest > previous + 30 && latest > 300) {
      setIsHidden(true);
    } else if (previous - latest > 60) {
      setIsHidden(false);
    } else if (latest < 50) {
      setIsHidden(false);
    }
  });

  return (
    <>
      <motion.nav 
        animate={{ y: isHidden ? "-150%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 pointer-events-none p-6 md:p-10 lg:p-12"
      >
        <div className="flex items-center justify-start pointer-events-auto">
          <Link 
            to="/" 
            className="group flex flex-col items-start"
          >
            {/* The Logo: Scale 0.22 relative to the original 10rem branding approach */}
            <span className="text-2xl md:text-3xl lg:text-4xl branding-font font-bold uppercase tracking-tight text-white transition-opacity hover:opacity-70">
              Isabel Römer
            </span>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.8em] font-medium text-white/40 mt-1">
              Interior Design
            </span>
          </Link>
        </div>
      </motion.nav>

    </>
  );
}
