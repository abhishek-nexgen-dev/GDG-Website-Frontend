import { ScrollReveal, ScrollRevealGroup } from "../../../../Components/ScrollReveal";
import useFetchUpcomingEvent from "../../../Event/hook/useFetchUpcomingEvent";
import type { EventResponse } from "../../../Event/type/Event.type";
import SingleEventCard from "../Components/SingleEventCard";

const UpcomingEvent = () => {
  const { data, isPending, isError } = useFetchUpcomingEvent();

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <p className="text-sm text-white/60">
          Loading upcoming events...
        </p>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <p className="text-sm text-red-400">
          Failed to load upcoming events.
        </p>
      </main>
    );
  }

  const events = Array.isArray(data) ? data : data.data || [];

  if (events.length === 0) {
    return (
      <section className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-[8%] lg:py-[10vh] xl:px-[10%]">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-white/40">
              No upcoming events available right now.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-[8%] lg:py-[10vh] xl:px-[10%]">
      
      {/* Background Effects */}
      <div className="pointer-events-none absolute left-[-100px] top-[-10px] h-80 w-80 rounded-full bg-amber-700/30 blur-[80px]" />

      <div className="pointer-events-none absolute bottom-0 right-[-100px] h-80 w-80 rounded-full bg-emerald-600/30 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl">
        
        {/* Section Header */}
        <ScrollReveal>
          <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34A853] shadow-[0_0_10px_#34A853]" />

                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#34A853] sm:text-xs">
                  What's happening next
                </p>
              </div>

              <h2 className="text-4xl font-black leading-none tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Upcoming{" "}
                <span className="bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#4285F4] bg-clip-text text-transparent">
                  Events
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/35 sm:text-base">
              The next opportunities to learn, build, connect, and grow with
              the GDG Ranchi community.
            </p>
          </div>
        </ScrollReveal>

        {/* Events - One after another */}
        <ScrollRevealGroup>
          <div className="flex flex-col gap-8 lg:gap-12">
            {events.map((event: EventResponse, index: number) => (
              <ScrollReveal key={event._id || index}>
                <SingleEventCard
                  title={event.title}
                  category={event.tags?.[0] || "Community Event"}
                  description={
                    event.shortDescription ||
                    "Join the GDG Ranchi community for an exciting upcoming event."
                  }
                  Slug={event?.Slug}
                  date={
                    event.registrationStartAt
                      ? new Date(event.registrationStartAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "Date coming soon"
                  }
                  time={
                    event.registrationStartAt
                      ? new Date(event.registrationStartAt).toLocaleTimeString(
                          "en-IN",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "Time coming soon"
                  }
                  location="Ranchi, Jharkhand"
                  registrationStatus={
                    event.registrationEndAt
                      ? `Register before ${new Date(
                          event.registrationEndAt
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}`
                      : "Registration Open"
                  }
                  image={event.coverImageUrl}
                  // redirectUrl={event.redirectUrl}
                />
              </ScrollReveal>
            ))}
          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
};

export default UpcomingEvent;