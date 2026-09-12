import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { GalleryCardType } from "../types/Gallery.type";

type YearlyGalleryProps = {
  year: number;
  albums: GalleryCardType[];
  color: string; // The color for the dot, e.g. "bg-[#a142f4]" or "bg-[#34A853]"
};

export const YearlyGallery = ({ year, albums, color }: YearlyGalleryProps) => {
  if (!albums || albums.length === 0) return null;

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 mt-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`h-3 w-3 rounded-full ${color}`} />
          <h2 className="text-2xl font-bold text-white">{year}</h2>
        </div>
        <Link to={`/gallery/year/${year}`} className="flex items-center gap-2 text-sm font-medium text-[#4285F4] hover:text-[#4285F4]/80 transition-colors">
          View Year <ArrowRight size={16} />
        </Link>
      </div>

      {/* Grid of Photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {albums.map((album) => (
          <Link 
            key={album._id} 
            to={`/gallery/${album.slug}`}
            className="group block relative overflow-hidden rounded-xl border border-white/5 transition-all hover:border-white/20 hover:scale-[1.02] hover:z-10 hover:shadow-2xl"
          >
            <div className="aspect-[4/3] w-full">
              <img 
                src={album.albumImageUrl} 
                alt={album.title}
                className="h-full w-full object-cover"
              />
              {/* Optional overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                <span className="text-white font-bold text-sm leading-tight line-clamp-3">
                  {album.title}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
