import React from "react";
import {
  ExternalLink,
  Handshake,
  Mail,
  ArrowUpRight,
  GraduationCap,
  Building2,
  Sparkles,
  BookOpen,
  Users,
  Code2,
} from "lucide-react";
import { FaGoogle, FaGithub, FaDiscord } from "react-icons/fa";
import {
  SiGooglecloud,
  SiAndroid,
  SiFlutter,
  SiFirebase,
  SiTensorflow,
  SiPostman,
  SiFigma,
  SiJetbrains,
  SiDocker,
  SiVercel,
  SiStripe,
  SiSupabase,
} from "react-icons/si";
import Swal from "sweetalert2";
import MarqueeWall from "../../../../Components/MarqueeWall";

export interface SponsorCard {
  name: string;
  role: string;
  url: string;
  icon: React.ReactNode;
  brandColor?: string;
}

// 1. Education & Academic Partners (Moving Left to Right)
const EDUCATION_PARTNERS: SponsorCard[] = [
  {
    name: "BIT Mesra",
    role: "Premier Engineering Institute",
    url: "https://www.bitmesra.ac.in",
    icon: <Building2 className="text-2xl text-[#8AB4F8]" />,
    brandColor: "#8AB4F8",
  },
  {
    name: "JTU Jharkhand",
    role: "State Technical University",
    url: "https://www.jtu.ac.in",
    icon: <GraduationCap className="text-2xl text-[#34A853]" />,
    brandColor: "#34A853",
  },
  {
    name: "IIT (ISM) Dhanbad",
    role: "National Institute of Eminence",
    url: "https://www.iitism.ac.in",
    icon: <BookOpen className="text-2xl text-[#FBBC04]" />,
    brandColor: "#FBBC04",
  },
  {
    name: "NIFFT Ranchi",
    role: "Manufacturing & Tech Institute",
    url: "http://www.nifft.ac.in",
    icon: <Building2 className="text-2xl text-[#EA4335]" />,
    brandColor: "#EA4335",
  },
  {
    name: "Ranchi University",
    role: "Academic Outreach Partner",
    url: "https://www.ranchiuniversity.ac.in",
    icon: <GraduationCap className="text-2xl text-[#8AB4F8]" />,
    brandColor: "#8AB4F8",
  },
  {
    name: "Marwari College",
    role: "Undergraduate STEM Hub",
    url: "https://www.marwaricollegeranchi.ac.in",
    icon: <BookOpen className="text-2xl text-[#34A853]" />,
    brandColor: "#34A853",
  },
];

// 2. Tech & Tools (Moving across)
const TECH_TOOLS_PARTNERS: SponsorCard[] = [
  {
    name: "Google for Developers",
    role: "Global Developer Platform",
    url: "https://developers.google.com",
    icon: <FaGoogle className="text-2xl text-[#4285F4]" />,
    brandColor: "#4285F4",
  },
  {
    name: "Google Cloud",
    role: "Vertex AI & Cloud Infra",
    url: "https://cloud.google.com",
    icon: <SiGooglecloud className="text-2xl text-[#34A853]" />,
    brandColor: "#34A853",
  },
  {
    name: "Android",
    role: "Mobile Ecosystem & Compose",
    url: "https://developer.android.com",
    icon: <SiAndroid className="text-2xl text-[#3DDC84]" />,
    brandColor: "#3DDC84",
  },
  {
    name: "Flutter",
    role: "Multi-Platform Framework",
    url: "https://flutter.dev",
    icon: <SiFlutter className="text-2xl text-[#54C5F8]" />,
    brandColor: "#54C5F8",
  },
  {
    name: "Firebase",
    role: "Realtime DB & App Engine",
    url: "https://firebase.google.com",
    icon: <SiFirebase className="text-2xl text-[#FFCA28]" />,
    brandColor: "#FFCA28",
  },
  {
    name: "TensorFlow",
    role: "Open Source ML Platform",
    url: "https://www.tensorflow.org",
    icon: <SiTensorflow className="text-2xl text-[#FF6F00]" />,
    brandColor: "#FF6F00",
  },
  {
    name: "GitHub",
    role: "CI/CD & Open Source Code",
    url: "https://github.com",
    icon: <FaGithub className="text-2xl text-white" />,
    brandColor: "#FFFFFF",
  },
  {
    name: "JetBrains",
    role: "Professional Developer IDEs",
    url: "https://www.jetbrains.com",
    icon: <SiJetbrains className="text-2xl text-[#FBBC04]" />,
    brandColor: "#FBBC04",
  },
  {
    name: "Figma",
    role: "Design Systems & Prototyping",
    url: "https://www.figma.com",
    icon: <SiFigma className="text-2xl text-[#F24E1E]" />,
    brandColor: "#F24E1E",
  },
  {
    name: "Docker",
    role: "Containerized Workflows",
    url: "https://www.docker.com",
    icon: <SiDocker className="text-2xl text-[#2496ED]" />,
    brandColor: "#2496ED",
  },
  {
    name: "Postman",
    role: "API Lifecycle Platform",
    url: "https://www.postman.com",
    icon: <SiPostman className="text-2xl text-[#FF6C37]" />,
    brandColor: "#FF6C37",
  },
  {
    name: "Vercel",
    role: "Frontend Cloud & Edge",
    url: "https://vercel.com",
    icon: <SiVercel className="text-2xl text-white" />,
    brandColor: "#FFFFFF",
  },
  {
    name: "Supabase",
    role: "Open Source Postgres Engine",
    url: "https://supabase.com",
    icon: <SiSupabase className="text-2xl text-[#3ECF8E]" />,
    brandColor: "#3ECF8E",
  },
  {
    name: "Stripe",
    role: "Financial Infrastructure",
    url: "https://stripe.com",
    icon: <SiStripe className="text-2xl text-[#635BFF]" />,
    brandColor: "#635BFF",
  },
];

