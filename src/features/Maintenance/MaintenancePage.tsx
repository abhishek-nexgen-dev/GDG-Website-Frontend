import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MaintenancePage = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const faceRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const noseRef = useRef(null);
  const mouthRef = useRef(null);
  const ringRef = useRef(null);
  const contentRef = useRef(null);
  const dotRef = useRef(null);

  useGSAP(
    () => {
      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .from(logoRef.current, {
          opacity: 0,
          y: -15,
          duration: 0.6,
        })
        .from(
          faceRef.current,
          {
            opacity: 0,
            scale: 0.7,
            duration: 0.8,
          },
          "-=0.2",
        );

      gsap.to(faceRef.current, {
        y: -6,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(ringRef.current, {
        scale: 1.35,
        opacity: 0,
        duration: 2.4,
        repeat: -1,
        ease: "power1.out",
      });

      const blink = () => {
        gsap
          .timeline()
          .to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 0.08,
            duration: 0.12,
            ease: "power2.in",
          })
          .to([leftEyeRef.current, rightEyeRef.current], {
            scaleY: 1,
            duration: 0.16,
            ease: "power2.out",
          });
      };

      const scheduleBlink = () => {
        gsap.delayedCall(gsap.utils.random(3, 6), () => {
          blink();
          scheduleBlink();
        });
      };

      scheduleBlink();

      const lookAround = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
      });

      lookAround
        .to([leftPupilRef.current, rightPupilRef.current], {
          x: 3,
          duration: 1,
          ease: "sine.inOut",
        })
        .to([leftPupilRef.current, rightPupilRef.current], {
          x: -3,
          duration: 1.4,
          ease: "sine.inOut",
        })
        .to([leftPupilRef.current, rightPupilRef.current], {
          x: 0,
          duration: 0.8,
          ease: "sine.inOut",
        });

      gsap.to(noseRef.current, {
        y: -2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(mouthRef.current, {
        scaleX: 1.08,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(dotRef.current, {
        scale: 1.6,
        opacity: 0.35,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#080808] px-5 py-10 text-white sm:px-8 lg:px-12"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#34A853]/10 blur-[100px] sm:h-80 sm:w-80 lg:h-96 lg:w-96 lg:blur-[130px]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(52,168,83,0.045),transparent_60%)]" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <div ref={logoRef} className="mb-12 flex items-center gap-2.5 sm:mb-14">
          <img
            src="/GDG_Logo.svg"
            alt="GDG Ranchi"
            className="h-8 w-8 object-contain sm:h-9 sm:w-9"
          />

          <span className="text-sm font-semibold tracking-tight text-white/80 sm:text-base">
            GDG Ranchi
          </span>
        </div>

        <div className="relative mb-9 flex h-32 w-44 items-center justify-center sm:h-36 sm:w-48">
          <div
            ref={ringRef}
            className="absolute h-32 w-32 rounded-[45%] border border-[#34A853]/20 sm:h-36 sm:w-36"
          />

          <div
            ref={faceRef}
            className="relative flex h-28 w-36 items-center justify-center rounded-[45%] border border-white/10 bg-white/[0.035] shadow-[0_0_60px_rgba(52,168,83,0.08)] sm:h-32 sm:w-40"
          >
            <div className="absolute left-[20%] top-[27%]">
              <div
                ref={leftEyeRef}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white sm:h-9 sm:w-9"
              >
                <span ref={leftPupilRef} className="h-3 w-3 rounded-full bg-[#080808]" />
              </div>
            </div>

            <div className="absolute right-[20%] top-[27%]">
              <div
                ref={rightEyeRef}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white sm:h-9 sm:w-9"
              >
                <span ref={rightPupilRef} className="h-3 w-3 rounded-full bg-[#080808]" />
              </div>
            </div>

            <div
              ref={noseRef}
              className="absolute left-1/2 top-[52%] h-3 w-3 -translate-x-1/2 rounded-full bg-[#34A853]"
            />

            <div
              ref={mouthRef}
              className="absolute bottom-[20%] left-1/2 h-6 w-12 -translate-x-1/2 rounded-b-full border-b-2 border-white/60"
            />
          </div>
        </div>

        <div ref={contentRef} className="flex flex-col items-center">
          <div className="mb-4 flex items-center gap-2">
            <span ref={dotRef} className="h-1.5 w-1.5 rounded-full bg-[#34A853]" />

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#34A853] sm:text-xs">
              We'll be back soon
            </span>
          </div>

          <h1 className="max-w-xl text-[2.7rem] font-bold leading-[0.95] tracking-[-0.05em] sm:text-5xl md:text-6xl">
            Website under
            <br />
            <span className="bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC04] bg-clip-text text-transparent">
              maintenance.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-white/45 sm:text-base">
            We’re making a few improvements behind the scenes to create a better experience for
            everyone in the GDG Ranchi community — members, participants, speakers, mentors, and
            judges.
          </p>

          <div className="mt-7">
            <p className="text-sm font-medium text-white/60">Keep your eyes open.</p>

            <p className="mt-1 text-xs text-white/25">Something better is on the way.</p>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-3 sm:mt-14">
          <span className="h-px w-8 bg-white/10 sm:w-12" />

          <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 sm:text-[10px]">
            Ranchi · Jharkhand · India
          </span>

          <span className="h-px w-8 bg-white/10 sm:w-12" />
        </div>
      </div>
    </main>
  );
};

export default MaintenancePage;
