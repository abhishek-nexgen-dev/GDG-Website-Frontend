import React, { useRef, useState } from "react";
import {
  Sparkles,
  Star,
  Quote,
  CheckCircle2,
  MessageSquarePlus,
  X,
  Send,
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
  },
];

const CATEGORIES = [
  { id: "all", label: "All Voices" },
  { id: "devfest", label: "DevFest Ranchi" },
  { id: "speakers", label: "Speakers & GDEs" },
  { id: "students", label: "Students & Careers" },
  { id: "wtm", label: "Women Techmakers" },
] as const;

const TestimonialCard = ({ item }: { item: Testimonial }) => (
  <div className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-7 backdrop-blur-xl transition-all duration-300 hover:border-[#4285F4]/40 hover:bg-white/[0.06] hover:shadow-[0_12px_40px_rgba(66,133,244,0.12)] w-[380px] shrink-0">
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-[#FBBC04]">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} className={i < item.rating ? "fill-[#FBBC04] text-[#FBBC04]" : "text-gray-600"} />
          ))}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-gray-300">
          <Calendar size={10} className="text-gray-400" />
          {item.year}
        </span>
      </div>
      <div className="relative mt-5">
        <Quote size={26} className="absolute -left-1 -top-2 text-white/10 transition-colors group-hover:text-[#4285F4]/30" />
        <p className="relative z-10 text-sm leading-relaxed text-gray-300 italic">"{item.quote}"</p>
      </div>
    </div>
    <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
      <div className="flex items-center gap-3">
        <img src={item.avatar} alt={item.name} className="h-11 w-11 rounded-full border border-white/15 object-cover" loading="lazy" />
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-semibold text-white group-hover:text-[#8AB4F8] transition-colors">{item.name}</h4>
            <span title="Verified Community Member" className="inline-flex"><CheckCircle2 size={13} className="text-[#34A853] shrink-0" /></span>
          </div>
          <p className="text-xs text-gray-400">{item.role} • {item.organization}</p>
        </div>
      </div>
      <span className="hidden xl:inline-block rounded-full border border-white/5 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-gray-400">{item.eventBadge}</span>
    </div>
  </div>
);

