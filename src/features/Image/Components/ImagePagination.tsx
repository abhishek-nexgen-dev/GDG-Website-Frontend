import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface ImagePaginationProps {
  currentPage: number;
  totalPages: number;
  totalImages: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const ImagePagination = ({
  currentPage,
  totalPages,
  totalImages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: ImagePaginationProps) => {
  const startIdx = totalImages === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(currentPage * pageSize, totalImages);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 py-3 sm:flex-row w-full">
      {/* Showing count */}
      <p className="text-xs text-white/40">
        Showing <span className="font-medium text-white/80">{startIdx}</span> to{" "}
        <span className="font-medium text-white/80">{endIdx}</span> of{" "}
        <span className="font-medium text-white/80">{totalImages.toLocaleString()}</span> images
      </p>

      {/* Page Numbers */}
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#232830] bg-[#161a1f] text-white/50 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white disabled:opacity-30 disabled:hover:border-[#232830] disabled:hover:text-white/50"
        >
          <ChevronLeft size={14} />
        </button>

        {getPageNumbers().map((page, idx) => {
          if (page === "...") {
            return (
              <span key={`dots-${idx}`} className="px-1 text-xs text-white/30">
                ...
              </span>
            );
          }

          const isCurrent = page === currentPage;
          return (
            <button
              key={`page-${page}`}
              type="button"
              onClick={() => onPageChange(page as number)}
              className={`flex h-8 min-w-[32px] items-center justify-center rounded-lg px-2 text-xs font-semibold transition-colors ${
                isCurrent
                  ? "border border-[#1e5433] bg-[#153e25] text-[#4ade80]"
                  : "border border-[#232830] bg-[#161a1f] text-white/60 hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#232830] bg-[#161a1f] text-white/50 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white disabled:opacity-30 disabled:hover:border-[#232830] disabled:hover:text-white/50"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Per Page selector */}
      <div className="relative">
        <select
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1);
          }}
          className="appearance-none rounded-xl border border-[#232830] bg-[#161a1f] py-1.5 pl-3 pr-8 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] focus:border-[#22c55e] focus:outline-none"
        >
          <option value={12} className="bg-[#161a1f] text-white">
            12 per page
          </option>
          <option value={20} className="bg-[#161a1f] text-white">
            20 per page
          </option>
          <option value={40} className="bg-[#161a1f] text-white">
            40 per page
          </option>
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40"
        />
      </div>
    </div>
  );
};

export default ImagePagination;
