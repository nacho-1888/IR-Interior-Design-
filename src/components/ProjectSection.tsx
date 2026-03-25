import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Project } from "../types";

interface ProjectSectionProps {
  project: Project;
  key?: string | number;
}

export default function ProjectSection({ project }: ProjectSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-luxury-black"
    >
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src={project.coverImage} 
          alt={project.title}
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 luxury-gradient" />
      </motion.div>

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 text-center text-luxury-paper px-4"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-light opacity-70 mb-4 block">
          {project.location}
        </span>
        <h2 className="text-6xl md:text-8xl serif font-light mb-8 tracking-tight">
          {project.title}
        </h2>
        <Link 
          to={`/project/${project.id}`}
          className="inline-block px-8 py-3 border border-luxury-paper/30 rounded-full text-sm uppercase tracking-widest hover:bg-luxury-paper hover:text-luxury-black transition-all duration-500"
        >
          View Project
        </Link>
      </motion.div>
    </section>
  );
}
