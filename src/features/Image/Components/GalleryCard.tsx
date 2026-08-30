import { Link } from "react-router-dom";
import type { GalleryCardType } from "../types/Gallery.type";

const GalleryCard: React.FC<GalleryCardType> = ({
  title,
  slug,
  albumImageUrl,
  imageCount,
  createdAt,
  description
}) => {
  const formattedDate = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      to={`/Gallery/${encodeURIComponent(slug)}`}
      className="group relative block w-full overflow-hidden rounded-3xl bg-gray-900 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
      aria-label={`View gallery for ${description || slug}`}
    >
      <div className="relative h-[4/3] w-full overflow-hidden sm:h-[16/9] md:h-[50vh]">
        <img
          src={albumImageUrl}
          alt={description || "Gallery album cover"}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <div className="flex items-end justify-between rounded-2xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md transition-all duration-300 group-hover:bg-black/80 sm:px-5 sm:py-4">
          <div className="flex-1 pr-4">
            <h3 className="line-clamp-1 text-base font-bold text-white sm:text-lg md:text-xl" title={description}>
              {title}
            </h3>
            <p className="mt-1 text-xs font-medium text-gray-300 sm:text-sm">
              {formattedDate}
            </p>
          </div>

          <div className="flex flex-shrink-0 items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-white shadow-sm backdrop-blur-sm group-hover:bg-white/20 transition-colors">
            <img
              src="/solar_gallery-bold.png"
              alt=""
              className="h-4 w-4 sm:h-5 sm:w-5"
              aria-hidden="true"
            />
            <span className="text-sm font-bold sm:text-base">{imageCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GalleryCard;