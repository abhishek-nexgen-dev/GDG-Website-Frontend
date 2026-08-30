import {
  CalendarDays,
  Mail,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import gsap from "gsap";

const LaunchingSoon = () => {
  const launchDate = new Date("2026-09-14T00:00:00").getTime();

  const containerRef = useRef<HTMLDivElement>(null);
  const ganeshRef = useRef<HTMLImageElement>(null);

  /* =====================================================
     COUNTDOWN
  ===================================================== */

  const calculateTimeLeft = () => {
    const difference = launchDate - Date.now();

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor(
        (difference / (1000 * 60 * 60)) % 24,
      ),
      minutes: Math.floor(
        (difference / (1000 * 60)) % 60,
      ),
      seconds: Math.floor(
        (difference / 1000) % 60,
      ),
    };
  };

  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft(),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* =====================================================
     GSAP ANIMATIONS
  ===================================================== */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      /* Navbar */

      timeline.from(".nav-item", {
        y: -20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
      });

      /* Hero Mantra */

      timeline.from(
        ".hero-mantra",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.3",
      );

      /* Hero Label */

      timeline.from(
        ".hero-label",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.4",
      );

      /* Hero Titles */

      timeline.from(
        ".hero-title",
        {
          y: 60,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
        },
        "-=0.4",
      );

      /* Description */

      timeline.from(
        ".hero-description",
        {
          y: 25,
          opacity: 0,
          duration: 0.7,
        },
        "-=0.5",
      );

      /* Values */

      timeline.from(
        ".hero-value",
        {
          y: 15,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.3",
      );

      /* Launch Info */

      timeline.from(
        ".launch-info",
        {
          y: 20,
          opacity: 0,
          duration: 0.7,
        },
        "-=0.3",
      );

      /* Countdown */

      timeline.from(
        ".countdown-card",
        {
          y: 30,
          opacity: 0,
          scale: 0.92,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.3",
      );

      /* Hero CTA */

      timeline.from(
        ".hero-button",
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.3",
      );

      /* Ganesh Image */

      timeline.from(
        ".ganesh-image",
        {
          scale: 0.75,
          opacity: 0,
          y: 80,
          duration: 1.5,
          ease: "power4.out",
        },
        "-=1.5",
      );

      /* Rings */

      timeline.from(
        ".ganesh-ring",
        {
          scale: 0,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
        },
        "-=1.2",
      );

      /* Footer */

      timeline.from(
        ".footer-item",
        {
          y: 15,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.4",
      );

      /* Floating Animation */

      gsap.to(".float-slow", {
        y: -18,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".float-medium", {
        y: 14,
        x: 8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".float-fast", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* Rotating Rings */

      gsap.to(".ring-rotate", {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".ring-reverse", {
        rotate: -360,
        duration: 22,
        repeat: -1,
        ease: "none",
      });

      /* OM Animation */

      gsap.to(".om-symbol", {
        scale: 1.08,
        opacity: 0.12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* Pulse Orb */

      gsap.to(".pulse-orb", {
        scale: 1.2,
        opacity: 0.6,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* =====================================================
     MOUSE PARALLAX
  ===================================================== */

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!ganeshRef.current) return;

    const { innerWidth, innerHeight } = window;

    const x =
      (event.clientX / innerWidth - 0.5) * 18;

    const y =
      (event.clientY / innerHeight - 0.5) * 18;

    gsap.to(ganeshRef.current, {
      x,
      y,
      duration: 1.2,
      ease: "power3.out",
    });
  };

  /* =====================================================
     COUNTDOWN DATA
  ===================================================== */

  const timeItems = [
    {
      label: "Days",
      value: timeLeft.days,
      accent: "bg-[#4285F4]",
      border: "border-[#4285F4]/20",
    },
    {
      label: "Hours",
      value: timeLeft.hours,
      accent: "bg-[#EA4335]",
      border: "border-[#EA4335]/20",
    },
    {
      label: "Minutes",
      value: timeLeft.minutes,
      accent: "bg-[#FBBC04]",
      border: "border-[#FBBC04]/20",
    },
    {
      label: "Seconds",
      value: timeLeft.seconds,
      accent: "bg-[#34A853]",
      border: "border-[#34A853]/20",
    },
  ];

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-screen overflow-hidden bg-[#080a0d] text-white"
    >
      {/* ================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}

        <div
          className="
            absolute inset-0 opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
            [background-size:55px_55px]
          "
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-green-500/[0.04]" />

        {/* Ambient Lights */}

        <div className="float-slow absolute left-[5%] top-[15%] h-[300px] w-[300px] rounded-full bg-blue-500/[0.06] blur-[130px]" />

        <div className="float-medium absolute bottom-[-100px] left-[30%] h-[350px] w-[350px] rounded-full bg-green-500/[0.05] blur-[150px]" />

        <div className="float-fast absolute right-[20%] top-[5%] h-[250px] w-[250px] rounded-full bg-yellow-500/[0.05] blur-[120px]" />

        <div className="absolute bottom-[10%] right-[10%] h-[200px] w-[200px] rounded-full bg-red-500/[0.04] blur-[100px]" />
      </div>

      {/* ================================================
          PARTICLES
      ================================================= */}

      <div className="pointer-events-none absolute inset-0">
        <div className="float-slow absolute left-[7%] top-[28%] h-2 w-2 rounded-full bg-[#4285F4] shadow-[0_0_18px_rgba(66,133,244,.8)]" />

        <div className="float-medium absolute left-[42%] top-[20%] h-1.5 w-1.5 rounded-full bg-[#EA4335]" />

        <div className="float-fast absolute bottom-[25%] left-[50%] h-2 w-2 rounded-full bg-[#FBBC04] shadow-[0_0_16px_rgba(251,188,4,.8)]" />

        <div className="float-slow absolute right-[12%] top-[25%] h-2 w-2 rounded-full bg-[#34A853] shadow-[0_0_20px_rgba(52,168,83,.8)]" />

        <div className="float-medium absolute bottom-[20%] right-[32%] h-1.5 w-1.5 rounded-full bg-[#EA4335]" />
      </div>

      {/* ================================================
          MAIN WRAPPER
      ================================================= */}

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1550px] flex-col px-5 sm:px-8 lg:px-12">
        
        {/* ================================================
            NAVBAR
        ================================================= */}

        <header className="flex h-[76px] shrink-0 items-center justify-between sm:h-[82px]">
          {/* Logo */}

          <div className="nav-item flex items-center gap-3">
            <div className="relative flex h-10 w-11 items-center justify-center">
              <img src="/public/GDG_Logo.svg" />
            </div>

            <div>
              <h2 className="text-sm font-semibold tracking-tight text-zinc-100 sm:text-base">
                GDG Ranchi
              </h2>

              <p className="text-[12px] text-zinc-500">
                Google Developer Groups
              </p>
            </div>
          </div>

          {/* Social */}

          <div className="nav-item flex items-center gap-2">
            <div className="mr-2 hidden items-center gap-2 text-[10px] text-zinc-500 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              Community is growing
            </div>

            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] text-zinc-500 transition duration-300 hover:-translate-y-1 hover:border-pink-500/30 hover:bg-pink-500/10 hover:text-pink-400"
            >
              <BsInstagram size={14} />
            </a>

            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] text-zinc-500 transition duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400"
            >
              <BsLinkedin size={14} />
            </a>
          </div>
        </header>

        {/* ================================================
            HERO
        ================================================= */}

        <section className="grid min-h-0 flex-1 grid-cols-1 items-center lg:grid-cols-[1.05fr_.95fr]">
          
          {/* ================================================
              LEFT SECTION
          ================================================= */}

          <div className="relative flex flex-col justify-center py-8 lg:py-0">
            
            {/* Mantra */}

            <div className="hero-mantra mb-7 flex items-center gap-3 sm:mb-9">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-orange-400/60" />

              <p className="text-lg font-medium tracking-[0.22em] text-orange-300/90 sm:text-xl">
                ॥ श्री गणेशाय नमः ॥
              </p>

              <div className="h-px w-8 bg-gradient-to-l from-transparent to-orange-400/60" />
            </div>

  

        

            {/* Main Heading */}

            <div className="overflow-hidden">
              <h1 className="hero-title text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl md:text-6xl xl:text-7xl">
                Wisdom Inspires.
              </h1>
            </div>

            <div className="overflow-hidden">
              <h1 className="hero-title mt-1 text-4xl font-bold tracking-[-0.04em] sm:text-5xl md:text-6xl xl:text-7xl">
                <span className="bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04] bg-clip-text text-transparent">
                  Innovation Begins.
                </span>
              </h1>
            </div>

            {/* Description */}

            <p className="hero-description mt-6 max-w-xl text-sm leading-7 text-zinc-400 sm:mt-7 sm:text-base sm:leading-8">
              With the blessings of{" "}
              <span className="font-medium text-zinc-200">
                Lord Ganesha
              </span>
              {" "}— the symbol of wisdom, knowledge, and new beginnings —
              GDG Ranchi begins a journey to bring together developers,
              learners, builders, and innovators.
            </p>

        

            {/* Divider */}

            <div className="launch-info my-7 h-px w-full max-w-xl bg-gradient-to-r from-white/10 via-white/5 to-transparent sm:my-8" />

            {/* Launch Date */}

            <div className="launch-info">
              <div className="mb-3 flex items-center gap-2">
                <CalendarDays
                  size={13}
                  className="text-orange-400"
                />

                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                  Launching on Ganesh Chaturthi
                </p>
              </div>

              <div className="flex items-end gap-3">
                <span className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  14 SEPTEMBER
                </span>

                <span className="mb-1 text-sm text-zinc-500">
                  2026
                </span>
              </div>
            </div>

            {/* Countdown */}

            <div className="mt-7 grid max-w-lg grid-cols-4 gap-2 sm:mt-8 sm:gap-3">
              {timeItems.map((item) => (
                <div
                  key={item.label}
                  className={`countdown-card relative overflow-hidden rounded-xl border ${item.border} bg-white/[0.025] px-2 py-3 text-center backdrop-blur-sm sm:px-3 sm:py-4`}
                >
                  <div
                    className={`absolute left-0 top-0 h-px w-full ${item.accent} opacity-60`}
                  />

                  <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {String(item.value).padStart(2, "0")}
                  </p>

                  <p className="mt-1 text-[8px] font-medium uppercase tracking-wider text-zinc-500 sm:text-[12px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

    

            {/* Quote */}

            <div className="hero-button mt-5 border-l border-orange-400/40 pl-4">
              <p className="max-w-md text-[10px] italic leading-5 text-zinc-600 sm:text-xs">
                “May wisdom guide our ideas, and innovation shape our future.”
              </p>
            </div>
          </div>

          {/* ================================================
              RIGHT GANESH VISUAL
          ================================================= */}

          <div className="relative hidden h-full items-center justify-center lg:flex">
            
          {/* OM Background */}

            <div className="om-symbol absolute right-[8%] top-[10%] select-none text-[280px] font-bold leading-none text-orange-400/[0.04]">
              ॐ
            </div>

            {/* Center Glow */}

            <div className="pulse-orb absolute h-[400px] w-[400px] rounded-full bg-orange-500/[0.06] blur-[100px]" />

            {/* Ring 1 */}

            <div className="ganesh-ring ring-rotate absolute h-[500px] w-[500px] rounded-full border border-dashed border-orange-400/[0.12]" />

            {/* Ring 2 */}

            <div className="ganesh-ring ring-reverse absolute h-[600px] w-[600px] rounded-full border border-white/[0.04]">
              <div className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-[#FBBC04] shadow-[0_0_20px_rgba(251,188,4,.8)]" />

              <div className="absolute bottom-8 right-12 h-2 w-2 rounded-full bg-[#4285F4] shadow-[0_0_20px_rgba(66,133,244,.8)]" />

              <div className="absolute left-8 top-1/2 h-2 w-2 rounded-full bg-[#34A853] shadow-[0_0_20px_rgba(52,168,83,.8)]" />
            </div>

            {/* Ganesh Image */}

            <div className="relative z-10">
              <img
                ref={ganeshRef}
                src="/0c8989c4-e519-4b00-898a-38df4c3034c7.png"
                alt="Lord Ganesha"
                className="ganesh-image max-h-[78vh] w-auto max-w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,.75)]"
              />
            </div>

            {/* Date Card */}

            <div className="float-medium absolute bottom-[18%] left-[5%] z-20 rounded-xl border border-white/[0.08] bg-[#101318]/80 px-4 py-3 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-400">
                  <Sparkles size={14} />
                </div>

                <div>
                  <p className="text-[8px] uppercase tracking-widest text-zinc-600">
                    Mark the date
                  </p>

                  <p className="mt-1 text-xs font-semibold text-zinc-200">
                    SEPTEMBER 14
                  </p>
                </div>
              </div>
            </div>

            {/* Floating OM */}

            <div className="float-slow absolute right-[3%] top-[30%] z-20 flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/15 bg-orange-500/[0.04] text-xl text-orange-300/70">
              ॐ
            </div>

            {/* Floating Particles */}

            <div className="float-fast absolute left-[15%] top-[25%] h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_25px_rgba(253,224,71,1)]" />

            <div className="float-medium absolute bottom-[28%] right-[20%] h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_20px_rgba(251,146,60,.8)]" />

            <div className="float-slow absolute right-[12%] top-[55%] h-1 w-1 rounded-full bg-white shadow-[0_0_15px_white]" />
          </div>
        </section>

        {/* ================================================
            FOOTER
        ================================================= */}

        <footer className="flex min-h-[56px] shrink-0 items-center justify-between border-t border-white/[0.06]">
          <p className="footer-item text-[9px] text-zinc-700 sm:text-[10px]">
            © 2026 GDG Ranchi
          </p>

          <div className="footer-item flex items-center gap-3">
            <span className="text-[9px] text-zinc-600">
              Learn
            </span>

            <span className="h-1 w-1 rounded-full bg-[#4285F4]" />

            <span className="text-[9px] text-zinc-600">
              Build
            </span>

            <span className="h-1 w-1 rounded-full bg-[#34A853]" />

            <span className="text-[9px] text-zinc-600">
              Connect
            </span>
          </div>

          <a
            href="mailto:gdgranchi@gmail.com"
            className="footer-item flex items-center gap-1.5 text-[9px] text-zinc-700 transition hover:text-zinc-300"
          >
            <Mail size={11} />

            <span className="hidden sm:inline">
              Contact
            </span>
          </a>
        </footer>
      </div>
    </main>
  );
};

export default LaunchingSoon;