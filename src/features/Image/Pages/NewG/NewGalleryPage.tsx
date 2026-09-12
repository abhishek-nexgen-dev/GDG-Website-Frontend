import { useState } from "react";
import { Link } from "react-router-dom";
import { MemoryWorld } from "./MemoryWorld";
import { GalleryLightbox } from "./GalleryLightbox";
import { heroImages, gallerySections } from "../../data/newGalleryData";
import type { ExperimentalImage } from "../../data/newGalleryData";

// Minimal GDG Nav just for this page
const MinimalNav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference pointer-events-none">
    <div className="flex flex-col text-white">
      <span className="font-bold text-lg leading-tight tracking-tight">Google Developer Group</span>
      <span className="text-sm font-medium opacity-80">Ranchi</span>
    </div>
    <div className="hidden md:flex items-center gap-6 pointer-events-auto">
      <Link to="/" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <span className="text-[10px] font-bold tracking-wider">H</span>
      </Link>
      <Link to="/events" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <span className="text-[10px] font-bold tracking-wider">E</span>
      </Link>
      <button className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center bg-white/5 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
        <div className="flex flex-col gap-1 w-4">
          <div className="h-[1.5px] w-full bg-white rounded-full" />
          <div className="h-[1.5px] w-full bg-white rounded-full" />
          <div className="h-[1.5px] w-2/3 bg-white rounded-full" />
        </div>
      </button>
    </div>
  </nav>
);

const NewGalleryPage = () => {
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentLightboxImages, setCurrentLightboxImages] = useState<ExperimentalImage[]>([]);
  const [currentLightboxIndex, setCurrentLightboxIndex] = useState(0);

  // Combine all images for the world
  const allWorldImages = [
    ...heroImages,
    ...gallerySections.flatMap(s => s.images)
  ].slice(0, 30);

  const openLightbox = (image: ExperimentalImage) => {
    setCurrentLightboxImages(allWorldImages);
    setCurrentLightboxIndex(allWorldImages.findIndex(img => img.id === image.id));
    setLightboxOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black font-sans">
      
      {/* Navigation Overlays */}
      <MinimalNav />

      {/* ONE CONTINUOUS VISUAL EXPERIENCE */}
      <MemoryWorld images={allWorldImages} onImageClick={openLightbox} />

      {/* Global Lightbox */}
      <GalleryLightbox 
        isOpen={lightboxOpen}
        images={currentLightboxImages}
        currentIndex={currentLightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentLightboxIndex}
      />
    </div>
  );
};

export default NewGalleryPage;
