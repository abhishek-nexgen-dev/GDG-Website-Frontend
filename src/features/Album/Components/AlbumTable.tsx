import { useState } from "react";
import {
  Calendar,
  Eye,
  Pencil,
  BarChart2,
  MoreVertical,
  Globe,
  Lock,
  Trash2,
  Copy,
  ExternalLink,
  Upload,
} from "lucide-react";
import type { Manage_Albums_Card } from "../types/Album.type";
import { Link } from "react-router-dom";

interface AlbumTableProps {
  albums: Manage_Albums_Card[];
  onDeleteAlbum?: (id: string) => void;
}

const AlbumTable = ({
  albums,
  onDeleteAlbum,
}: AlbumTableProps) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getVisibilityBadge = (visibility?: Manage_Albums_Card["visibility"]) => {
    if (visibility === "private") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#1d3d66] bg-[#152c4a] px-2.5 py-1 text-xs font-medium text-[#60a5fa]">
          <Lock size={12} />
          <span>Private</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e5433] bg-[#153e25] px-2.5 py-1 text-xs font-medium text-[#4ade80]">
        <Globe size={12} />
        <span>Public</span>
      </span>
    );
  };

  const getStatusIndicator = (status?: Manage_Albums_Card["status"]) => {
    const statusConfig: Record<string, { label: string; dot: string; text: string }> = {
      published: {
        label: "Published",
        dot: "bg-[#22c55e]",
        text: "text-[#4ade80]",
      },
      draft: {
        label: "Draft",
        dot: "bg-[#f59e0b]",
        text: "text-[#fbbf24]",
      },
      archived: {
        label: "Archived",
        dot: "bg-[#ef4444]",
        text: "text-[#f87171]",
      },
    };

    const key = (status || "published").toLowerCase();
    const config = statusConfig[key] || statusConfig.published;

    return (
      <div className={`flex items-center gap-1.5 text-xs font-medium ${config.text}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
        <span>{config.label}</span>
      </div>
    );
  };

  const formatDate = (date?: string) => {
    if (!date) return "—";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const albumList = Array.isArray(albums) ? albums : [];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[#232830] bg-[#161a1f]">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[950px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#232830] bg-[#121519] text-xs font-semibold uppercase tracking-wider text-white/50">
              <th className="py-4 pl-5 pr-3 font-medium text-white/60">Album</th>
              <th className="px-3 py-4 font-medium text-white/60">Event</th>
              <th className="px-3 py-4 font-medium text-white/60">Images</th>
              <th className="px-3 py-4 font-medium text-white/60">Visibility</th>
              <th className="px-3 py-4 font-medium text-white/60">Created On</th>
              <th className="px-3 py-4 font-medium text-white/60">Status</th>
              <th className="px-4 py-4 text-right font-medium text-white/60">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#20252e]">
            {albumList.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-white/40">
                  No albums found matching your search or filters.
                </td>
              </tr>
            ) : (
              albumList.map((album, idx) => {
                const eventTitle =
                  typeof album.event === "object" && album.event !== null
                    ? album.event.title || "GDG Event"
                    : typeof album.event === "string"
                      ? album.event
                      : "GDG Event";

                const eventDate =
                  typeof album.event === "object" && album.event !== null && album.event.registrationStartAt
                    ? formatDate(album.event.registrationStartAt)
                    : formatDate(album.createdAt);

                const uploadedById =
                  typeof album.uploadedBy === "string"
                    ? album.uploadedBy
                    : typeof (album.uploadedBy as any)?._id === "string"
                      ? (album.uploadedBy as any)._id
                      : typeof album._id === "string"
                        ? album._id
                        : "";

                const imageCount = album.imageCount ?? 0;
                const albumThumbnail =
                  album.albumImageUrl ||
                  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80";

                return (
                  <tr key={album._id || album.slug || `album-${idx}`} className="group transition-colors hover:bg-[#1b2027]">
                    <td className="py-4 pl-5 pr-3">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={albumThumbnail}
                          alt={album.title || "Album"}
                          className="h-13 w-13 shrink-0 rounded-xl border border-[#2b323d] object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-sm font-semibold text-white">{album.title || "Untitled Album"}</h4>

                          <p className="mt-0.5 max-w-xs truncate text-xs text-white/50">
                            {album.description || ""}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <div>
                        <p className="max-w-[170px] truncate text-xs font-semibold text-white/90">
                          {eventTitle}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/40">
                          <Calendar size={12} />
                          <span>{eventDate}</span>
                        </div>
                      </div>
                    </td>

                    <td className="px-3 py-4">
                      <div>
                        <span className="text-xs font-bold text-white">{imageCount}</span>
                        <span className="block text-[11px] text-white/40">Images</span>
                      </div>
                    </td>

                    <td className="px-3 py-4">{getVisibilityBadge(album.visibility)}</td>

                    <td className="px-3 py-4">
                      <p className="text-xs font-semibold text-white/90">
                        {formatDate(album.createdAt)}
                      </p>

                      <p className="text-[11px] text-white/40">
                        ID: {uploadedById ? uploadedById.slice(-6) : "N/A"}
                      </p>
                    </td>

                    <td className="px-3 py-4">{getStatusIndicator(album.status)}</td>

                    <td className="relative px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/member/album/view?slug=${album.slug}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                        >
                          <Eye size={14} />
                        </Link>

                        <button
                          type="button"
                          title="Edit album"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          type="button"
                          title="View stats"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                        >
                          <BarChart2 size={14} />
                        </button>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMenuId(activeMenuId === album._id ? null : album._id)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                          >
                            <MoreVertical size={14} />
                          </button>

                          {activeMenuId === album._id && (
                            <>
                              <div
                                className="fixed inset-0 z-20"
                                onClick={() => setActiveMenuId(null)}
                              />

                              <div className="absolute right-0 top-9 z-30 w-44 rounded-xl border border-[#2b323d] bg-[#1b2027] p-1.5 shadow-xl">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                                >
                                  <Eye size={14} />
                                  <span>View Photos</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                                >
                                  <Upload size={14} />
                                  <span>Upload Images</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (album.slug) {
                                      navigator.clipboard.writeText(
                                        `${window.location.origin}/album/${album.slug}`,
                                      );
                                    }
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                                >
                                  <Copy size={14} />
                                  <span>Copy Link</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (album.slug) {
                                      window.open(`/gallery/${album.slug}`, "_blank");
                                    }
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                                >
                                  <ExternalLink size={14} />
                                  <span>Public Gallery</span>
                                </button>

                                {onDeleteAlbum && album._id && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      onDeleteAlbum(album._id);
                                      setActiveMenuId(null);
                                    }}
                                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-[#f87171] transition hover:bg-[#38181a] hover:text-rose-300"
                                  >
                                    <Trash2 size={14} />
                                    <span>Delete Album</span>
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlbumTable;
