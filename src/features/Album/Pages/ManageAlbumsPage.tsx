import { useState, useMemo } from "react";
import { Plus, Download } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import api from "../../../utils/axios.utils";

import AlbumStatsCards from "../Components/AlbumStatsCards";
import AlbumFilterBar from "../Components/AlbumFilterBar";
import AlbumTable from "../Components/AlbumTable";
import AlbumPagination from "../Components/AlbumPagination";

import useFetchAlbums from "../hooks/useFetchAlbumMutations";
import type { Manage_Albums_Card, Visibility } from "../types/Album.type";

const ManageAlbumsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("All");
  const [selectedVisibility, setSelectedVisibility] = useState<Visibility | "All">("All");
  const [selectedStatus, setSelectedStatus] = useState<Manage_Albums_Card["status"] | "All">("All");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading } = useFetchAlbums(page, limit);

  const albums: Manage_Albums_Card[] = useMemo(() => {
    if (Array.isArray(data)) return data;
    if (Array.isArray((data as any)?.data)) return (data as any).data;
    if (Array.isArray((data as any)?.albums)) return (data as any).albums;
    return [];
  }, [data]);

  const pagination = data?.pagination;

  const filteredAlbums = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return albums.filter((album) => {
      const albumTitle = album.title || "";
      const albumEventTitle =
        typeof album.event === "object" && album.event !== null
          ? album.event.title || ""
          : typeof album.event === "string"
            ? album.event
            : "";
      const albumDesc = album.description || "";

      const matchesSearch =
        !query ||
        albumTitle.toLowerCase().includes(query) ||
        albumEventTitle.toLowerCase().includes(query) ||
        albumDesc.toLowerCase().includes(query);

      const matchesEvent = selectedEvent === "All" || albumEventTitle === selectedEvent;

      const matchesVisibility =
        selectedVisibility === "All" || album.visibility === selectedVisibility;

      const matchesStatus = selectedStatus === "All" || album.status === selectedStatus;

      return matchesSearch && matchesEvent && matchesVisibility && matchesStatus;
    });
  }, [albums, searchQuery, selectedEvent, selectedVisibility, selectedStatus]);

  const computedStats = useMemo(() => {
    const total = albums.length;

    const totalImages = albums.reduce(
      (acc, album) => acc + (album.imageCount ?? 0),
      0,
    );

    const publicCount = albums.filter((album) => album.visibility === "public").length;

    const privateCount = albums.filter((album) => album.visibility === "private").length;

    return {
      totalAlbums: {
        value: total,
        trend: `${total} total albums`,
      },
      totalImages: {
        value: totalImages.toLocaleString(),
        trend: `${totalImages} total images`,
      },
      publicAlbums: {
        value: publicCount,
        percentage: `${Math.round((publicCount / (total || 1)) * 100)}% of total`,
      },
      privateAlbums: {
        value: privateCount,
        percentage: `${Math.round((privateCount / (total || 1)) * 100)}% of total`,
      },
      storageUsed: {
        value: "—",
        trend: "Storage unavailable",
      },
    };
  }, [albums]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedEvent("All");
    setSelectedVisibility("All");
    setSelectedStatus("All");
    setPage(1);
  };

  const queryClient = useQueryClient();

  const handleDeleteAlbum = async (id: string) => {
    const targetAlbum = albums.find((a) => a._id === id);
    const result = await Swal.fire({
      title: "Delete Album?",
      text: `Are you sure you want to delete "${targetAlbum?.title || "this album"}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#27272a",
      confirmButtonText: "Yes, delete",
      background: "#151a20",
      color: "#ffffff",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/api/v1/gallery/${id}`);
        await queryClient.invalidateQueries({ queryKey: ["findAllGallery"] });
        await queryClient.invalidateQueries({ queryKey: ["allAlbumNames"] });
        Swal.fire({
          title: "Deleted!",
          text: "Album deleted successfully.",
          icon: "success",
          toast: true,
          position: "top-end",
          timer: 2500,
          showConfirmButton: false,
          background: "#181b20",
          color: "#ffffff",
        });
      } catch (err: any) {
        Swal.fire({
          title: "Error",
          text:
            err.response?.data?.message ||
            err.message ||
            "Failed to delete album.",
          icon: "error",
          background: "#181b20",
          color: "#ffffff",
        });
      }
    }
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedEvent !== "All" ||
    selectedVisibility !== "All" ||
    selectedStatus !== "All";

  const handleExportCSV = () => {
    const headers = ["Title", "Event", "Images", "Visibility", "Status", "Created At"];

    const rows = filteredAlbums.map((album) => {
      const eventTitle =
        typeof album.event === "object" && album.event !== null
          ? album.event.title || ""
          : typeof album.event === "string"
            ? album.event
            : "";
      const createdAtStr = album.createdAt ? new Date(album.createdAt).toLocaleDateString() : "";
      return [
        `"${album.title || ""}"`,
        `"${eventTitle}"`,
        album.imageCount ?? 0,
        album.visibility || "public",
        album.status || "published",
        `"${createdAtStr}"`,
      ];
    });

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `gdg_ranchi_albums_${new Date().toISOString().slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-full w-full max-w-full px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Manage Albums
          </h1>

          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            View, manage and organize all event albums
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-xl border border-[#232830] bg-[#161a1f] px-4 py-2.5 text-xs font-semibold text-white/90 transition-colors hover:bg-[#1a1f26]"
          >
            <Download size={15} />
            <span>Export Albums</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create New Album</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <AlbumStatsCards stats={computedStats} />
      </div>

      <div className="mb-4">
        <AlbumFilterBar
          searchQuery={searchQuery}
          onSearchChange={(value) => {
            setSearchQuery(value);
            setPage(1);
          }}
          selectedEvent={selectedEvent}
          onEventChange={(event) => {
            setSelectedEvent(event);
            setPage(1);
          }}
          selectedVisibility={selectedVisibility}
          onVisibilityChange={(visibility) => {
            setSelectedVisibility(visibility as Visibility | "All");
            setPage(1);
          }}
          selectedStatus={selectedStatus}
          onStatusChange={(status) => {
            setSelectedStatus(status as Manage_Albums_Card["status"] | "All");
            setPage(1);
          }}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <div className="mb-4">
        {isLoading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#22c55e]" />
          </div>
        ) : (
          <AlbumTable
            albums={filteredAlbums}
            onDeleteAlbum={handleDeleteAlbum}
          />
        )}
      </div>

      {!isLoading && (
        <AlbumPagination
          currentPage={page}
          totalPages={pagination?.totalPages ?? 1}
          totalAlbums={pagination?.total ?? albums.length}
          pageSize={limit}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setLimit(size);
            setPage(1);
          }}
        />
      )}
    </div>
  );
};

export default ManageAlbumsPage;
