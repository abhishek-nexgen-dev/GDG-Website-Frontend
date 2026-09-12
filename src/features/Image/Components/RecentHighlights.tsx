import { CalendarDays, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { GalleryCardType } from "../types/Gallery.type";

type RecentHighlightsProps = {
  albums: GalleryCardType[];
};

export const RecentHighlights = ({ albums }: RecentHighlightsProps) => {
  if (!albums || albums.length === 0) return null;

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 mt-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-[#34A853]" />
          <h2 className="text-xl font-bold text-white">Recent Highlights</h2>
        </div>
        <Link to="/gallery/all" className="flex items-center gap-2 text-sm font-medium text-[#4285F4] hover:text-[#4285F4]/80 transition-colors">
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {albums.slice(0, 4).map((album) => (
          <Link 
            key={album._id} 
            to={`/gallery/${album.slug}`}
            className="group block relative overflow-hidden rounded-2xl bg-[#111] border border-white/5 transition-all hover:border-white/10 hover:shadow-2xl hover:shadow-black/50"
          >
            {/* Image container */}
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img 
                src={album.albumImageUrl} 
                alt={album.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-4">
              <h3 className="text-lg font-bold text-white mb-3 line-clamp-1 group-hover:text-[#4285F4] transition-colors">
                {album.title}
              </h3>
              
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  <span>{new Date(album.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ImageIcon size={14} />
                  <span>{album.imageCount} photos</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
