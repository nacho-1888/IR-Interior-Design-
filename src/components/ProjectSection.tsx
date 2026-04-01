import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Project } from "../types";
import { projects as allProjects } from "../data/projects";

interface ProjectSectionProps {
  project: Project;
  index: number;
  onProjectSelect?: (project: Project) => void;
  key?: string | number;
}

import React from "react";

// Memoized to prevent parent re-renders from killing the internal transition state
const ProjectSection = React.memo(({ project, onProjectSelect }: ProjectSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[110dvh] md:h-screen w-full flex items-center justify-center bg-luxury-black overflow-hidden font-sans"
    >
      {/* Foolproof GPU Crossfade: Pre-mounted architectural layers */}
      <motion.div 
        style={{ y: imageY, scale: 1.1 }}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-luxury-black"
      >
        {allProjects.map((p) => (
          <motion.div 
            key={p.id}
            initial={false}
            animate={{ 
              opacity: p.id === project.id ? 1 : 0,
              zIndex: p.id === project.id ? 10 : 0
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ 
              backgroundImage: `url(${p.coverImage})`,
              backgroundSize: 'cover',
              backgroundPosition: p.customPosition || 'center',
            }}
            className="absolute inset-0 w-full h-full brightness-[1.05] will-change-opacity"
          />
        ))}
        
        <div className="absolute inset-0 bg-black/30 z-20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none" />
      </motion.div>

      {/* Top Right Navigation List - More Architectural */}
      <div className="absolute top-28 lg:top-48 right-6 lg:right-20 z-20 flex flex-col items-end">
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
              <span className={`text-xs md:text-base uppercase tracking-[0.2em] transition-all duration-500 ${
                p.id === project.id ? 'text-white translate-x-0' : 'text-white/40 hover:text-white translate-x-4'
              }`}>
                {p.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Left Content (Current Project Details) */}
      <div className={`absolute bottom-16 md:bottom-20 left-6 lg:left-20 z-20 ${project.title === 'ACA ENTRE NOS' ? 'max-w-5xl' : 'max-w-3xl'} pointer-events-none`}>
        <AnimatePresence mode="popLayout">
          <motion.div
             key={project.id}
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: 20 }}
             transition={{ duration: 0.65, ease: "easeOut" }}
             className="pointer-events-auto"
          >
            <span className="text-[10px] md:text-xs uppercase tracking-[0.5em] font-medium text-white/50 block mb-6">
              {project.location} — {project.category}
            </span>
            <h2 className={`text-[13vw] md:text-8xl lg:text-9xl display-font font-bold tracking-tighter text-white uppercase leading-[0.8] mb-10 mix-blend-difference ${project.title === 'ACA ENTRE NOS' ? 'whitespace-nowrap' : ''}`}>
              {project.title}
            </h2>
            <Link 
              to={`/project/${project.id}`}
              className="group inline-flex flex-col items-start gap-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-white hover:text-white/70 transition-colors pointer-events-auto"
            >
              <div className="flex items-center gap-4">
                 <span>VIEW PROJECT</span>
                 <div className="w-16 h-[1px] bg-white group-hover:w-32 transition-all duration-700 ease-in-out" />
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
});

export default ProjectSection;
