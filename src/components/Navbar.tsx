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
  // Reduced end scale from 0.40 to 0.22 for a more elegant name in the sticky mode
  const logoScale = useTransform(scrollY, range, [0.9, 0.22]); 
  const logoY = useTransform(scrollY, [0, 400], ["15vh", "0vh"]); 
  const logoX = useTransform(scrollY, [300, 600], ["0vw", "4vw"]); 
  
  // Subtitle should fade out slightly but NOT shrink
  const subtitleOpacity = useTransform(scrollY, [0, 150], [1, 0.4]);

  return (
    <>
      <motion.nav 
        animate={{ y: isHidden ? "-150%" : "0%" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 w-full z-50 pointer-events-none p-6 md:p-10 lg:p-12"
      >
        <div className="relative pointer-events-auto flex items-center justify-start h-24">
          
          {/* THE LOGO - Dynamically scaling and moving */}
          <motion.div
            style={{ 
              scale: logoScale,
              y: logoY,
              x: logoX,
              transformOrigin: "left center"
            }}
            className="flex items-center relative z-10"
          >
            <Link 
              to="/" 
              className="text-6xl md:text-[8rem] lg:text-[10rem] branding-font font-bold leading-none tracking-tight block whitespace-nowrap uppercase text-white"
            >
              Isabel Römer
            </Link>
          </motion.div>

          {/* THE SUBTITLE - Positioned relative to the container so it DOES NOT scale with the logo */}
          <motion.span 
            style={{ 
              opacity: subtitleOpacity,
              y: useTransform(scrollY, [0, 400], ["26vh", "4vh"]), // Syncs with logo bottom but stays constant size
              x: logoX, // Slides with the logo
            }}
            className="absolute top-0 left-0 text-[10px] md:text-xs uppercase tracking-[1.1em] font-medium text-white/60 ml-2 md:ml-4 whitespace-nowrap z-0"
          >
            Interior Design
          </motion.span>

        </div>
      </motion.nav>
    </>
  );
}
