import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { motion, AnimatePresence } from "motion/react";
import { MoveLeft } from "lucide-react";
import { useState } from "react";

export default function ProjectDetail() {
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

  const nextImg = () => setImgIndex((prev) => (prev + 1) % gallery.length);
  const prevImg = () => setImgIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  return (
    <main className="bg-luxury-black text-white h-screen w-full relative overflow-hidden font-sans">
      
      {/* Background Gallery Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
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
          className="text-white text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium hover:opacity-50 transition-opacity"
        >
          Menu
        </Link>
        <h1 className="branding-font text-2xl md:text-3xl lg:text-4xl uppercase tracking-[0.2em] font-bold text-white">
          {project.title}
        </h1>
        <a 
          href="#contact" 
          className="text-white text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium hover:opacity-50 transition-opacity"
        >
          Let's Talk
        </a>
      </div>

      {/* CENTER INTERACTIVE ZONES - Click left/right to navigate */}
      <div className="absolute inset-0 z-15 flex">
        <div className="w-1/2 h-full cursor-w-resize" onClick={prevImg} />
        <div className="w-1/2 h-full cursor-e-resize" onClick={nextImg} />
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
            to="/" 
            className="text-white text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium flex items-center gap-2 hover:opacity-50 transition-opacity"
          >
            More Work <span className="text-lg">→</span>
          </Link>
        </div>

      </div>

    </main>
  );
}
