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
import type { AlbumItem, AlbumVisibility, AlbumStatus } from "../data/albums.data";

interface AlbumTableProps {
  albums: AlbumItem[];
  onViewAlbum: (album: AlbumItem) => void;
  onEditAlbum?: (album: AlbumItem) => void;
  onDeleteAlbum?: (id: string) => void;
}

const AlbumTable = ({ albums, onViewAlbum, onEditAlbum, onDeleteAlbum }: AlbumTableProps) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getVisibilityBadge = (visibility: AlbumVisibility) => {
    if (visibility === "Public") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e5433] bg-[#153e25] px-2.5 py-1 text-xs font-medium text-[#4ade80]">
          <Globe size={12} />
          <span>Public</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#1d3d66] bg-[#152c4a] px-2.5 py-1 text-xs font-medium text-[#60a5fa]">
        <Lock size={12} />
        <span>Private</span>
      </span>
    );
  };

  const getStatusIndicator = (status: AlbumStatus) => {
    switch (status) {
      case "Published":
        return (
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#4ade80]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            <span>Published</span>
          </div>
        );
      case "Draft":
        return (
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#fbbf24]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
            <span>Draft</span>
          </div>
        );
      case "Unpublished":
      default:
        return (
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#f87171]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
            <span>Unpublished</span>
          </div>
        );
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#232830] bg-[#161a1f] w-full">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[950px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#232830] bg-[#121519] text-xs font-semibold uppercase tracking-wider text-white/50">
              <th className="py-4 pl-5 pr-3 font-medium text-white/60">ALBUM</th>
              <th className="py-4 px-3 font-medium text-white/60">EVENT</th>
              <th className="py-4 px-3 font-medium text-white/60">IMAGES</th>
              <th className="py-4 px-3 font-medium text-white/60">VISIBILITY</th>
              <th className="py-4 px-3 font-medium text-white/60">CREATED ON</th>
              <th className="py-4 px-3 font-medium text-white/60">STATUS</th>
              <th className="py-4 px-4 text-right font-medium text-white/60">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#20252e]">
            {albums.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-white/40">
                  No albums found matching your search or filters.
                </td>
              </tr>
            ) : (
              albums.map((album) => (
                <tr key={album.id} className="group transition-colors hover:bg-[#1b2027]">
                  {/* Album Info */}
                  <td className="py-4 pl-5 pr-3">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={album.thumbnail}
                        alt={album.title}
                        className="h-13 w-13 rounded-xl border border-[#2b323d] object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-semibold text-white group-hover:text-white">
                          {album.title}
                        </h4>
                        <p className="mt-0.5 truncate text-xs text-white/50 max-w-xs">
                          {album.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Event & Date */}
                  <td className="py-4 px-3">
                    <div>
                      <p className="text-xs font-semibold text-white/90 truncate max-w-[170px]">
                        {album.eventName}
                      </p>
                      <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/40">
                        <Calendar size={12} className="text-white/40" />
                        <span>{album.eventDate}</span>
                      </div>
                    </div>
                  </td>

                  {/* Images Count */}
                  <td className="py-4 px-3">
                    <div>
                      <span className="text-xs font-bold text-white">{album.imagesCount}</span>
                      <span className="text-[11px] text-white/40 block">Images</span>
                    </div>
                  </td>

                  {/* Visibility */}
                  <td className="py-4 px-3">{getVisibilityBadge(album.visibility)}</td>

                  {/* Created On */}
                  <td className="py-4 px-3">
                    <div>
                      <p className="text-xs font-semibold text-white/90">{album.createdOn}</p>
                      <p className="text-[11px] text-white/40">by {album.createdBy}</p>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-3">{getStatusIndicator(album.status)}</td>

                  {/* Actions */}
                  <td className="relative py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View Album */}
                      <button
                        type="button"
                        onClick={() => onViewAlbum(album)}
                        title="View album"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                      >
                        <Eye size={14} />
                      </button>

                      {/* Edit Album */}
                      <button
                        type="button"
                        onClick={() => onEditAlbum?.(album)}
                        title="Edit album"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                      >
                        <Pencil size={14} />
                      </button>

                      {/* Analytics */}
                      <button
                        type="button"
                        onClick={() => onViewAlbum(album)}
                        title="View stats"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                      >
                        <BarChart2 size={14} />
                      </button>

                      {/* Context action menu */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMenuId(activeMenuId === album.id ? null : album.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                        >
                          <MoreVertical size={14} />
                        </button>

                        {activeMenuId === album.id && (
                          <>
                            <div
                              className="fixed inset-0 z-20"
                              onClick={() => setActiveMenuId(null)}
                            />
                            <div className="absolute right-0 top-9 z-30 w-44 rounded-xl border border-[#2b323d] bg-[#1b2027] p-1.5 shadow-xl">
                              <button
                                type="button"
                                onClick={() => {
                                  onViewAlbum(album);
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
                                  onViewAlbum(album);
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
                                  navigator.clipboard.writeText(
                                    `${window.location.origin}/album/${album.id}`,
                                  );
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
                                  window.open(`/gallery`, "_blank");
                                  setActiveMenuId(null);
                                }}
                                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                              >
                                <ExternalLink size={14} />
                                <span>Public Gallery</span>
                              </button>

                              {onDeleteAlbum && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onDeleteAlbum(album.id);
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlbumTable;
