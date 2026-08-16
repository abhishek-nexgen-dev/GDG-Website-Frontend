import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import type { AlbumVisibility, AlbumStatus } from "../data/albums.data";

const CreateAlbumPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventName, setEventName] = useState("Jharkhand Tech Summit 2026");
  const [eventDate, setEventDate] = useState("15 - 16 Jul 2026");
  const [visibility, setVisibility] = useState<AlbumVisibility>("Public");
  const [status, setStatus] = useState<AlbumStatus>("Published");
  const [thumbnail, setThumbnail] = useState("");
  const [tagsInput, setTagsInput] = useState("Hackathon, Keynote, Awards");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    navigate("/member/albums");
  };

  return (
    <div className="min-h-full w-full py-5 px-4 sm:px-6 lg:px-8 text-white max-w-4xl">
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/member/albums")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#232830] bg-[#161a1f] text-white/60 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Create New Album</h1>
          <p className="text-xs text-white/40">Add a new photo collection for community events</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#232830] bg-[#161a1f] p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Short Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Glimpses from the 24-hour hackathon at BIT Mesra."
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Associated Event
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Jharkhand Tech Summit 2026"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Event Date</label>
              <input
                type="text"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                placeholder="15 - 16 Jul 2026"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Visibility</label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as AlbumVisibility)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2.5 text-xs text-white focus:border-[#22c55e] focus:outline-none"
              >
                <option value="Public" className="bg-[#161a1f] text-white">
                  Public
                </option>
                <option value="Private" className="bg-[#161a1f] text-white">
                  Private
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AlbumStatus)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2.5 text-xs text-white focus:border-[#22c55e] focus:outline-none"
              >
                <option value="Published" className="bg-[#161a1f] text-white">
                  Published
                </option>
                <option value="Draft" className="bg-[#161a1f] text-white">
                  Draft
                </option>
                <option value="Unpublished" className="bg-[#161a1f] text-white">
                  Unpublished
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Cover Image URL
            </label>
            <input
              type="url"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Hackathon, Keynote, Awards"
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#232830] pt-5">
            <button
              type="button"
              onClick={() => navigate("/member/albums")}
              className="rounded-xl border border-[#232830] bg-[#121519] px-5 py-2.5 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
            >
              <Sparkles size={15} />
              <span>Create Album</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAlbumPage;
