import { Search, ChevronDown, SlidersHorizontal, RotateCcw, X } from "lucide-react";

interface ImageFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedAlbum: string;
  onAlbumChange: (album: string) => void;
  selectedEvent: string;
  onEventChange: (event: string) => void;
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  selectedUploader: string;
  onUploaderChange: (uploader: string) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const ImageFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedAlbum,
  onAlbumChange,
  selectedEvent,
  onEventChange,
  selectedFormat,
  onFormatChange,
  selectedUploader,
  onUploaderChange,
  onResetFilters,
  hasActiveFilters,
}: ImageFilterBarProps) => {
  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between w-full">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[260px]">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40">
          <Search size={16} strokeWidth={1.8} />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by file name, album or tag..."
          className="w-full rounded-xl border border-[#232830] bg-[#161a1f] py-2.5 pl-10 pr-10 text-xs text-white placeholder-white/40 transition-colors focus:border-[#22c55e] focus:bg-[#1a1f26] focus:outline-none sm:text-sm"
        />

        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/40 hover:text-white"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Album Select */}
        <div className="relative min-w-[130px]">
          <select
            value={selectedAlbum}
            onChange={(e) => onAlbumChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2.5 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none sm:text-sm"
          >
            <option value="All" className="bg-[#161a1f] text-white">
              All Albums
            </option>
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
              AI in Action
            </option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
          />
        </div>

        {/* Event Select */}
        <div className="relative min-w-[130px]">
          <select
            value={selectedEvent}
            onChange={(e) => onEventChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2.5 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none sm:text-sm"
          >
            <option value="All" className="bg-[#161a1f] text-white">
              All Events
            </option>
            <option value="JTS 2026" className="bg-[#161a1f] text-white">
              JTS 2026
            </option>
            <option value="MERN Workshop" className="bg-[#161a1f] text-white">
              MERN Workshop
            </option>
            <option value="Dev Connect" className="bg-[#161a1f] text-white">
              Dev Connect
            </option>
            <option value="AI Talk" className="bg-[#161a1f] text-white">
              AI Talk
            </option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
          />
        </div>

        {/* Format Select */}
        <div className="relative min-w-[120px]">
          <select
            value={selectedFormat}
            onChange={(e) => onFormatChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2.5 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none sm:text-sm"
          >
            <option value="All" className="bg-[#161a1f] text-white">
              All Formats
            </option>
            <option value="JPG" className="bg-[#161a1f] text-white">
              JPG
            </option>
            <option value="PNG" className="bg-[#161a1f] text-white">
              PNG
            </option>
            <option value="WEBP" className="bg-[#161a1f] text-white">
              WEBP
            </option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
          />
        </div>

        {/* Uploader Select */}
        <div className="relative min-w-[130px]">
          <select
            value={selectedUploader}
            onChange={(e) => onUploaderChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2.5 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none sm:text-sm"
          >
            <option value="All" className="bg-[#161a1f] text-white">
              All Uploaders
            </option>
            <option value="Abhishek Gupta" className="bg-[#161a1f] text-white">
              Abhishek Gupta
            </option>
            <option value="Priya Sharma" className="bg-[#161a1f] text-white">
              Priya Sharma
            </option>
            <option value="Rohit Verma" className="bg-[#161a1f] text-white">
              Rohit Verma
            </option>
            <option value="Sneha Gupta" className="bg-[#161a1f] text-white">
              Sneha Gupta
            </option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
          />
        </div>

        {/* Filter Toggle Button */}
        <button
          type="button"
          onClick={onResetFilters}
          className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-medium transition-colors sm:text-sm ${
            hasActiveFilters
              ? "border-[#1e5433] bg-[#153e25] text-[#4ade80] hover:bg-[#1a4a2d]"
              : "border-[#232830] bg-[#161a1f] text-white/80 hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
          }`}
        >
          <SlidersHorizontal size={15} strokeWidth={1.8} />
          <span>Filter</span>
        </button>

        {/* Reset Button */}
        <button
          type="button"
          onClick={onResetFilters}
          title="Reset filters"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#232830] bg-[#161a1f] text-white/60 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </div>
  );
};

export default ImageFilterBar;
