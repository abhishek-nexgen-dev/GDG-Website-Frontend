import { MemoryPhoto } from "./MemoryPhoto";
import type { NarrativeSection, ExperimentalImage } from "../../data/newGalleryData";

type FloatingGalleryProps = {
  section: NarrativeSection;
  onImageClick: (image: ExperimentalImage) => void;
};

export const FloatingGallery = ({ section, onImageClick }: FloatingGalleryProps) => {
  return (
    <div className="w-full mt-12 md:mt-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {section.images.map((img, index) => {
          // Make some images span 2 columns for a masonry feel
          const isLarge = index === 0 || index === 5;
          return (
            <div 
              key={img.id} 
              className={`relative ${isLarge ? 'md:col-span-2 md:row-span-2 aspect-video' : 'aspect-square sm:aspect-[4/3]'} w-full`}
            >
              <MemoryPhoto 
                image={img} 
                onClick={() => onImageClick(img)}
                className="w-full h-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
