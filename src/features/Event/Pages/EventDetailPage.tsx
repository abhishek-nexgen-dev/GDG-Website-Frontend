import { useParams } from "react-router-dom";

import { CalendarDays, Clock3, Globe, MapPin, ShieldCheck, Users, BookOpen } from "lucide-react";

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
import Timeline from "../Components/Timeline";
import RulesList from "../Components/RulesList";

import usefetchEventDetaill from "../hook/usefetchEventDetaill";
import GDGLoader from "../../../Components/GDGLoader";

const ViewSingleEventPage = () => {
  const { Slug } = useParams<{ Slug: string }>();

  if (!Slug) {
    throw new Error("Slug is required");
  }

  const { data, isLoading, isError } = usefetchEventDetaill(Slug);

  if (isLoading) {
    return <GDGLoader />;
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
          <div className="w-full lg:w-[70%] flex flex-col gap-8">
            <AboutEvent event={event} />

            {/* Timeline Section */}
            {event.timeline && event.timeline.length > 0 && (
              <div className="rounded-2xl border border-white/[0.08] bg-[#0b0d0e] p-6 sm:p-8">
                <h3 className="text-2xl font-semibold tracking-tight text-white mb-6">Event Timeline</h3>
                <Timeline timeline={event.timeline} />
              </div>
            )}

            {/* Rules & Requirements Grid */}
            {(event.rules?.length > 0 || event.requirements?.length > 0) && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {event.rules?.length > 0 && (
                  <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#111315] via-[#0b0d0e] to-[#070808] p-6">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                        <ShieldCheck size={20} />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Rules & Guidelines</h3>
                    </div>
                    <RulesList items={event.rules} />
                  </div>
                )}
                
                {event.requirements?.length > 0 && (
                  <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#111315] via-[#0b0d0e] to-[#070808] p-6">
                    <div className="mb-6 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#34A853]/10 text-[#34A853]">
                        <BookOpen size={20} />
                      </div>
                      <h3 className="text-lg font-semibold text-white">Requirements</h3>
                    </div>
                    <RulesList items={event.requirements} />
                  </div>
                )}
              </div>
            )}
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
