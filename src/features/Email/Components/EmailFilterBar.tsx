import { Search, ChevronDown, SlidersHorizontal, RotateCcw, X } from "lucide-react";

interface EmailFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedAudience: string;
  onAudienceChange: (audience: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const EmailFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedAudience,
  onAudienceChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
  hasActiveFilters,
}: EmailFilterBarProps) => {
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
          placeholder="Search campaigns by title, subject or tags..."
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
        {/* Audience Select */}
        <div className="relative min-w-[150px]">
          <select
            value={selectedAudience}
            onChange={(e) => onAudienceChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2.5 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none sm:text-sm"
          >
            <option value="All" className="bg-[#161a1f] text-white">
              All Audiences
            </option>
            <option value="All Members" className="bg-[#161a1f] text-white">
              All Members
            </option>
            <option value="Event Attendees" className="bg-[#161a1f] text-white">
              Event Attendees
            </option>
            <option value="Hackathon Participants" className="bg-[#161a1f] text-white">
              Hackathon Participants
            </option>
            <option value="Core Volunteers" className="bg-[#161a1f] text-white">
              Core Volunteers
            </option>
            <option value="Custom Bulk List" className="bg-[#161a1f] text-white">
              Custom Bulk List
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
            <option value="Sent" className="bg-[#161a1f] text-white">
              Sent
            </option>
            <option value="Scheduled" className="bg-[#161a1f] text-white">
              Scheduled
            </option>
            <option value="Draft" className="bg-[#161a1f] text-white">
              Draft
            </option>
            <option value="Sending" className="bg-[#161a1f] text-white">
              Sending
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

export default EmailFilterBar;
