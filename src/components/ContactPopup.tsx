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

            {/* Direct Contact List - Ergonomic and Spelled Out */}
            <div className="flex flex-col space-y-10 mt-4">
              
              {/* Call */}
              <a href="tel:+34647383266" className="group flex flex-col items-start border-b border-black/5 pb-6">
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-black/20 mb-3 group-hover:text-black/40 transition-colors">Call Studio</span>
                <span className="text-xl md:text-2xl font-medium tracking-tight text-black">+34 647 383 266</span>
              </a>

              {/* Message / Instagram */}
              <a href="https://www.instagram.com/isabelromer.interiordesign/" target="_blank" rel="noreferrer" className="group flex flex-col items-start border-b border-black/5 pb-6">
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-black/20 mb-3 group-hover:text-black/40 transition-colors">Direct Message</span>
                <span className="text-xl md:text-2xl font-medium tracking-tight text-black">@isabelromer.interiordesign</span>
              </a>

              {/* Email */}
              <a href="mailto:proyectos@isabelromer.com" className="group flex flex-col items-start">
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-black/20 mb-3 group-hover:text-black/40 transition-colors">Email Projects</span>
                <span className="text-xl md:text-2xl font-medium tracking-tight text-black">proyectos@isabelromer.com</span>
              </a>

            </div>

            {/* Subtle Footer Tag */}
            <div className="mt-[auto] pt-12">
               <span className="text-[9px] uppercase tracking-[0.4em] font-black text-black/10">Madrid — Spain</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
