import { projects } from "../data/projects";
import ProjectSection from "../components/ProjectSection";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import { Project } from "../types";
import NewsletterPopup from "../components/NewsletterPopup";

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 500], [0, 1]);

  const heroImages = [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop"
  ];

  // Auto carousel effect
  useEffect(() => {
    const timer = setInterval(() => setHeroIndex(v => (v + 1) % 3), 4000);
    return () => clearInterval(timer);
  }, []);

  // 3 Random projects queue
  const [portfolioQueue, setPortfolioQueue] = useState<Project[]>(projects.slice(0, 3));
  
  useEffect(() => {
    const shuffled = [...projects].sort(() => 0.5 - Math.random());
    setPortfolioQueue(shuffled.slice(0, 3));
  }, []);

  const handleProjectSelect = (p: Project) => {
    setPortfolioQueue(prev => {
      const filtered = prev.filter(item => item.id !== p.id);
      const newQueue = [p, ...filtered];
      const pool = projects.filter(rp => !newQueue.find(nq => nq.id === rp.id));
      while (newQueue.length < 3 && pool.length > 0) {
        newQueue.push(pool.shift()!);
      }
      return newQueue.slice(0, 3);
    });
    
    const portfolioEl = document.getElementById("portfolio");
    if (portfolioEl) {
      portfolioEl.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          <div className="flex justify-between items-start pt-4 lg:pt-8 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col"
            >
              {/* Spacer specifically tuned to the Navbar's logo position */}
              <div className="h-[6rem] md:[6rem] lg:h-[7.5rem]" /> 
              <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] md:tracking-[0.45em] font-medium text-white/90 mt-4 md:mt-2 ml-[-2px] md:ml-[-4px]">
                Interior, Furniture, Landscape Designer
              </p>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-end pb-8 w-full relative">
            
            {/* Bottom Left Paragraph */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="max-w-[280px] md:max-w-md absolute bottom-8 left-0 md:left-2"
            >
              <p className="text-lg md:text-2xl leading-snug font-light text-white/90">
                Transforming ordinary spaces into extraordinary experiences.
              </p>
            </motion.div>

            {/* Carousel Flat Lines Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
              {heroImages.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`h-1 cursor-pointer transition-all duration-500 ease-in-out ${i === heroIndex ? 'w-12 bg-white' : 'w-6 bg-white/40 hover:bg-white/70'}`}
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
              <a href="#about" className="text-[10px] md:text-xs text-white uppercase tracking-[0.35em] flex items-center gap-6 hover:opacity-70 transition-opacity">
                About Me <span className="w-10 h-[1px] bg-white hidden md:block" />
              </a>
              <button 
                onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })} 
                className="text-[10px] md:text-xs text-white/60 uppercase tracking-[0.35em] hover:text-white transition-colors text-right w-full"
              >
                Portfolio
              </button>
              <a href="#prices" className="text-[10px] md:text-xs text-white/60 uppercase tracking-[0.35em] hover:text-white transition-colors">
                Prices
              </a>
              <a href="#services" className="text-[10px] md:text-xs text-white/60 uppercase tracking-[0.35em] hover:text-white transition-colors">
                Services
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Projects Portfolio Section */}
      <div id="portfolio" className="relative z-20 bg-luxury-black">
        

        {portfolioQueue.map((project, index) => (
          <ProjectSection key={`${project.id}-${index}`} project={project} index={index} onProjectSelect={handleProjectSelect} />
        ))}
      </div>

      {/* Glassy Footer styled referencing Kelly Wearstler */}
      <footer id="contact" className="w-full bg-white/5 backdrop-blur-2xl border-t border-white/10 text-white py-16 px-8 md:px-16 flex flex-col md:flex-row justify-between items-start gap-12 font-sans relative z-30 overflow-hidden">
        
        {/* Subtle glow behind the footer */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

        {/* Left: Huge Logo */}
        <div className="w-full md:w-5/12 relative z-10">
          <h2 className="text-[14vw] md:text-[7vw] leading-[0.85] display-font font-black tracking-tighter uppercase text-white">
            Isabel
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>Romer
          </h2>
        </div>

        {/* Center: Links */}
        <div className="w-full md:w-3/12 flex gap-12 md:gap-16 text-xs font-semibold justify-start mt-4 md:mt-0 relative z-10">
          <div className="flex flex-col space-y-3">
            <a href="#" className="hover:text-white/50 transition-colors">Contact Us</a>
            <a href="#" className="hover:text-white/50 transition-colors">About</a>
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white/50 transition-colors">Careers</a>
          </div>
          <div className="flex flex-col space-y-3">
            <a href="#" className="hover:text-white/50 transition-colors">FAQ</a>
            <a href="#" className="hover:text-white/50 transition-colors">Press</a>
            <a href="#" className="hover:text-white/50 transition-colors">Trade</a>
            <a href="#" className="hover:text-white/50 transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white/50 transition-colors">Projects</a>
          </div>
        </div>

        {/* Right: Newsletter Signup */}
        <div className="w-full md:w-4/12 flex flex-col space-y-6 md:items-end mt-4 md:mt-0 relative z-10">
          <h3 className="text-lg md:text-xl font-black uppercase tracking-tight w-full md:w-auto md:text-right text-white/90">Sign up for updates</h3>
          <div className="w-full max-w-sm border-b border-white/30 pb-2 flex justify-between items-center group">
            <input type="email" placeholder="Email Address" className="w-full bg-transparent outline-none text-sm placeholder:text-white/50 text-white font-medium" />
          </div>
          <button className="text-left md:text-right font-serif italic text-2xl tracking-wide hover:text-white/50 transition-colors w-full max-w-sm">SIGN UP</button>
          
          <div className="pt-12 md:pt-24 text-[10px] font-medium tracking-wide w-full md:text-right text-white/40">
            © 2026 Isabel Romer. All Rights Reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
