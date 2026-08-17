import {
  ArrowRight,
  CalendarDays,
  Clock3,
  ExternalLink,
  Globe,
  MapPin,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

import { singleEventData } from "../data/singleEventData";
import {
  formatDate,
  formatDateRange,
  formatStatus,
  getEventEndDate,
  getEventStartDate,
} from "../utils/Event.utils";
import Highlight from "../Components/Highlight";
import InfoCard from "../Components/InfoCard";
import Feature from "../Components/Feature";
import Detail from "../Components/Detail";
import { BsPersonVcard } from "react-icons/bs";
import EmptyState from "../Components/EmptyStat";
import Timeline from "../Components/Timeline";
import QuickInfo from "../Components/QuickInfo";
import RulesList from "../Components/RulesList";
import Partners from "../Components/Partners";
import Sponsors from "../Components/Sponsors";
import FAQ from "../Components/FAQ";
import AboutEvent from "../Components/AboutEvent";

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

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        {/* =====================================================
            EVENT BANNER
        ===================================================== */}

        <section className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#09090c] mt-[10vh]">
          <div className="grid min-h-[480px] lg:grid-cols-[0.9fr_1.1fr]">
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.15em] text-purple-300">
                  {event.category}
                </span>

                {event.status === "REGISTRATION_OPEN" && (
                  <span className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                    Live Now
                  </span>
                )}
              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[0.98] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                {event.title}
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
                {event.shortDescription}
              </p>

              {/* Meta */}
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-4">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} className="text-purple-400" />

                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-white/25">Event Date</p>

                    <p className="mt-0.5 text-xs font-medium text-white/70">{eventDate}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-purple-400" />

                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-white/25">Venue</p>

                    <p className="mt-0.5 max-w-[180px] truncate text-xs font-medium text-white/70">
                      {event.venue.venueName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users size={16} className="text-purple-400" />

                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-white/25">Mode</p>

                    <p className="mt-0.5 text-xs font-medium text-white/70">
                      {formatStatus(event.venue.mode)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="group flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                  Register Now
                  <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                </button>

                {event.redirectUrl && (
                  <a
                    href={event.redirectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-medium text-white/65 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                  >
                    Event Website
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Banner Image */}
            <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
              <img
                src={event.coverImageUrl}
                alt={event.title}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#09090c] via-transparent to-transparent lg:from-[#09090c] lg:via-transparent" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#09090c]/80 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* =====================================================
            HIGHLIGHTS
        ===================================================== */}

        <section className="mt-4 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] sm:grid-cols-3 lg:grid-cols-5">
          <Highlight icon={<Zap size={18} />} value={event.category} label="Event Type" />

          <Highlight icon={<Clock3 size={18} />} value="24 Hours" label="Event Duration" />

          <Highlight icon={<Users size={18} />} value={`${event.mentors.length}`} label="Mentors" />

          <Highlight
            icon={<ShieldCheck size={18} />}
            value={formatStatus(event.venue.mode)}
            label="Event Mode"
          />

          <Highlight icon={<Globe size={18} />} value={formatStatus(event.status)} label="Status" />
        </section>

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


        <div className="w-full h-[10vh] bg-black mt-[10vh] text-white">Partner</div>

         <div className="w-full h-[10vh] bg-black mt-[2vh]">Sponsor</div>

        {/* =====================================================
            TIMELINE + QUICK INFO
        ===================================================== */}

        <section id="timeline" className="w-full mt-[5vh] rounded-2xl  ">
          <Timeline />
        </section>

        {/* =====================================================
            MENTORS
        ===================================================== */}

        <section
          id="mentors"
          className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6"
        >
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-purple-400">
                Learn from the best
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">Our Mentors</h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-white/30">
                Experienced professionals helping participants turn ideas into real-world solutions.
              </p>
            </div>

            <span className="text-[10px] text-white/25">{event.mentors.length} mentors</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {event.mentors.length ? (
              event.mentors.map((mentor) => (
                <BsPersonVcard key={mentor._id} person={mentor} type="Mentor" />
              ))
            ) : (
              <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <EmptyState text="Mentors will be announced soon." />
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            JUDGES
        ===================================================== */}

        <section
          id="judges"
          className="mt-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6"
        >
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-purple-400">
                Meet the panel
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">Our Judges</h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-white/30">
                Industry professionals evaluating ideas, execution and real-world impact.
              </p>
            </div>

            <span className="text-[10px] text-white/25">{event.judges.length} judges</span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {event.judges.length ? (
              event.judges.map((judge) => <div className=""></div>)
            ) : (
              <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                <EmptyState text="Judges will be announced soon." />
              </div>
            )}
          </div>
        </section>

        {/* =====================================================
            RULES + REQUIREMENTS
        ===================================================== */}

        <section className="mt-4 grid gap-4 lg:grid-cols-2">
          <div id="rules">
            <InfoCard eyebrow="Before you join" title="Rules & Guidelines">
              <RulesList items={event.rules} />

              <button
                type="button"
                className="mt-6 flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-[10px] font-medium text-white/55 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              >
                View All Rules
                <ArrowRight size={13} />
              </button>
            </InfoCard>
          </div>

          <div id="requirements">
            <InfoCard eyebrow="Come prepared" title="Requirements">
              <RulesList items={event.requirements} />

              <button
                type="button"
                className="mt-6 flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-[10px] font-medium text-white/55 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
              >
                View Requirements
                <ArrowRight size={13} />
              </button>
            </InfoCard>
          </div>
        </section>

        {/* =====================================================
            PARTNERS
        ===================================================== */}

        <div id="partners">
          <Partners />
        </div>

        {/* =====================================================
            SPONSORS
        ===================================================== */}

        <div id="sponsors" className="">
          <Sponsors />
        </div>

        {/* =====================================================
            CTA + FAQ
        ===================================================== */}

        <section className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 via-purple-950/10 to-transparent p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-purple-500/10 blur-[80px]" />

            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300">
                Join the community
              </p>

              <h2 className="mt-3 max-w-lg text-2xl font-bold tracking-tight sm:text-3xl">
                Be part of something big.
              </h2>

              <p className="mt-3 max-w-md text-xs leading-6 text-white/35">
                Build, innovate and connect with developers and technology enthusiasts from across
                the community.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                  Register Now
                  <ArrowRight size={14} />
                </button>

                {event.redirectUrl && (
                  <a
                    href={event.redirectUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-xs text-white/60 transition hover:bg-white/[0.05] hover:text-white"
                  >
                    Event Website
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
          </section>

          <InfoCard eyebrow="Need help?" title="Frequently Asked Questions">
            <FAQ />
          </InfoCard>
        </section>
      </div>
    </main>
  );
};

export default ViewSingleEventPage;
