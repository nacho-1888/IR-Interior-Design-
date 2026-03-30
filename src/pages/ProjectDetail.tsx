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
  const gallery = [project.coverImage, ...project.gallery];

  // Professional Image Preloader to eliminate the black gap
  useEffect(() => {
    gallery.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [gallery]);

  const nextImg = () => {
    if (imgIndex < gallery.length - 1) setImgIndex(prev => prev + 1);
  };
  const prevImg = () => {
    if (imgIndex > 0) setImgIndex(prev => prev - 1);
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
    <main className="bg-luxury-black text-white h-screen w-full relative overflow-hidden font-sans">
      
      {/* Background Gallery Layer */}
      <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={imgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            src={gallery[imgIndex]}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover grayscale-[10%] brightness-[0.85]"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      {/* TOP OVERLAY - Mirroring Reference Layout */}
      <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-8 lg:p-12">
        <Link 
          to="/" 
          className="text-white text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium hover:opacity-50 transition-opacity z-30"
        >
          Menu
        </Link>
        <h1 className="branding-font text-2xl md:text-4xl lg:text-6xl uppercase tracking-[0.1em] font-black text-white absolute left-1/2 -translate-x-1/2 text-center w-full px-24 pointer-events-none">
          {project.title}
        </h1>
        <button 
          onClick={onContactOpen} 
          className="text-white text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium hover:opacity-50 transition-opacity z-30"
        >
          Let's Talk
        </button>
      </div>

      {/* CENTER INTERACTIVE ZONES & ARROWS */}
      <div className="absolute inset-0 z-15 flex">
        {/* Left Toggle */}
        <button 
          onClick={prevImg}
          disabled={imgIndex === 0}
          className={`w-1/2 h-full flex items-center justify-start pl-8 lg:pl-16 cursor-w-resize group transition-opacity ${imgIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-full border border-white/20 bg-black/5 backdrop-blur-sm transition-all hover:bg-white/10 group-hover:scale-110">
            <ChevronLeft className="text-white" size={24} strokeWidth={1.5} />
          </div>
        </button>

        {/* Right Toggle */}
        <button 
          onClick={nextImg}
          disabled={imgIndex === gallery.length - 1}
          className={`w-1/2 h-full flex items-center justify-end pr-8 lg:pr-16 cursor-e-resize group transition-opacity ${imgIndex === gallery.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center rounded-full border border-white/20 bg-black/5 backdrop-blur-sm transition-all hover:bg-white/10 group-hover:scale-110">
            <ChevronRight className="text-white" size={24} strokeWidth={1.5} />
          </div>
        </button>
      </div>

      {/* BOTTOM OVERLAY - Mirroring Reference Layout */}
      <div className="absolute bottom-0 left-0 w-full z-20 flex justify-between items-end p-8 lg:p-12 pointer-events-none">
        
        {/* Scroll/Indicator Arrow */}
        <div className="pointer-events-auto">
          <div className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 transition-all cursor-pointer">
             <span className="text-white">↓</span>
          </div>
        </div>

        {/* Dynamic Image Progress Line */}
        <div className="flex-1 flex justify-center pb-3 pointer-events-auto">
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

        {/* Back/Next Link */}
        <div className="pointer-events-auto">
          <Link 
            to="/#portfolio" 
            className="text-white text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium flex items-center gap-2 hover:opacity-50 transition-opacity"
          >
            More Work <span className="text-lg">→</span>
          </Link>
        </div>

      </div>

    </main>
  );
}
