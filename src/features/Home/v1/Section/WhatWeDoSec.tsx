import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WhatWeDoSec = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Heading & Description animation
      gsap.fromTo(
        ".wwd-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        ".wwd-card",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".wwd-grid",
            start: "top 80%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#050505] py-28">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-40 h-96 w-96 rounded-full bg-[#EA4335]/10 blur-[140px]" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-[#34A853]/10 blur-[140px]" />
        <div className="absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#4285F4]/10 blur-[120px]" />
      </div>

      <div className="wwd-header relative mx-auto max-w-7xl px-6">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
            ✦ WHAT WE DO
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-8 text-center text-5xl font-black leading-none text-white sm:text-6xl lg:text-7xl">
          What{" "}
          <span className="bg-gradient-to-r from-[#EA4335] via-[#FBBC04] via-[#34A853] to-[#4285F4] bg-clip-text text-transparent">
            We Do
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-9 text-gray-400">
          We create opportunities for developers to <span className="text-white">learn</span>,
          <span className="text-white"> build</span>,<span className="text-white"> connect</span>,
          and
          <span className="text-white"> grow</span>. Through workshops, hackathons, study jams,
          networking events, and real-world projects, GDG Ranchi empowers students and professionals
          to innovate with modern Google technologies.
        </p>
      </div>

      <div className="wwd-grid mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Learn Card */}
        <div className="wwd-card group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-10 transition-all duration-500 hover:bg-white/[0.04]">
          {/* Texture Overlay */}
          <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E\")" }} />
          <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "20px 20px", WebkitMaskImage: "radial-gradient(circle at 100% 0%, black 10%, transparent 70%)" }} />
          
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#EA4335]/20 blur-[80px] transition-all duration-500 group-hover:bg-[#EA4335]/40" />
          <div className="relative z-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#EA4335]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <h3 className="mb-4 text-3xl font-bold tracking-tight text-white">Learn</h3>
            <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
              Expand your knowledge through hands-on codelabs, interactive study jams, and expert-led tech talks covering the latest Google technologies.
            </p>
          </div>
        </div>

        {/* Connect Card */}
        <div className="wwd-card group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-10 transition-all duration-500 hover:bg-white/[0.04] lg:col-span-2 lg:flex-row lg:items-center lg:gap-12">
          {/* Texture Overlay */}
          <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px", WebkitMaskImage: "radial-gradient(circle at 100% 100%, black 30%, transparent 80%)" }} />
          
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#4285F4]/20 blur-[100px] transition-all duration-500 group-hover:bg-[#4285F4]/40" />
          <div className="relative z-10 lg:w-1/2">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#4285F4]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="mb-4 text-3xl font-bold tracking-tight text-white">Connect</h3>
            <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
              Meet local developers, designers, and tech enthusiasts. Build your network, find mentors, and collaborate with like-minded individuals in the vibrant Ranchi tech ecosystem.
            </p>
          </div>
          <div className="relative z-10 mt-10 hidden flex-col items-center justify-center gap-6 lg:flex lg:w-1/2">
            <div className="flex -space-x-6">
              <img className="h-20 w-20 rounded-full border-[3px] border-[#0A0A0C] bg-[#4285F4]/20 shadow-xl transition-transform duration-300 hover:-translate-y-2" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=4285F4" alt="Avatar" />
              <img className="h-20 w-20 rounded-full border-[3px] border-[#0A0A0C] bg-[#EA4335]/20 shadow-xl transition-transform duration-300 hover:-translate-y-2" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka&backgroundColor=EA4335" alt="Avatar" />
              <img className="h-20 w-20 rounded-full border-[3px] border-[#0A0A0C] bg-[#FBBC04]/20 shadow-xl transition-transform duration-300 hover:-translate-y-2" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jocelyn&backgroundColor=FBBC04" alt="Avatar" />
              <img className="h-20 w-20 rounded-full border-[3px] border-[#0A0A0C] bg-[#34A853]/20 shadow-xl transition-transform duration-300 hover:-translate-y-2" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Liam&backgroundColor=34A853" alt="Avatar" />
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-[#0A0A0C] bg-white/10 text-sm font-bold text-white shadow-xl backdrop-blur-md transition-transform duration-300 hover:-translate-y-2">
                3K+
              </div>
            </div>
            <p className="text-sm font-medium text-white/50 tracking-wider uppercase">Vibrant Community</p>
          </div>
        </div>

        {/* Build Card */}
        <div className="wwd-card group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-10 transition-all duration-500 hover:bg-white/[0.04] lg:col-span-2">
          {/* Texture Overlay */}
          <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)", backgroundSize: "24px 24px", WebkitMaskImage: "linear-gradient(to right, black, transparent 60%)" }} />
          
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#FBBC04]/15 blur-[100px] transition-all duration-500 group-hover:bg-[#FBBC04]/30" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:gap-12">
            <div className="relative hidden aspect-video w-full overflow-hidden rounded-2xl border border-white/10 lg:block lg:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                alt="Hackathon team collaborating"
                className="h-full w-full object-cover opacity-60 grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="lg:w-1/2">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#FBBC04]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h3 className="mb-4 text-3xl font-bold tracking-tight text-white">Build</h3>
              <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
                Turn your ideas into reality. Participate in intense hackathons, collaborative buildathons, and open-source contributions to solve real-world problems.
              </p>
            </div>
          </div>
        </div>

        {/* Grow Card */}
        <div className="wwd-card group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-10 transition-all duration-500 hover:bg-white/[0.04]">
          {/* Texture Overlay */}
          <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 16px)", WebkitMaskImage: "radial-gradient(circle at 0% 100%, black 20%, transparent 80%)" }} />
          
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-[#34A853]/20 blur-[80px] transition-all duration-500 group-hover:bg-[#34A853]/40" />
          <div className="relative z-10">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#34A853]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <h3 className="mb-4 text-3xl font-bold tracking-tight text-white">Grow</h3>
            <p className="text-sm leading-relaxed text-gray-400 sm:text-base">
              Advance your career and leadership skills. Get access to exclusive Google resources, expert mentorship, and global opportunities to shine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSec;
