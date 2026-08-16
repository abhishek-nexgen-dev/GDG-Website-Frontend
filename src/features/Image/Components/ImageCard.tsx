import { useState } from "react";
import { MoreVertical, Eye, Download, Copy, Trash2, Check } from "lucide-react";
import type { ImageItem } from "../data/images.data";

interface ImageCardProps {
  image: ImageItem;
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
  onViewImage: (image: ImageItem) => void;
  onDeleteImage?: (id: string) => void;
}

const ImageCard = ({
  image,
  isSelected,
  onSelect,
  onViewImage,
  onDeleteImage,
}: ImageCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-[#161a1f] transition-all hover:border-[#2f3540] ${
        isSelected ? "border-[#22c55e] ring-1 ring-[#22c55e]" : "border-[#232830]"
      }`}
    >
      {/* Top Image Preview */}
      <div className="relative h-44 w-full cursor-pointer overflow-hidden bg-[#121519]" onClick={() => onViewImage(image)}>
        <img
          src={image.url}
          alt={image.fileName}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Checkbox Overlay (Top-Left) */}
        <div
          className="absolute left-2.5 top-2.5 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          <label className="relative flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border border-white/20 bg-black/60 backdrop-blur-sm transition-colors hover:border-white/40">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => onSelect(image.id, e.target.checked)}
              className="peer sr-only"
            />
            {isSelected && <Check size={12} strokeWidth={3} className="text-[#22c55e]" />}
          </label>
        </div>

        {/* Format Badge (Top-Right) */}
        <div className="absolute right-2.5 top-2.5 z-10">
          <span className="rounded-md border border-white/10 bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {image.format}
          </span>
        </div>
      </div>

      {/* Card Body Info */}
      <div className="flex flex-1 flex-col justify-between p-3.5">
        <div>
          <div className="flex items-start justify-between gap-1">
            <h4
              onClick={() => onViewImage(image)}
              className="cursor-pointer truncate text-xs font-semibold text-white transition-colors hover:text-[#4ade80]"
            >
              {image.fileName}
            </h4>

            {/* Context Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-6 w-6 items-center justify-center rounded-md text-white/40 transition hover:bg-white/[0.06] hover:text-white"
              >
                <MoreVertical size={13} />
              </button>

              {isMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-7 z-30 w-36 rounded-xl border border-[#2b323d] bg-[#1b2027] p-1.5 shadow-xl">
                    <button
                      type="button"
                      onClick={() => {
                        onViewImage(image);
                        setIsMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                    >
                      <Eye size={13} />
                      <span>Preview</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = image.url;
                        link.download = image.fileName;
                        link.target = "_blank";
                        link.click();
                        setIsMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                    >
                      <Download size={13} />
                      <span>Download</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(image.url);
                        setIsMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-1 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                    >
                      <Copy size={13} />
                      <span>Copy URL</span>
                    </button>

                    {onDeleteImage && (
                      <button
                        type="button"
                        onClick={() => {
                          onDeleteImage(image.id);
                          setIsMenuOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2 py-1 text-xs text-rose-400 transition hover:bg-[#38181a]"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          <p className="mt-0.5 truncate text-[11px] text-white/50">{image.albumName}</p>
          <p className="truncate text-[10px] text-white/40">Event: {image.eventShort}</p>
        </div>

        {/* Footer Meta */}
        <div className="mt-3 flex items-center justify-between border-t border-[#232830] pt-2 text-[10px] text-white/40">
          <span className="truncate">by {image.uploader}</span>
          <span className="shrink-0 font-medium text-white/60">
            {image.timeAgo} • {image.size}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
