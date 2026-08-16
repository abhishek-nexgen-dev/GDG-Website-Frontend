import { Trash2, FolderInput, Tag, LayoutGrid, List, ChevronDown } from "lucide-react";

interface ImageBulkActionsBarProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  onMoveToAlbum: () => void;
  onAddTags: () => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
}

const ImageBulkActionsBar = ({
  selectedCount,
  onDeleteSelected,
  onMoveToAlbum,
  onAddTags,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortByChange,
}: ImageBulkActionsBarProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between w-full">
      {/* Left: Bulk selection controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2 text-xs font-medium text-white/70">
          {selectedCount} selected
        </span>

        {/* Delete */}
        <button
          type="button"
          onClick={onDeleteSelected}
          disabled={selectedCount === 0}
          className="flex items-center gap-1.5 rounded-xl border border-[#522226] bg-[#38181a] px-3 py-2 text-xs font-medium text-rose-300 transition-colors hover:bg-[#481e22] disabled:opacity-40 disabled:hover:bg-[#38181a]"
        >
          <Trash2 size={13} />
          <span>Delete</span>
        </button>

        {/* Move to Album */}
        <button
          type="button"
          onClick={onMoveToAlbum}
          disabled={selectedCount === 0}
          className="flex items-center gap-1.5 rounded-xl border border-[#232830] bg-[#161a1f] px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white disabled:opacity-40"
        >
          <FolderInput size={13} />
          <span>Move to Album</span>
        </button>

        {/* Add Tags */}
        <button
          type="button"
          onClick={onAddTags}
          disabled={selectedCount === 0}
          className="flex items-center gap-1.5 rounded-xl border border-[#232830] bg-[#161a1f] px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white disabled:opacity-40"
        >
          <Tag size={13} />
          <span>Add Tags</span>
        </button>
      </div>

      {/* Right: View Mode & Sort Dropdown */}
      <div className="flex items-center gap-2.5">
        {/* Grid/List View switch */}
        <div className="flex items-center rounded-xl border border-[#232830] bg-[#161a1f] p-1">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
              viewMode === "grid"
                ? "bg-[#153e25] text-[#4ade80]"
                : "text-white/40 hover:text-white"
            }`}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-[#153e25] text-[#4ade80]"
                : "text-white/40 hover:text-white"
            }`}
          >
            <List size={14} />
          </button>
        </div>

        {/* Sort by dropdown */}
        <div className="relative min-w-[150px]">
          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="w-full appearance-none rounded-xl border border-[#232830] bg-[#161a1f] px-3.5 py-2 pr-8 text-xs font-medium text-white/80 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none"
          >
            <option value="Newest" className="bg-[#161a1f] text-white">
              Sort by: Newest
            </option>
            <option value="Oldest" className="bg-[#161a1f] text-white">
              Sort by: Oldest
            </option>
            <option value="Largest" className="bg-[#161a1f] text-white">
              Sort by: Largest Size
            </option>
            <option value="Smallest" className="bg-[#161a1f] text-white">
              Sort by: Smallest Size
            </option>
            <option value="NameAZ" className="bg-[#161a1f] text-white">
              Sort by: Name (A-Z)
            </option>
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40"
          />
        </div>
      </div>
    </div>
  );
};

export default ImageBulkActionsBar;
