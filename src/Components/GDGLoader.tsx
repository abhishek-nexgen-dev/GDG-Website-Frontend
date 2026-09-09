import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Code2, Cpu, Globe2, Sparkles } from "lucide-react";

const GDGLoader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        loaderRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
      );

      tl.fromTo(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.75,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.25",
      );

      tl.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.35",
      );

      gsap.to(logoRef.current, {
        scale: 1.045,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(glowRef.current, {
        scale: 1.35,
        opacity: 0.35,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(ringRef.current, {
        rotate: 360,
        transformOrigin: "50% 50%",
        duration: 2.4,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".gdg-loader-orbit", {
        rotate: 360,
        transformOrigin: "50% 50%",
        duration: 5,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".gdg-loader-orbit-reverse", {
        rotate: -360,
        transformOrigin: "50% 50%",
        duration: 7,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".gdg-loader-particle", {
        scale: 1.8,
        opacity: 0.25,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.18,
          repeat: -1,
        },
        ease: "sine.inOut",
      });

      gsap.to(".gdg-loader-progress", {
        width: "100%",
        duration: 2.8,
        repeat: -1,
        ease: "power1.inOut",
      });

      gsap.to(dotsRef.current?.children || [], {
        y: -4,
        opacity: 1,
        duration: 0.45,
        stagger: 0.12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, loaderRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4285F4]/[0.045] blur-[100px]" />

        <div className="absolute left-[15%] top-[20%] h-1 w-1 rounded-full bg-[#4285F4] shadow-[0_0_14px_5px_rgba(66,133,244,.2)]" />

        <div className="absolute right-[18%] top-[30%] h-1.5 w-1.5 rounded-full bg-[#FBBC04] shadow-[0_0_16px_5px_rgba(251,188,4,.18)]" />

        <div className="absolute bottom-[25%] left-[20%] h-1 w-1 rounded-full bg-[#EA4335] shadow-[0_0_14px_5px_rgba(234,67,53,.18)]" />

        <div className="absolute bottom-[20%] right-[22%] h-1.5 w-1.5 rounded-full bg-[#34A853] shadow-[0_0_16px_5px_rgba(52,168,83,.18)]" />
      </div>

      <div className="relative flex flex-col items-center">
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4285F4]/10 blur-[50px]"
        />

        <div className="relative h-[150px] w-[150px] sm:h-[170px] sm:w-[170px]">
          <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 170 170">
            <defs>
              <linearGradient id="gdgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4285F4" />
                <stop offset="32%" stopColor="#EA4335" />
                <stop offset="65%" stopColor="#FBBC04" />
                <stop offset="100%" stopColor="#34A853" />
              </linearGradient>
            </defs>

            <circle
              cx="85"
              cy="85"
              r="66"
              fill="none"
              stroke="rgba(255,255,255,0.045)"
              strokeWidth="1"
            />

            <circle
              ref={ringRef}
              cx="85"
              cy="85"
              r="66"
              fill="none"
              stroke="url(#gdgGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="95 320"
            />

            <circle
              cx="85"
              cy="85"
              r="55"
              fill="none"
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="1"
              strokeDasharray="2 7"
              className="gdg-loader-orbit"
            />

            <circle
              cx="85"
              cy="85"
              r="48"
              fill="none"
              stroke="rgba(255,255,255,0.025)"
              strokeWidth="1"
              strokeDasharray="1 9"
              className="gdg-loader-orbit-reverse"
            />
          </svg>

          <div className="gdg-loader-orbit absolute inset-0">
            <span className="absolute left-1/2 top-[-1px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#4285F4] shadow-[0_0_14px_4px_rgba(66,133,244,.35)]" />
          </div>

          <div
            ref={logoRef}
            className="absolute left-1/2 top-1/2 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[22px] border border-white/[0.09] bg-[#080808] shadow-[0_15px_50px_rgba(0,0,0,.5)] sm:h-[86px] sm:w-[86px]"
          >
            <img
              src="/GDG_Logo.svg"
              alt="GDG Ranchi"
              className="h-12 w-12 object-contain sm:h-14 sm:w-14"
            />
          </div>
        </div>

        <div ref={textRef} className="mt-5 flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-[-0.04em] text-white sm:text-[1vw]">
              GDG
            </span>

            <span className="text-lg font-bold tracking-[-0.04em] text-white/45 sm:text-[1vw">
              Ranchi
            </span>
          </div>

          <div className="mt-2.5 flex items-center gap-2">
            <Code2 size={10} className="text-[#4285F4]" />
            <span className="text-[12px] font-medium uppercase tracking-[0.32em] text-white/25">
              Learn · Build · Connect
            </span>
            <Sparkles size={10} className="text-[#FBBC04]" />
          </div>
        </div>

        <div className="mt-7 w-[190px] sm:w-[220px]">
          <div className="h-[2px] overflow-hidden rounded-full bg-white/[0.07]">
            <div className="gdg-loader-progress h-full w-0 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]" />
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5">
            <div ref={dotsRef} className="flex items-center gap-1.5">
              <span className="gdg-loader-particle h-1 w-1 rounded-full bg-[#4285F4] opacity-60" />
              <span className="gdg-loader-particle h-1 w-1 rounded-full bg-[#EA4335] opacity-60" />
              <span className="gdg-loader-particle h-1 w-1 rounded-full bg-[#FBBC04] opacity-60" />
              <span className="gdg-loader-particle h-1 w-1 rounded-full bg-[#34A853] opacity-60" />
            </div>
          </div>
        </div>

        <div className="absolute -left-24 top-[30%] hidden opacity-20 sm:block">
          <Cpu size={18} strokeWidth={1} />
        </div>

        <div className="absolute -right-24 bottom-[30%] hidden opacity-15 sm:block">
          <Globe2 size={20} strokeWidth={1} />
        </div>
      </div>
    </div>
  );
};

export default GDGLoader;
