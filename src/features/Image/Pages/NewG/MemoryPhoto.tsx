import { useState } from "react";
import type { ExperimentalImage } from "../../data/newGalleryData";

type MemoryPhotoProps = {
  image: ExperimentalImage;
  className?: string;
  onClick: () => void;
  style?: React.CSSProperties;
};

export const MemoryPhoto = ({ image, className = "", onClick, style = {} }: MemoryPhotoProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`group relative overflow-visible cursor-pointer ${className}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-full w-full overflow-hidden shadow-2xl transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <img 
          src={image.src} 
          alt={image.alt}
          className="h-full w-full object-cover brightness-[0.8] transition-all duration-700 group-hover:brightness-[1.1]"
          loading="lazy"
        />
        {/* Subtle inner border */}
        <div className="absolute inset-0 border border-white/10 pointer-events-none" />
      </div>

      {/* Floating Label */}
      <div 
        className={`absolute -bottom-4 -right-4 z-50 bg-[#0F0F0F]/90 backdrop-blur-xl border border-white/10 px-4 py-2 transition-all duration-500 pointer-events-none
          ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <p className="text-xs font-bold tracking-[0.2em] text-white uppercase whitespace-nowrap">
          {image.event}
        </p>
        <p className="text-[10px] text-zinc-500 tracking-wider mt-0.5">
          {image.year}
        </p>
      </div>
    </div>
  );
};
