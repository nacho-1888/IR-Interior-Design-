import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProjectDetail({ onContactOpen }: { onContactOpen: () => void }) {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-luxury-paper text-luxury-black">
        <p className="text-2xl serif">Project not found.</p>
        <Link to="/" className="ml-4 text-sm uppercase tracking-widest border-b border-luxury-black">Go Home</Link>
      </div>
    );
  }

  const [imgIndex, setImgIndex] = useState(0);
  
  // Unique images only to prevent repetition
  const gallery = Array.from(new Set([project.coverImage, ...project.gallery]));

  // Professional Image Preloader to eliminate the black gap
  useEffect(() => {
    gallery.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [gallery]);

  const nextImg = () => {
    setImgIndex((prev) => (prev + 1) % gallery.length);
  };
  const prevImg = () => {
    setImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Touch navigation for mobile swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) nextImg();
    if (isRightSwipe) prevImg();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imgIndex]);

  return (
    <main className="bg-luxury-black text-white w-full relative font-sans overflow-x-hidden">
      
      {/* 1. HERO GALLERY SECTION */}
      <section className="h-[100dvh] md:h-screen w-full relative overflow-hidden">
        
        {/* Background Gallery Layer */}
        <div 
          className="absolute inset-0 z-0 bg-[#050505] overflow-hidden touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence initial={false}>
            <motion.img
              key={imgIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              src={gallery[imgIndex]}
              alt={project.title}
              style={{ objectPosition: project.imagePositions?.[gallery[imgIndex]] || project.customPosition || 'center' }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-black/30 z-10" />
        </div>

        {/* TOP OVERLAY - Improved for mobile overlap prevention */}
        <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-start px-4 pt-16 lg:p-12 lg:pt-12 pointer-events-none">
          <Link 
            to="/" 
            className="text-white text-[8px] md:text-xs uppercase tracking-[0.4em] font-medium hover:opacity-50 transition-opacity z-30 pointer-events-auto"
          >
            Home
          </Link>
          <h1 className="branding-font text-2xl md:text-4xl lg:text-6xl uppercase tracking-[0.1em] font-black text-white absolute left-1/2 -translate-x-1/2 text-center w-[60%] md:w-full px-4 pointer-events-none whitespace-normal leading-[0.85] pt-1">
            {project.title}
          </h1>
          <button 
            onClick={onContactOpen} 
            className="text-white text-[8px] md:text-xs uppercase tracking-[0.4em] font-medium hover:opacity-50 transition-opacity z-30 pointer-events-auto text-right"
          >
            Let's Talk
          </button>
        </div>

        {/* CENTER INTERACTIVE ZONES & ARROWS */}
        <div className="absolute inset-0 z-15 flex">
          {/* Left Toggle */}
          <button 
            onClick={prevImg}
            className={`w-1/2 h-full flex items-center justify-start pl-8 lg:pl-16 cursor-w-resize group transition-opacity opacity-100`}
          >
            <div className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-full border border-white/20 bg-black/5 backdrop-blur-sm transition-all hover:bg-white/10 group-hover:scale-110">
              <ChevronLeft className="text-white" size={24} strokeWidth={1.5} />
            </div>
          </button>

          {/* Right Toggle */}
          <button 
            onClick={nextImg}
            className={`w-1/2 h-full flex items-center justify-end pr-8 lg:pr-16 cursor-e-resize group transition-opacity opacity-100`}
          >
            <div className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-full border border-white/20 bg-black/5 backdrop-blur-sm transition-all hover:bg-white/10 group-hover:scale-110">
              <ChevronRight className="text-white" size={24} strokeWidth={1.5} />
            </div>
          </button>
        </div>

        {/* BOTTOM OVERLAY - Re-centered progress bars and More Work shifted lower on mobile */}
        <div className="absolute bottom-0 left-0 w-full z-20 flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end p-8 pb-16 lg:p-12 lg:pb-12 pointer-events-none gap-6 md:gap-0">
          
          {/* Learn More Button - Absolute Bottom Left on Mobile, natural first item on Desktop */}
          <div className="pointer-events-auto absolute bottom-8 left-6 md:static justify-self-start mr-auto md:mr-0 z-30">
            <button 
              onClick={() => document.getElementById('project-info')?.scrollIntoView({ behavior: 'smooth' })}
              className="group inline-flex flex-col items-start gap-4 text-[10px] md:text-xs font-semibold uppercase tracking-[0.4em] text-white hover:text-white/70 transition-colors pointer-events-auto"
            >
              <div className="flex items-center gap-4">
                 <span>LEARN MORE</span>
                 <div className="w-12 h-[1px] bg-white group-hover:w-24 transition-all duration-700 ease-in-out" />
              </div>
            </button>
          </div>

          {/* Dynamic Image Progress Line */}
          <div className="flex justify-center pb-0 md:pb-3 pointer-events-auto mt-4 md:mt-0">
            <div className="flex items-center gap-4">
              {gallery.map((_, i) => (
                <button 
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                  className={`h-[1px] transition-all duration-700 ${i === imgIndex ? 'w-16 bg-white' : 'w-4 bg-white/20 hover:bg-white/40'}`}
                />
              ))}
            </div>
          </div>

          {/* Back/Next Link - Now centered and lower on mobile */}
          <div className="pointer-events-auto ml-auto md:ml-0">
            <Link 
              to="/#portfolio" 
              className="text-white text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium flex items-center gap-2 hover:opacity-50 transition-opacity"
            >
              More Work <span className="text-lg">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. PROJECT INFO SUBSECTION (WHITE OVERLAY) */}
      <section id="project-info" className="w-full bg-white text-black py-24 md:py-32 px-6 md:px-24 min-h-[25vh] flex items-center justify-center font-sans border-t border-black/5 relative z-30">
        <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-24">
          
          <div className="w-full md:w-1/2 lg:w-7/12">
            <h3 className="text-[9vw] md:text-5xl lg:text-7xl font-black uppercase tracking-tighter branding-font leading-[0.85] mb-8 text-black">
              About the Project
            </h3>
            <p className="text-sm md:text-lg lg:text-xl font-medium leading-[1.8] text-black/80 max-w-2xl">
              {project.description}
            </p>
          </div>
          
          <div className="w-full md:w-5/12 lg:w-4/12 flex flex-col pt-2 md:pt-4 border-t border-black/10 md:border-none">
            <div className="flex flex-col space-y-6 text-[10px] md:text-xs uppercase tracking-[0.4em] font-black w-full">
              <div className="flex flex-col gap-y-2 pb-6 border-b border-black/5">
                <span className="text-black/40">Location</span>
                <span className="text-black">{project.location}</span>
              </div>
              <div className="flex flex-col gap-y-2 pb-6 border-b border-black/5">
                <span className="text-black/40">Category</span>
                <span className="text-black">{project.category}</span>
              </div>
              <div className="flex flex-col gap-y-2 pb-6 border-b border-black/5">
                <span className="text-black/40">Year</span>
                <span className="text-black">{project.year}</span>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 3. INVERTED BLACK FOOTER */}
      <footer className="w-full bg-[#050505] text-white pt-24 md:pt-32 pb-12 md:pb-16 px-6 md:px-24 flex flex-col font-sans border-t border-white/10 relative z-30">
        
        {/* Main Footer Block - Logo and Menu Locked Vertically */}
        <div className="flex flex-row justify-between items-stretch w-full relative z-10 mb-8 max-w-[1920px] mx-auto">
          
          {/* Left: Huge Logo - The Vertical Anchor (Montserrat branding font) */}
          <div className="w-auto flex flex-col">
            <h2 className="text-[14.5vw] md:text-[7.5vw] leading-[0.95] branding-font font-black tracking-tighter uppercase text-white m-0 p-0">
              Isabel
              <br className="hidden md:block" />
              <span className="md:hidden"> </span><span style={{display:'block', marginTop:'4px'}}>Römer</span>
            </h2>
          </div>
          
          {/* Right side: Monolithic Link List - Focused on Navigation */}
          <div className="w-auto flex flex-col items-end justify-between text-[8.5px] md:text-sm font-bold py-[1vw]">
            <Link to="/" className="text-right whitespace-nowrap hover:text-white/40 transition-colors uppercase tracking-[0.25em] text-white">Home</Link>
            <button onClick={onContactOpen} className="text-right whitespace-nowrap hover:text-white/40 transition-colors uppercase tracking-[0.25em] text-white">Contact Us</button>
            <Link to="/#portfolio" className="text-right whitespace-nowrap hover:text-white/40 transition-colors uppercase tracking-[0.25em] text-white">Projects</Link>
            <Link to="/privacy-policy" className="text-right whitespace-nowrap hover:text-white/40 transition-colors uppercase tracking-[0.25em] text-white">Privacy</Link>
            <Link to="/terms-conditions" className="text-right whitespace-nowrap hover:text-white/40 transition-colors uppercase tracking-[0.25em] text-white">Terms</Link>
          </div>
        </div>

        {/* Studio Contact Metadata - Unified Hierarchical Opacity */}
        <div className="w-full relative z-10 mb-12 max-w-[1920px] mx-auto">
          <div className="flex flex-col space-y-4 text-[10px] md:text-xs uppercase tracking-[0.4em] font-black">
            <div className="flex flex-wrap gap-x-12 gap-y-2 text-white/40">
              <a href="https://www.instagram.com/isabelromer.interiordesign/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <a href="mailto:proyectos@isabelromer.com" className="hover:text-white transition-colors">Email</a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 mt-2 text-white font-semibold normal-case tracking-normal text-sm md:text-base">
              <p className="whitespace-nowrap">Madrid — Spain</p>
              <div className="hidden md:block w-px h-4 bg-white/20" />
              <a href="tel:+34665338108" className="hover:opacity-70 transition-opacity whitespace-nowrap">+34 665 338 108</a>
            </div>
          </div>
        </div>

        {/* Global Copyright - Bottom Marker */}
        <div className="w-full pt-10 md:pt-4 text-[9px] md:text-[10px] font-bold tracking-[0.3em] md:text-right text-white/40 uppercase mt-4 md:mt-0 border-t border-white/5 md:border-none">
          © 2026 Isabel Römer. All Rights Reserved.
        </div>
      </footer>

    </main>
  );
}
