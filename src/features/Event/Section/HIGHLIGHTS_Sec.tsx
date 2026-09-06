import Highlight from "../Components/Highlight";
import { Clock3, ShieldCheck, Users, Zap } from "lucide-react";
import { formatStatus } from "../utils/Event.utils";

import type { EventResponse } from "../type/Event.type";

interface EventHignLightsProps {
  event: EventResponse;
}

const HIGHLIGHTS_Sec = ({ event }: EventHignLightsProps) => {
  const getEventDuration = () => {
    if (!event.registrationStartAt || !event.registrationEndAt) {
      return "N/A";
    }

    const start = new Date(event.registrationStartAt);
    const end = new Date(event.registrationEndAt);

    const difference = end.getTime() - start.getTime();

    if (difference <= 0) return "Same day";

    const totalHours = Math.ceil(difference / (1000 * 60 * 60));
    const days = Math.floor(totalHours / 24);
    const hours = totalHours % 24;

    if (days > 0 && hours > 0) {
      return `${days}d ${hours}h`;
    }

    if (days > 0) {
      return `${days} ${days === 1 ? "Day" : "Days"}`;
    }

    return `${totalHours} ${totalHours === 1 ? "Hour" : "Hours"}`;
  };

  const mentorCount = event.mentors?.length ?? 0;

  return (
    <section className="hidden md:block mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-md">
      <div className="grid grid-cols-1 divide-y divide-white/[0.07] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {/* Event Type */}
        <Highlight
          icon={<Zap size={18} />}
          value={event.category || "General"}
          label="Event Type"
        />

        {/* Duration */}
        <Highlight
          icon={<Clock3 size={18} />}
          value={getEventDuration()}
          label="Registration Period"
        />

        {/* Mentors */}
        <Highlight
          icon={<Users size={18} />}
          value={mentorCount > 0 ? `${mentorCount}+` : "TBA"}
          label="Expert Mentors"
        />

        {/* Event Mode */}
        <Highlight
          icon={<ShieldCheck size={18} />}
          value={event.venue?.mode ? formatStatus(event.venue.mode) : "TBA"}
          label="Event Mode"
        />
      </div>
    </section>
  );
};

export default HIGHLIGHTS_Sec;
