import React, { useRef } from "react";
import {
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { FaGoogle, FaGithub, FaDiscord, FaSlack } from "react-icons/fa";
import {
  SiGooglecloud,
  SiJetbrains,
  SiMongodb,
  SiPostman,
  SiAndroid,
  SiFlutter,
  SiFirebase,
  SiTensorflow,
  SiVercel,
  SiFigma,
  SiDocker,
  SiStripe,
  SiSupabase,
} from "react-icons/si";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TitleSponsor {
  name: string;
  tierLabel: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  brandColor: string;
  gradient: string;
  badge: string;
}

const TITLE_SPONSORS: TitleSponsor[] = [
  {
    name: "Google for Developers",
    tierLabel: "Presented By",
    description:
      "Global ecosystem empowering developers to build next-generation experiences with Android, Web, Firebase, and Gemini AI.",
    url: "https://developers.google.com",
    icon: <FaGoogle className="text-4xl text-[#4285F4]" />,
    brandColor: "#4285F4",
    gradient: "from-[#4285F4]/20 via-transparent to-transparent",
    badge: "Global Title Sponsor",
  },
  {
    name: "Google Cloud",
    tierLabel: "Cloud Platform Partner",
    description:
      "Scalable planetary infrastructure, BigQuery analytics, and Vertex AI for building enterprise-grade intelligent architectures.",
    url: "https://cloud.google.com",
    icon: <SiGooglecloud className="text-4xl text-[#34A853]" />,
    brandColor: "#34A853",
    gradient: "from-[#34A853]/20 via-transparent to-transparent",
    badge: "Official Cloud Partner",
  },
];

interface MarqueePartner {
  name: string;
  category: string;
  url: string;
  icon: React.ReactNode;
  accentColor: string;
}

const MARQUEE_PARTNERS: MarqueePartner[] = [
  {
    name: "GitHub",
    category: "Developer Platform",
    url: "https://github.com",
    icon: <FaGithub className="text-2xl text-white" />,
    accentColor: "#ffffff",
  },
  {
    name: "JetBrains",
    category: "Developer Tooling",
    url: "https://www.jetbrains.com",
    icon: <SiJetbrains className="text-2xl text-[#FBBC04]" />,
    accentColor: "#FBBC04",
  },
  {
    name: "Android",
    category: "Mobile Ecosystem",
    url: "https://developer.android.com",
    icon: <SiAndroid className="text-2xl text-[#3DDC84]" />,
    accentColor: "#3DDC84",
  },
  {
    name: "Firebase",
    category: "Backend & Auth",
    url: "https://firebase.google.com",
    icon: <SiFirebase className="text-2xl text-[#FFCA28]" />,
    accentColor: "#FFCA28",
  },
  {
    name: "Flutter",
    category: "Cross-Platform UI",
    url: "https://flutter.dev",
    icon: <SiFlutter className="text-2xl text-[#02569B]" />,
    accentColor: "#54C5F8",
  },
  {
    name: "TensorFlow",
    category: "Machine Learning",
    url: "https://www.tensorflow.org",
    icon: <SiTensorflow className="text-2xl text-[#FF6F00]" />,
    accentColor: "#FF6F00",
  },
  {
    name: "MongoDB",
    category: "Modern Database",
    url: "https://www.mongodb.com",
    icon: <SiMongodb className="text-2xl text-[#00ED64]" />,
    accentColor: "#00ED64",
  },
  {
    name: "Postman",
    category: "API Ecosystem",
    url: "https://www.postman.com",
    icon: <SiPostman className="text-2xl text-[#FF6C37]" />,
    accentColor: "#FF6C37",
  },
  {
    name: "Vercel",
    category: "Frontend Cloud",
    url: "https://vercel.com",
    icon: <SiVercel className="text-2xl text-white" />,
    accentColor: "#ffffff",
  },
  {
    name: "Figma",
    category: "Product Design",
    url: "https://www.figma.com",
    icon: <SiFigma className="text-2xl text-[#F24E1E]" />,
    accentColor: "#F24E1E",
  },
  {
    name: "Docker",
    category: "Containers",
    url: "https://www.docker.com",
    icon: <SiDocker className="text-2xl text-[#2496ED]" />,
    accentColor: "#2496ED",
  },
  {
    name: "Stripe",
    category: "Payments Infra",
    url: "https://stripe.com",
    icon: <SiStripe className="text-2xl text-[#635BFF]" />,
    accentColor: "#635BFF",
  },
  {
    name: "Supabase",
    category: "Postgres Backend",
    url: "https://supabase.com",
    icon: <SiSupabase className="text-2xl text-[#3ECF8E]" />,
    accentColor: "#3ECF8E",
  },
  {
    name: "Discord",
    category: "Community Chat",
    url: "https://discord.com",
    icon: <FaDiscord className="text-2xl text-[#5865F2]" />,
    accentColor: "#5865F2",
  },
  {
    name: "Slack",
    category: "Team Workspace",
    url: "https://slack.com",
    icon: <FaSlack className="text-2xl text-[#E01E5A]" />,
    accentColor: "#ECB22E",
  },
];

export const SponsorsSec: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Duplicate for seamless infinite marquee loop
  const duplicatedPartners = [...MARQUEE_PARTNERS, ...MARQUEE_PARTNERS];

  // GSAP: Marquee moves strictly from LEFT to RIGHT
  // Moving from xPercent: -50 to xPercent: 0 moves the track to the right
  useGSAP(
    () => {
      if (!marqueeTrackRef.current) return;

      tweenRef.current = gsap.fromTo(
        marqueeTrackRef.current,
        { xPercent: -50 },
        {
          xPercent: 0,
          ease: "none",
          duration: 28,
          repeat: -1,
        }
      );

      // Section header reveal animation
      gsap.fromTo(
        ".sponsors-header-elem",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const handleMouseEnter = () => {
    tweenRef.current?.pause();
  };

  const handleMouseLeave = () => {
    tweenRef.current?.resume();
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-[#050507] py-28 text-white"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[#4285F4]/10 blur-[160px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[460px] w-[460px] rounded-full bg-[#EA4335]/10 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="sponsors-header-elem inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
            <Sparkles size={14} className="text-[#FBBC04]" />
            OUR SUPPORTERS & SPONSORS
          </span>

          <h2 className="sponsors-header-elem mt-8 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Powering Developer <br />
            <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent">
              Growth in Ranchi
            </span>
          </h2>

          <p className="sponsors-header-elem mx-auto mt-6 max-w-2xl text-base sm:text-lg text-gray-400">
            We collaborate with industry pioneers, developer ecosystems, and technology leaders who
            champion continuous learning, open-source innovation, and career advancement across Jharkhand.
          </p>
        </div>

        {/* 1. Title / Presenting Sponsors Showcase */}
        <div className="mb-16">
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-white/10" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8AB4F8]">
              Title & Cloud Platform Sponsors
            </span>
            <div className="h-px w-12 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {TITLE_SPONSORS.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/[0.07] hover:shadow-[0_12px_45px_rgba(66,133,244,0.18)]"
              >
                {/* Glow accent */}
                <div
                  className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${sponsor.gradient} blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60`}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/60 shadow-inner group-hover:border-white/20 transition-colors">
                      {sponsor.icon}
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium text-gray-300 group-hover:border-white/20 group-hover:text-white">
                      <ShieldCheck size={12} className="text-[#34A853]" />
                      {sponsor.badge}
                    </span>
                  </div>

                  <h3 className="mt-7 text-2xl sm:text-3xl font-bold text-white group-hover:text-[#8AB4F8] transition-colors">
                    {sponsor.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-300">
                    {sponsor.description}
                  </p>
                </div>

                <div className="relative z-10 mt-8 flex items-center gap-2 text-xs font-semibold text-[#8AB4F8] group-hover:text-white transition-colors">
                  <span>Explore Developer Programs</span>
                  <ExternalLink
                    size={14}
                    className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 2. GSAP Infinite Left-to-Right Logo Marquee */}
        <div className="mb-20">
          <div className="mb-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-white/10" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
              Technology & Tooling Partners
            </span>
            <div className="h-px w-12 bg-white/10" />
          </div>

          {/* Marquee Wrapper with Edge Gradients */}
          <div
            className="relative w-full overflow-hidden py-3"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Edge fade overlays */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 sm:w-40 bg-gradient-to-r from-[#050507] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 sm:w-40 bg-gradient-to-l from-[#050507] to-transparent" />

            {/* Scrolling Track: Moving strictly from Left to Right */}
            <div ref={marqueeTrackRef} className="flex w-max gap-5">
              {duplicatedPartners.map((partner, index) => (
                <a
                  key={`${partner.name}-${index}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/card relative flex h-24 w-60 shrink-0 items-center gap-4 rounded-2xl border border-white/10 bg-[#0e0e12]/90 px-5 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-[#14141a] hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(255,255,255,0.06)]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/50 transition-transform duration-300 group-hover/card:scale-110">
                    {partner.icon}
                  </div>

                  <div className="min-w-0">
                    <h4 className="truncate text-sm font-bold text-white transition-colors group-hover/card:text-[#8AB4F8]">
                      {partner.name}
                    </h4>
                    <span className="truncate text-[11px] text-gray-400 block mt-0.5">
                      {partner.category}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <p className="mt-3 text-center text-[11px] text-gray-400">
            Hover over any partner card to pause and explore
          </p>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSec;
