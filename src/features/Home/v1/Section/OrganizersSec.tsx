import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Code, Brush } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OrganizersSec = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".org-bento-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".org-grid",
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-[#000000] py-24 text-white selection:bg-[#EA4335]/30">
      
      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        
        {/* Section Header */}
        <div className="org-header mb-20 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="flex justify-center">
            <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
              ✦ MEET THE TEAM
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-8 text-center text-5xl font-black leading-none text-white sm:text-6xl lg:text-7xl">
            Our{" "}
            <span className="text-[#1a73e8]">
              Organizers
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-9 text-gray-400">
            The passionate team working behind the scenes to bring the GDG community together.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="org-grid grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
          
          {/* 1. Alice (Lead) */}
          <div className="org-bento-item p-[1px] rounded-[1.5rem] bg-gradient-to-br from-[#EA4335]/60 via-transparent to-transparent md:col-span-2 lg:col-span-3 relative group shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0A0A0C] h-[380px] w-full">
              
              {/* Background Glow */}
              <div className="absolute top-0 left-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EA4335]/15 blur-[100px]" />
              
              {/* Big Outline Text */}
              <div className="absolute -left-2 top-8 text-[110px] sm:text-[130px] font-black leading-[0.8] text-transparent opacity-10 pointer-events-none select-none" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.4)" }}>
                LEAD<br/>ORGANIZER
              </div>
              
              {/* Top Right Dots */}
              <div className="absolute top-8 right-8 grid grid-cols-4 gap-1.5 opacity-30">
                {[...Array(12)].map((_, i) => <div key={i} className="h-1.5 w-1.5 rounded-full bg-white" />)}
              </div>

              {/* Bottom Right Star */}
              <svg className="absolute bottom-8 right-8 w-14 h-14 text-[#EA4335] opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                <path d="M5.5 5.5L8.5 8.5" /><path d="M18.5 5.5L15.5 8.5" /><path d="M5.5 18.5L8.5 15.5" /><path d="M18.5 18.5L15.5 15.5" />
              </svg>

              {/* Image Masked */}
              <div className="absolute inset-0 h-full w-full">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format" alt="Alice Johnson" className="h-full w-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 opacity-90" />
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent pointer-events-none" />
              </div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 flex w-full flex-col p-8 transition-transform duration-500 group-hover:-translate-y-2 z-10">
                <span 
                  className="mb-2 w-max rounded-full bg-[#EA4335] px-3 py-1 text-xs font-bold tracking-wider text-black uppercase"
                >
                  Lead Organizer
                </span>
                <h3 className="text-2xl font-bold text-white lg:text-3xl">ALICE JOHNSON</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#999999] max-w-[250px]">
                  Driving the vision forward and leading the way to impact.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Bob (Co-Organizer) */}
          <div className="org-bento-item p-[1px] rounded-[1.5rem] bg-gradient-to-br from-white/15 to-transparent md:col-span-2 lg:col-span-3 relative group shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0A0A0C] h-[380px] w-full">
               
               {/* Decorative Rings */}
               <div className="absolute top-10 -right-10 h-64 w-64 rounded-full border-[2px] border-[#FBBC04]/20 opacity-30" />
               <div className="absolute top-20 -right-20 h-64 w-64 rounded-full border-[2px] border-[#FBBC04]/10 opacity-30" />
               <div className="absolute top-0 -right-0 h-64 w-64 rounded-full border-[2px] border-[#FBBC04]/30 opacity-30" />

               {/* Yellow Icon Button */}
               <div className="absolute bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#FBBC04] text-black shadow-[0_0_20px_rgba(251,188,4,0.3)] z-20 hover:scale-110 transition-transform cursor-pointer">
                 <Users size={24} strokeWidth={2.5} />
               </div>

               {/* Image Masked */}
               <div className="absolute inset-0 h-full w-full">
                 <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format" alt="Bob Smith" className="h-full w-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80" />
                 <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent pointer-events-none" />
               </div>

               {/* Content */}
               <div className="absolute bottom-0 left-0 flex w-full flex-col p-8 transition-transform duration-500 group-hover:-translate-y-2 z-10">
                <span 
                  className="mb-2 w-max rounded-full bg-[#FBBC04] px-3 py-1 text-xs font-bold tracking-wider text-black uppercase"
                >
                  Co-Organizer
                </span>
                <h3 className="text-2xl font-bold text-white lg:text-3xl">BOB SMITH</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#999999] max-w-[250px]">
                  Bringing structure, strategy and excellence.
                </p>
               </div>
            </div>
          </div>

          {/* 3. Charlie (Tech Lead) */}
          <div className="org-bento-item p-[1px] rounded-[1.5rem] bg-gradient-to-b from-[#4285F4]/30 to-transparent md:col-span-1 lg:col-span-2 relative group shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0A0A0C] h-[400px] w-full">
              
              {/* Top Left Icon & Dots */}
              <div className="absolute top-6 left-6 z-20">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#4285F4]/40 bg-[#4285F4]/10 text-[#4285F4]">
                  <Code size={20} strokeWidth={2.5} />
                </div>
                <div className="absolute top-16 left-2 grid grid-cols-2 gap-1.5 opacity-20">
                  {[...Array(6)].map((_, i) => <div key={i} className="h-1 w-1 rounded-full bg-white" />)}
                </div>
              </div>

              {/* Bottom Right Cube */}
              <div className="absolute bottom-6 right-6 h-16 w-16 text-[#4285F4] opacity-50 z-20">
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>

              {/* Image Masked */}
              <div className="absolute inset-0 h-full w-full">
                 <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format" alt="Charlie Davis" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60" />
                 <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent pointer-events-none" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 flex w-full flex-col p-8 transition-transform duration-500 group-hover:-translate-y-2 z-10">
                <span 
                  className="mb-2 w-max rounded-full bg-[#4285F4] px-3 py-1 text-xs font-bold tracking-wider text-white uppercase"
                >
                  Tech Lead
                </span>
                <h3 className="text-2xl font-bold text-white lg:text-3xl">CHARLIE DAVIS</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#999999] max-w-[250px]">
                  Building, optimizing and shipping seamless experiences.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Diana (Community Manager) */}
          <div className="org-bento-item p-[1px] rounded-[1.5rem] bg-gradient-to-tr from-[#34A853]/40 to-transparent md:col-span-1 lg:col-span-2 relative group shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0A0A0C] h-[400px] w-full">
               
               {/* Background Glow */}
               <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#34A853]/15 blur-[80px]" />

               {/* Top Left Icon */}
               <div className="absolute top-6 left-6 z-20">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#34A853]/40 bg-[#34A853]/10 text-[#34A853]">
                   <Users size={20} strokeWidth={2.5} />
                 </div>
               </div>

               {/* Image Full Width Masked from Bottom */}
               <div className="absolute inset-0 h-full w-full">
                 <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format" alt="Diana Prince" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70" />
                 <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent pointer-events-none" />
               </div>

               {/* Content */}
               <div className="absolute bottom-0 left-0 flex w-full flex-col p-8 transition-transform duration-500 group-hover:-translate-y-2 z-10">
                 <span 
                   className="mb-2 w-max rounded-full bg-[#34A853] px-3 py-1 text-xs font-bold tracking-wider text-black uppercase"
                 >
                   Community Manager
                 </span>
                 <h3 className="text-2xl font-bold text-white lg:text-3xl">DIANA PRINCE</h3>
                 <p className="mt-2 text-sm font-medium leading-relaxed text-[#999999] max-w-[250px]">
                   Connecting people, building community, creating impact together.
                 </p>
               </div>
            </div>
          </div>

          {/* 5. Evan (Design Lead) */}
          <div className="org-bento-item p-[1px] rounded-[1.5rem] bg-gradient-to-t from-[#EA4335]/40 to-transparent md:col-span-2 lg:col-span-2 relative group shadow-2xl">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0A0A0C] h-[400px] w-full">
              
              {/* Top Left Icon */}
              <div className="absolute top-6 left-6 z-20">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EA4335]/40 bg-[#EA4335]/10 text-[#EA4335]">
                  <Brush size={20} strokeWidth={2.5} />
                </div>
                <div className="absolute top-2 left-16 grid grid-cols-2 gap-1.5 opacity-20">
                  {[...Array(6)].map((_, i) => <div key={i} className="h-1 w-1 rounded-full bg-white" />)}
                </div>
              </div>

              {/* Bottom Right Decoration (Red abstract pie) */}
              <svg className="absolute -bottom-4 -right-4 h-28 w-28 text-[#EA4335] opacity-60 z-20" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 50 L100 0 A100 100 0 0 1 100 100 Z" />
              </svg>

              {/* Image Masked */}
              <div className="absolute inset-0 h-full w-full">
                 <img src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=800&auto=format" alt="Evan Wright" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60" />
                 <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent pointer-events-none" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 flex w-full flex-col p-8 transition-transform duration-500 group-hover:-translate-y-2 z-10">
                <span 
                  className="mb-2 w-max rounded-full bg-[#EA4335] px-3 py-1 text-xs font-bold tracking-wider text-black uppercase"
                >
                  Design Lead
                </span>
                <h3 className="text-2xl font-bold text-white lg:text-3xl">EVAN WRIGHT</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#999999] max-w-[250px]">
                  Designing with purpose, creating with impact.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="org-bento-item p-[1px] rounded-2xl bg-white/10 md:col-span-2 lg:col-span-6 mt-2 shadow-xl">
            <div className="flex flex-col items-center justify-between gap-6 rounded-[15px] bg-[#0A0A0C] px-8 py-5 md:flex-row">
              <div className="flex items-center gap-5">
                <svg className="w-8 h-8 text-[#EA4335]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
                </svg>
                <p className="text-[13px] font-medium text-[#999999] leading-snug">
                  A passionate team united by purpose,<br className="hidden sm:block"/> working behind the scenes to make it all happen.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-[9px] sm:text-[10px] font-black tracking-[0.2em] text-[#888888]">
                <span>ORGANIZING WITH PASSION</span>
                <div className="h-1.5 w-1.5 rounded-full bg-[#EA4335]" />
                <span>BUILDING FOR IMPACT</span>
                <div className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />
                <span>TOGETHER WE CREATE</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OrganizersSec;
