import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CalendarDays, Check, ChevronDown, Clock3, CircleDot, Flag, Play } from "lucide-react";

import { singleEventData } from "../data/singleEventData";
import { formatDate, formatTime } from "../utils/Event.utils";

const Timeline = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  const itemRefs = useRef<HTMLDivElement[]>([]);
  const nodeRefs = useRef<HTMLDivElement[]>([]);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const timeline = singleEventData.timeline ?? [];

  /* ================================================================
     GSAP ANIMATIONS
  ================================================================ */
  useGSAP(
    () => {
      if (!timeline.length) return;

      const items = itemRefs.current.filter(Boolean);
      const nodes = nodeRefs.current.filter(Boolean);

      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      intro
        .from(headingRef.current, {
          opacity: 0,
          y: 25,
          duration: 0.7,
        })
        .from(
          items,
          {
            opacity: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.08,
          },
          "-=0.35",
        )
        .from(
          nodes,
          {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "-=0.45",
        );

      if (nodes[0]) {
        gsap.to(nodes[0], {
          scale: 1.08,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      return () => {
        intro.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [timeline.length],
    },
  );

  if (!timeline.length) return null;

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden  py-16 sm:py-20 md:py-24 lg:py-28"
    >
      {/* ================================================================
          BACKGROUND GLOWS
      ================================================================ */}
      <div className="pointer-events-none absolute left-[5%] top-[20%] h-56 w-56 rounded-full bg-[#4285F4]/[0.025] blur-[100px] sm:left-[15%] sm:h-72 sm:w-72 sm:blur-[120px]" />
      <div className="pointer-events-none absolute right-[0%] top-[50%] h-64 w-64 rounded-full bg-[#A855F7]/[0.025] blur-[110px] sm:right-[10%] sm:h-80 sm:w-80 sm:blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[5%] left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#34A853]/[0.018] blur-[110px]" />

      {/* ================================================================
          CONTAINER
      ================================================================ */}
      <div className="relative  w-full px-4 sm:px-6 md:px-8 lg:px-10">
        {/* ================================================================
            HEADER
        ================================================================ */}
        <div ref={headingRef} className="mx-auto mb-12 max-w-2xl text-center sm:mb-16 md:mb-20">
          <div className="mb-4 flex items-center justify-center gap-2.5 sm:gap-3">
            <span className="h-px w-6 bg-[#A855F7]/40 sm:w-8" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#A855F7] sm:text-xs">
              Event Schedule
            </span>
            <span className="h-px w-6 bg-[#A855F7]/40 sm:w-8" />
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Agenda{" "}
            <span className="bg-gradient-to-r from-[#4285F4] via-[#A855F7] to-[#34A853] bg-clip-text text-transparent">
              & Timeline
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-xs leading-relaxed text-white/40 sm:text-sm md:text-base">
            Follow everything happening throughout the event, from registration to the closing
            ceremony.
          </p>
        </div>

        {/* ================================================================
            TIMELINE STRUCTURE
        ================================================================ */}
        <div className="relative w-full">
          {/* Vertical Spine Line */}
          <div
            className="
              absolute
              bottom-6
              left-[19px]
              top-6
              w-px
              bg-gradient-to-b
              from-[#34A853]/50
              via-[#4285F4]/30
              via-[#A855F7]/35
              to-[#FBBC04]/45
              sm:left-[131px]
              md:left-[161px]
              lg:left-[181px]
            "
          />

          <div className="space-y-6 sm:space-y-8">
            {timeline.map((item, index) => {
              const isFirst = index === 0;
              const isLast = index === timeline.length - 1;
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.title}
                  ref={(element) => {
                    if (element) itemRefs.current[index] = element;
                  }}
                  className="
                    relative
                    grid
                    grid-cols-[40px_1fr]
                    gap-3
                    sm:grid-cols-[110px_42px_1fr]
                    sm:gap-4
                    md:grid-cols-[140px_42px_1fr]
                    lg:grid-cols-[160px_42px_1fr]
                  "
                >
                  {/* ======================================================
                      COLUMN 1: DESKTOP DATE & TIME
                  ====================================================== */}
                  <div className="hidden text-right sm:block pt-2">
                    <div className="text-xs font-semibold text-white/70">
                      {formatDate(item.startAt)}
                    </div>
                    <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-white/40">
                      <Clock3 size={12} />
                      <span>{formatTime(item.startAt)}</span>
                    </div>
                  </div>

                  {/* ======================================================
                      COLUMN 2: NODE ICON
                  ====================================================== */}
                  <div className="relative flex justify-center pt-1">
                    <div
                      ref={(element) => {
                        if (element) nodeRefs.current[index] = element;
                      }}
                      className={`
                        relative
                        z-20
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        bg-[#050505]
                        ${
                          isFirst
                            ? "border-[#34A853]/60 shadow-[0_0_20px_rgba(52,168,83,0.25)]"
                            : isLast
                              ? "border-[#FBBC04]/50"
                              : "border-[#A855F7]/30"
                        }
                      `}
                    >
                      <span
                        className={`
                          flex
                          h-6
                          w-6
                          items-center
                          justify-center
                          rounded-full
                          ${isFirst ? "bg-[#34A853]" : isLast ? "bg-[#FBBC04]" : "bg-[#A855F7]/15"}
                        `}
                      >
                        {isFirst ? (
                          <Play size={10} fill="currentColor" className="ml-0.5 text-black" />
                        ) : isLast ? (
                          <Flag size={11} strokeWidth={2.2} className="text-black" />
                        ) : (
                          <CircleDot size={11} strokeWidth={2} className="text-[#A855F7]" />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* ======================================================
                      COLUMN 3: CARD CONTENT
                  ====================================================== */}
                  <button
                    type="button"
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    className={`
                      group
                      relative
                      w-full
                      overflow-hidden
                      rounded-xl
                      border
                      text-left
                      transition-all
                      duration-300
                      sm:rounded-2xl
                      ${
                        isOpen
                          ? isFirst
                            ? "border-[#34A853]/30 bg-[#34A853]/[0.04]"
                            : "border-[#A855F7]/30 bg-[#A855F7]/[0.03]"
                          : "border-white/[0.08] bg-white/[0.015] hover:border-white/[0.15] hover:bg-white/[0.03]"
                      }
                    `}
                  >
                    {/* Left Accent Bar */}
                    <span
                      className={`
                        absolute
                        bottom-0
                        left-0
                        top-0
                        w-[3px]
                        ${isFirst ? "bg-[#34A853]" : isLast ? "bg-[#FBBC04]" : "bg-[#A855F7]"}
                      `}
                    />

                    <div className="p-4 sm:p-5 md:p-6">
                      {/* Mobile Date Header */}
                      <div className="mb-2 flex items-center gap-2 sm:hidden">
                        <CalendarDays size={12} className="text-white/40" />
                        <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
                          {formatDate(item.startAt)}
                        </span>
                        <span className="h-3 w-px bg-white/10" />
                        <Clock3 size={12} className="text-white/40" />
                        <span className="text-[10px] text-white/40">
                          {formatTime(item.startAt)}
                        </span>
                      </div>

                      {/* Header Title & Badges */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3
                              className={`
                                text-sm
                                font-semibold
                                tracking-tight
                                sm:text-base
                                md:text-lg
                                ${isOpen ? "text-white" : "text-white/85"}
                              `}
                            >
                              {item.title}
                            </h3>

                            {isFirst && (
                              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#34A853]/30 bg-[#34A853]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#34A853]">
                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#34A853]" />
                                Live
                              </span>
                            )}

                            {isLast && (
                              <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#FBBC04]/30 bg-[#FBBC04]/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#FBBC04]">
                                <Check size={10} />
                                Final
                              </span>
                            )}
                          </div>

                          {/* Desktop Time Display Inside Card */}
                          {item.endAt && (
                            <div className="mt-1 hidden items-center gap-1.5 text-xs text-white/35 sm:flex">
                              <span>Ends at {formatTime(item.endAt)}</span>
                            </div>
                          )}
                        </div>

                        {/* Expand Chevron Icon */}
                        <span
                          className={`
                            flex
                            h-7
                            w-7
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-white/[0.08]
                            bg-white/[0.03]
                            text-white/40
                            transition-transform
                            duration-300
                            sm:h-8
                            sm:w-8
                            ${isOpen ? "rotate-180 text-white" : "group-hover:text-white/70"}
                          `}
                        >
                          <ChevronDown size={14} />
                        </span>
                      </div>

                      {/* Accordion Expandable Description */}
                      <div
                        className={`
                          grid
                          transition-all
                          duration-300
                          ease-in-out
                          ${
                            isOpen
                              ? "mt-3 grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }
                        `}
                      >
                        <div className="overflow-hidden">
                          <div className="border-t border-white/[0.08] pt-3">
                            <p className="text-xs leading-relaxed text-white/50 sm:text-sm">
                            "No additional information is available for this schedule item."

                            </p>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================
            FOOTER
        ================================================================ */}
        <div className="mt-12 flex items-center justify-center gap-3 sm:mt-16">
          <span className="h-px w-8 bg-white/10 sm:w-12" />
          <div className="flex items-center gap-2">
            <CalendarDays size={12} className="text-white/30" />
            <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/30 sm:text-[10px]">
              Complete Event Schedule
            </span>
          </div>
          <span className="h-px w-8 bg-white/10 sm:w-12" />
        </div>
      </div>
    </section>
  );
};

export default Timeline;
