import { X, Download, Copy, ExternalLink, HardDrive, Calendar } from "lucide-react";
import type { ImageItem } from "../data/images.data";

interface ImageViewModalProps {
  image: ImageItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewModal = ({ image, isOpen, onClose }: ImageViewModalProps) => {
  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/90 transition-opacity" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#232830] bg-[#161a1f] p-6 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg border border-[#232830] bg-[#121519] text-white/40 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
        >
          <X size={16} />
        </button>

        {/* Large Image Preview */}
        <div className="relative h-72 w-full overflow-hidden rounded-xl border border-[#2b323d] bg-black/60">
          <img src={image.url} alt={image.fileName} className="h-full w-full object-contain" />
          <div className="absolute right-3 top-3">
            <span className="rounded-md border border-white/20 bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase text-white backdrop-blur-sm">
              {image.format}
            </span>
          </div>
        </div>

        {/* Details and Meta */}
        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">{image.fileName}</h3>
            <p className="mt-0.5 text-xs text-white/60">{image.albumName}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const link = document.createElement("a");
                link.href = image.url;
                link.download = image.fileName;
                link.target = "_blank";
                link.click();
              }}
              className="flex items-center gap-1.5 rounded-xl border border-[#232830] bg-[#121519] px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-[#1b2027] hover:text-white"
            >
              <Download size={13} />
              <span>Download</span>
            </button>

            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(image.url)}
              className="flex items-center gap-1.5 rounded-xl border border-[#232830] bg-[#121519] px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-[#1b2027] hover:text-white"
            >
              <Copy size={13} />
              <span>Copy Link</span>
            </button>
          </div>
        </div>

        {/* Meta Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-[#232830] bg-[#121519] p-2.5">
            <div className="flex items-center gap-1 text-[10px] text-white/40">
              <Calendar size={11} />
              <span>Uploaded</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-white">{image.timeAgo}</p>
          </div>

          <div className="rounded-xl border border-[#232830] bg-[#121519] p-2.5">
            <div className="flex items-center gap-1 text-[10px] text-white/40">
              <HardDrive size={11} />
              <span>File Size</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-[#4ade80]">{image.size}</p>
          </div>

          <div className="rounded-xl border border-[#232830] bg-[#121519] p-2.5">
            <div className="text-[10px] text-white/40">Event Tag</div>
            <p className="mt-1 text-xs font-semibold text-white">{image.eventShort}</p>
          </div>

          <div className="rounded-xl border border-[#232830] bg-[#121519] p-2.5">
            <div className="text-[10px] text-white/40">Uploader</div>
            <p className="mt-1 text-xs font-semibold text-white truncate">{image.uploader}</p>
          </div>
        </div>

        {/* Tags */}
        {image.tags && image.tags.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5 border-t border-[#232830] pt-3">
            {image.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[#2b323d] bg-[#121519] px-2 py-0.5 text-xs text-white/70"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-end border-t border-[#232830] pt-4">
          <a
            href={image.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-[#22c55e] px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
          >
            <span>Open High-Res Original</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageViewModal;
