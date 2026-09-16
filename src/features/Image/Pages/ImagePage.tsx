import { useState, useEffect, useMemo, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Download,
  X,
  Search,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";
import ParticleText from "../../../Components/ParticleText";
import ImagePageEffect from "../Components/ImagePageEffect";
import Masonry from "../../../Components/Masonry";
import Swal from "sweetalert2";
import useFetchGalleryBySlugQuery from "../hooks/useFetchGalleryBySlugQuery";
import useImageStore from "../store/useImageStore";
import GDGLoader from "../../../Components/GDGLoader";

export interface GalleryItem {
  id: string;
  img: string;
  url: string;
  title: string;
  caption?: string;
  category: string;
  featured?: boolean;
  width?: number;
  height?: number;
}

const ImagePage = () => {
  const { GalleryName, Slug, slug: routeSlug } = useParams();
  const slug = GalleryName || Slug || routeSlug || "";
  const navigate = useNavigate();

  const [showGdgLoader, setShowGdgLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGdgLoader(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Zustand Store for search and lightbox
  const { selectedImage, setSelectedImage, searchQuery, setSearchQuery } =
    useImageStore();

  // TanStack Query for backend gallery
  const {
    data: apiGallery,
    isLoading: isGalleryLoading,
    isError,
    error,
    refetch,
  } = useFetchGalleryBySlugQuery(slug);

  const galleryTitle = useMemo(() => {
    if (apiGallery?.title) return apiGallery.title;
    if (!slug) return "Gallery";
    return decodeURIComponent(slug)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }, [slug, apiGallery]);

  const rawImages: GalleryItem[] = useMemo(() => {
    if (
      apiGallery &&
      Array.isArray(apiGallery.images) &&
      apiGallery.images.length > 0
    ) {
      return apiGallery.images.map((img: any, idx: number) => ({
        id: img._id || img.publicId || `img-${idx}`,
        img: typeof img === "string" ? img : img.imageUrl || img.url || "",
        url:
          typeof img === "string"
            ? img
            : img.imageUrl ||
              img.url ||
              "https://gdg.community.dev/gdg-ranchi/",
        title: img.caption || img.title || `${galleryTitle} Photo ${idx + 1}`,
        caption: img.caption || img.title || "",
        category: img.category || (img.featured ? "Featured" : "Community"),
        featured: Boolean(img.featured),
      }));
    }
    return [];
  }, [apiGallery, galleryTitle]);

  // Real-time filtering by Name or Caption
  const filteredImages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return rawImages;
    return rawImages.filter((item) => {
      const matchName = item.title && item.title.toLowerCase().includes(query);
      const matchCaption =
        item.caption && item.caption.toLowerCase().includes(query);
      return matchName || matchCaption;
    });
  }, [rawImages, searchQuery]);

  const handleDownload = (img: GalleryItem) => {
    Swal.fire({
      title: "Download Image",
      text: `Opening full-resolution image for ${img.title}`,
      icon: "info",
      background: "#0c0d14",
      color: "#ffffff",
      confirmButtonColor: "#4285F4",
    });
    window.open(img.img, "_blank", "noopener,noreferrer");
  };

  // Display initial GDG Loader while loading or during 5s intro
  const isLoading = isGalleryLoading || showGdgLoader;

  if (isLoading) {
    return <GDGLoader />;
  }

  // Dedicated Error State (Handles 404, network error, or missing slug)
  if (isError || !apiGallery) {
    return (
      <section className="relative min-h-screen w-full bg-[#010101] text-white overflow-hidden flex items-center justify-center p-4">
        <ImagePageEffect />
        <div className="relative z-10 max-w-md w-full text-center rounded-3xl border border-white/10 bg-[#090d16]/90 p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="mx-auto h-16 w-16 rounded-2xl bg-[#EA4335]/10 border border-[#EA4335]/20 flex items-center justify-center text-[#EA4335] mb-5">
            <AlertCircle size={32} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#EA4335]">
            Gallery Error
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">
            Album Not Found
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed">
            {error?.message ||
              `We couldn't find the gallery "${slug || "unknown"}". It might be unpublished, private, or does not exist.`}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-5 py-2.5 text-xs font-semibold text-white transition cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>Go Back</span>
            </button>
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-[#4285F4] hover:bg-[#3367D6] px-5 py-2.5 text-xs font-semibold text-white transition shadow-[0_4px_16px_rgba(66,133,244,0.3)] cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Retry</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full bg-[#010101] text-white overflow-hidden selection:bg-[#FBBC04]/30">
      <ImagePageEffect />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24">
        {/* Hero Header */}
        <div className="relative mb-12 mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#34A853] animate-pulse" />
            <Sparkles size={14} className="text-[#FBBC04]" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/80">
              {galleryTitle} Album
            </span>
          </div>

          {/* Particle Animated Title */}
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
              fontSize="clamp(2.4rem, 5vw, 5rem)"
              fontWeight={800}
              glow={false}
            />
          </div>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-gray-400">
            {apiGallery?.description ||
              `Explore every photo and highlight from ${galleryTitle}. Relive the keynotes, community sessions, and developer stories captured throughout the event.`}
          </p>
        </div>

        {/* Search Bar (Search by name or caption) */}
        <div className="mb-10 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-[#090d16]/80 p-3 sm:p-4 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search photos by name or caption..."
                className="w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-10 py-2.5 text-xs text-white placeholder-gray-500 focus:border-[#4285F4] focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Photo Count */}
            <div className="text-xs font-semibold text-gray-400 flex items-center gap-1.5 shrink-0 pr-2">
              <span className="text-white font-bold">
                {filteredImages.length}
              </span>
              <span>of</span>
              <span className="text-white font-bold">{rawImages.length}</span>
              <span>photos</span>
            </div>
          </div>
        </div>

        {/* Gallery Content */}
        {rawImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] py-20 px-4 text-center">
            <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 mb-4">
              <ImageIcon size={24} />
            </div>
            <h3 className="text-lg font-bold text-white">No photos uploaded yet</h3>
            <p className="mt-1 text-xs text-gray-400 max-w-sm">
              This album currently has no photos. Check back soon for event uploads!
            </p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-white/[0.02] py-20 px-4 text-center">
            <h3 className="text-lg font-bold text-white">
              No photos match your search
            </h3>
            <p className="mt-1 text-xs text-gray-400 max-w-sm">
              No photos found matching "{searchQuery}". Try adjusting your search
              term.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 transition cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="w-full">
            <Masonry
              items={filteredImages}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={1.03}
              blurToFocus
              colorShiftOnHover={false}
              enableGrayscale={true}
              onItemClick={(item) => setSelectedImage(item as GalleryItem)}
            />
          </div>
        )}
      </div>

      {/* Public Lightbox Modal (Read-Only: Full View & Download Original, No Edit/Delete) */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-h-[92vh] max-w-5xl w-full overflow-hidden rounded-3xl border border-white/20 bg-[#0a0f18] p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4285F4]">
                  {selectedImage.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {selectedImage.title}
                </h3>
                {selectedImage.caption &&
                  selectedImage.caption !== selectedImage.title && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      {selectedImage.caption}
                    </p>
                  )}
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 flex max-h-[65vh] items-center justify-center overflow-hidden rounded-2xl bg-black/60 border border-white/10">
              <img
                src={selectedImage.img}
                alt={selectedImage.title}
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                GDG Ranchi Community Archive
              </span>

              <button
                type="button"
                onClick={() => handleDownload(selectedImage)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#4285F4] px-4 py-2 text-xs font-bold text-white shadow-[0_4px_16px_rgba(66,133,244,0.4)] transition hover:bg-[#3367D6] cursor-pointer"
              >
                <Download size={14} />
                <span>Download Original</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(ImagePage);

