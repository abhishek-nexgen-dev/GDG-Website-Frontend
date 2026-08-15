import EventCard from "../Components/EventCard";
import { ArrowUpRight, Sparkles } from "lucide-react";

const PastEvents = () => {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-[8%] lg:py-[12vh] xl:px-[10%]">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-[#4285F4]/[0.035] blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#34A853]/[0.035] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[2.8rem] font-black leading-[0.92] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              PAST EVENTS
              <br />
              <span className="bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC04] bg-clip-text text-transparent">
                Explore what we've hosted.
              </span>
            </h2>
          </div>

          <div className="flex max-w-md flex-col gap-5 lg:items-end lg:text-right">
            <button
              type="button"
              className="group flex w-fit items-center gap-2 text-xs font-semibold text-white/55 transition-colors hover:text-white"
            >
              Explore all events
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.08]">
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-white/10 via-white/[0.05] to-transparent lg:mt-12" />

        {/* Event Cards */}
        <div className="mt-8 grid grid-cols-1 gap-[10vh] sm:grid-cols-2 lg:mt-10">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />

        </div>
      </div>
    </section>
  );
};

export default PastEvents;
