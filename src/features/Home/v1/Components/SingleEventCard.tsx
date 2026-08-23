import React from "react";
import { ArrowUpRight, CalendarDays, Clock3, MapPin } from "lucide-react";

type SingleEventProps = {
  title: string;
  image: string;
  category: string;
  description: string;
  date: string;
  time: string;
  location: string;
  registrationStatus: string;
  
};

const SingleEventCard = (event: SingleEventProps) => {
  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.025] backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#34A853]/[0.07] blur-[100px]" />

      <div className="relative grid lg:grid-cols-[4fr_6fr] xl:grid-cols-[4.5fr_5.5fr]">
        <div className="relative min-h-[240px] overflow-hidden sm:min-h-[280px] lg:min-h-[350px]">
          <img
            src={event.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80"}
            alt={event.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/15 to-black/10 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#080808]" />

          <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
              {event.category}
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-7 lg:hidden">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Featured Event</p>

            <h3 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
              {event.title}
            </h3>
          </div>
        </div>

        <div className="relative flex flex-col justify-center p-6 sm:p-8 lg:p-10 xl:p-12">
          <div className="hidden lg:block">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#34A853]">
              Featured Event
            </p>

            <h3 className="mt-3 max-w-xl text-3xl font-bold leading-[1.05] tracking-[-0.035em] text-white xl:text-4xl">
              {event.title}
            </h3>
          </div>

          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
            {event.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-white/50">
                <CalendarDays size={16} strokeWidth={1.7} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">Date</p>
                <p className="mt-0.5 text-sm font-medium text-white/75">{event.date}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-white/50">
                <Clock3 size={16} strokeWidth={1.7} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">Time</p>
                <p className="mt-0.5 text-sm font-medium text-white/75">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-white/50">
                <MapPin size={16} strokeWidth={1.7} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">Location</p>
                <p className="mt-0.5 text-sm font-medium text-white/75">{event.location}</p>
              </div>
            </div>
          </div>

          <div className="my-6 h-px w-full bg-white/[0.07]" />

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34A853] shadow-[0_0_8px_#34A853]" />
              <span className="text-xs font-medium text-white/40">{event.registrationStatus}</span>
            </div>

            <button
              type="button"
              className="group/button flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)]"
            >
              {"View event"}
              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEventCard;
