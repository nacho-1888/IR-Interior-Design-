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
      


      {/* Hero section */}
      <section className="h-screen w-full font-sans relative overflow-hidden">
        
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
          <div className="absolute inset-0 bg-black/40 z-10" />
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

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-end pb-8 w-full relative">
            
            {/* Dynamic Project Title in Bottom Left */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="max-w-[280px] md:max-w-xl absolute bottom-4 left-2 md:left-4"
            >
              <AnimatePresence mode="wait">
                <motion.h2
                  key={heroIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white/95"
                >
                  {heroProjects[heroIndex].title}
                </motion.h2>
              </AnimatePresence>
            </motion.div>

            {/* Carousel Flat Lines Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
              {heroImages.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`h-[1px] cursor-pointer transition-all duration-500 ease-in-out ${i === heroIndex ? 'w-12 bg-white' : 'w-6 bg-white/40 hover:bg-white/70'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Bottom Right Menu */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="flex flex-col items-end space-y-4 absolute bottom-8 right-0 md:pr-4"
            >
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} 
                className="text-[10px] md:text-xs text-white uppercase tracking-[0.35em] flex items-center gap-6 hover:opacity-70 transition-opacity"
              >
                Home <span className="w-10 h-[1px] bg-white hidden md:block" />
              </button>
              <button 
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })} 
                className="text-[10px] md:text-xs text-white/60 uppercase tracking-[0.35em] hover:text-white transition-colors text-right w-full"
              >
                Portfolio
              </button>
              <button 
                onClick={onContactOpen} 
                className="text-[10px] md:text-xs text-white/60 uppercase tracking-[0.35em] hover:text-white transition-colors text-right w-full"
              >
                Contact
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Projects Portfolio Section - 3 Independent Interactive Windows */}
      <div id="portfolio" className="relative z-20 bg-luxury-black">
        {activeProjects.map((project, idx) => (
          <ProjectSection 
            key={`pw-${idx}`} 
            project={project} 
            index={idx} 
            onProjectSelect={(p) => handleProjectSelect(idx, p)} 
          />
        ))}
      </div>

      {/* Glassy Footer styled with New Liquid Bubble aesthetic */}
      <footer id="contact" className="w-full bg-white/5 backdrop-blur-2xl border-t border-white/10 text-white pt-24 pb-12 px-8 md:px-20 flex flex-col md:flex-row justify-between items-start gap-16 font-sans relative z-30 overflow-hidden rounded-t-[3rem] md:rounded-t-[5rem]">
        
        {/* Subtle glow behind the footer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        {/* Left: Huge Logo */}
        <div className="w-full md:w-5/12 relative z-10">
          <h2 className="text-[14vw] md:text-[7vw] leading-[1.1] display-font font-black tracking-tighter uppercase text-white mb-10">
            Isabel
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>Römer
          </h2>
          
          {/* Direct Studio Contact Links */}
          <div className="flex gap-12 text-[10px] md:text-xs uppercase tracking-[0.35em] font-black text-white/40">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="mailto:isabel@romer.com" className="hover:text-white transition-colors">Email</a>
            <a href="https://wa.me/something" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">WhatsApp</a>
          </div>
        </div>

        {/* Center: Monolithic Link List */}
        <div className="w-full md:w-2/12 flex flex-col space-y-5 text-xs font-semibold justify-start relative z-10 pt-3 md:pt-4 lg:pt-6">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-left hover:text-white/50 transition-colors uppercase tracking-widest">Home</button>
          <button onClick={onContactOpen} className="text-left hover:text-white/50 transition-colors uppercase tracking-widest">Contact Us</button>
          <a href="#portfolio" className="hover:text-white/50 transition-colors uppercase tracking-widest">Projects</a>
          <Link to="/privacy-policy" className="hover:text-white/50 transition-colors uppercase tracking-widest">Privacy Policy</Link>
          <Link to="/terms-conditions" className="hover:text-white/50 transition-colors uppercase tracking-widest">Terms & Conditions</Link>
        </div>

        {/* Right: Expanded Complete Contact Section */}
        <div className="w-full md:w-5/12 flex flex-col space-y-12 md:items-end relative z-10 pt-3 md:pt-4 lg:pt-6">
          <div className="w-full max-w-md flex flex-col space-y-10">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              Let's create something
              <br />
              beautiful together.
            </h3>
            
            <div className="flex flex-col space-y-4">
              <div className="bg-white/5 rounded-2xl px-6 py-4 flex group transition-all focus-within:bg-white/10 border border-white/5 focus-within:border-white/20">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  className="w-full bg-transparent outline-none text-xs uppercase tracking-[0.15em] placeholder:text-white/20 text-white font-medium" 
                />
              </div>

              <div className="bg-white/5 rounded-2xl px-6 py-4 flex group transition-all focus-within:bg-white/10 border border-white/5 focus-within:border-white/20">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent outline-none text-xs uppercase tracking-[0.15em] placeholder:text-white/20 text-white font-medium" 
                />
              </div>

              <div className="bg-white/5 rounded-2xl px-6 py-5 flex group transition-all focus-within:bg-white/10 border border-white/5 focus-within:border-white/20">
                <textarea 
                  placeholder="Tell us about your project" 
                  rows={1}
                  className="w-full bg-transparent outline-none text-xs uppercase tracking-[0.15em] placeholder:text-white/20 text-white font-medium resize-none" 
                />
              </div>

              <button className="w-full py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.5em] hover:bg-white/90 active:scale-[0.98] transition-all rounded-2xl mt-4 shadow-xl shadow-black/20">
                Send Message
              </button>
            </div>
          </div>
          
          <div className="pt-8 text-[10px] font-medium tracking-widest w-full md:text-right text-white/20 uppercase">
            © 2026 Isabel Römer. All Rights Reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
