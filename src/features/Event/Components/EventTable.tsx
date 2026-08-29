import {
  MapPin,
  Calendar,
  Clock3,
  Eye,
  Pencil,
  BarChart2,
  MoreVertical,
  ArrowUpDown,
} from "lucide-react";
import type { EventItem, EventStatus } from "../type/Event.type";
import type { EventCategory } from "../data/events.data";

interface EventTableProps {
  events: EventItem[];

  onDeleteEvent?: (id: string) => void;
}

const EventTable = ({ events }: EventTableProps) => {
  const getCategoryBadge = (category: EventCategory) => {
    switch (category) {
      case "Hackathon":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#442661] bg-[#2f1c42] px-2.5 py-1 text-[14px] font-medium text-[#c084fc]">
            Hackathon
          </span>
        );
      case "Workshop":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#1d3d66] bg-[#152c4a] px-2.5 py-1 text-[14px] font-medium text-[#60a5fa]">
            Workshop
          </span>
        );
      case "Meetup":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#3b1f59] bg-[#28163d] px-2.5 py-1 text-[14px] font-medium text-[#c084fc]">
            Meetup
          </span>
        );
      case "Talk":
      default:
        return (
          <span className="inline-flex items-center rounded-lg border border-[#4e3216] bg-[#382410] px-2.5 py-1 text-[14px] font-medium text-[#f59e0b]">
            Talk
          </span>
        );
    }
  };

  const getStatusBadge = (status: EventStatus) => {
    switch (status) {
      case "LIVE":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#1e5433] bg-[#153e25] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#4ade80]">
            Line
          </span>
        );
      case "REGISTRATION_CLOSED":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#1d3d66] bg-[#152c4a] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#60a5fa]">
            REGISTRATION_CLOSED
          </span>
        );

      case "REGISTRATION_OPEN":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#1d3d66] bg-[#152c4a] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#60a5fa]">
            REGISTRATION_OPEN
          </span>
        );

      case "COMPLETED":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#1e5433] bg-[#153e25] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#4ade80]">
            COMPLETED
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#521c1f] bg-[#381113] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#ef4444]">
            CANCELLED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-lg border border-[#521c1f] bg-[#381113] px-2.5 py-1 text-[11px] font-bold tracking-wider text-[#ef4444]">
            CANCELLED
          </span>
        );
    }
  };

  return (
    <div className="relative overflow-hidden rounded-md border border-[#232830] bg-[#161a1f] w-full">
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
              events.map((event) => {
                // Determine if we have a valid image to display
                const hasImage = event.coverImageUrl && event.coverImageUrl.trim() !== "";

                let date = new Date(event.registrationStartAt).toDateString();
                let time = new Date(event.registrationStartAt).toLocaleTimeString();

                return (
                  <tr key={event.Slug} className="group transition-colors hover:bg-[#1b2027]">
                    {/* Event Details with Thumbnail */}
                    <td className="py-4 pl-5 pr-3">
                      <div className="flex items-start gap-3.5">
                        {/* Banner Thumbnail */}
                        <div
                          className={`flex h-16 w-[28%] shrink-0 flex-col items-center justify-center rounded-xl border border-[#2b323d] shadow-inner ${
                            hasImage ? "p-0.5" : `bg-gradient-to-br `
                          }`}
                        >
                          {hasImage ? (
                            <img
                              src={event.coverImageUrl}
                              alt={event.title}
                              className="h-full w-full rounded-lg object-cover"
                              onError={(e) => {
                                // Fallback to gradient if image fails to load
                                const img = e.currentTarget;
                                img.style.display = "none";
                                const container = img.parentElement;
                                if (container) {
                                  container.classList.remove("p-0.5");
                                }
                              }}
                            />
                          ) : null}

                          {event.isLive && (
                            <span className="mt-1 inline-flex items-center rounded-full bg-[#ef4444] px-1.5 py-0.2 text-[8px] font-bold text-white uppercase tracking-wider">
                              LIVE
                            </span>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="truncate text-md font-semibold text-white group-hover:text-white">
                              {event.title}
                            </h4>
                            {event.isLive && (
                              <span className="inline-flex items-center rounded-full bg-[#153e25] border border-[#1e5433] px-2 py-0.5 text-[10px] font-bold text-[#4ade80]">
                                LIVE
                              </span>
                            )}
                          </div>

                          {/* Location */}
                          <div className="mt-1 flex items-center gap-1.5 text-sm text-white/50">
                            <MapPin size={12} className="text-white/40" />
                            <span className="truncate">{event.venue.address}</span>
                          </div>

                          {/* Tags */}
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            {event.tags &&
                              event.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md border border-[#262b33] bg-[#121519] px-2 py-0.5 text-[12px] font-medium text-white/60"
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
                          <span>{date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-white/50 text-[11px]">
                          <Clock3 size={13} className="text-white/40" />
                          <span>{time}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-3">{event.venue.venueName}</td>

                    {/* Status */}
                    <td className="py-4 px-3">{getStatusBadge(event.status)}</td>

                    {/* Actions */}
                    <td className="relative py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"

                          title="View event details"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                        >
                          <Eye size={14} />
                        </button>

                        {/* Edit event */}
                        <button
                          type="button"

                          title="Edit event"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                        >
                          <Pencil size={14} />
                        </button>

                        {/* Analytics */}
                        <button
                          type="button"

                          title="View analytics"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                        >
                          <BarChart2 size={14} />
                        </button>

                        {/* Context action menu */}
                        <div className="relative">
                          <button
                            type="button"

                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                          >
                            <MoreVertical size={14} />
                          </button>
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

export default EventTable;
