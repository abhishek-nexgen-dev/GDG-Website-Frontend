import { useCallback, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Eye,
  FolderOpen,
  Images,
  Lock,
  Maximize2,
  Tag,
  User,
  X,
  AlertCircle,
} from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useFetchGalleryBySlugQuery from "../../Image/hooks/useFetchGalleryBySlugQuery";
import useGalleryFetch from "../../Image/hooks/useGalleryFetch";
import GDGLoader from "../../../Components/GDGLoader";

const formatDate = (date?: string) => {
  if (!date) return "—";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
};

const MemberViewSingleAlbum = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const querySlug = searchParams.get("slug") || "";

  // If no slug in query param, fetch galleries list and select first
  const { data: galleriesList, isLoading: isListLoading } = useGalleryFetch();
  const activeSlug = querySlug || galleriesList?.data?.[0]?.slug || "";

  const {
    data: apiAlbum,
    isLoading: isAlbumLoading,
    isError,
  } = useFetchGalleryBySlugQuery(activeSlug);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const imagesList = useMemo(() => {
    if (!apiAlbum?.images || !Array.isArray(apiAlbum.images)) return [];
    return apiAlbum.images;
  }, [apiAlbum]);

  const selectedImage = useMemo(() => {
    if (selectedImageIndex === null || !imagesList[selectedImageIndex]) return null;
    return imagesList[selectedImageIndex];
  }, [selectedImageIndex, imagesList]);

  const openImage = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const closeImage = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const showPreviousImage = useCallback(() => {
    setSelectedImageIndex((current) => {
      if (current === null || imagesList.length === 0) return null;
      return current === 0 ? imagesList.length - 1 : current - 1;
    });
  }, [imagesList.length]);

  const showNextImage = useCallback(() => {
    setSelectedImageIndex((current) => {
      if (current === null || imagesList.length === 0) return null;
      return current === imagesList.length - 1 ? 0 : current + 1;
    });
  }, [imagesList.length]);

  const visibilityConfig = useMemo(() => {
    return apiAlbum?.visibility === "public"
      ? {
          label: "Public",
          icon: Eye,
          className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
        }
      : {
          label: "Private",
          icon: Lock,
          className: "border-amber-500/20 bg-amber-500/10 text-amber-400",
        };
  }, [apiAlbum?.visibility]);

  const statusConfig = useMemo(() => {
    return apiAlbum?.status === "published"
      ? "border-lime-500/20 bg-lime-500/10 text-lime-400"
      : "border-zinc-500/20 bg-zinc-500/10 text-zinc-400";
  }, [apiAlbum?.status]);

  if (isAlbumLoading || (isListLoading && !querySlug)) {
    return <GDGLoader />;
  }

  if (isError || !apiAlbum) {
    return (
      <div className="min-h-screen bg-[#0b0d0c] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-white">Album Not Found</h2>
        <p className="mt-2 text-xs text-zinc-400 max-w-sm">
          No album found with the specified slug. Please return to your albums dashboard.
        </p>
        <button
          type="button"
          onClick={() => navigate("/member/album")}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-5 py-2.5 text-xs font-semibold text-white transition cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Albums</span>
        </button>
      </div>
    );
  }

  const VisibilityIcon = visibilityConfig.icon;
  const eventTitle =
    typeof apiAlbum.event === "object" && apiAlbum.event !== null
      ? (apiAlbum.event as any).title || "GDG Event"
      : apiAlbum.event || "GDG Event";

  return (
    <div className="min-h-screen bg-[#0b0d0c] text-white">
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#0b0d0c]/95 backdrop-blur">
        <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/[0.08] text-zinc-400 transition hover:bg-white/[0.04] hover:text-white cursor-pointer"
              aria-label="Go back"
            >
              <ArrowLeft size={16} />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="text-zinc-600">Dashboard</span>
                <span className="text-zinc-700">/</span>
                <span className="text-zinc-600">Gallery</span>
                <span className="text-zinc-700">/</span>
                <span className="truncate text-lime-400">{apiAlbum.title}</span>
              </div>

              <h1 className="mt-1 truncate text-sm font-semibold text-zinc-100 sm:text-base">
                Album Details
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full px-4 py-5 sm:px-6 sm:py-7 lg:w-[90%] xl:w-[85%]">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <section className="overflow-hidden rounded-lg border border-white/[0.07] bg-[#101211]">
              <div className="relative aspect-[21/8] overflow-hidden bg-[#151816]">
                <img
                  src={
                    apiAlbum.albumImageUrl ||
                    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80"
                  }
                  alt={apiAlbum.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#101211] via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-md border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${statusConfig}`}
                    >
                      {apiAlbum.status || "published"}
                    </span>

                    <span
                      className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${visibilityConfig.className}`}
                    >
                      <VisibilityIcon size={11} />
                      {visibilityConfig.label}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-white sm:text-2xl">
                    {apiAlbum.title}
                  </h2>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Images size={14} className="text-lime-400" />
                  <span>{imagesList.length} Images</span>

                  <span className="text-zinc-700">•</span>

                  <CalendarDays size={14} className="text-lime-400" />
                  <span>{formatDate(apiAlbum.createdAt)}</span>
                </div>

                {apiAlbum.description && (
                  <div className="mt-5 border-t border-white/[0.06] pt-5">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                      Description
                    </p>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {apiAlbum.description}
                    </p>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-lg border border-white/[0.07] bg-[#101211]">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4 sm:px-6">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-200">Album Images</h3>

                  <p className="mt-1 text-xs text-zinc-600">
                    {imagesList.length} images in this album
                  </p>
                </div>

                <div className="flex h-8 items-center gap-2 rounded-md border border-white/[0.07] bg-white/[0.02] px-2.5 text-xs text-zinc-500">
                  <Images size={13} />
                  {apiAlbum.imageCount ?? imagesList.length}
                </div>
              </div>

              {imagesList.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 p-3 sm:grid-cols-3 sm:gap-3 sm:p-5 lg:grid-cols-4">
                  {imagesList.map((image, index) => (
                    <button
                      key={image._id || `img-${index}`}
                      type="button"
                      onClick={() => openImage(index)}
                      className="group relative aspect-square overflow-hidden rounded-md bg-[#151816] cursor-pointer"
                    >
                      <img
                        src={image.url}
                        alt={image.caption || `Photo ${index + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/25" />

                      {image.featured && (
                        <span className="absolute left-2 top-2 rounded bg-lime-500 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-[#0b0d0c]">
                          Featured
                        </span>
                      )}

                      <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-black/60 text-white opacity-0 transition group-hover:opacity-100">
                        <Maximize2 size={13} />
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                  <Images size={28} className="text-zinc-700" />

                  <p className="mt-3 text-sm text-zinc-500">No images available</p>

                  <p className="mt-1 text-xs text-zinc-700">
                    Images added to this album will appear here.
                  </p>
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-lg border border-white/[0.07] bg-[#101211]">
              <div className="border-b border-white/[0.06] px-5 py-4">
                <h3 className="text-sm font-semibold text-zinc-200">Album Information</h3>
              </div>

              <div className="divide-y divide-white/[0.05]">
                <InfoRow label="Album ID" value={apiAlbum._id} />

                <InfoRow label="Slug" value={apiAlbum.slug} />

                <InfoRow label="Total Images" value={`${imagesList.length} Images`} />

                <InfoRow label="Created" value={formatDate(apiAlbum.createdAt)} />

                <InfoRow label="Last Updated" value={formatDate(apiAlbum.updatedAt)} />
              </div>
            </section>

            <section className="rounded-lg border border-white/[0.07] bg-[#101211]">
              <div className="border-b border-white/[0.06] px-5 py-4">
                <h3 className="text-sm font-semibold text-zinc-200">Related Information</h3>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.03] text-lime-400">
                    <FolderOpen size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                      Event
                    </p>

                    <p className="mt-1 truncate text-sm text-zinc-300">{eventTitle}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.03] text-lime-400">
                    <User size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">
                      Community
                    </p>

                    <p className="mt-1 truncate text-sm text-zinc-300">GDG Ranchi</p>
                  </div>
                </div>
              </div>
            </section>

            {Array.isArray(apiAlbum.tags) && apiAlbum.tags.length > 0 && (
              <section className="rounded-lg border border-white/[0.07] bg-[#101211]">
                <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-4">
                  <Tag size={14} className="text-lime-400" />

                  <h3 className="text-sm font-semibold text-zinc-200">Tags</h3>
                </div>

                <div className="flex flex-wrap gap-2 p-5">
                  {apiAlbum.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5 text-xs text-zinc-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>
      </main>

      {selectedImage && selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={closeImage}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-black/40 text-zinc-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>

          {imagesList.length > 1 && (
            <button
              type="button"
              onClick={showPreviousImage}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border border-white/10 bg-black/40 text-white transition hover:bg-white/10 sm:left-6 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div className="flex max-h-full w-full max-w-6xl flex-col items-center">
            <img
              src={selectedImage.url}
              alt={selectedImage.caption || "Image Preview"}
              className="max-h-[78vh] max-w-full rounded-lg object-contain"
            />

            <div className="mt-4 flex w-full max-w-4xl items-center justify-between gap-4">
              <p className="truncate text-sm text-zinc-300">
                {selectedImage.caption || apiAlbum.title}
              </p>

              <span className="shrink-0 text-xs text-zinc-600">
                {selectedImageIndex + 1} / {imagesList.length}
              </span>
            </div>
          </div>

          {imagesList.length > 1 && (
            <button
              type="button"
              onClick={showNextImage}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-md border border-white/10 bg-black/40 text-white transition hover:bg-white/10 sm:right-6 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div className="px-5 py-3.5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-600">{label}</p>

      <p className="mt-1 break-all text-xs text-zinc-400">{value}</p>
    </div>
  );
};

export default MemberViewSingleAlbum;
