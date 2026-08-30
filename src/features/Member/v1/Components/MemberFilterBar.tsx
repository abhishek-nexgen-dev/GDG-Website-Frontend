import { Search, ChevronDown, SlidersHorizontal, X } from "lucide-react";

interface MemberFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedRole: string;
  onRoleChange: (role: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  onResetFilters?: () => void;
  hasActiveFilters?: boolean;
}

const MemberFilterBar = ({
  searchQuery,
  onSearchChange,
  selectedRole,
  onRoleChange,
  selectedStatus,
  onStatusChange,
  onResetFilters,
  hasActiveFilters,
}: MemberFilterBarProps) => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Search Input */}
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-white/40">
          <Search size={17} strokeWidth={1.8} />
        </div>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search members by name, email or role..."
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
        {/* Role Select Dropdown */}
        <div className="relative min-w-[130px]">
          <select
            value={selectedRole}
            onChange={(e) => onRoleChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2.5 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none sm:text-sm"
          >
            <option value="All" className="bg-[#161a1f] text-white">
              All Roles
            </option>
            <option value="Admin" className="bg-[#161a1f] text-white">
              Admin
            </option>
            <option value="Organizer" className="bg-[#161a1f] text-white">
              Organizer
            </option>
            <option value="Member" className="bg-[#161a1f] text-white">
              Member
            </option>
          </select>
          <ChevronDown
            size={15}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
          />
        </div>

        {/* Status Select Dropdown */}
        <div className="relative min-w-[130px]">
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2.5 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none sm:text-sm"
          >
            <option value="All" className="bg-[#161a1f] text-white">
              All Status
            </option>
            <option value="Active" className="bg-[#161a1f] text-white">
              Active
            </option>
            <option value="Inactive" className="bg-[#161a1f] text-white">
              Inactive
            </option>
            <option value="Offline" className="bg-[#161a1f] text-white">
              Offline
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
          <span>{hasActiveFilters ? "Clear Filters" : "Filter"}</span>
        </button>
      </div>
    </div>
  );
};

export default MemberFilterBar;
