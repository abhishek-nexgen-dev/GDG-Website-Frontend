import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface EmailPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCampaigns: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const EmailPagination = ({
  currentPage,
  totalPages,
  totalCampaigns,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: EmailPaginationProps) => {
  const startIdx = totalCampaigns === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIdx = Math.min(currentPage * pageSize, totalCampaigns);

  return (
    <div className="flex flex-col items-center justify-between gap-4 py-3 sm:flex-row w-full">
      {/* Showing count */}
      <p className="text-xs text-white/40">
        Showing <span className="font-medium text-white/80">{startIdx}</span> to{" "}
        <span className="font-medium text-white/80">{endIdx}</span> of{" "}
        <span className="font-medium text-white/80">{totalCampaigns}</span> campaigns
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

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
          const isCurrent = page === currentPage;
          return (
            <button
              key={`page-${page}`}
              type="button"
              onClick={() => onPageChange(page)}
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
          <option value={5} className="bg-[#161a1f] text-white">
            5 per page
          </option>
          <option value={10} className="bg-[#161a1f] text-white">
            10 per page
          </option>
          <option value={20} className="bg-[#161a1f] text-white">
            20 per page
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

export default EmailPagination;
