import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, UploadCloud, Image, Sparkles } from "lucide-react";

const UploadImagesPage = () => {
  const navigate = useNavigate();
  const [selectedAlbum, setSelectedAlbum] = useState("Jharkhand Tech Summit 2026");
  const [selectedEvent, setSelectedEvent] = useState("JTS 2026");
  const [tagsInput, setTagsInput] = useState("Keynote, Summit, 2026");
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [fileSize, setFileSize] = useState("3.5 MB");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    navigate("/member/images");
  };

  return (
    <div className="min-h-full w-full py-5 px-4 sm:px-6 lg:px-8 text-white max-w-4xl">
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/member/images")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#232830] bg-[#161a1f] text-white/60 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Upload Images</h1>
          <p className="text-xs text-white/40">Add new high-resolution event photographs</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#232830] bg-[#161a1f] p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2b323d] bg-[#121519] p-8 text-center cursor-pointer transition-colors hover:border-[#22c55e]"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />

            {previewUrl ? (
              <div className="relative h-40 w-full overflow-hidden rounded-xl">
                <img src={previewUrl} alt="Upload preview" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-semibold text-white">Click to replace photo</span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#161a1f] text-white/40 border border-[#232830] group-hover:text-[#22c55e]">
                  <Image size={24} />
                </div>
                <p className="mt-3 text-sm font-semibold text-white">
                  Click or drag images to upload
                </p>
                <p className="mt-0.5 text-xs text-white/40">PNG, JPG or WEBP up to 20MB</p>
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
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">File Size</label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="4.2 MB"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Target Album</label>
              <select
                value={selectedAlbum}
                onChange={(e) => setSelectedAlbum(e.target.value)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2.5 text-xs text-white focus:border-[#22c55e] focus:outline-none"
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
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
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
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
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
              placeholder="Keynote, Summit, Auditorium"
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#232830] pt-5">
            <button
              type="button"
              onClick={() => navigate("/member/images")}
              className="rounded-xl border border-[#232830] bg-[#121519] px-5 py-2.5 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
            >
              <Sparkles size={15} />
              <span>Upload Photo</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadImagesPage;
