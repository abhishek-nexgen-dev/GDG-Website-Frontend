import { X, Calendar, Image, Globe, Lock, ExternalLink } from "lucide-react";
import type { AlbumItem } from "../data/albums.data";

interface AlbumDetailsModalProps {
  album: AlbumItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const AlbumDetailsModal = ({ album, isOpen, onClose }: AlbumDetailsModalProps) => {
  if (!isOpen || !album) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 transition-opacity" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#232830] bg-[#161a1f] p-6 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[#232830] bg-[#121519] text-white/40 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
        >
          <X size={16} />
        </button>

        {/* Thumbnail Preview Banner */}
        <div className="relative h-44 w-full overflow-hidden rounded-xl border border-[#2b323d]">
          <img
            src={album.thumbnail}
            alt={album.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div>
              <span className="rounded-md border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                {album.eventName}
              </span>
              <h3 className="mt-1 text-base font-bold text-white leading-tight">
                {album.title}
              </h3>
            </div>
            <span className="rounded-lg border border-white/20 bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {album.imagesCount} Photos
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-xs leading-relaxed text-white/70">{album.description}</p>

        {/* Meta Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3">
            <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
              <Calendar size={13} />
              <span>Event Date</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-white">{album.eventDate}</p>
          </div>

          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3">
            <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
              <Image size={13} />
              <span>Total Photos</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-[#4ade80]">{album.imagesCount} Images</p>
          </div>

          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3">
            <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
              {album.visibility === "Public" ? <Globe size={13} /> : <Lock size={13} />}
              <span>Visibility</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-white">{album.visibility}</p>
          </div>

          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3">
            <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
              <span>Status</span>
            </div>
            <p
              className={`mt-1 text-xs font-semibold ${
                album.status === "Published"
                  ? "text-[#4ade80]"
                  : album.status === "Draft"
                    ? "text-[#fbbf24]"
                    : "text-[#f87171]"
              }`}
            >
              {album.status}
            </p>
          </div>
        </div>

        {/* Tags */}
        {album.tags && album.tags.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {album.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[#2b323d] bg-[#121519] px-2 py-0.5 text-xs text-white/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 flex items-center justify-between border-t border-[#232830] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
          >
            Close
          </button>

          <div className="flex items-center gap-2">
            <a
              href="/gallery"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-xl bg-[#22c55e] px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
            >
              <ExternalLink size={13} />
              <span>Public Gallery</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumDetailsModal;
