import { useParams } from "react-router-dom";

import { CalendarDays, Clock3, Globe, MapPin, ShieldCheck, Users } from "lucide-react";

import {
  formatDate,
  formatDateRange,
  formatStatus,
  getEventEndDate,
  getEventStartDate,
} from "../utils/Event.utils";

import InfoCard from "../Components/InfoCard";
import Detail from "../Components/Detail";
import AboutEvent from "../Components/AboutEvent";
import EVENT_BANNER from "../Components/EVENT_BANNER";
import HIGHLIGHTS_Sec from "../Section/HIGHLIGHTS_Sec";

import usefetchEventDetaill from "../hook/usefetchEventDetaill";

const ViewSingleEventPage = () => {
  const { Slug } = useParams<{ Slug: string }>();

  if (!Slug) {
    throw new Error("Slug is required");
  }

  const { data, isLoading, isError } = usefetchEventDetaill(Slug);

  // Loading State
  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <p className="text-sm text-white/60">Loading event details...</p>
      </main>
    );
  }

  // Error State
  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <p className="text-sm text-red-400">Failed to load event details.</p>
      </main>
    );
  }

  // API event data
  const event = data;

  // FIX: Pass 'event' to getEventStartDate as well if the utility expects it
  // Assuming getEventStartDate might need the event object or relies on context
  const eventStart = getEventStartDate(event);
  const eventEnd = getEventEndDate(event);

  const eventDate = formatDateRange(eventStart, eventEnd);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      {/* Background Grid - Responsive sizing */}
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

      {/* Background Effects - Keep absolute positioning but ensure they don't block content */}
      <div className="pointer-events-none absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-[#EA4335]/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-100px] top-[5%] h-96 w-96 rounded-full bg-[#4285F4]/20 blur-[150px]" />
      <div className="pointer-events-none absolute left-[-120px] top-[15%] h-80 w-80 rounded-full bg-green-700/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-100px] top-[40%] h-96 w-96 rounded-full bg-purple-700/20 blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-[90%] px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* Banner and Highlights */}
        <EVENT_BANNER event={event} />
        <HIGHLIGHTS_Sec event={event} />

        {/* =====================================================
            ABOUT + EVENT DETAILS (Responsive Flex Layout)
        ===================================================== */}

        <section
          id="overview"
          className="mt-10 flex flex-col-reverse  gap-3 lg:flex-row lg:items-start lg:gap-[2vw]"
        >
          {/* About Section */}
          <div className="w-full lg:w-[70%]">
            <AboutEvent event={event} />
          </div>

          {/* Details Sidebar - Fixed width on desktop, full width on mobile */}
          <div className="w-full lg:w-[30%] lg:sticky lg:top-6">
            <InfoCard eyebrow="Everything you need" title="Event Details">
              <div className="space-y-6">
                {/* Event Date */}
                <Detail icon={<CalendarDays size={16} />} label="Event Date" value={eventDate} />

                {/* Registration */}
                <Detail
                  icon={<Clock3 size={16} />}
                  label="Registration"
                  value={`${formatDate(event.registrationStartAt)} – ${formatDate(
                    event.registrationEndAt,
                  )}`}
                />

                {/* Venue */}
                <Detail
                  icon={<MapPin size={16} />}
                  label="Venue"
                  value={
                    <>
                      {event.venue?.venueName}
                      <br />
                      {event.venue?.city}, {event.venue?.state}
                    </>
                  }
                />

                {/* Mode */}
                <Detail
                  icon={<Globe size={16} />}
                  label="Mode"
                  value={formatStatus(event.venue?.mode)}
                />

                {/* Team Size */}
                <Detail icon={<Users size={16} />} label="Team Size" value="2 – 4 Members" />

                {/* Status */}
                <Detail
                  icon={<ShieldCheck size={16} />}
                  label="Status"
                  value={
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-400">
                      {formatStatus(event.status)}
                    </span>
                  }
                  active
                />
              </div>
            </InfoCard>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ViewSingleEventPage;
