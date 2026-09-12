import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "../../../../Components/ScrollReveal";
import ScrollStack, { ScrollStackItem } from "../../../../Components/ScrollStack";

import SingleEventCard from "../Components/SingleEventCard";
import useFetchPasrEvent from "../../../Event/hook/useFetchPastEvent";

const PastEvents = () => {
  const { data, isPending, isError } = useFetchPasrEvent();

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        <p className="text-sm text-white/60">Loading past events...</p>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center text-white">
        <p className="text-sm text-red-400">Failed to load past events.</p>
      </main>
    );
  }

  const events = Array.isArray(data) ? data : data.data || [];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-[#4285F4]/[0.035] blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#34A853]/[0.035] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-primary sm:text-xs">
                  Explore what we've hosted
                </p>
              </div>

              <h2 className="text-4xl font-black leading-none tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Past <span className="text-primary">Events</span>
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
