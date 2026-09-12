import { ScrollReveal } from "../../../../Components/ScrollReveal";
import ScrollStack, { ScrollStackItem } from "../../../../Components/ScrollStack";
import useFetchUpcomingEvent from "../../../Event/hook/useFetchUpcomingEvent";
import type { EventResponse } from "../../../Event/type/Event.type";
import SingleEventCard from "../Components/SingleEventCard";
import { TbLoader3 } from "react-icons/tb";
import { useEffect, useState } from "react";

const UpcomingEvent = () => {
  const { data, isPending, isError, isLoading, error } = useFetchUpcomingEvent();
  const [visibleCount, setVisibleCount] = useState(3);

  // Lazy load more events when the last visible event comes into view
  useEffect(() => {
    if (!isPending && !isError && data?.data?.length) {
      const options = {
        root: null,
        threshold: 0.1,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            visibleCount < (Array.isArray(data) ? data.length : data.data?.length)
          ) {
            setVisibleCount((prev) =>
              Math.min(prev + 3, (Array.isArray(data) ? data.length : data.data?.length) || 0),
            );
          }
        });
      }, options);

      const lastCard = document.querySelector(`[data-index="${visibleCount - 1}"]`);
      if (lastCard) observer.observe(lastCard);

      return () => observer.disconnect();
    }
  }, [visibleCount, data, isPending, isError]);

  const events = Array.isArray(data) ? data : data?.data || [];
  const displayEvents = events.slice(0, visibleCount);

  if (isLoading && isPending) {
    return (
      <section className="relative overflow-x-clip px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-[8%] lg:py-[10vh] xl:px-[10%]">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[300px] items-center justify-center">
            <TbLoader3 className="animate-spin text-4xl text-amber-500" />
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="relative overflow-x-clip px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-[8%] lg:py-[10vh] xl:px-[10%]">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-red-900/30 bg-red-950/10 p-8">
            <p className="text-sm text-red-400">{error?.message}</p>
          </div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="relative overflow-x-clip px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-[8%] lg:py-[10vh] xl:px-[10%]">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-white/40">No upcoming events available right now.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-x-clip px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-[8%] lg:py-[10vh] xl:px-[10%]">
      {/* Background Effects */}
      <div className="pointer-events-none absolute left-[-100px] top-[-10px] h-80 w-80 rounded-full bg-amber-700/20 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-[-100px] h-80 w-80 rounded-full bg-emerald-600/20 blur-[100px]" />

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
            <p className="max-w-md text-sm leading-6 text-white/45 sm:text-base">
              The next opportunities to learn, build, connect, and grow with the GDG Ranchi
              community.
            </p>
          </div>
        </ScrollReveal>

        {/* Stacked Cards - Each card glides over and covers the previous card */}
        <ScrollStack className="mt-8 sm:mt-12" topOffset={100} stackOffset={26}>
          {displayEvents.map((event: EventResponse, index: number) => (
            <ScrollStackItem key={event._id || index}>
              <SingleEventCard
                title={event.title}
                category={event.tags?.[0] || "Featured Event"}
                description={event.shortDescription}
                Slug={event.Slug}
                date={
                  event.registrationStartAt
                    ? new Date(event.registrationStartAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Date coming soon"
                }
                time={
                  event.registrationStartAt
                    ? new Date(event.registrationStartAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Time coming soon"
                }
                location="Ranchi, Jharkhand"
                registrationStatus={
                  event.registrationEndAt
                    ? `Register before ${new Date(event.registrationEndAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "numeric",
                          month: "short",
                        },
                      )}`
                    : "Registration Open"
                }
                image={event.coverImageUrl}
              />
            </ScrollStackItem>
          ))}
        </ScrollStack>

        {/* Show all button (optional) */}
        {visibleCount < events.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisibleCount(events.length)}
              className="rounded-lg bg-gradient-to-r from-[#EA4335] to-[#FBBC04] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Show All Events
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvent;
