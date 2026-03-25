import { projects } from "../data/projects";
import ProjectSection from "../components/ProjectSection";
import { motion } from "motion/react";

export default function Home() {
  return (
    <main className="relative bg-luxury-black">
      {/* Hero section */}
      <section className="h-screen w-full flex flex-col items-center justify-center bg-luxury-paper text-luxury-black px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1 className="text-7xl md:text-9xl serif font-light tracking-tighter mb-6">
            Isabel Romer
          </h1>
          <p className="text-sm uppercase tracking-[0.5em] font-light opacity-60">
            Interior Design & Art Direction
          </p>
          <p className="text-xs uppercase tracking-[0.3em] font-light opacity-40 mt-2">
            Madrid, Spain
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center space-y-4"
        >
          <span className="text-[10px] uppercase tracking-widest opacity-50">Scroll to explore</span>
          <div className="w-[1px] h-12 bg-luxury-black/20 overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-full h-1/2 bg-luxury-black"
            />
          </div>
        </motion.div>
      </section>

      {/* Projects */}
      {projects.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}

      {/* Footer */}
      <footer className="h-screen w-full flex flex-col items-center justify-center bg-luxury-paper text-luxury-black px-8 text-center">
        <h2 className="text-5xl md:text-7xl serif font-light mb-12 italic">Let's create something beautiful.</h2>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-widest">isabel@romer.com</p>
          <p className="text-sm uppercase tracking-widest">+34 912 345 678</p>
          <p className="text-sm uppercase tracking-widest">Calle de Velázquez, Madrid</p>
        </div>
        <div className="mt-24 text-[10px] uppercase tracking-[0.3em] opacity-40">
          © 2026 Isabel Romer. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
