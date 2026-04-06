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
                <h2 className="branding-font text-4xl text-black uppercase tracking-tighter font-black">LETS TALK.</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 -mr-2 text-black/20 hover:text-black transition-colors duration-300"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Direct Contact List - Refined Visual Hierarchy */}
            <div className="flex flex-col space-y-12 mt-6">
              {/* WhatsApp */}
              <a href="https://wa.me/34665338108" target="_blank" rel="noreferrer" className="group flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40 mb-3 group-hover:text-black transition-colors">WhatsApp</span>
                <span className="text-xl md:text-2xl font-light tracking-tight text-black">+34 665 338 108</span>
              </a>

              {/* Email */}
              <a href="mailto:proyectos@isabelromer.com" className="group flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40 mb-3 group-hover:text-black transition-colors">Email</span>
                <span className="text-xl md:text-2xl font-light tracking-tight text-black">proyectos@isabelromer.com</span>
              </a>

              {/* Instagram */}
              <a href="https://www.instagram.com/isabelromer.interiordesign/" target="_blank" rel="noreferrer" className="group flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/40 mb-3 group-hover:text-black transition-colors">Instagram</span>
                <span className="text-xl md:text-2xl font-light tracking-tight text-black">@isabelromer.interiordesign</span>
              </a>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
