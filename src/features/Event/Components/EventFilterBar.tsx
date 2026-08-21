import { Search, ChevronDown, SlidersHorizontal, RotateCcw, X } from "lucide-react";

interface EventFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  selectedVisibility: string;
  onVisibilityChange: (visibility: string) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const EventFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  selectedVisibility,
  onVisibilityChange,
  onResetFilters,
  hasActiveFilters,
}: EventFilterBarProps) => {
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
          placeholder="Search events by title, category, or location..."
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
        {/* Category Select */}
        <div className="relative min-w-[130px]">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2.5 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none sm:text-sm"
          >
            <option value="All" className="bg-[#161a1f] text-white">
              All Categories
            </option>
            <option value="Hackathon" className="bg-[#161a1f] text-white">
              Hackathon
            </option>
            <option value="Workshop" className="bg-[#161a1f] text-white">
              Workshop
            </option>
            <option value="Meetup" className="bg-[#161a1f] text-white">
              Meetup
            </option>
            <option value="Talk" className="bg-[#161a1f] text-white">
              Talk
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
              All Statuses
            </option>
            <option value="ONGOING" className="bg-[#161a1f] text-white">
              Ongoing
            </option>
            <option value="UPCOMING" className="bg-[#161a1f] text-white">
              Upcoming
            </option>
            <option value="COMPLETED" className="bg-[#161a1f] text-white">
              Completed
            </option>
            <option value="CANCELLED" className="bg-[#161a1f] text-white">
              Cancelled
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
            onChange={(e) => onVisibilityChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2.5 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none sm:text-sm"
          >
            <option value="All" className="bg-[#161a1f] text-white">
              All Visibilities
            </option>
            <option value="Public" className="bg-[#161a1f] text-white">
              Public
            </option>
            <option value="Private" className="bg-[#161a1f] text-white">
              Private
            </option>
            <option value="Member Only" className="bg-[#161a1f] text-white">
              Member Only
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

export default EventFilterBar;
