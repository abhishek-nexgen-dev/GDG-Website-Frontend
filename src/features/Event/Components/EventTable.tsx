import { useState } from "react";
import {
  MapPin,
  Calendar,
  Clock3,
  Eye,
  Pencil,
  BarChart2,
  MoreVertical,
  ArrowUpDown,
  Trash2,
  Copy,
  ExternalLink,
} from "lucide-react";
import type { EventItem, EventCategory, EventStatus, EventMode } from "../data/events.data";

interface EventTableProps {
  events: EventItem[];
  onViewEvent: (event: EventItem) => void;
  onEditEvent?: (event: EventItem) => void;
  onDeleteEvent?: (id: string) => void;
}

const EventTable = ({ events, onViewEvent, onEditEvent, onDeleteEvent }: EventTableProps) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getCategoryBadge = (category: EventCategory) => {
    switch (category) {
      case "Hackathon":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#442661] bg-[#2f1c42] px-2.5 py-1 text-xs font-medium text-[#c084fc]">
            Hackathon
          </span>
        );
      case "Workshop":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#1d3d66] bg-[#152c4a] px-2.5 py-1 text-xs font-medium text-[#60a5fa]">
            Workshop
          </span>
        );
      case "Meetup":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#3b1f59] bg-[#28163d] px-2.5 py-1 text-xs font-medium text-[#c084fc]">
            Meetup
          </span>
        );
      case "Talk":
      default:
        return (
          <span className="inline-flex items-center rounded-lg border border-[#4e3216] bg-[#382410] px-2.5 py-1 text-xs font-medium text-[#f59e0b]">
            Talk
          </span>
        );
    }
  };

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case "ONGOING":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#1e5433] bg-[#153e25] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#4ade80]">
            ONGOING
          </span>
        );
      case "UPCOMING":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#1d3d66] bg-[#152c4a] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#60a5fa]">
            UPCOMING
          </span>
        );
      case "COMPLETED":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#1e5433] bg-[#153e25] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#4ade80]">
            COMPLETED
          </span>
        );
      case "CANCELLED":
      default:
        return (
          <span className="inline-flex items-center rounded-lg border border-[#521c1f] bg-[#381113] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#ef4444]">
            CANCELLED
          </span>
        );
    }
  };

  const getModeBadge = (mode: EventMode) => {
    if (mode === "Offline") {
      return (
        <span className="inline-flex items-center rounded-md border border-[#1e5433] bg-[#153e25] px-1.5 py-0.5 text-[10px] font-medium text-[#4ade80]">
          Offline
        </span>
      );
    }
    return (
      <span className="inline-flex items-center rounded-md border border-[#1d3d66] bg-[#152c4a] px-1.5 py-0.5 text-[10px] font-medium text-[#60a5fa]">
        Online
      </span>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#232830] bg-[#161a1f] w-full">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[950px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#232830] bg-[#121519] text-xs font-semibold uppercase tracking-wider text-white/50">
              <th className="py-4 pl-5 pr-3 font-medium text-white/60">EVENT</th>
              <th className="py-4 px-3 font-medium text-white/60">CATEGORY</th>
              <th className="py-4 px-3 font-medium text-white/60">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white">
                  <span>DATE & TIME</span>
                  <ArrowUpDown size={12} />
                </div>
              </th>
              <th className="py-4 px-3 font-medium text-white/60">VENUE</th>
              <th className="py-4 px-3 font-medium text-white/60">STATUS</th>
              <th className="py-4 px-3 font-medium text-white/60">REGISTRATIONS</th>
              <th className="py-4 px-4 text-right font-medium text-white/60">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#20252e]">
            {events.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-white/40">
                  No events found matching your search or filters.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id} className="group transition-colors hover:bg-[#1b2027]">
                  {/* Event Details with Thumbnail */}
                  <td className="py-4 pl-5 pr-3">
                    <div className="flex items-start gap-3.5">
                      {/* Banner Thumbnail */}
                      <div
                        className={`flex h-16 w-28 shrink-0 flex-col items-center justify-center rounded-xl bg-gradient-to-br ${
                          event.bannerColor || "from-[#1d1b4b] to-[#311042]"
                        } p-2 text-center border border-[#2b323d] shadow-inner`}
                      >
                        <span className="text-[10px] font-black uppercase tracking-tight text-white leading-tight">
                          {event.bannerTitle}
                        </span>
                        {event.isLive && (
                          <span className="mt-1 inline-flex items-center rounded-full bg-[#ef4444] px-1.5 py-0.2 text-[8px] font-bold text-white uppercase tracking-wider">
                            LIVE
                          </span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="truncate text-sm font-semibold text-white group-hover:text-white">
                            {event.title}
                          </h4>
                          {event.isLive && (
                            <span className="inline-flex items-center rounded-full bg-[#153e25] border border-[#1e5433] px-2 py-0.5 text-[9px] font-bold text-[#4ade80]">
                              LIVE
                            </span>
                          )}
                        </div>

                        {/* Location */}
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-white/50">
                          <MapPin size={12} className="text-white/40" />
                          <span className="truncate">{event.location}</span>
                        </div>

                        {/* Tags */}
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md border border-[#262b33] bg-[#121519] px-2 py-0.5 text-[10px] font-medium text-white/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-3">{getCategoryBadge(event.category)}</td>

                  {/* Date & Time */}
                  <td className="py-4 px-3">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 text-white/80 font-medium">
                        <Calendar size={13} className="text-white/40" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/50 text-[11px]">
                        <Clock3 size={13} className="text-white/40" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </td>

                  {/* Venue */}
                  <td className="py-4 px-3">
                    <div>
                      <p className="text-xs font-semibold text-white/90 truncate max-w-[170px]">
                        {event.venue}
                      </p>
                      <div className="mt-1.5">{getModeBadge(event.mode)}</div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-3">{getStatusBadge(event.status)}</td>

                  {/* Registrations */}
                  <td className="py-4 px-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-white">
                          {event.registrations}{" "}
                          <span className="text-white/40 font-normal">/ {event.maxRegistrations}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[#20252e]">
                          <div
                            className={`h-full rounded-full ${
                              event.status === "CANCELLED" ? "bg-[#ef4444]" : "bg-[#22c55e]"
                            }`}
                            style={{ width: `${Math.min(event.percentage, 100)}%` }}
                          />
                        </div>
                        <span
                          className={`text-[11px] font-semibold ${
                            event.status === "CANCELLED" ? "text-[#ef4444]" : "text-[#22c55e]"
                          }`}
                        >
                          {event.percentage}%
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="relative py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View details */}
                      <button
                        type="button"
                        onClick={() => onViewEvent(event)}
                        title="View event details"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                      >
                        <Eye size={14} />
                      </button>

                      {/* Edit event */}
                      <button
                        type="button"
                        onClick={() => onEditEvent?.(event)}
                        title="Edit event"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                      >
                        <Pencil size={14} />
                      </button>

                      {/* Analytics */}
                      <button
                        type="button"
                        onClick={() => onViewEvent(event)}
                        title="View analytics"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                      >
                        <BarChart2 size={14} />
                      </button>

                      {/* Context action menu */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveMenuId(activeMenuId === event.id ? null : event.id)
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                        >
                          <MoreVertical size={14} />
                        </button>

                        {activeMenuId === event.id && (
                          <>
                            <div
                              className="fixed inset-0 z-20"
                              onClick={() => setActiveMenuId(null)}
                            />
                            <div className="absolute right-0 top-9 z-30 w-44 rounded-xl border border-[#2b323d] bg-[#1b2027] p-1.5 shadow-xl">
                              <button
                                type="button"
                                onClick={() => {
                                  onViewEvent(event);
                                  setActiveMenuId(null);
                                }}
                                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                              >
                                <Eye size={14} />
                                <span>Event Details</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    `${window.location.origin}/event/${event.id}`,
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
                                  window.open(`/event/${event.id}`, "_blank");
                                  setActiveMenuId(null);
                                }}
                                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                              >
                                <ExternalLink size={14} />
                                <span>Public Page</span>
                              </button>

                              {onDeleteEvent && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onDeleteEvent(event.id);
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-[#f87171] transition hover:bg-[#38181a] hover:text-rose-300"
                                >
                                  <Trash2 size={14} />
                                  <span>Cancel Event</span>
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

export default EventTable;
