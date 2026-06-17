import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  description: string;
  onClose: () => void;
}

export default function Lightbox({ isOpen, imageUrl, title, description, onClose }: LightboxProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="lightbox-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-md"
        >
          {/* Close button */}
          <button
            id="lightbox-close-btn"
            onClick={onClose}
            className="absolute top-6 right-6 text-[#f2ca50] hover:scale-110 active:scale-95 cursor-pointer p-2 rounded-full hover:bg-white/5 transition-all"
            aria-label="Close Lightbox"
          >
            <X size={32} />
          </button>

          {/* Main Visual Frame */}
          <motion.div
            id="lightbox-content"
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full flex flex-col items-center justify-center relative bg-[#1c1b1b] p-3 rounded-lg border border-[#f2ca50]/15 shadow-2xl"
          >
            <img
              id="lightbox-img"
              src={imageUrl}
              alt={title || "Gallery Item"}
              className="max-h-[70vh] w-auto max-w-full rounded object-contain border border-[#f2ca50]/10"
              referrerPolicy="no-referrer"
            />
            {title && (
              <div id="lightbox-info" className="w-full mt-4 text-center px-4">
                <h4 className="font-serif text-lg md:text-xl text-[#f2ca50] tracking-wide font-medium">
                  {title}
                </h4>
                {description && (
                  <p className="font-sans text-xs md:text-sm text-[#d0c5af] mt-1 line-clamp-2">
                    {description}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
