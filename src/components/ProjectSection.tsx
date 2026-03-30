import { motion, useScroll, useTransform } from "motion/react";
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
        style={{ y: imageY }}
        className="absolute inset-[-10%] w-[120%] h-[120%] z-0"
      >
        <img 
          src={project.coverImage} 
          alt={project.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/70 to-transparent" />
      </motion.div>

      {/* Top Right Navigation List */}
      <div className="absolute top-32 lg:top-40 right-8 lg:right-16 z-20 flex gap-8 lg:gap-16 items-start">
        <h4 className="text-white font-medium text-sm md:text-base hidden md:block">Latest Projects</h4>
        <div className="flex flex-col items-start space-y-1">
          {allProjects.map((p) => (
            <button 
              key={p.id} 
              onClick={(e) => {
                e.preventDefault();
                if (onProjectSelect) {
                  onProjectSelect(p);
                } else {
                  window.location.hash = p.id;
                }
              }}
              className={`text-sm md:text-base tracking-wide transition-opacity text-left ${
                p.id === project.id ? 'text-white opacity-100 font-medium' : 'text-white/40 hover:opacity-100 hover:text-white'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Left Content (Current Project Details) */}
      <div className="absolute bottom-16 left-8 lg:left-16 z-20 max-w-2xl">
        <span className="text-xs uppercase tracking-[0.3em] font-medium text-white/70 block mb-4">
          {project.location}
        </span>
        <h2 className="text-5xl md:text-7xl lg:text-8xl display-font font-bold tracking-tighter text-white uppercase leading-none mb-6">
          {project.title}
        </h2>
        <Link 
          to={`/project/${project.id}`}
          className="group inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-white hover:text-white/70 transition-colors"
        >
          <span>Explore Project</span>
          <div className="w-12 h-[1px] bg-white group-hover:w-24 transition-all duration-500" />
        </Link>
      </div>
    </section>
  );
}
