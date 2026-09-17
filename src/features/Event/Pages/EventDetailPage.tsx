import { useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Users, Globe, Tag, Sparkles, Clock3 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  formatDate,
  formatStatus,
} from "../utils/Event.utils";
import AboutEvent from "../Components/AboutEvent";
import Timeline from "../Components/Timeline";
import EVENT_BANNER from "../Components/EVENT_BANNER";
import HIGHLIGHTS_Sec from "../Section/HIGHLIGHTS_Sec";
import EventMentors from "../Components/EventMentors";
import EventJudges from "../Components/EventJudges";
import EventRulesGuidelines from "../Components/EventRulesGuidelines";
import usefetchEventDetaill from "../hook/usefetchEventDetaill";
import GDGLoader from "../../../Components/GDGLoader";

import { singleEventData } from "../data/singleEventData";

const ViewSingleEventPage = () => {
  const { Slug } = useParams<{ Slug: string }>();
  const [activeTab, setActiveTab] = useState("about");
  const tabContentRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = usefetchEventDetaill(Slug || "");
  const event = data;

  useGSAP(
    () => {
      if (tabContentRef.current) {
        gsap.fromTo(
          tabContentRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
        );
      }
    },
    { dependencies: [activeTab] }
  );

  const tabs = useMemo(() => {
    if (!event) return [];
    return [
      { id: "about", label: "About" },
      ...((event.timeline?.length ?? 0) > 0 ? [{ id: "timeline", label: "Timeline" }] : []),
      ...(((event.rules?.length ?? 0) > 0 || (event.requirements?.length ?? 0) > 0)
        ? [{ id: "rules", label: "Rules & Guidelines" }]
        : []),
    ];
  }, [event]);

  if (!Slug) {
    throw new Error("Slug is required");
  }

  if (isLoading) {
    return <GDGLoader />;
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <p className="text-xl">Event not found.</p>
      </div>
    );
  }

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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-20">
        {/* Banner and Highlights */}
        <EVENT_BANNER event={event} />
        <HIGHLIGHTS_Sec event={event} />

        {/* ================= MAIN CONTENT SECTION (ABOUT, TIMELINE, RULES & SUMMARY) ================= */}
        <section className="mt-10 sm:mt-12">
          {/* Tabs Selector */}
          <div className="flex gap-2 sm:gap-4 overflow-x-auto no-scrollbar border-b border-white/10 mb-8 pb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-3.5 px-3 sm:px-4 text-sm sm:text-base font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] rounded-full transition-all duration-300" />
                )}
              </button>
            ))}
          </div>

          {/* 2-Column Grid: Left Content Card & Right Sidebar perfectly aligned at the top */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT COLUMN: Dynamic Content Based on Tabs with GSAP transition */}
            <div className="lg:col-span-8 flex flex-col min-h-[400px]">
              <div ref={tabContentRef} className="relative w-full">
                {activeTab === "about" && (
                  <div className="prose prose-invert max-w-none">
                    <AboutEvent event={event} />
                  </div>
                )}

                {activeTab === "timeline" && event.timeline && event.timeline.length > 0 && (
                  <div
                    id="schedule"
                    className="w-full py-4 sm:py-8 px-4 sm:px-8 rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
                  >
                    <div className="max-w-3xl mx-auto sm:mx-0 mb-8">
                      <div className="mb-3 flex items-center gap-2">
                        <Clock3 size={13} strokeWidth={1.8} className="text-[#34A853]" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#34A853]">
                          Event Itinerary
                        </span>
                      </div>
                      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.875rem] sm:leading-tight">
                        Event Schedule
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-[15px]">
                        Follow the timeline to know what happens when.
                      </p>
                    </div>
                    {/* Subtle divider */}
                    <div className="my-8 h-px w-full bg-white/[0.07]" />
                    <div className="px-1 sm:px-0">
                      <Timeline timeline={event.timeline} />
                    </div>
                  </div>
                )}

                {activeTab === "rules" && (event.rules?.length > 0 || event.requirements?.length > 0) && (
                  <div>
                    <EventRulesGuidelines
                      rules={event.rules}
                      requirements={event.requirements}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: Bento Info Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
              {/* Quick Summary Bento */}
              <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/10 bg-white/[0.02]">
                  <h3 className="text-lg font-bold text-white mb-1">Event Summary</h3>
                  <p className="text-xs text-white/40">Essential details at a glance</p>
                </div>
                <div className="p-6 grid grid-cols-1 gap-6">
                  <BentoRow icon={<MapPin className="text-red-400" />} label="Venue Location">
                    {event.venue?.venueName || "TBA"} <br />
                    <span className="text-white/50 font-normal">
                      {[event.venue?.city, event.venue?.state].filter(Boolean).join(", ")}
                    </span>
                  </BentoRow>

                  <BentoRow icon={<Globe className="text-blue-400" />} label="Event Mode">
                    {formatStatus(event.venue?.mode)}
                  </BentoRow>

                  <BentoRow icon={<Clock3 className="text-emerald-400" />} label="Registration">
                    Opens: {formatDate(event.registrationStartAt)} <br />
                    Closes: {formatDate(event.registrationEndAt)}
                  </BentoRow>

                  <BentoRow icon={<Users className="text-purple-400" />} label="Team Size">
                    2 - 4 Members
                  </BentoRow>

                  <BentoRow icon={<Sparkles className="text-amber-400" />} label="Mentors">
                    {(event.mentors?.length ?? 0) > 0
                      ? `${event.mentors?.length}+ Expert Mentors`
                      : "Mentors TBA"}
                  </BentoRow>
                </div>
              </div>

              {/* Tags Box */}
              {event.tags && event.tags.length > 0 && (
                <div className="rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={14} className="text-white/40" />
                    <h3 className="text-sm font-bold text-white/70 uppercase tracking-widest">
                      Explore Topics
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-default"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= SPEAKERS & MENTORS SECTION ================= */}
        <section className="mt-12 sm:mt-16">
          <EventMentors
            mentors={
              event.mentors && event.mentors.length > 0
                ? event.mentors
                : singleEventData.mentors
            }
          />
        </section>

        {/* ================= JUDGES SECTION ================= */}
        <section className="mt-12 sm:mt-16">
          <EventJudges
            judges={
              event.judges && event.judges.length > 0
                ? event.judges
                : singleEventData.judges
            }
          />
        </section>
      </div>
    </main>
  );
};

/* ============================================================
   BENTO ROW COMPONENT
============================================================ */
const BentoRow = ({ icon, label, children }: { icon: React.ReactNode, label: string, children: React.ReactNode }) => (
  <div className="flex items-start gap-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08]">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1">{label}</span>
      <span className="text-sm font-semibold text-white/90 leading-tight">
        {children}
      </span>
    </div>
  </div>
)

export default ViewSingleEventPage;