// 3. Community & Ecosystem Partners (Moving)
const COMMUNITY_PARTNERS: SponsorCard[] = [
  {
    name: "Women Techmakers",
    role: "Diversity & Inclusion Partner",
    url: "https://developers.google.com/womentechmakers",
    icon: <Users className="text-2xl text-[#EA4335]" />,
    brandColor: "#EA4335",
  },
  {
    name: "Google Developer Groups",
    role: "Global Developer Chapters",
    url: "https://gdg.community.dev",
    icon: <FaGoogle className="text-2xl text-[#4285F4]" />,
    brandColor: "#4285F4",
  },
  {
    name: "Discord Developers",
    role: "Real-time Developer Chat Hub",
    url: "https://discord.gg/gdgranchi",
    icon: <FaDiscord className="text-2xl text-[#5865F2]" />,
    brandColor: "#5865F2",
  },
  {
    name: "Jharkhand Open Source",
    role: "Regional Builder Collective",
    url: "https://gdgranchi.in",
    icon: <Code2 className="text-2xl text-[#34A853]" />,
    brandColor: "#34A853",
  },
  {
    name: "Campus Tech Clubs",
    role: "Student Innovators Network",
    url: "https://gdgranchi.in",
    icon: <Sparkles className="text-2xl text-[#FBBC04]" />,
    brandColor: "#FBBC04",
  },
];

