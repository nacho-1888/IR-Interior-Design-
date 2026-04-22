import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
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

  // Keep the original transition range
  const range = [0, 600];

  // Branding Transforms
  // Slightly larger end scale (0.32) for better legibility in sticky mode
  const logoScale = useTransform(scrollY, range, [0.95, 0.32]); 
  const logoY = useTransform(scrollY, [0, 500], ["15vh", "6vh"]); // Lowered further from 2vh to 6vh
  const logoX = useTransform(scrollY, [300, 600], ["0vw", "2vw"]); 
  
  // Subtitle should fade out COMPLETELY to 0 when scrolling
  const subtitleOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <>
      <motion.nav 
        animate={{ y: isHidden ? "-150%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 pointer-events-none p-6 md:p-10 lg:p-12 font-sans"
      >
        <div className="relative pointer-events-auto flex flex-col items-start justify-center h-24">
          
          {/* THE LOGO - Dynamically scaling and moving to the top-left */}
          <motion.div
            style={{ 
              scale: logoScale,
              y: logoY,
              x: logoX,
              transformOrigin: "left top"
            }}
            className="flex items-center relative z-10"
          >
            <Link 
              to="/" 
              className="text-6xl md:text-[6rem] lg:text-[10rem] branding-font font-black leading-[0.95] md:leading-none tracking-tight block whitespace-nowrap text-left uppercase text-white"
            >
              Isabel <br className="md:hidden" />
              <span className="md:inline-block md:mt-0" style={{ display: 'inline-block', marginTop: '4px' }}>Römer</span>
            </Link>
          </motion.div>

          {/* THE SUBTITLE - Tucked carefully below without overlap */}
          <motion.span 
            style={{ 
              opacity: subtitleOpacity,
              y: useTransform(scrollY, [0, 500], ["28vh", "10vh"]), // Pushed to 28vh for mobile to avoid overlap
              x: logoX,
            }}
            className="absolute top-0 left-0 text-[8px] md:text-sm lg:text-base uppercase tracking-[0.6em] md:tracking-[1.1em] font-black text-white/50 ml-2 md:ml-4 whitespace-nowrap z-0"
          >
            Interior Design
          </motion.span>

        </div>
      </motion.nav>
    </>
  );
}
