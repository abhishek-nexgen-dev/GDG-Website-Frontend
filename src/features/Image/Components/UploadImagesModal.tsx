import { useState, useRef } from "react";
import { X, UploadCloud, Image, Sparkles } from "lucide-react";
import type { ImageItem } from "../data/images.data";

interface UploadImagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadImage: (image: Omit<ImageItem, "id" | "timeAgo">) => void;
}

const UploadImagesModal = ({ isOpen, onClose, onUploadImage }: UploadImagesModalProps) => {
  const [selectedAlbum, setSelectedAlbum] = useState("Jharkhand Tech Summit 2026");
  const [selectedEvent, setSelectedEvent] = useState("JTS 2026");
  const [tagsInput, setTagsInput] = useState("Keynote, Summit, 2026");
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fileSize, setFileSize] = useState("3.5 MB");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = fileName || `image_${Date.now()}.jpg`;
    const finalUrl =
      previewUrl ||
      imageUrl ||
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80";

    const format = finalName.toLowerCase().endsWith(".png")
      ? "PNG"
      : finalName.toLowerCase().endsWith(".webp")
        ? "WEBP"
        : "JPG";

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onUploadImage({
      fileName: finalName,
      url: finalUrl,
      albumName: selectedAlbum,
      eventName: selectedAlbum,
      eventShort: selectedEvent,
      uploader: "Abhishek Gupta",
      size: fileSize || "3.5 MB",
      format,
      tags,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 transition-opacity" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-y-auto rounded-2xl border border-[#232830] bg-[#161a1f] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#232830] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#143321] text-[#22c55e] border border-[#1c472d]">
              <UploadCloud size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Upload Images</h3>
              <p className="text-xs text-white/40">Upload photos to community albums</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#232830] bg-[#121519] text-white/40 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2b323d] bg-[#121519] p-6 text-center cursor-pointer transition-colors hover:border-[#22c55e]"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            {previewUrl ? (
              <div className="relative h-28 w-full overflow-hidden rounded-xl">
                <img
                  src={previewUrl}
                  alt="Upload preview"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-semibold text-white">Click to replace photo</span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#161a1f] text-white/40 border border-[#232830] group-hover:text-[#22c55e]">
                  <Image size={22} />
                </div>
                <p className="mt-3 text-xs font-semibold text-white">
                  Click or drag images to upload
                </p>
                <p className="mt-0.5 text-[11px] text-white/40">PNG, JPG or WEBP up to 20MB</p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">File Name</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="e.g. jts2026_keynote.jpg"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">File Size</label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="4.2 MB"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Target Album</label>
              <select
                value={selectedAlbum}
                onChange={(e) => setSelectedAlbum(e.target.value)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3 py-2 text-xs text-white focus:border-[#22c55e] focus:outline-none"
              >
                <option value="Jharkhand Tech Summit 2026" className="bg-[#161a1f] text-white">
                  Jharkhand Tech Summit 2026
                </option>
                <option value="MERN Stack Workshop" className="bg-[#161a1f] text-white">
                  MERN Stack Workshop
                </option>
                <option value="Dev Connect Meetup" className="bg-[#161a1f] text-white">
                  Dev Connect Meetup
                </option>
                <option value="AI in Action - Tech Talk" className="bg-[#161a1f] text-white">
                  AI in Action - Tech Talk
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Event Tag</label>
              <input
                type="text"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                placeholder="e.g. JTS 2026"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Or Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setPreviewUrl(e.target.value);
              }}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Tags (comma separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Keynote, Summit, Auditorium"
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#232830] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
            >
              <Sparkles size={14} />
              Save Photo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadImagesModal;
