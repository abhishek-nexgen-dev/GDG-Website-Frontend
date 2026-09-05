import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "../../../../Components/ScrollReveal";
import ScrollStack, { ScrollStackItem } from "../../../../Components/ScrollStack";

import SingleEventCard from "../Components/SingleEventCard";
import useFetchPasrEvent from "../../../Event/hook/useFetchPastEvent";

const PastEvents = () => {
  const { data, isPending, isError } = useFetchPasrEvent();

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <p className="text-sm text-white/60">Loading past events...</p>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <p className="text-sm text-red-400">Failed to load past events.</p>
      </main>
    );
  }

  const events = Array.isArray(data) ? data : data.data || [];

  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-[8%] lg:py-[12vh] xl:px-[10%]">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-[#4285F4]/[0.035] blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#34A853]/[0.035] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <ScrollReveal>
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
        </ScrollReveal>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-white/10 via-white/[0.05] to-transparent lg:mt-12" />

        {/* Cards */}
        {events.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-white/40">No past events available.</p>
          </div>
        ) : (
          <ScrollStack className="mt-16">
            {events.map((event: any, index: number) => (
              <ScrollStackItem
                key={event._id || index}
                // index={index}
              >
                <SingleEventCard
                  title={event.title}
                  category={event.tags?.[0] || "Community Event"}
                  description={
                    event.shortDescription || "An amazing event hosted by the GDG Ranchi community."
                  }
                  Slug={event.Slug}
                  date={
                    event.registrationStartAt
                      ? new Date(event.registrationStartAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })
                      : "Event completed"
                  }
                  time={
                    event.registrationStartAt
                      ? new Date(event.registrationStartAt).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Completed"
                  }
                  location="Ranchi, Jharkhand"
                  registrationStatus="Event Completed"
                  image={event.coverImageUrl}
                  // redirectUrl={event.redirectUrl}
                />
              </ScrollStackItem>
            ))}
          </ScrollStack>
        )}
      </div>
    </section>
  );
};

export default PastEvents;
