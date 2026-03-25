import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import { motion } from "motion/react";
import { MoveLeft } from "lucide-react";

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

  return (
    <main className="bg-luxury-paper text-luxury-black min-h-screen">
      {/* Header */}
      <header className="relative h-[80vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src={project.coverImage} 
          alt={project.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-luxury-black/30" />
        
        <div className="absolute top-12 left-12 z-20">
          <Link to="/" className="flex items-center space-x-4 text-luxury-paper uppercase text-xs tracking-[0.3em] hover:opacity-70 transition-all">
            <MoveLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>
        </div>

        <div className="absolute bottom-12 left-12 z-20 text-luxury-paper max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-6xl md:text-8xl serif font-light mb-4 tracking-tighter"
          >
            {project.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-sm uppercase tracking-[0.3em] opacity-80"
          >
            {project.location} — {project.year}
          </motion.p>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
        <div className="space-y-8">
          <h2 className="text-4xl serif font-light italic leading-tight">
            Elevating the essence of contemporary living through a curated lens of luxury and craft.
          </h2>
          <div className="w-24 h-[1px] bg-luxury-black/20" />
          <div className="grid grid-cols-2 gap-8 text-[10px] uppercase tracking-[0.2em] opacity-60">
            <div>
              <p className="font-bold mb-2">Category</p>
              <p>{project.category}</p>
            </div>
            <div>
              <p className="font-bold mb-2">Location</p>
              <p>{project.location}</p>
            </div>
            <div>
              <p className="font-bold mb-2">Year</p>
              <p>{project.year}</p>
            </div>
            <div>
              <p className="font-bold mb-2">Studio</p>
              <p>Isabel Romer</p>
            </div>
          </div>
        </div>

        <div className="text-lg font-light leading-relaxed opacity-80 serif">
          <p>{project.description}</p>
          <p className="mt-8">
            Every detail in the {project.title} has been meticulously considered to create a sense of harmony and timeless elegance. From the custom-designed furniture to the hand-selected materials, the space reflects a deep commitment to quality and artistic expression.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-8 pb-24 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {project.gallery.map((img, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: idx * 0.2 }}
              className={`overflow-hidden ${idx % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'}`}
            >
              <img 
                src={img} 
                alt={`${project.title} gallery ${idx}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Next Project */}
      <section className="h-[60vh] w-full flex flex-col items-center justify-center bg-luxury-black text-luxury-paper px-8 text-center">
        <span className="text-xs uppercase tracking-[0.3em] opacity-50 mb-4">Next Project</span>
        <Link 
          to={`/project/${projects[(projects.indexOf(project) + 1) % projects.length].id}`}
          className="text-5xl md:text-7xl serif font-light hover:italic transition-all duration-500"
        >
          {projects[(projects.indexOf(project) + 1) % projects.length].title}
        </Link>
      </section>
    </main>
  );
}
