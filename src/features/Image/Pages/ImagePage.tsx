import ParticleText from "../../../Components/ParticleText";
import Masonry from "../../../Components/Masonry";
import { memo } from "react";
import ImagePageEffect from "../Components/ImagePageEffect";
import { useParams } from "react-router-dom";
export interface GalleryItem {
  id: string;
  img: string;
  url: string;
  title: string;
  category: string;
  width?: number;
  height?: number;
}

export const images: GalleryItem[] = [
  {
    id: "1",
    img: "https://imgs.search.brave.com/gLH5Au-TgJmgV1wUTDMsxAE1QN72OVStsJhB4gbGdj8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNC8w/NS8wNy8wNi80NC9j/YXQtMzM5NDAwXzY0/MC5qcGc",
    url: "https://gdg.community.dev/gdg-ranchi/",
    title: "RanchiHacks 2026 Grand Finale",
    category: "Hackathon",
  },
];

const ImagePage = () => {
  const { GalleryName } = useParams();
  const slug = GalleryName || "ranchihacks-2025"; // Fallback to default if no slug

  // Optional: You can use the slug to filter or customize the gallery content
  const galleryTitle = slug
    ? decodeURIComponent(slug)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    : "RanchiHacks 2025";

  return (
    <section className="relative min-h-screen w-full bg-[#010101]">
      <ImagePageEffect />
      <div className="relative z-10 w-[80%] mx-auto py-[13vh]">
        {/* Header */}
        <div className="relative mb-[7vh] mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm font-medium text-white/70">{galleryTitle} Gallery</span>
          </div>

          {/* Title */}
          <div className="mt-8">
            <ParticleText
              text={galleryTitle}
              particleSize={1.6}
              density={6}
              color="white"
              highlightColor="#4285F4"
              scatter={120}
              gatherDuration={1200}
              stagger={150}
              pointerRepel={20}
              repelRadius={90}
              idleDrift={0.25}
              trigger="mount"
              fontSize="clamp(3.5rem,7vw,8rem)"
              fontWeight={800}
              glow={false}
            />
          </div>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
            Every photo tells a story of innovation, teamwork, and unforgettable memories. Explore
            the moments that made {galleryTitle} an inspiring journey for every builder.
          </p>
        </div>

        {/* Gallery */}
        <div className="flex items-center justify-center w-full">
          <Masonry
            items={images}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>
      </div>
    </section>
  );
};

export default memo(ImagePage);
