import { useRef } from "react";
import { Users } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CommunitySec = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".comm-content",
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
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative px-5 py-16 sm:px-8 md:px-12 lg:px-[8%] xl:px-[10%]"
    >
      <div className="comm-content relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0A0A0C] p-8 sm:p-12 lg:p-16">
        {/* Neon Blue Dotted World Map Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #4285F4, #00e5ff, #34A853)",
              filter:
                "drop-shadow(0 0 10px rgba(0, 229, 255, 0.6)) drop-shadow(0 0 20px rgba(66, 133, 244, 0.4))",
              WebkitMaskImage:
                "radial-gradient(circle, white 1.5px, transparent 1.5px), url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
              WebkitMaskSize: "10px 10px, cover",
              WebkitMaskPosition: "0 0, center", // Center the world map
              WebkitMaskRepeat: "repeat, no-repeat",
              WebkitMaskComposite: "source-in",
              maskImage:
                "radial-gradient(circle, white 1.5px, transparent 1.5px), url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
              maskSize: "10px 10px, cover",
              maskPosition: "0 0, center",
              maskRepeat: "repeat, no-repeat",
              maskComposite: "intersect",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-between gap-12 lg:flex-row lg:items-start">
          {/* Left Content */}
          <div className="flex w-full max-w-2xl flex-col gap-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#4285F4]">
                Community
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Be a Part of Something Bigger
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
              Whether you're a beginner or an expert, there's a place for you in GDG Ranchi. Let's
              learn, build and grow together.
            </p>

            <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-[#4285F4] sm:text-3xl">1000+</span>
                <span className="text-xs text-white/60 sm:text-sm">Members</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-[#4285F4] sm:text-3xl">50+</span>
                <span className="text-xs text-white/60 sm:text-sm">Workshops</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-[#4285F4] sm:text-3xl">20+</span>
                <span className="text-xs text-white/60 sm:text-sm">Projects</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-[#4285F4] sm:text-3xl">∞</span>
                <span className="text-xs text-white/60 sm:text-sm">Possibilities</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex w-full flex-col items-start gap-8 lg:w-auto lg:items-end">
            <button className="group flex items-center justify-center gap-3 rounded-xl bg-[#1A73E8] px-8 py-4 font-semibold text-white transition-all hover:bg-[#1557B0] hover:shadow-[0_0_20px_rgba(66,133,244,0.3)]">
              Join Our Community
              <Users size={20} className="transition-transform group-hover:scale-110" />
            </button>

            <div className="flex flex-col items-start gap-4 lg:items-center">
              <p className="text-sm text-white/50">Connect with us on</p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySec;