export const TestimonialsSec: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeTrack1Ref = useRef<HTMLDivElement>(null);
  const marqueeTrack2Ref = useRef<HTMLDivElement>(null);

  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  // Modal & React form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    organization: "",
    category: "devfest" as Testimonial["category"],
    eventBadge: "DevFest Attendee",
    rating: 5,
    quote: "",
  });

  // GSAP entrance animation
  useGSAP(
    () => {
      // Top row scrolls left
      if (marqueeTrack1Ref.current) {
        gsap.fromTo(
          marqueeTrack1Ref.current,
          { xPercent: 0 },
          { xPercent: -50, ease: "none", duration: 35, repeat: -1 }
        );
      }
      
      // Bottom row scrolls right
      if (marqueeTrack2Ref.current) {
        gsap.fromTo(
          marqueeTrack2Ref.current,
          { xPercent: -50 },
          { xPercent: 0, ease: "none", duration: 40, repeat: -1 }
        );
      }
    },
    { scope: containerRef }
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) return;

    const newTestimonial: Testimonial = {
      id: `t-${Date.now()}`,
      name: formData.name.trim(),
      role: formData.role.trim() || "Developer",
      organization: formData.organization.trim() || "GDG Community",
      avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
        formData.name
      )}`,
      category: formData.category,
      categoryLabel:
        CATEGORIES.find((c) => c.id === formData.category)?.label || "Community Member",
      eventBadge: formData.eventBadge || "Community Attendee",
      rating: Number(formData.rating) || 5,
      quote: formData.quote.trim(),
      year: new Date().getFullYear().toString(),
    };

    setTestimonials([newTestimonial, ...testimonials]);
    setFormSubmitted(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setFormSubmitted(false);
      setFormData({
        name: "",
        role: "",
        organization: "",
        category: "devfest",
        eventBadge: "DevFest Attendee",
        rating: 5,
        quote: "",
      });
    }, 1200);
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#060608] py-28 text-white"
    >
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#4285F4]/10 blur-[160px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-[450px] w-[450px] rounded-full bg-[#34A853]/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
            <Sparkles size={14} className="text-[#FBBC04]" />
            COMMUNITY VOICES & STORIES
          </span>

          <h2 className="mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Loved by Developers, <br />
            <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent">
              Inspiring the Next Generation
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-gray-400">
            Real stories from developers, student architects, keynote speakers, and Google Developer
            Experts who found mentorship and accelerated their careers with GDG Ranchi.
          </p>

        {/* Action Bar & CTA */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[#4285F4]/40 bg-[#4285F4]/10 px-5 py-2 text-xs font-semibold text-[#8AB4F8] transition-all hover:bg-[#4285F4]/20 hover:border-[#4285F4]"
          >
            <MessageSquarePlus size={14} />
            Share Your Story
          </button>
        </div>
        </div>
      </div>

      {/* Testimonials Infinite Marquees */}
      <div className="relative mt-20 flex flex-col gap-6 overflow-hidden pb-10">
        {/* Left Fade Overlay */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-32 bg-gradient-to-r from-[#060608] to-transparent" />
        {/* Right Fade Overlay */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-32 bg-gradient-to-l from-[#060608] to-transparent" />

        {/* Top Track - Scrolls Left */}
        <div className="flex w-max" ref={marqueeTrack1Ref}>
          <div className="flex gap-6 pr-6">
            {[...testimonials, ...testimonials].map((item, index) => (
              <TestimonialCard key={`top-${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>

        {/* Bottom Track - Scrolls Right */}
        <div className="flex w-max" ref={marqueeTrack2Ref}>
          <div className="flex gap-6 pr-6">
            {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((item, index) => (
              <TestimonialCard key={`bottom-${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Modal: Share Your Story */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#111116] p-6 sm:p-8 shadow-2xl z-10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>

            {!formSubmitted ? (
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4285F4]/20 text-[#4285F4]">
                    <MessageSquarePlus size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Share Your GDG Story</h3>
                    <p className="text-xs text-gray-400">Inspire developers across Jharkhand</p>
                  </div>
                </div>

                <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Suman Gupta"
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#4285F4] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Role / Designation
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        placeholder="e.g. Cloud Architect"
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#4285F4] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Company / College
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) =>
                          setFormData({ ...formData, organization: e.target.value })
                        }
                        placeholder="e.g. BIT Mesra"
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#4285F4] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category: e.target.value as Testimonial["category"],
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#16161c] px-3.5 py-2.5 text-sm text-white focus:border-[#4285F4] focus:outline-none"
                      >
                        <option value="devfest">DevFest Attendee</option>
                        <option value="speakers">Speaker / Mentor</option>
                        <option value="students">Student / Career</option>
                        <option value="wtm">Women Techmakers</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Event Badge
                      </label>
                      <input
                        type="text"
                        value={formData.eventBadge}
                        onChange={(e) =>
                          setFormData({ ...formData, eventBadge: e.target.value })
                        }
                        placeholder="e.g. DevFest 2024"
                        className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#4285F4] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Your Story / Feedback *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.quote}
                      onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                      placeholder="Share how GDG Ranchi helped you learn, build, or connect..."
                      className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#4285F4] focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="rounded-xl border border-white/10 px-5 py-2.5 text-xs font-semibold text-gray-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#4285F4] px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#4285F4]/30 hover:bg-[#3367D6]"
                    >
                      <Send size={13} />
                      Publish Story
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#34A853]/20 text-[#34A853]">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="mt-4 text-xl font-bold text-white">Thank You for Sharing!</h3>
                <p className="mt-2 text-xs text-gray-300">
                  Your story has been added to our community voices.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSec;