export const SponsorsSec: React.FC = () => {
  const handleSponsorshipInquiry = () => {
    Swal.fire({
      title: "Partner with GDG Ranchi",
      html: `
        <div style="text-align: left; font-size: 0.95rem; line-height: 1.6; color: #cbd5e1;">
          <p style="margin-bottom: 12px;">
            Sponsor upcoming hackathons, DevFest Ranchi, and developer workshops reaching over <strong>5,000+ engineers, students, and tech professionals</strong> across Jharkhand.
          </p>
          <div style="background: rgba(255,255,255,0.05); padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 14px;">
            <div style="color: #4285F4; font-weight: bold; margin-bottom: 4px;">Available Partnership Opportunities:</div>
            <ul style="margin: 0; padding-left: 20px; font-size: 0.85rem; color: #94a3b8;">
              <li>Title & Flagship Conference Sponsor</li>
              <li>Workshop & Hackathon Challenge Host</li>
              <li>Swag, Cloud Credits & Platform Partner</li>
              <li>Campus & Academic Venue Host</li>
            </ul>
          </div>
          <p style="margin-bottom: 0; font-size: 0.9rem;">
            Direct inquiries: <strong style="color: #34A853;">sponsors@gdgranchi.in</strong>
          </p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Send Partnership Email",
      cancelButtonText: "Close",
      confirmButtonColor: "#4285F4",
      cancelButtonColor: "#334155",
      background: "#0d0d12",
      color: "#ffffff",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href =
          "mailto:sponsors@gdgranchi.in?subject=GDG%20Ranchi%20Sponsorship%20Inquiry";
      }
    });
  };

  const renderPartnerPill = (partner: SponsorCard) => (
    <a
      key={partner.name}
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-3.5 rounded-2xl border border-white/[0.08] bg-[#0d0d12]/90 px-5 py-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-[#15151c] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] shrink-0 w-[240px] sm:w-[270px]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-black/40 transition-transform duration-300 group-hover:scale-105">
        {partner.icon}
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-xs sm:text-sm font-bold text-white truncate transition-colors group-hover:text-[#8AB4F8]">
          {partner.name}
        </h4>
        <p className="text-[11px] text-gray-400 truncate mt-0.5">{partner.role}</p>
      </div>
      <div className="text-gray-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-white shrink-0">
        <ExternalLink size={13} />
      </div>
    </a>
  );

  return (
    <section className="relative bg-[#060608] py-20 sm:py-28 text-white overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[600px] rounded-full bg-gradient-to-br from-[#4285F4]/10 via-[#34A853]/5 to-transparent blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur-md">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4285F4]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#EA4335]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#FBBC04]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
            </span>
            OUR SUPPORTERS & SPONSORS
          </div>

          <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Empowered by Leading{" "}
            <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent">
              Partners & Platforms
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            From premier technical universities to global engineering tools, our supporters power
            free developer education, hackathons, and community growth across Jharkhand.
          </p>
        </div>

        {/* Featured Presented By */}
        <div className="mb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <a
              href="https://developers.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d0d12]/90 p-5 transition-all duration-300 hover:border-[#4285F4]/40 hover:bg-[#13141c] hover:shadow-[0_10px_30px_rgba(66,133,244,0.15)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-105 transition-transform">
                  <FaGoogle className="text-3xl text-[#4285F4]" />
                </div>
                <div>
                  <span className="inline-block rounded bg-[#4285F4]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8AB4F8]">
                    Presented By
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[#8AB4F8] transition-colors mt-0.5">
                    Google for Developers
                  </h3>
                  <p className="text-xs text-gray-400">Global Community Program Partner</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-gray-500 group-hover:text-white transition-colors" />
            </a>

            <a
              href="https://cloud.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0d0d12]/90 p-5 transition-all duration-300 hover:border-[#34A853]/40 hover:bg-[#13141c] hover:shadow-[0_10px_30px_rgba(52,168,83,0.15)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-105 transition-transform">
                  <SiGooglecloud className="text-3xl text-[#34A853]" />
                </div>
                <div>
                  <span className="inline-block rounded bg-[#34A853]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#81C995]">
                    Cloud Partner
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[#81C995] transition-colors mt-0.5">
                    Google Cloud
                  </h3>
                  <p className="text-xs text-gray-400">AI Infrastructure & Credits Partner</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-gray-500 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>

        {/* Dynamic Moving Marquees: Education -> Tech & Tools -> Community */}
        <div className="space-y-8">
          {/* TRACK 1: Education Partners (Moving Left to Right) */}
          <div>
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <GraduationCap size={15} className="text-[#8AB4F8]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#8AB4F8]">
                  Education & University Partners
                </span>
              </div>
              <span className="text-[11px] text-gray-500">Left to right</span>
            </div>
            <MarqueeWall direction="right" speedSeconds={32} gapClass="gap-4 sm:gap-5">
              {EDUCATION_PARTNERS.map(renderPartnerPill)}
            </MarqueeWall>
          </div>

          {/* TRACK 2: Tech & Tool Partners (Moving) */}
          <div>
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <Code2 size={15} className="text-[#34A853]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#81C995]">
                  Tech & Tools Platforms
                </span>
              </div>
              <span className="text-[11px] text-gray-500">Continuous loop</span>
            </div>
            <MarqueeWall direction="left" speedSeconds={42} gapClass="gap-4 sm:gap-5">
              {TECH_TOOLS_PARTNERS.map(renderPartnerPill)}
            </MarqueeWall>
          </div>

          {/* TRACK 3: Community & Ecosystem Partners (Moving) */}
          <div>
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <Users size={15} className="text-[#FBBC04]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#FDD663]">
                  Community & Inclusion Partners
                </span>
              </div>
              <span className="text-[11px] text-gray-500">Left to right</span>
            </div>
            <MarqueeWall direction="right" speedSeconds={28} gapClass="gap-4 sm:gap-5">
              {COMMUNITY_PARTNERS.map(renderPartnerPill)}
            </MarqueeWall>
          </div>
        </div>

        {/* Simple & Clean Partner Callout */}
        <div className="mt-16 max-w-3xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 backdrop-blur-md text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#34A853] mb-2">
            <Handshake size={15} />
            <span>Support The Next Generation</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Want to Sponsor GDG Ranchi & DevFest 2026?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Connect directly with high-impact developers, tech students, and leaders through custom conference tracks, challenge hackathons, and recruitment booths.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleSponsorshipInquiry}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:bg-gray-200 active:scale-95 shadow-md"
            >
              <Mail size={14} />
              <span>Become a Sponsor</span>
            </button>
            <a
              href="mailto:sponsors@gdgranchi.in"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-gray-300 transition-all hover:border-white/20 hover:text-white"
            >
              <span>sponsors@gdgranchi.in</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsSec;
