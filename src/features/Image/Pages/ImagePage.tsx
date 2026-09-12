import { useState, useMemo, memo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Download, X, Loader2 } from "lucide-react";
import ParticleText from "../../../Components/ParticleText";
import Masonry from "../../../Components/Masonry";
import ImagePageEffect from "../Components/ImagePageEffect";
import Swal from "sweetalert2";
import useFetchGalleryBySlugQuery from "../hooks/useFetchGalleryBySlugQuery";

export interface GalleryItem {
  id: string;
  img: string;
  url: string;
  title: string;
  category: string;
  width?: number;
  height?: number;
}

// Curated high quality gallery items for GDG Ranchi albums
const ALL_GALLERY_IMAGES: Record<string, GalleryItem[]> = {
  "devfest-ranchi-2025": [
    {
      id: "df-1",
      img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Keynote Address: The Future of AI in India",
      category: "Keynote",
    },
    {
      id: "df-2",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Hackathon Teams Brainstorming & Architecture",
      category: "Hackathon",
    },
    {
      id: "df-3",
      img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Hands-on Workshop: Building with Gemini & Cloud",
      category: "Workshop",
    },
    {
      id: "df-4",
      img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Tech Talk: Modern Full-Stack & Microservices",
      category: "Tech Talk",
    },
    {
      id: "df-5",
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Main Auditorium Audience & Q&A Session",
      category: "Community",
    },
    {
      id: "df-6",
      img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Award Ceremony: Celebrating Innovation Winners",
      category: "Celebration",
    },
    {
      id: "df-7",
      img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Panel Discussion with Google Developer Experts",
      category: "Panel",
    },
    {
      id: "df-8",
      img: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Swag Booth & Community Networking Hub",
      category: "Networking",
    },
  ],
  default: [
    {
      id: "def-1",
      img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Opening Keynote & Welcome Ceremony",
      category: "Keynote",
    },
    {
      id: "def-2",
      img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Interactive Code Labs & Mentorship",
      category: "Workshop",
    },
    {
      id: "def-3",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Collaborative Project Sprint Sessions",
      category: "Hackathon",
    },
    {
      id: "def-4",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Technical Masterclass & Deep Dive",
      category: "Workshop",
    },
    {
      id: "def-5",
      img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Community Connections & Developer Meetup",
      category: "Community",
    },
    {
      id: "def-6",
      img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&auto=format&fit=crop&q=80",
      url: "https://gdg.community.dev/gdg-ranchi/",
      title: "Specialist Speaker Insights & Trends",
      category: "Tech Talk",
    },
  ],
};

const ImagePage = () => {
  const { GalleryName } = useParams();
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const slug = GalleryName || "devfest-ranchi-2025";
  const { data: apiGallery, isLoading: isGalleryLoading } = useFetchGalleryBySlugQuery(slug);

  const galleryTitle = useMemo(() => {
    if (apiGallery?.title) return apiGallery.title;
    if (!slug) return "DevFest Ranchi 2025";
    return decodeURIComponent(slug)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }, [slug, apiGallery]);

  const rawImages: GalleryItem[] = useMemo(() => {
    if (apiGallery && Array.isArray(apiGallery.images) && apiGallery.images.length > 0) {
      return apiGallery.images.map((img: any, idx: number) => ({
        id: img._id || `img-${idx}`,
        img: typeof img === "string" ? img : img.imageUrl || img.url || "",
        url: "https://gdg.community.dev/gdg-ranchi/",
        title: img.title || `${apiGallery.title || galleryTitle} Photo ${idx + 1}`,
        category: img.category || "General",
      }));
    }
    return ALL_GALLERY_IMAGES[slug] || ALL_GALLERY_IMAGES.default;
  }, [apiGallery, slug, galleryTitle]);

  const handleDownload = (img: GalleryItem) => {
    Swal.fire({
      title: "Download Image",
      text: `Opening full-resolution image for ${img.title}`,
      icon: "info",
      background: "#111116",
      color: "#ffffff",
      confirmButtonColor: "#4285F4",
    });
    window.open(img.img, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative min-h-screen w-full bg-[#010101] text-white overflow-hidden">
      <ImagePageEffect />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-gray-300 transition-all hover:border-[#4285F4]/60 hover:bg-[#4285F4]/10 hover:text-white"
          >
            <ArrowLeft size={16} />
            <span>Back to All Galleries</span>
          </Link>
        </div>

        {/* Header */}
        <div className="relative mb-12 mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            {isGalleryLoading ? (
              <Loader2 size={14} className="animate-spin text-blue-400" />
            ) : (
              <span className="h-2 w-2 rounded-full bg-[#34A853] animate-pulse" />
            )}
            <Sparkles size={14} className="text-[#FBBC04]" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">
              {galleryTitle} Album
            </span>
          </div>

          {/* Title */}
          <div className="mt-6">
            <ParticleText
              text={galleryTitle}
              particleSize={1.5}
              density={5}
              color="white"
              highlightColor="#4285F4"
              scatter={100}
              gatherDuration={1000}
              stagger={120}
              pointerRepel={18}
              repelRadius={80}
              idleDrift={0.2}
              trigger="mount"
              fontSize="clamp(2.5rem, 5vw, 5.5rem)"
              fontWeight={800}
              glow={false}
            />
          </div>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-400">
            Every photo tells a story of innovation, teamwork, and community memories. Explore
            the moments that made {galleryTitle} an inspiring journey for every builder.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="w-full">
          <Masonry
            items={rawImages}
            ease="power3.out"
            duration={0.6}
            stagger={0.05}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.97}
            blurToFocus
            colorShiftOnHover={false}
          />
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-[#0d0d10] p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4285F4]">
                  {selectedImage.category}
                </span>
                <h3 className="text-lg font-bold text-white sm:text-xl">{selectedImage.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex max-h-[65vh] items-center justify-center overflow-hidden rounded-xl bg-black/50">
              <img
                src={selectedImage.img}
                alt={selectedImage.title}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-400">GDG Ranchi Community Archive</span>
              <button
                type="button"
                onClick={() => handleDownload(selectedImage)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#4285F4] px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(66,133,244,0.4)] transition hover:bg-[#3367D6]"
              >
                <Download size={14} />
                Download Original
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(ImagePage);
