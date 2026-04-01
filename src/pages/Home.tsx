import { projects } from "../data/projects";
import ProjectSection from "../components/ProjectSection";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { Project } from "../types";
import NewsletterPopup from "../components/NewsletterPopup";

export default function Home({ onContactOpen }: { onContactOpen: () => void }) {
  const [heroIndex, setHeroIndex] = useState(0);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 500], [0, 1]);

  // Syncing hero images to the first 3 projects
  const heroProjects = projects.slice(0, 3);
  const heroImages = heroProjects.map(p => p.coverImage);

  // Auto carousel effect
  useEffect(() => {
    const timer = setInterval(() => setHeroIndex(v => (v + 1) % 3), 4000);
    return () => clearInterval(timer);
  }, []);

  // Professional Scroll Reset: Forces the browser to start at the Hero section on load
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      // Backup for browsers that struggle with instant scroll on initial paint
      const timeout = setTimeout(() => window.scrollTo(0, 0), 10);
      return () => clearTimeout(timeout);
    }
  }, []);

  // 3 Independent Project Windows (PWs)
  const [activeProjects, setActiveProjects] = useState<Project[]>(() => {
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  });

  const handleProjectSelect = useCallback((windowIndex: number, newProject: Project) => {
    setActiveProjects(prev => {
      const next = [...prev];
      const currentlyAtThisWindow = next[windowIndex];
      
      // If clicking the same project, do nothing
      if (currentlyAtThisWindow.id === newProject.id) return prev;
      
      // Check if the selected project is currently displayed in another PW
      const existingWindowIndex = next.findIndex(p => p.id === newProject.id);
      
      if (existingWindowIndex !== -1) {
        // Swap: Give the *other* window the project we are currently holding
        next[existingWindowIndex] = currentlyAtThisWindow;
      }
      
      // Assign the requested project to the window that was clicked
      next[windowIndex] = newProject;
      return next;
    });
  }, []);

  return (
    <main className="relative bg-luxury-black text-luxury-paper">
      


      {/* Hero section - Ultra-Bleed scaling for hardware notch and browser bars */}
      <section className="h-[105vh] md:h-screen w-full font-sans relative overflow-hidden">
        
        {/* Background Images Layer */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={heroIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              src={heroImages[heroIndex]}
              alt={`Luxury Interior Design ${heroIndex + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/20 z-10" />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12">
          
          {/* Top Hero Layout - Aligned with Sticky Branding */}
          <div className="flex justify-between items-start w-full">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col"
            >
              {/* Branding is now solely in Navbar.tsx for vertical control */}
            </motion.div>
          </div>

          {/* Bottom Section - Repositioned HUD for mobile ergonomics */}
          <div className="flex flex-col md:flex-row justify-between items-end pb-8 w-full relative h-full">
            
            {/* Dynamic Project Title - Lifted higher to clear mobile search bars - Hidden on Mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="hidden md:block max-w-[280px] md:max-w-xl absolute bottom-[18vh] left-2 md:left-4"
            >
              <AnimatePresence mode="wait">
                <motion.h2
                  key={heroIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-[10vw] md:text-5xl lg:text-6xl branding-font font-black tracking-tighter text-white uppercase leading-[0.8] mb-10 mix-blend-difference"
                >
                  {heroProjects[heroIndex].title}
                </motion.h2>
              </AnimatePresence>
            </motion.div>

            {/* Carousel Flat Lines Indicator - Re-centered visually */}
            <div className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 flex items-center gap-4">
              {heroImages.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`h-[1px] cursor-pointer transition-all duration-500 ease-in-out ${i === heroIndex ? 'w-12 bg-white' : 'w-6 bg-white/40 hover:bg-white/70'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Right Side Navigation Menu - Below Branding */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="flex flex-col items-end space-y-4 md:space-y-6 absolute top-[38vh] right-0 md:pr-4 z-40"
            >
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
                className="text-[9px] md:text-xs text-white uppercase tracking-[0.35em] flex items-center gap-4 hover:opacity-70 transition-opacity"
              >
                Home <span className="w-10 h-[1px] bg-white hidden md:block" />
              </button>
              <button 
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })} 
                className="text-[9px] md:text-xs text-white/60 uppercase tracking-[0.35em] whitespace-nowrap hover:text-white transition-colors"
              >
                Portfolio
              </button>
              <button 
                onClick={onContactOpen} 
                className="text-[9px] md:text-xs text-white/60 uppercase tracking-[0.35em] whitespace-nowrap hover:text-white transition-colors"
              >
                Contact
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Portfolio Section - Dynamically reduced on mobile */}
      <div id="portfolio" className="relative z-20 bg-luxury-black">
        {activeProjects.map((project, idx) => (
          <div key={`pw-${idx}`} className={idx > 0 ? "hidden md:block" : "block"}>
            <ProjectSection 
              project={project} 
              index={idx} 
              onProjectSelect={(p) => handleProjectSelect(idx, p)} 
            />
          </div>
        ))}
      </div>

      {/* Solid Museum-Style White Footer */}
      <footer id="contact" className="w-full bg-white text-black pt-24 md:pt-32 pb-12 md:pb-16 px-6 md:px-24 flex flex-col font-sans relative z-30 border-t border-black/5">
        
        {/* Main Footer Block - Logo and Menu Locked Vertically */}
        <div className="flex flex-row justify-between items-stretch w-full relative z-10 mb-8 max-w-[1920px] mx-auto">
          
          {/* Left: Huge Logo - The Vertical Anchor (Montserrat branding font) */}
          <div className="w-auto flex flex-col">
            <h2 className="text-[14.5vw] md:text-[7.5vw] leading-[0.95] branding-font font-black tracking-tighter uppercase text-black m-0 p-0">
              Isabel
              <br className="hidden md:block" />
              <span className="md:hidden"> </span>Römer
            </h2>
          </div>
          {/* Right side: Monolithic Link List - Focused on Navigation */}
          <div className="w-auto flex flex-col items-end justify-between text-[8.5px] md:text-sm font-bold py-[1vw]">
            <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-right whitespace-nowrap hover:text-black/40 transition-colors uppercase tracking-[0.25em] text-black">Home</button>
            <button onClick={onContactOpen} className="text-right whitespace-nowrap hover:text-black/40 transition-colors uppercase tracking-[0.25em] text-black">Contact Us</button>
            <a href="#portfolio" className="text-right whitespace-nowrap hover:text-black/40 transition-colors uppercase tracking-[0.25em] text-black">Projects</a>
            <Link to="/privacy-policy" className="text-right whitespace-nowrap hover:text-black/40 transition-colors uppercase tracking-[0.25em] text-black">Privacy</Link>
            <Link to="/terms-conditions" className="text-right whitespace-nowrap hover:text-black/40 transition-colors uppercase tracking-[0.25em] text-black">Terms</Link>
          </div>
        </div>

        {/* Studio Contact Metadata - Unified Hierarchical Opacity */}
        <div className="w-full relative z-10 mb-12 max-w-[1920px] mx-auto">
          <div className="flex flex-col space-y-4 text-[10px] md:text-xs uppercase tracking-[0.4em] font-black">
            <div className="flex flex-wrap gap-x-12 gap-y-2 text-black/40">
              <a href="https://www.instagram.com/isabelromer.interiordesign/" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">Instagram</a>
              <a href="mailto:proyectos@isabelromer.com" className="hover:text-black transition-colors">Email</a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-2 text-black font-semibold normal-case tracking-normal text-sm md:text-base">
              <p className="whitespace-nowrap">Madrid — Spain</p>
              <div className="hidden md:block w-px h-4 bg-black/10" />
              <a href="tel:+34647383266" className="hover:opacity-70 transition-opacity whitespace-nowrap">+34 647 383 266</a>
            </div>
          </div>
        </div>

        {/* Global Copyright - Bottom Marker */}
        <div className="w-full pt-10 md:pt-4 text-[9px] md:text-[10px] font-bold tracking-[0.3em] md:text-right text-black/40 uppercase mt-4 md:mt-0 border-t border-black/5 md:border-none">
          © 2026 Isabel Römer. All Rights Reserved.
        </div>
      </footer>
    </main>
  );
}
