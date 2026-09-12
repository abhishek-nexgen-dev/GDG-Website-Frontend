import React, { useRef } from "react";
import {
  Sparkles,
  Star,
  Quote,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  category: "devfest" | "speakers" | "students" | "wtm";
  categoryLabel: string;
  eventBadge: string;
  rating: number;
  quote: string;
  year: string;
  accentColor: string;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Ananya Sharma",
    role: "Frontend Engineer",
    organization: "Swiggy (Ex-BIT Mesra)",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    category: "students",
    categoryLabel: "Student & Career",
    eventBadge: "DevFest Ranchi Attendee",
    rating: 5,
    quote:
      "GDG Ranchi was the real turning point in my tech journey. Attending DevFest codelabs gave me deep practical clarity on Web Vitals and React architecture that directly helped me crack my engineering interviews.",
    year: "2024",
    accentColor: "#4285F4",
  },
  {
    id: "t-2",
    name: "Rahul Verma",
    role: "Google Developer Expert (GDE)",
    organization: "Cloud & Distributed Systems",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    category: "speakers",
    categoryLabel: "Speaker & Mentor",
    eventBadge: "Keynote Speaker",
    rating: 5,
    quote:
      "Speaking at GDG Ranchi was pure inspiration. The developers asked razor-sharp questions about Vertex AI, microservices, and Kubernetes at scale. The production standards and energy are on par with global developer conferences.",
    year: "2024",
    accentColor: "#34A853",
  },
  {
    id: "t-3",
    name: "Priya Kumari",
    role: "WTM Ambassador & Android Dev",
    organization: "Women Techmakers Ranchi",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    category: "wtm",
    categoryLabel: "Women Techmakers",
    eventBadge: "WTM Lead & Organizer",
    rating: 5,
    quote:
      "GDG Ranchi provides an empowering, welcoming sanctuary where women technologists don't just participate—they headline keynotes, lead technical workshops, and launch open-source initiatives.",
    year: "2024",
    accentColor: "#EA4335",
  },
  {
    id: "t-4",
    name: "Aman Kumar Singh",
    role: "AI/ML Researcher",
    organization: "IIIT Ranchi",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    category: "devfest",
    categoryLabel: "DevFest",
    eventBadge: "AI Hackathon Winner",
    rating: 5,
    quote:
      "Building our multimodal accessibility project in the 36-hour GDG Hackathon was exhilarating. The on-site mentors gave us invaluable feedback on Gemini Flash integrations that helped us win 1st place.",
    year: "2024",
    accentColor: "#FBBC04",
  },
  {
    id: "t-5",
    name: "Sneha Roy",
    role: "Full Stack Engineer",
    organization: "Zomato",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    category: "students",
    categoryLabel: "Student & Career",
    eventBadge: "Community Alum",
    rating: 5,
    quote:
      "From attending my first meetup in Ranchi back in 2022 to landing my dream role, the code reviews, open-source sprints, and peer network in this community gave me the real-world confidence I needed.",
    year: "2023",
    accentColor: "#4285F4",
  },
  {
    id: "t-6",
    name: "Dr. Arvind Pathak",
    role: "Department Chair (CSE)",
    organization: "Jharkhand Tech University",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80",
    category: "speakers",
    categoryLabel: "Speaker & Mentor",
    eventBadge: "Academic Partner",
    rating: 5,
    quote:
      "GDG Ranchi plays a pivotal role bridging traditional academia and real-world tech industry practices. Thousands of our undergraduate students have gained production-grade cloud and AI skills.",
    year: "2024",
    accentColor: "#34A853",
  },
];

