import { MapPin, Tag, Globe2, Layers3, Link2 } from "lucide-react";
import { singleEventData } from "../data/singleEventData";
import { formatStatus } from "../utils/Event.utils";

const QuickInfo = () => {
  const event = singleEventData;

  const location = [
    event.venue.venueName,
    event.venue.address,
    event.venue.city,
    event.venue.state,
    event.venue.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-6">

      {/* Category */}
      <div className="flex items-start gap-3">
        <Layers3
          size={15}
          strokeWidth={1.7}
          className="mt-0.5 shrink-0 text-white/30"
        />

        <div className="min-w-0">
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/25">
            Category
          </p>

          <p className="mt-1.5 text-sm font-medium text-white/70">
            {event.category}
          </p>
        </div>
      </div>


      {/* Tags */}
      {event.tags.length > 0 && (
        <div className="flex items-start gap-3">
          <Tag
            size={15}
            strokeWidth={1.7}
            className="mt-0.5 shrink-0 text-white/30"
          />

          <div className="min-w-0">
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/25">
              Tags
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="
                    rounded-md
                    border border-white/[0.08]
                    bg-white/[0.025]
                    px-2 py-1
                    text-[10px]
                    text-white/45
                    transition-colors
                    hover:border-white/[0.15]
                    hover:text-white/65
                  "
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}


      {/* Visibility */}
      <div className="flex items-start gap-3">
        <Globe2
          size={15}
          strokeWidth={1.7}
          className="mt-0.5 shrink-0 text-white/30"
        />

        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/25">
            Visibility
          </p>

          <div className="mt-1.5 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34A853] shadow-[0_0_7px_rgba(52,168,83,0.7)]" />

            <span className="text-sm font-medium text-white/65">
              {formatStatus(event.visibility)}
            </span>
          </div>
        </div>
      </div>


      {/* Location */}
      <div className="flex items-start gap-3">
        <MapPin
          size={15}
          strokeWidth={1.7}
          className="mt-0.5 shrink-0 text-white/30"
        />

        <div className="min-w-0">
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/25">
            Location
          </p>

          <p className="mt-1.5 text-sm font-medium leading-5 text-white/65">
            {event.venue.venueName}
          </p>

          <p className="mt-1 max-w-xs text-xs leading-5 text-white/30">
            {event.venue.address}
            <br />
            {event.venue.city}, {event.venue.state}
            <br />
            {event.venue.country}
          </p>

          <span className="mt-2 inline-flex rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[9px] uppercase tracking-wider text-white/35">
            {formatStatus(event.venue.mode)}
          </span>
        </div>
      </div>


      {/* Slug */}
      <div className="flex items-start gap-3">
        <Link2
          size={15}
          strokeWidth={1.7}
          className="mt-0.5 shrink-0 text-white/20"
        />

        <div className="min-w-0">
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/20">
            Event ID
          </p>

          <p className="mt-1.5 break-all font-mono text-[10px] leading-5 text-white/25">
            {event.Slug}
          </p>
        </div>
      </div>

    </div>
  );
};

export default QuickInfo;