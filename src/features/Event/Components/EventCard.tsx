import { memo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  MapPin,
  Tag,
} from "lucide-react";
import clsx from "clsx";

import { formatDate } from "../utils/Event.utils";
import type { EventStatus, PublicEvent } from "../type/Event.type";

const STATUS_CONFIG = {
  REGISTRATION_OPEN: {
    label: "Registration Open",
    dot: "bg-blue-500",
    className: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  },

  REGISTRATION_CLOSED: {
    label: "Registration Closed",
    dot: "bg-zinc-500",
    className: "border-white/10 bg-white/5 text-zinc-400",
  },

  LIVE: {
    label: "Live Now",
    dot: "animate-pulse bg-red-400",
    className: "border-red-400/20 bg-red-400/10 text-red-300",
  },

  COMPLETED: {
    label: "Completed",
    dot: "bg-blue-400",
    className: "border-blue-400/20 bg-blue-400/10 text-blue-300",
  },

  CANCELLED: {
    label: "Cancelled",
    dot: "bg-orange-400",
    className: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  },
} satisfies Record<
  EventStatus,
  {
    label: string;
    dot: string;
    className: string;
  }
>;

const EventCard = memo(({ event }: { event: PublicEvent }) => {
  const config = STATUS_CONFIG[event.status];

  return (
    <Link
      to={`/event/${event.Slug}`}
      aria-label={`View ${event.title}`}
      className="
        group flex h-fit flex-col overflow-hidden
        rounded-2xl border border-white/[0.08]
        bg-[#080808]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-white/[0.14]
        hover:bg-[#0a0a0a]
        hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-blue-500/60
      "
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900">
        <img
          src={event.coverImageUrl}
          alt={event.title}
          loading="lazy"
          decoding="async"
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* STATUS */}
        <span
          className={clsx(
            "absolute left-3 top-3",
            "inline-flex items-center gap-1.5",
            "rounded-full border px-2.5 py-1.5",
            "text-[9px] font-semibold uppercase tracking-wide",
            "backdrop-blur-md",
            
            config.className,
          )}
        >
          <span
            className={clsx(
              "h-1.5 w-1.5 rounded-full",
              config.dot,
            )}
          />

          {config.label}
        </span>

        {/* ACTION */}
        <span
          className="
            absolute right-3 top-3
            flex h-8 w-8 items-center justify-center
            rounded-lg border border-white/10
            bg-black/40 text-white/80
            opacity-0 backdrop-blur-md
            transition-opacity duration-300
            group-hover:opacity-100
          "
        >
          <ArrowUpRight size={15} />
        </span>

        {/* CATEGORY */}
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.12em] text-white/60">
            <Tag size={15} />
            <span>{event.category || "Event"}</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3
          className="
            line-clamp-2
            text-md font-semibold leading-5
            tracking-tight text-zinc-100
            transition-colors
            group-hover:text-blue-400
          "
        >
          {event.title}
        </h3>

        {event.shortDescription && (
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-zinc-500">
            {event.shortDescription}
          </p>
        )}

        {event.venue?.venueName && (
          <div className="my-4 flex min-w-0 items-center gap-2 text-[12px] text-zinc-500">
            <MapPin
              size={12}
              className="shrink-0 text-zinc-600"
            />

            <span className="truncate">
              {event.venue.venueName}
            </span>
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
          <div className="flex min-w-0 items-center gap-2 text-[10px] text-zinc-600">
            <CalendarDays
              size={12}
              className="shrink-0 text-blue-500/60"
            />

            <span className="truncate">
              {formatDate(event.registrationStartAt)}
            </span>
          </div>

          <span
            className="
              flex shrink-0 items-center gap-1
              text-[10px] font-medium text-zinc-500
              transition-colors
              group-hover:text-blue-500
            "
          >
            View
            <ArrowUpRight
              size={11}
              className="
                transition-transform duration-200
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </span>
        </div>
      </div>
    </Link>
  );
});

EventCard.displayName = "EventCard";

export default EventCard;