import { useRef } from "react";
import { ShieldCheck, Award, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PersonCard from "./PersonCard";

interface JudgeItem {
  _id?: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  Bio?: string;
  bio?: string;
  role?: string;
  company?: string;
  socialLinks?: any;
}

interface EventJudgesProps {
  judges?: JudgeItem[];
}

const EventJudges = ({ judges = [] }: EventJudgesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (judges.length > 0) {
        gsap.fromTo(
          ".judge-card-item",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          }
        );
      }
    },
    { scope: containerRef, dependencies: [judges] }
  );

  const handleScroll = (direction: "left" | "right") => {
    if (scrollTrackRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollTrackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (!judges || judges.length === 0) {
    return (
      <div className="w-full py-12 px-6 rounded-3xl border border-white/10 bg-[#0d0d12]/50 text-center text-white/50">
        <Award size={36} className="mx-auto mb-3 text-white/20" />
        <p className="text-base font-semibold text-white/70">No Judges Announced Yet</p>
        <p className="text-xs text-white/40 mt-1 max-w-sm mx-auto">
          Evaluators and jury members for this event will be announced shortly.
        </p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Header with Title & Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1">
            <ShieldCheck size={12} strokeWidth={2} className="text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-400">
              Evaluators & Jury
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            Distinguished Judges
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/50 max-w-xl">
            Meet the esteemed domain experts, academic leaders, and investors evaluating this event.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/70 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontally Scrollable Track */}
      <div
        ref={scrollTrackRef}
        className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2 px-1"
      >
        {judges.map((judge, index) => (
          <div key={judge._id || index} className="judge-card-item shrink-0 snap-start">
            <PersonCard
              firstName={judge.firstName}
              lastName={judge.lastName}
              imageUrl={judge.imageUrl}
              Bio={judge.Bio || judge.bio}
              role={judge.role || "Judge"}
              company={judge.company}
              socialLinks={judge.socialLinks}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventJudges;
