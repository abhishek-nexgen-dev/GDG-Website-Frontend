import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ExperimentalImage } from "../../data/newGalleryData";

type GalleryLightboxProps = {
  images: ExperimentalImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export const GalleryLightbox = ({ images, currentIndex, isOpen, onClose, onNavigate }: GalleryLightboxProps) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
    if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen || !images.length) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl">
      {/* Controls */}
      <button onClick={onClose} className="absolute top-6 right-6 z-50 text-white/50 hover:text-white transition-colors">
        <X size={32} strokeWidth={1.5} />
      </button>

      <button 
        onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 text-white/50 hover:text-white transition-colors"
      >
        <ChevronLeft size={48} strokeWidth={1} />
      </button>

      <button 
        onClick={() => onNavigate((currentIndex + 1) % images.length)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 text-white/50 hover:text-white transition-colors"
      >
        <ChevronRight size={48} strokeWidth={1} />
      </button>

      {/* Image Container */}
      <div className="relative max-h-[85vh] max-w-[85vw] flex flex-col items-center">
        <img 
          src={currentImage.src} 
          alt={currentImage.alt}
          className="max-h-[80vh] max-w-full object-contain rounded-md shadow-2xl shadow-black"
        />
        
        {/* Metadata */}
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold tracking-widest text-white uppercase">{currentImage.event}</h3>
          <div className="mt-2 flex items-center justify-center gap-4 text-sm text-zinc-400">
            <span>{currentImage.year}</span>
            {currentImage.location && (
              <>
                <span className="h-1 w-1 rounded-full bg-zinc-600" />
                <span>{currentImage.location}</span>
              </>
            )}
          </div>
          {currentImage.description && (
            <p className="mt-4 max-w-lg text-sm text-zinc-300 italic">"{currentImage.description}"</p>
          )}
        </div>
      </div>
      
      {/* Counter */}
      <div className="absolute bottom-6 left-6 text-sm tracking-widest text-zinc-500 font-mono">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};
