import { singleEventData } from "../data/singleEventData";
import { ArrowRight, CalendarDays, ExternalLink, MapPin, Users } from "lucide-react";
import {
  formatDateRange,
  formatStatus,
  getEventEndDate,
  getEventStartDate,
} from "../utils/Event.utils";

const EVENT_BANNER = () => {
  const event = singleEventData;
  const eventStart = getEventStartDate();
  const eventEnd = getEventEndDate();
  const eventDate = formatDateRange(eventStart, eventEnd);

  return (
    <section className="relative mt-[8vh] overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0f]">
      <div className="grid h-[65vh] lg:grid-cols-2">
        {/* LEFT — Event Content */}
        <div className="relative z-10 flex h-full flex-col justify-center p-7 sm:p-10 lg:px-[2vw]">
          {/* Category + Status */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-400">
              {event.category}
            </span>

            {event.status === "REGISTRATION_OPEN" && (
              <span className="flex items-center gap-2 rounded-full border border-green-400/20 bg-green-500/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-green-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                Registration Open
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="mt-7 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.5vw]">
            {event.title}
          </h1>

          {/* Accent line */}
          <div className="mt-6 h-1 w-16 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04]" />

          {/* Description */}
          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
            {event.shortDescription}
          </p>

          {/* Event Information */}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-5">
            {/* Date */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06]">
                <CalendarDays size={17} className="text-blue-400" />
              </div>

              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/30">
                  Date
                </p>

                <p className="mt-1 text-xs font-medium text-white/80 sm:text-sm">{eventDate}</p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06]">
                <MapPin size={17} className="text-red-400" />
              </div>

              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/30">
                  Venue
                </p>

                <p className="mt-1 max-w-[200px] truncate text-xs font-medium text-white/80 sm:text-sm">
                  {event.venue.venueName}
                </p>
              </div>
            </div>

            {/* Mode */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06]">
                <Users size={17} className="text-green-400" />
              </div>

              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/30">
                  Mode
                </p>

                <p className="mt-1 text-xs font-medium text-white/80 sm:text-sm">
                  {formatStatus(event.venue.mode)}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-9 flex flex-wrap gap-3">
            <button
              type="button"
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
            >
              Register Now
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {event.redirectUrl && (
              <a
                href={event.redirectUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
              >
                Event Website
                <ExternalLink
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            )}
          </div>
        </div>

        {/* RIGHT — Event Image */}
        <div className="relative min-h-[320px] lg:min-h-full">
          <img
            src={event.coverImageUrl}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Desktop gradient */}
          <div className="absolute inset-0 hidden bg-gradient-to-r from-[#0b0b0f] via-transparent to-transparent lg:block" />

          {/* Mobile gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent lg:hidden" />

          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0b0b0f]/80 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default EVENT_BANNER;
