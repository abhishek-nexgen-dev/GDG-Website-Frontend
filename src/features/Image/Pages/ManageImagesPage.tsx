import { useState, useMemo } from "react";
import { Upload, Download } from "lucide-react";
import { initialImagesList, type ImageItem } from "../data/images.data";
import ImageStatsCards from "../Components/ImageStatsCards";
import ImageFilterBar from "../Components/ImageFilterBar";
import ImageBulkActionsBar from "../Components/ImageBulkActionsBar";
import ImageCard from "../Components/ImageCard";
import ImageListView from "../Components/ImageListView";
import ImagePagination from "../Components/ImagePagination";
import UploadImagesModal from "../Components/UploadImagesModal";
import ImageViewModal from "../Components/ImageViewModal";

const ManageImagesPage = () => {
  const [images, setImages] = useState<ImageItem[]>(initialImagesList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [selectedUploader, setSelectedUploader] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filtered & Sorted Images
  const filteredImages = useMemo(() => {
    let result = images.filter((img) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        img.fileName.toLowerCase().includes(q) ||
        img.albumName.toLowerCase().includes(q) ||
        img.eventName.toLowerCase().includes(q) ||
        img.uploader.toLowerCase().includes(q) ||
        (img.tags && img.tags.some((t) => t.toLowerCase().includes(q)));

      const matchesAlbum = selectedAlbum === "All" || img.albumName === selectedAlbum;
      const matchesEvent = selectedEvent === "All" || img.eventShort === selectedEvent;
      const matchesFormat = selectedFormat === "All" || img.format === selectedFormat;
      const matchesUploader = selectedUploader === "All" || img.uploader === selectedUploader;

      return matchesSearch && matchesAlbum && matchesEvent && matchesFormat && matchesUploader;
    });

    // Sorting
    if (sortBy === "NameAZ") {
      result.sort((a, b) => a.fileName.localeCompare(b.fileName));
    } else if (sortBy === "Largest") {
      result.sort((a, b) => parseFloat(b.size) - parseFloat(a.size));
    } else if (sortBy === "Smallest") {
      result.sort((a, b) => parseFloat(a.size) - parseFloat(b.size));
    }

    return result;
  }, [images, searchQuery, selectedAlbum, selectedEvent, selectedFormat, selectedUploader, sortBy]);

  // Paginated Images
  const totalPages = Math.ceil(filteredImages.length / pageSize) || 1;
  const paginatedImages = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredImages.slice(start, start + pageSize);
  }, [filteredImages, currentPage, pageSize]);

  // Computed Stats
  const computedStats = useMemo(() => {
    return {
      totalImages: { value: "2,856", trend: "▲ 156 this month" },
      totalAlbums: { value: 42, trend: "▲ 6 this month" },
      totalEvents: { value: 24, trend: "▲ 4 this month" },
      storageUsed: { value: "12.4 GB", trend: "▲ 1.3 GB this month" },
      avgImageSize: { value: "4.2 MB", trend: "▼ 0.3 MB this month" },
    };
  }, []);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedAlbum("All");
    setSelectedEvent("All");
    setSelectedFormat("All");
    setSelectedUploader("All");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedAlbum !== "All" ||
    selectedEvent !== "All" ||
    selectedFormat !== "All" ||
    selectedUploader !== "All";

  // Selection handlers
  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredImages.map((img) => img.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDeleteSelected = () => {
    setImages((prev) => prev.filter((img) => !selectedIds.includes(img.id)));
    setSelectedIds([]);
  };

  const handleDeleteSingle = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
  };

  // Upload handler
  const handleUploadImage = (newImageData: Omit<ImageItem, "id" | "timeAgo">) => {
    const newImage: ImageItem = {
      ...newImageData,
      id: `img-${Date.now()}`,
      timeAgo: "Just now",
    };
    setImages((prev) => [newImage, ...prev]);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["File Name", "Album", "Event", "Format", "Size", "Uploader", "Time"];
    const rows = filteredImages.map((img) => [
      `"${img.fileName}"`,
      `"${img.albumName}"`,
      `"${img.eventName}"`,
      `"${img.format}"`,
      `"${img.size}"`,
      `"${img.uploader}"`,
      `"${img.timeAgo}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gdg_ranchi_images_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-full w-full py-5 px-4 sm:px-6 lg:px-8 text-white max-w-full">
      {/* Breadcrumb */}
      <div className="mb-2 flex items-center gap-2 text-xs font-medium text-white/40">
        <span>Images</span>
        <span>&gt;</span>
        <span className="text-[#22c55e]">Manage Images</span>
      </div>

      {/* Header Section */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Manage Images
          </h1>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            View, organize and manage all images across albums and events.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-xl border border-[#232830] bg-[#161a1f] px-4 py-2.5 text-xs font-semibold text-white/90 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
          >
            <Download size={15} strokeWidth={2} />
            <span>Export Images</span>
          </button>

          <button
            type="button"
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
          >
            <Upload size={16} strokeWidth={2.5} />
            <span>Upload Images</span>
          </button>
        </div>
      </div>

      {/* 5 Stats Cards Grid */}
      <div className="mb-6">
        <ImageStatsCards stats={computedStats} />
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-4">
        <ImageFilterBar
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          selectedAlbum={selectedAlbum}
          onAlbumChange={(album) => {
            setSelectedAlbum(album);
            setCurrentPage(1);
          }}
          selectedEvent={selectedEvent}
          onEventChange={(event) => {
            setSelectedEvent(event);
            setCurrentPage(1);
          }}
          selectedFormat={selectedFormat}
          onFormatChange={(format) => {
            setSelectedFormat(format);
            setCurrentPage(1);
          }}
          selectedUploader={selectedUploader}
          onUploaderChange={(uploader) => {
            setSelectedUploader(uploader);
            setCurrentPage(1);
          }}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Bulk Actions & View Switcher Bar */}
      <div className="mb-4">
        <ImageBulkActionsBar
          selectedCount={selectedIds.length}
          onDeleteSelected={handleDeleteSelected}
          onMoveToAlbum={() => {}}
          onAddTags={() => {}}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />
      </div>

      {/* Images Grid or List View */}
      <div className="mb-6">
        {paginatedImages.length === 0 ? (
          <div className="rounded-2xl border border-[#232830] bg-[#161a1f] p-12 text-center text-white/40">
            No images found matching your search or filters.
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
            {paginatedImages.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                isSelected={selectedIds.includes(image.id)}
                onSelect={handleSelectRow}
                onViewImage={(img) => {
                  setSelectedImage(img);
                  setIsViewModalOpen(true);
                }}
                onDeleteImage={handleDeleteSingle}
              />
            ))}
          </div>
        ) : (
          <ImageListView
            images={paginatedImages}
            selectedIds={selectedIds}
            onSelectRow={handleSelectRow}
            onSelectAll={handleSelectAll}
            onViewImage={(img) => {
              setSelectedImage(img);
              setIsViewModalOpen(true);
            }}
            onDeleteImage={handleDeleteSingle}
          />
        )}
      </div>

      {/* Pagination */}
      <ImagePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalImages={2856}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => setPageSize(size)}
      />

      {/* Upload Images Modal */}
      <UploadImagesModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadImage={handleUploadImage}
      />

      {/* Image Preview Modal */}
      <ImageViewModal
        isOpen={isViewModalOpen}
        image={selectedImage}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedImage(null);
        }}
      />
    </div>
  );
};

export default ManageImagesPage;
