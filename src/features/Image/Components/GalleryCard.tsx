
import { Link } from "react-router";

type GalleryCardProps = {
  title?: string;
  date?: string;
  image?: string;
  imagesCount?: number;
};

const GalleryCard = ({
  title = "Ranchi Hacks",
  date = "24 Aug 2025",
  image = "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_500,h_500,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/events/ranchi%20hacks%20logo%20bevy_7lUCZUX.png",
  imagesCount = 20,
}: GalleryCardProps) => {
  return (
    <Link
      to={`/events/Gallery/${title}`}
      className="group relative aspect-auto w-[90%] overflow-hidden rounded-3xl"
    >
      {/* Image */}
      <div className="h-full w-full overflow-hidden rounded-3xl">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      {/* Bottom Card */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-[#111111]/90 px-5 py-4 backdrop-blur-xl">
        {/* Left */}
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>

          <p className="mt-1 text-sm text-gray-400">{date}</p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
          <img src="/solar_gallery-bold.png" alt="Gallery" className="h-5 w-5" />

          <span className="text-sm font-medium text-white">{imagesCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default GalleryCard;
