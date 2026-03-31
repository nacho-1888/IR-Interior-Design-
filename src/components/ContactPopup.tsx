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
          {/* Subtle Mask Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/5 z-[100] cursor-pointer"
          />

          {/* Sleek Bottom-Right Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 md:bottom-12 md:right-12 w-[90%] sm:w-[400px] md:w-[450px] bg-white z-[101] flex flex-col p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.15)] font-sans rounded-[2.5rem]"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-10">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-black/20 mb-2">Portfolio Studio</span>
                <h2 className="branding-font text-4xl text-black uppercase tracking-tighter font-black">LETS TALK.</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 -mr-2 text-black/20 hover:text-black transition-colors duration-300"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Contact Form - Matching Footer Style */}
            <form className="flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="bg-black/5 rounded-2xl px-6 py-5 flex group transition-all focus-within:bg-black/[0.08] border border-black/5 focus-within:border-black/10">
                <input 
                  type="text" 
                  placeholder="NAME"
                  className="w-full bg-transparent outline-none text-xs uppercase tracking-[0.25em] placeholder:text-black/20 text-black font-semibold" 
                />
              </div>

              <div className="bg-black/5 rounded-2xl px-6 py-5 flex group transition-all focus-within:bg-black/[0.08] border border-black/5 focus-within:border-black/10">
                <input 
                  type="text" 
                  placeholder="CONTACT"
                  className="w-full bg-transparent outline-none text-xs uppercase tracking-[0.25em] placeholder:text-black/20 text-black font-semibold" 
                />
              </div>

              <div className="pt-4">
                <button className="w-full py-6 bg-black text-white font-black uppercase text-[10px] tracking-[0.5em] hover:bg-black/90 active:scale-[0.98] transition-all rounded-2xl shadow-xl shadow-black/10">
                  Send Inquiry
                </button>
              </div>
            </form>

            {/* Direct Contact Section */}
            <div className="mt-12 flex flex-col items-start">
              <span className="text-[9px] uppercase tracking-[0.3em] font-black text-black/30 mb-8">contact me directly</span>
              <div className="flex gap-10 text-black/30">
                <a href="https://www.instagram.com/isabelromer.interiordesign/" target="_blank" rel="noreferrer" className="hover:text-black transition-all hover:-translate-y-1 duration-300">
                  <Instagram size={22} strokeWidth={1.5} />
                </a>
                <a href="mailto:proyectos@isabelromer.com" className="hover:text-black transition-all hover:-translate-y-1 duration-300">
                  <Mail size={22} strokeWidth={1.5} />
                </a>
                <a href="tel:+34647383266" className="hover:text-black transition-all hover:-translate-y-1 duration-300">
                  <Phone size={22} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
