import { motion, AnimatePresence } from "motion/react";
import { X, Instagram, Mail, Phone } from "lucide-react";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactPopup({ isOpen, onClose }: ContactPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle Backdrop Darkening (No Blur) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100] cursor-pointer"
          />

          {/* Sleek Side Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-screen w-full md:w-[450px] lg:w-[550px] bg-luxury-black z-[101] flex flex-col p-8 md:p-16 lg:p-20 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] font-sans"
          >
            {/* Header / Brand */}
            <div className="flex justify-between items-start mb-20">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 mb-2">Portfolio Studio</span>
                <h2 className="branding-font text-3xl md:text-4xl text-white uppercase tracking-tighter">Contact.</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 -mr-2 text-white/40 hover:text-white transition-all hover:rotate-90 duration-500"
              >
                <X size={28} strokeWidth={1} />
              </button>
            </div>

            {/* Contact Form - Architectural Underline Style */}
            <form className="flex-1 flex flex-col space-y-12" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col space-y-2 group">
                <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-white transition-all duration-700 text-sm tracking-wide"
                />
              </div>

              <div className="flex flex-col space-y-2 group">
                <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors">Email Address</label>
                <input 
                  type="email" 
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-white transition-all duration-700 text-sm tracking-wide"
                />
              </div>

              <div className="flex flex-col space-y-2 group">
                <label className="text-[9px] uppercase tracking-[0.3em] text-white/30 group-focus-within:text-white transition-colors">Your Message</label>
                <textarea 
                  rows={3}
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white outline-none focus:border-white transition-all duration-700 text-sm tracking-wide resize-none"
                />
              </div>

              <div className="pt-8">
                <button className="group relative overflow-hidden bg-white text-black font-bold uppercase text-[10px] tracking-[0.5em] px-10 py-5 w-full hover:bg-white active:scale-[0.98] transition-all">
                  <span className="relative z-10 transition-colors duration-500">Send Inquiry</span>
                </button>
              </div>
            </form>

            {/* Bottom Socials */}
            <div className="mt-12 flex flex-col space-y-6">
              <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">Connect</span>
              <div className="flex gap-8">
                <a href="https://www.instagram.com/isabelromer.interiordesign/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-all hover:-translate-y-1 duration-300">
                  <Instagram size={20} strokeWidth={1.5} />
                </a>
                <a href="mailto:proyectos@isabelromer.com" className="text-white/40 hover:text-white transition-all hover:-translate-y-1 duration-300">
                  <Mail size={20} strokeWidth={1.5} />
                </a>
                <a href="tel:+34647383266" className="text-white/40 hover:text-white transition-all hover:-translate-y-1 duration-300">
                  <Phone size={20} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
