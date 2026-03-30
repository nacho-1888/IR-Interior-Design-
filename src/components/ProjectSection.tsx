import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Project } from "../types";
import { projects as allProjects } from "../data/projects";

interface ProjectSectionProps {
  project: Project;
  index: number;
  onProjectSelect?: (project: Project) => void;
  key?: string | number;
}

export default function ProjectSection({ project, onProjectSelect }: ProjectSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for the background image
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      id={project.id}
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center bg-luxury-black overflow-hidden font-sans"
    >
      {/* Background Image full screen */}
      <motion.div 
        style={{ y: imageY, scale: 1.1 }}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.img 
            key={project.coverImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.95, ease: "easeInOut" }}
            src={project.coverImage} 
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover grayscale-[20%] brightness-[0.8] transition-all duration-700 hover:grayscale-0 hover:brightness-100"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
      </motion.div>

      {/* Top Right Navigation List - More Architectural */}
      <div className="absolute top-32 lg:top-48 right-8 lg:right-20 z-20 flex flex-col items-end">
        <div className="flex flex-col items-end space-y-4">
          {allProjects.map((p, i) => (
            <button 
              key={p.id} 
              onClick={(e) => {
                e.preventDefault();
                onProjectSelect?.(p);
              }}
              className="group flex flex-col items-end py-2"
            >
              <span className={`text-sm md:text-base uppercase tracking-[0.2em] transition-all duration-500 ${
                p.id === project.id ? 'text-white translate-x-0' : 'text-white/40 hover:text-white translate-x-4'
              }`}>
                {p.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Left Content (Current Project Details) */}
      <div className="absolute bottom-20 left-8 lg:left-20 z-20 max-w-3xl pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
             key={project.id}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
             transition={{ duration: 0.65 }}
             className="pointer-events-auto"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-medium text-white/50 block mb-6">
              {project.location} — {project.category}
            </span>
            <h2 className="text-6xl md:text-8xl lg:text-9xl display-font font-bold tracking-tighter text-white uppercase leading-[0.8] mb-10 mix-blend-difference">
              {project.title}
            </h2>
            <Link 
              to={`/project/${project.id}`}
              className="group inline-flex flex-col items-start gap-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-white hover:text-white/70 transition-colors pointer-events-auto"
            >
              <div className="flex items-center gap-4">
                 <span>Explore Studio</span>
                 <div className="w-16 h-[1px] bg-white group-hover:w-32 transition-all duration-700 ease-in-out" />
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
