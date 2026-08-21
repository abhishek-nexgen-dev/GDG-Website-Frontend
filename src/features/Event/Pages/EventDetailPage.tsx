import {
  CalendarDays,
  Clock3,
  Globe,
  MapPin,
  ShieldCheck,
  Users
} from "lucide-react";

import { singleEventData } from "../data/singleEventData";
import {
  formatDate,
  formatDateRange,
  formatStatus,
  getEventEndDate,
  getEventStartDate,
} from "../utils/Event.utils";

import InfoCard from "../Components/InfoCard";

import Detail from "../Components/Detail";


import QuickInfo from "../Components/QuickInfo";

import AboutEvent from "../Components/AboutEvent";
import EVENT_BANNER from "../Components/EVENT_BANNER";
import HIGHLIGHTS_Sec from "../Section/HIGHLIGHTS_Sec";


const ViewSingleEventPage = () => {
  const event = singleEventData;

  const eventStart = getEventStartDate();
  const eventEnd = getEventEndDate();

  const eventDate = formatDateRange(eventStart, eventEnd);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-[#EA4335]/20 blur-[120px]" />
      <div className="absolute right-[-100px] top-[5%] h-96 w-96 rounded-full bg-[#4285F4]/20 blur-[150px]" />

      <div className="absolute left-[-120px] top-[15%] h-80 w-80 rounded-full bg-green-700/20 blur-[120px]" />
      <div className="absolute right-[-100px] top-[40%] h-96 w-96 rounded-full bg-purple-700/20 blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-[90%] px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <EVENT_BANNER />

        <HIGHLIGHTS_Sec />

        {/* =====================================================
            ABOUT + EVENT DETAILS
        ===================================================== */}

        <section id="overview" className="flex gap-[1vw] justify-between mt-10">
          <AboutEvent />

          <div className="flex flex-col w-[30%] gap-4">
            <InfoCard eyebrow="Everything you need" title="Event Details">
              <div className="space-y-5">
                <Detail icon={<CalendarDays size={16} />} label="Event Date" value={eventDate} />

                <Detail
                  icon={<Clock3 size={16} />}
                  label="Registration"
                  value={`${formatDate(event.registrationStartAt)} – ${formatDate(
                    event.registrationEndAt,
                  )}`}
                />

                <Detail
                  icon={<MapPin size={16} />}
                  label="Venue"
                  value={
                    <>
                      {event.venue.venueName}
                      <br />
                      {event.venue.city}, {event.venue.state}
                    </>
                  }
                />

                <Detail
                  icon={<Globe size={16} />}
                  label="Mode"
                  value={formatStatus(event.venue.mode)}
                />

                <Detail icon={<Users size={16} />} label="Team Size" value="2 – 4 Members" />

                <Detail
                  icon={<ShieldCheck size={16} />}
                  label="Status"
                  value={
                    <span className="inline-flex rounded-full bg-emerald-500/10 px-2 py-1 text-[9px] text-emerald-400">
                      {formatStatus(event.status)}
                    </span>
                  }
                  active
                />
              </div>
            </InfoCard>

            <InfoCard eyebrow="At a glance" title="Quick Info">
              <QuickInfo />
            </InfoCard>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ViewSingleEventPage;
