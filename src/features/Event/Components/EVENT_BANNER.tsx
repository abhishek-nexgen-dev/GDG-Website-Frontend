import { ArrowRight, CalendarDays, ExternalLink, MapPin, Tag, Users } from "lucide-react";

import {
  formatDateRange,
  formatStatus,
  getEventEndDate,
  getEventStartDate,
} from "../utils/Event.utils";

import type { EventResponse } from "../type/Event.type";

interface EventBannerProps {
  event: EventResponse;
}

const EVENT_BANNER = ({ event }: EventBannerProps) => {
  const eventStart = getEventStartDate(event);
  const eventEnd = getEventEndDate(event);

  const eventDate = formatDateRange(eventStart, eventEnd);

  return (
    <section className="relative mt-[6vh] sm:mt-[8vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0f] shadow-2xl shadow-black/30">
      <div className="flex flex-col flex-col-reverse lg:flex-row items-stretch">
        {/* ================= LEFT — EVENT CONTENT ================= */}
        <div className="relative z-10 flex flex-col justify-center p-5 sm:p-8 lg:px-[3vw] lg:py-[4vw] flex-1">
          <div className="flex flex-wrap items-center gap-2.5">
            {event.category && (
              <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-400">
                {event.category}
              </span>
            )}

            {event.status && (
              <span
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                  event.status === "REGISTRATION_OPEN"
                    ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-400"
                    : "border-white/10 bg-white/[0.04] text-white/50"
                }`}
              >
                {event.status === "REGISTRATION_OPEN" && (
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                )}

                {formatStatus(event.status)}
              </span>
            )}
          </div>

          <h1 className="mt-5 sm:mt-7 max-w-full sm:max-w-3xl text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-white">
            {event.title}
          </h1>

          <div className="mt-4 sm:mt-6 h-1 w-16 sm:w-20 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04]" />

          {event.shortDescription && (
            <p className="mt-4 sm:mt-6 max-w-full sm:max-w-2xl text-xs sm:text-sm leading-relaxed text-white/60 sm:text-white/55">
              {event.shortDescription}
            </p>
          )}

          {event.tags && event.tags.length > 0 && (
            <div className="mt-5 sm:mt-6">
              <div className="mb-2 sm:mb-3 flex items-center gap-2">
                <Tag size={12} className="text-white/35" />

                <span className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  Explore Topics
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {event.tags.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.035] px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-medium text-white/60 transition-all duration-300 hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300"
                  >
                    #{tag}
                  </span>
                ))}

                {event.tags.length > 6 && (
                  <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 sm:px-3 py-1 text-[9px] sm:text-[10px] font-medium text-white/40">
                    +{event.tags.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {/* Date */}
            <EventInfo
              icon={<CalendarDays size={14} className="text-blue-400" />}
              label="Event Date"
              value={eventDate}
            />

            <EventInfo
              icon={<MapPin size={14} className="text-red-400" />}
              label="Venue"
              value={event.venue?.venueName || "Venue TBA"}
            />

            <EventInfo
              icon={<Users size={14} className="text-emerald-400" />}
              label="Mode"
              value={formatStatus(event.venue?.mode)}
            />
          </div>

          <div className="mt-6 sm:mt-9 flex flex-col sm:flex-wrap gap-2 sm:gap-3">
            <button
              type="button"
              className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl bg-white px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold text-black shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1 active:translate-y-0"
            >
              Register Now
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {event.redirectUrl && (
              <a
                href={event.redirectUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-4 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07] hover:text-white active:translate-y-0"
              >
                Event Website
                <ExternalLink
                  size={13}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            )}
          </div>
        </div>

        {/* ================= RIGHT — EVENT IMAGE ================= */}
        <div className="relative min-h-[280px] sm:min-h-[350px] lg:min-h-full overflow-hidden flex-none lg:w-[50%]">
          {event.coverImageUrl ? (
            <img
              src={event.coverImageUrl}
              alt={event.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-red-600/20" />
          )}

          <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0b0b0f] via-[#0b0b0f]/20 to-transparent lg:block" />

          {/* Mobile Bottom Blend */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-[#0b0b0f]/20 to-transparent lg:hidden" />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Decorative Badge */}
          <div className="absolute right-3 sm:right-5 top-3 sm:top-5 rounded-xl border border-white/10 bg-black/30 px-2 sm:px-3 py-1.5 sm:py-2 backdrop-blur-md">
            <p className="text-[7px] sm:text-[9px] uppercase tracking-[0.15em] text-white/50">
              {formatStatus(event.venue?.mode)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   REUSABLE EVENT INFO
============================================================ */

interface EventInfoProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const EventInfo = ({ icon, label, value }: EventInfoProps) => {
  return (
    <div className="flex items-start sm:items-center gap-2 sm:gap-3">
      <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[7px] sm:text-[9px] font-medium uppercase tracking-[0.15em] text-white/30">
          {label}
        </p>

        <p className="mt-0.5 sm:mt-1 truncate text-[10px] sm:text-xs font-medium text-white/80 sm:text-sm">
          {value}
        </p>
      </div>
    </div>
  );
};

export default EVENT_BANNER;
