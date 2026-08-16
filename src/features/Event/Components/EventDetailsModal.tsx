import { X, MapPin, Calendar, Clock3, Users, ExternalLink, ShieldCheck } from "lucide-react";
import type { EventItem } from "../data/events.data";

interface EventDetailsModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal = ({ event, isOpen, onClose }: EventDetailsModalProps) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 transition-opacity" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#232830] bg-[#161a1f] p-6 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[#232830] bg-[#121519] text-white/40 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
        >
          <X size={16} />
        </button>

        {/* Banner Banner */}
        <div
          className={`flex h-28 w-full flex-col items-center justify-center rounded-xl bg-gradient-to-br ${
            event.bannerColor || "from-[#1d1b4b] to-[#311042]"
          } p-4 text-center border border-[#2b323d] shadow-inner relative`}
        >
          <span className="text-sm font-black uppercase tracking-tight text-white leading-tight">
            {event.bannerTitle}
          </span>
          {event.isLive && (
            <span className="mt-2 inline-flex items-center rounded-full bg-[#ef4444] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              LIVE NOW
            </span>
          )}
        </div>

        {/* Title and Badges */}
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-white">{event.title}</h3>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-lg border border-[#442661] bg-[#2f1c42] px-2.5 py-0.5 text-xs font-medium text-[#c084fc]">
              {event.category}
            </span>

            <span className="rounded-lg border border-[#1e5433] bg-[#153e25] px-2.5 py-0.5 text-xs font-medium text-[#4ade80]">
              {event.status}
            </span>

            <span className="rounded-lg border border-[#1d3d66] bg-[#152c4a] px-2.5 py-0.5 text-xs font-medium text-[#60a5fa]">
              {event.mode}
            </span>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <p className="mt-3.5 text-xs leading-relaxed text-white/70 border-t border-[#232830] pt-3">
            {event.description}
          </p>
        )}

        {/* Details Grid */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3">
            <div className="flex items-center gap-2 text-white/40">
              <Calendar size={13} />
              <span className="text-[11px]">Date</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-white">{event.date}</p>
          </div>

          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3">
            <div className="flex items-center gap-2 text-white/40">
              <Clock3 size={13} />
              <span className="text-[11px]">Time</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-white">{event.time}</p>
          </div>

          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3">
            <div className="flex items-center gap-2 text-white/40">
              <MapPin size={13} />
              <span className="text-[11px]">Venue</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-white truncate">{event.venue}</p>
          </div>

          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3">
            <div className="flex items-center gap-2 text-white/40">
              <Users size={13} />
              <span className="text-[11px]">Registrations</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-[#4ade80]">
              {event.registrations} / {event.maxRegistrations} ({event.percentage}%)
            </p>
          </div>
        </div>

        {/* Speakers */}
        {event.speakers && event.speakers.length > 0 && (
          <div className="mt-3.5 rounded-xl border border-[#232830] bg-[#121519] p-3">
            <div className="flex items-center gap-1.5 text-white/40 text-[11px]">
              <ShieldCheck size={13} />
              <span>Speakers / Mentors</span>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {event.speakers.map((spk) => (
                <span
                  key={spk}
                  className="rounded-md border border-[#2b323d] bg-[#161a1f] px-2 py-0.5 text-xs text-white/80"
                >
                  {spk}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions footer */}
        <div className="mt-5 flex items-center justify-end gap-3 border-t border-[#232830] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
          >
            Close
          </button>

          <a
            href={`/event/${event.id}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-xl bg-[#22c55e] px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
          >
            <span>Public Event Page</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