const TestimonialCard = ({ item }: { item: Testimonial }) => (
  <div className="group relative flex flex-col justify-between rounded-3xl border border-white/[0.08] bg-[#0c0c11] p-6 sm:p-8 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-[#111118] hover:shadow-[0_16px_40px_rgba(0,0,0,0.8)] w-[320px] sm:w-[410px] shrink-0">
    {/* Subtle top accent line */}
    <div
      className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-60 transition-opacity group-hover:opacity-100"
      style={{ backgroundColor: item.accentColor }}
    />

    <div>
      {/* Badge & Year */}
      <div className="flex items-center justify-between gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide"
          style={{
            backgroundColor: `${item.accentColor}18`,
            color: item.accentColor,
            border: `1px solid ${item.accentColor}33`,
          }}
        >
          {item.eventBadge}
        </span>

        <span className="inline-flex items-center gap-1 text-xs text-gray-400">
          <Calendar size={12} />
          {item.year}
        </span>
      </div>

      {/* Stars */}
      <div className="mt-4 flex items-center gap-1 text-[#FBBC04]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < item.rating ? "fill-[#FBBC04] text-[#FBBC04]" : "text-gray-600"}
          />
        ))}
      </div>

      {/* Quote */}
      <div className="relative mt-4">
        <Quote
          size={28}
          className="absolute -left-1 -top-2 opacity-15 transition-opacity group-hover:opacity-30"
          style={{ color: item.accentColor }}
        />
        <p className="relative z-10 text-sm sm:text-[15px] leading-relaxed text-gray-200">
          "{item.quote}"
        </p>
      </div>
    </div>

    {/* Author info */}
    <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-5">
      <div className="flex items-center gap-3.5">
        <div className="relative p-[1.5px] rounded-full bg-gradient-to-tr from-[#4285F4] via-[#EA4335] to-[#34A853]">
          <img
            src={item.avatar}
            alt={item.name}
            className="h-11 w-11 rounded-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-white transition-colors group-hover:text-[#8AB4F8]">
              {item.name}
            </h4>
            <span title="Verified Member" className="inline-flex">
              <CheckCircle2 size={15} className="text-[#34A853] shrink-0" />
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            {item.role} • {item.organization}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const TestimonialsSec: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeTrack1Ref = useRef<HTMLDivElement>(null);
  const marqueeTrack2Ref = useRef<HTMLDivElement>(null);
  const tween1Ref = useRef<gsap.core.Tween | null>(null);
  const tween2Ref = useRef<gsap.core.Tween | null>(null);

  const testimonials = INITIAL_TESTIMONIALS;

  useGSAP(
    () => {
      // Top row scrolls left slowly and smoothly
      if (marqueeTrack1Ref.current) {
        tween1Ref.current = gsap.fromTo(
          marqueeTrack1Ref.current,
          { xPercent: 0 },
          { xPercent: -50, ease: "none", duration: 95, repeat: -1 }
        );
      }

      // Bottom row scrolls right slowly and smoothly
      if (marqueeTrack2Ref.current) {
        tween2Ref.current = gsap.fromTo(
          marqueeTrack2Ref.current,
          { xPercent: -50 },
          { xPercent: 0, ease: "none", duration: 100, repeat: -1 }
        );
      }
    },
    { scope: containerRef }
  );

  const handleMouseEnter = () => {
    tween1Ref.current?.pause();
    tween2Ref.current?.pause();
  };

  const handleMouseLeave = () => {
    tween1Ref.current?.resume();
    tween2Ref.current?.resume();
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-x-clip bg-[#060608] py-24 sm:py-32 text-white"
    >
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#4285F4]/[0.06] blur-[160px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-[450px] w-[450px] rounded-full bg-[#34A853]/[0.06] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur">
            <Sparkles size={16} className="text-[#FBBC04]" />
            COMMUNITY VOICES & STORIES
          </span>

          <h2 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Loved by Developers, <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
              Inspiring the Next Generation
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-gray-400 leading-relaxed">
            Real stories from developers, student architects, keynote speakers, and Google Developer
            Experts who found mentorship and accelerated their careers with GDG Ranchi.
          </p>
        </div>
      </div>

      {/* Slowly scrolling marquee tracks with hover-pause */}
      <div
        className="relative mt-8 sm:mt-12 flex flex-col gap-6 sm:gap-8 overflow-hidden pb-10"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-48 bg-gradient-to-r from-[#060608] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-48 bg-gradient-to-l from-[#060608] to-transparent" />

        <div className="flex w-max" ref={marqueeTrack1Ref}>
          <div className="flex gap-6 sm:gap-8 pr-6 sm:pr-8">
            {[...testimonials, ...testimonials].map((item, index) => (
              <TestimonialCard key={`top-${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>

        <div className="flex w-max" ref={marqueeTrack2Ref}>
          <div className="flex gap-6 sm:gap-8 pr-6 sm:pr-8">
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((item, index) => (
              <TestimonialCard key={`bottom-${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSec;

