import { useState, useMemo } from "react";
import { Plus, Download } from "lucide-react";
import {
  initialAlbumsList,
  type AlbumItem,
  type AlbumVisibility,
  type AlbumStatus,
} from "../data/albums.data";
import AlbumStatsCards from "../Components/AlbumStatsCards";
import AlbumFilterBar from "../Components/AlbumFilterBar";
import AlbumTable from "../Components/AlbumTable";
import AlbumPagination from "../Components/AlbumPagination";
import CreateAlbumModal from "../Components/CreateAlbumModal";
import AlbumDetailsModal from "../Components/AlbumDetailsModal";

const ManageAlbumsPage = () => {
  const [albums, setAlbums] = useState<AlbumItem[]>(initialAlbumsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [selectedVisibility, setSelectedVisibility] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumItem | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filtered Albums
  const filteredAlbums = useMemo(() => {
    return albums.filter((album) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        album.title.toLowerCase().includes(q) ||
        album.eventName.toLowerCase().includes(q) ||
        album.description.toLowerCase().includes(q) ||
        album.createdBy.toLowerCase().includes(q);

      const matchesEvent = selectedEvent === "All" || album.eventName === selectedEvent;
      const matchesVisibility =
        selectedVisibility === "All" || album.visibility === selectedVisibility;
      const matchesStatus = selectedStatus === "All" || album.status === selectedStatus;

      return matchesSearch && matchesEvent && matchesVisibility && matchesStatus;
    });
  }, [albums, searchQuery, selectedEvent, selectedVisibility, selectedStatus]);

  // Paginated Albums
  const totalPages = Math.ceil(filteredAlbums.length / pageSize) || 1;
  const paginatedAlbums = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAlbums.slice(start, start + pageSize);
  }, [filteredAlbums, currentPage, pageSize]);

  // Computed Stats
  const computedStats = useMemo(() => {
    const total = albums.length;
    const totalImages = albums.reduce((acc, curr) => acc + curr.imagesCount, 0);
    const publicCount = albums.filter((a) => a.visibility === "Public").length;
    const privateCount = albums.filter((a) => a.visibility === "Private").length;

    return {
      totalAlbums: { value: total, trend: "▲ 6 this month" },
      totalImages: {
        value: totalImages.toLocaleString("en-US"),
        trend: "▲ 156 this month",
      },
      publicAlbums: {
        value: publicCount,
        percentage: `${Math.round((publicCount / (total || 1)) * 100)}% of total`,
      },
      privateAlbums: {
        value: privateCount,
        percentage: `${Math.round((privateCount / (total || 1)) * 100)}% of total`,
      },
      storageUsed: { value: "12.4 GB", trend: "▲ 1.3 GB this month" },
    };
  }, [albums]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedEvent("All");
    setSelectedVisibility("All");
    setSelectedStatus("All");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedEvent !== "All" ||
    selectedVisibility !== "All" ||
    selectedStatus !== "All";

  // Create Album
  const handleCreateAlbum = (newAlbumData: Omit<AlbumItem, "id">) => {
    const newAlbum: AlbumItem = {
      ...newAlbumData,
      id: `alb-${Date.now()}`,
    };
    setAlbums((prev) => [newAlbum, ...prev]);
  };

  // Delete Album
  const handleDeleteAlbum = (id: string) => {
    setAlbums((prev) => prev.filter((a) => a.id !== id));
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      "Title",
      "Event Name",
      "Event Date",
      "Images Count",
      "Visibility",
      "Created On",
      "Created By",
      "Status",
    ];

    const rows = filteredAlbums.map((a) => [
      `"${a.title}"`,
      `"${a.eventName}"`,
      `"${a.eventDate}"`,
      a.imagesCount,
      `"${a.visibility}"`,
      `"${a.createdOn}"`,
      `"${a.createdBy}"`,
      `"${a.status}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `gdg_ranchi_albums_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-full w-full py-5 px-4 sm:px-6 lg:px-8 text-white max-w-full">
      {/* Header Section */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Manage Albums</h1>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            View, manage and organize all event albums
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
            <span>Export Albums</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create New Album</span>
          </button>
        </div>
      </div>

      {/* 5 Stats Cards Grid */}
      <div className="mb-6">
        <AlbumStatsCards stats={computedStats} />
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-4">
        <AlbumFilterBar
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          selectedEvent={selectedEvent}
          onEventChange={(event) => {
            setSelectedEvent(event);
            setCurrentPage(1);
          }}
          selectedVisibility={selectedVisibility}
          onVisibilityChange={(vis) => {
            setSelectedVisibility(vis);
            setCurrentPage(1);
          }}
          selectedStatus={selectedStatus}
          onStatusChange={(status) => {
            setSelectedStatus(status);
            setCurrentPage(1);
          }}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Albums Table */}
      <div className="mb-4">
        <AlbumTable
          albums={paginatedAlbums}
          onViewAlbum={(album) => {
            setSelectedAlbum(album);
            setIsDetailsModalOpen(true);
          }}
          onEditAlbum={(album) => {
            setSelectedAlbum(album);
            setIsDetailsModalOpen(true);
          }}
          onDeleteAlbum={handleDeleteAlbum}
        />
      </div>

      {/* Pagination */}
      <AlbumPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalAlbums={filteredAlbums.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => setPageSize(size)}
      />

      {/* Create Album Modal */}
      <CreateAlbumModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateAlbum={handleCreateAlbum}
      />

      {/* Album Details Modal */}
      <AlbumDetailsModal
        isOpen={isDetailsModalOpen}
        album={selectedAlbum}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedAlbum(null);
        }}
      />
    </div>
  );
};

export default ManageAlbumsPage;
