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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg aspect-square bg-white/5 backdrop-blur-3xl border border-white/10 z-[101] overflow-hidden flex flex-col p-8 md:p-12 shadow-2xl rounded-sm"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="mb-10 pt-4">
              <h2 className="branding-font text-3xl md:text-4xl uppercase tracking-tighter text-white font-black leading-none">
                Start a
                <br />
                Conversation.
              </h2>
            </div>

            {/* Contact Form */}
            <form className="flex-1 flex flex-col space-y-6 md:space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="border-b border-white/20 pb-2 flex group transition-all focus-within:border-white">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-transparent outline-none text-xs uppercase tracking-[0.2em] placeholder:text-white/20 text-white font-medium" 
                />
              </div>

              <div className="border-b border-white/20 pb-2 flex group transition-all focus-within:border-white">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent outline-none text-xs uppercase tracking-[0.2em] placeholder:text-white/20 text-white font-medium" 
                />
              </div>

              <div className="border-b border-white/20 pb-2 flex group transition-all focus-within:border-white flex-1">
                <textarea 
                  placeholder="Project details or message" 
                  rows={2}
                  className="w-full bg-transparent outline-none text-xs uppercase tracking-[0.2em] placeholder:text-white/20 text-white font-medium resize-none overflow-hidden" 
                />
              </div>

              <button className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-white/90 transition-all rounded-sm">
                Send Enquiry
              </button>
            </form>

            {/* Footer: Reach Me Directly */}
            <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30">Reach me directly</span>
              <div className="flex gap-8 text-white/40">
                <a href="#" className="hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Mail size={18} />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
