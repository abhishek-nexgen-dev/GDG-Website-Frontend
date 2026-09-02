import Highlight from "../Components/Highlight";
import { Clock3, ShieldCheck, Users, Zap } from "lucide-react";
import { formatStatus } from "../utils/Event.utils";

import type { EventResponse } from "../type/Event.type";


interface EventHignLightsProps {
  event: EventResponse;
}


const HIGHLIGHTS_Sec = ({event}: EventHignLightsProps) => {
  

  return (
    <section className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-sm px-5">
      <div className="grid grid-cols-1 divide-y divide-white/[0.07] sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {/* Event Type */}
        <Highlight icon={<Zap size={18} />} value={event.category} label="Event Type" />

        {/* Duration */}
        <Highlight icon={<Clock3 size={18} />} value="24 Hours" label="Event Duration" />

        {/* Mentors */}
        <Highlight icon={<Users size={18} />} value={`5+`} label="Expert Mentors" />

        {/* Mode */}
        <Highlight
          icon={<ShieldCheck size={18} />}
          value={formatStatus(event.venue.mode)}
          label="Event Mode"
        />
      </div>
    </section>
  );
};

export default HIGHLIGHTS_Sec;
