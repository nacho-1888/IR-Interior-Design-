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
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] cursor-pointer"
          />

          {/* Liquid Glass Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg aspect-square bg-white/10 backdrop-blur-3xl border border-white/20 z-[101] overflow-hidden flex flex-col p-8 md:p-14 shadow-2xl rounded-[3rem]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Top: Reach Me Directly */}
            <div className="mb-8 mt-2 flex flex-col items-center gap-6">
              <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-white/60">Reach me directly</span>
              <div className="flex gap-10 text-white/50">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-transform hover:scale-110 duration-300">
                  <Instagram size={22} />
                </a>
                <a href="mailto:isabel@romer.com" className="hover:text-white transition-transform hover:scale-110 duration-300">
                  <Mail size={22} />
                </a>
                <a href="https://wa.me/something" target="_blank" rel="noreferrer" className="hover:text-white transition-transform hover:scale-110 duration-300">
                  <Phone size={22} />
                </a>
              </div>
            </div>

            {/* Header */}
            <div className="mb-10">
              <h2 className="branding-font text-4xl md:text-5xl uppercase tracking-tighter text-white font-black leading-none text-center">
                Say Hello.
              </h2>
            </div>

            {/* Contact Form - Minimalist Bubble Style */}
            <form className="flex-1 flex flex-col space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="bg-white/5 rounded-2xl px-6 py-4 flex group transition-all focus-within:bg-white/10 border border-white/5 focus-within:border-white/20">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-transparent outline-none text-xs uppercase tracking-[0.15em] placeholder:text-white/20 text-white font-medium" 
                />
              </div>

              <div className="bg-white/5 rounded-2xl px-6 py-4 flex group transition-all focus-within:bg-white/10 border border-white/5 focus-within:border-white/20">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent outline-none text-xs uppercase tracking-[0.15em] placeholder:text-white/20 text-white font-medium" 
                />
              </div>

              <div className="bg-white/5 rounded-2xl px-6 py-4 flex group transition-all focus-within:bg-white/10 border border-white/5 focus-within:border-white/20 flex-1">
                <textarea 
                  placeholder="Tell us about your project" 
                  rows={2}
                  className="w-full bg-transparent outline-none text-xs uppercase tracking-[0.15em] placeholder:text-white/20 text-white font-medium resize-none overflow-hidden" 
                />
              </div>

              <button className="w-full py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.5em] hover:bg-white/90 active:scale-[0.98] transition-all rounded-2xl mt-4">
                Send Message
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
