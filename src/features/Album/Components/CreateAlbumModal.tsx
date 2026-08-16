import { useState } from "react";
import { X, FolderPlus, Sparkles } from "lucide-react";
import type { AlbumItem, AlbumVisibility, AlbumStatus } from "../data/albums.data";

interface CreateAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateAlbum: (album: Omit<AlbumItem, "id">) => void;
}

const CreateAlbumModal = ({ isOpen, onClose, onCreateAlbum }: CreateAlbumModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventName, setEventName] = useState("Jharkhand Tech Summit 2026");
  const [eventDate, setEventDate] = useState("15 - 16 Jul 2026");
  const [imagesCount, setImagesCount] = useState(0);
  const [visibility, setVisibility] = useState<AlbumVisibility>("Public");
  const [status, setStatus] = useState<AlbumStatus>("Published");
  const [thumbnail, setThumbnail] = useState(
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=80",
  );
  const [tagsInput, setTagsInput] = useState("Hackathon, Keynote, Awards");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    onCreateAlbum({
      title,
      description,
      eventName,
      eventDate,
      imagesCount: Number(imagesCount) || 0,
      visibility,
      status,
      createdOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      createdBy: "Abhishek Gupta",
      thumbnail:
        thumbnail ||
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=80",
      tags,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 transition-opacity" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg overflow-y-auto rounded-2xl border border-[#232830] bg-[#161a1f] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#232830] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#143321] text-[#22c55e] border border-[#1c472d]">
              <FolderPlus size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Create New Album</h3>
              <p className="text-xs text-white/40">Add a new event gallery collection</p>
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
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Album Title <span className="text-[#22c55e]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Jharkhand Tech Summit 2026"
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Short Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Glimpses from the 24-hour hackathon at BIT Mesra."
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Associated Event</label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Jharkhand Tech Summit 2026"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Event Date</label>
              <input
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                placeholder="15 - 16 Jul 2026"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Visibility</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as AlbumVisibility)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3 py-2 text-xs text-white focus:border-[#22c55e] focus:outline-none"
              >
                <option value="Public" className="bg-[#161a1f] text-white">Public</option>
                <option value="Private" className="bg-[#161a1f] text-white">Private</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AlbumStatus)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3 py-2 text-xs text-white focus:border-[#22c55e] focus:outline-none"
              >
                <option value="Published" className="bg-[#161a1f] text-white">Published</option>
                <option value="Draft" className="bg-[#161a1f] text-white">Draft</option>
                <option value="Unpublished" className="bg-[#161a1f] text-white">Unpublished</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Cover Thumbnail URL (Optional)
            </label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
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
              placeholder="Hackathon, Keynote, Awards"
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
              Create Album
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAlbumModal;
