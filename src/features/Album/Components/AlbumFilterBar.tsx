import { Search, ChevronDown, SlidersHorizontal, RotateCcw, X } from "lucide-react";

interface AlbumFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedEvent: string;
  onEventChange: (event: string) => void;
  selectedVisibility: string;
  onVisibilityChange: (vis: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const AlbumFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedEvent,
  onEventChange,
  selectedVisibility,
  onVisibilityChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
  hasActiveFilters,
}: AlbumFilterBarProps) => {
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
          placeholder="Search albums by title, event or location..."
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
        {/* Event Select */}
        <div className="relative min-w-[140px]">
          <select
            value={selectedEvent}
            onChange={(e) => onEventChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2.5 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none sm:text-sm"
          >
            <option value="All" className="bg-[#161a1f] text-white">
              All Events
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
            <option value="Cloud Native Bootcamp" className="bg-[#161a1f] text-white">
              Cloud Native Bootcamp
            </option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
          />
        </div>

        {/* Visibility Select */}
        <div className="relative min-w-[130px]">
          <select
            value={selectedVisibility}
            // FIX: Changed e.target.name to e.target.value
            onChange={(e) => onVisibilityChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2.5 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none sm:text-sm"
          >
            <option value="All" className="bg-[#161a1f] text-white">
              All Visibility
            </option>
            <option value="public" className="bg-[#161a1f] text-white">
              Public
            </option>
            <option value="private" className="bg-[#161a1f] text-white">
              Private
            </option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
          />
        </div>

        {/* Status Select */}
        <div className="relative min-w-[130px]">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2.5 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none sm:text-sm"
          >
            <option value="All" className="bg-[#161a1f] text-white">
              All Status
            </option>
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
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
          />
        </div>

        {/* Filter Toggle Button */}
        {/* Note: If this button is meant to apply filters, it usually calls a separate handler. 
            If it resets, the current logic is fine. Assuming it toggles visibility or resets based on context. */}
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

        {/* Reset / Refresh Button */}
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

export default AlbumFilterBar;