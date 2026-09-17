import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { showJoinCommunityModal } from "../../../../utils/communityAlert";

// Ultra-smooth GPU-accelerated stagger variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const, // Smooth cubic out curve
    },
  },
};

const googleColors = ["text-[#4285F4]", "text-[#EA4335]", "text-[#FBBC04]", "text-[#34A853]"];

// Repeating "GDG RANCHI" items with rotating Google accent colors
const marqueeItems = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  text: "GDG RANCHI",
  accentColor: googleColors[i % googleColors.length],
}));

const HeroSec = () => {
  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden bg-[#050505] text-white pt-24 sm:pt-28 lg:pt-32">
      {/* ================= BACKGROUND GRID & RADAR ================= */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Subtle Grid */}
        <div
          className="h-full w-full opacity-[0.06] transform-gpu"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.6) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            transform: "translateZ(0)",
          }}
        />

        {/* Ambient Subtle Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.5)_60%,_#050505_100%)] pointer-events-none" />

        {/* Big Center Radar Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[520px] sm:h-[520px] lg:w-[680px] lg:h-[680px] rounded-full border border-white/[0.08] pointer-events-none transform-gpu" />

        {/* Center Soundwave / Frequency Texture inside circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-1 sm:gap-1.5 opacity-[0.12] w-full max-w-[420px] sm:max-w-[560px] h-36 overflow-hidden pointer-events-none">
          {[
            18, 32, 24, 45, 60, 38, 75, 52, 90, 68, 100, 78, 115, 85, 120, 95, 110, 80, 105, 70,
            90, 60, 80, 48, 65, 40, 55, 30, 45, 20, 35, 15,
          ].map((height, i) => (
            <div
              key={i}
              className="w-1 bg-white rounded-full transition-all duration-700"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>

        {/* Floating Accent: Left Red Square */}
        <div className="absolute left-[8%] sm:left-[14%] lg:left-[18%] top-[32%] sm:top-[30%] w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#EA4335] rounded-[2px] shadow-[0_0_20px_rgba(234,67,53,0.8)] animate-pulse pointer-events-none" />

        {/* Floating Accent: Right Green Square */}
        <div className="absolute right-[8%] sm:right-[14%] lg:right-[18%] top-[32%] sm:top-[30%] w-3 h-3 sm:w-3.5 sm:h-3.5 bg-[#34A853] rounded-[2px] shadow-[0_0_20px_rgba(52,168,83,0.8)] animate-pulse pointer-events-none" />

        {/* Floating Right Angled Handwritten Annotation */}
        <div className="hidden lg:flex flex-col items-start absolute right-10 xl:right-20 top-[42%] -rotate-12 select-none pointer-events-none z-10">
          <span className="text-white/80 font-serif italic text-sm xl:text-base font-bold tracking-wide leading-tight drop-shadow-md">
            Same
          </span>
          <span className="text-white/80 font-serif italic text-sm xl:text-base font-bold tracking-wide leading-tight drop-shadow-md">
            People
          </span>
          <span className="text-white/80 font-serif italic text-sm xl:text-base font-bold tracking-wide leading-tight drop-shadow-md">
            Bigger
          </span>
          <span className="text-white font-serif italic text-sm xl:text-base font-bold tracking-wide leading-tight drop-shadow-md">
            Possibilities
          </span>
          <div className="h-[2px] w-full bg-[#EA4335] mt-1 rounded-full shadow-[0_0_10px_rgba(234,67,53,0.9)]" />
        </div>
      </div>

      {/* ================= CENTER CONTENT WITH GPU-ACCELERATED STAGGER ================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center my-auto transform-gpu"
        style={{ transform: "translateZ(0)" }}
      >
        {/* 1. Top Tag Pill */}
        <motion.div
          variants={itemVariants}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-1.5 backdrop-blur-md shadow-2xl transition-transform hover:scale-105 transform-gpu"
        >
          <span className="inline-flex items-center text-xs font-black tracking-tight">
            <span className="text-[#EA4335]">&lt;</span>
            <span className="text-[#FBBC04]">&gt;</span>
          </span>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-white/90">
            GDG RANCHI 2026
          </span>
        </motion.div>

        {/* 2. Main Headline */}
        <motion.h1
          variants={itemVariants}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          className="mt-5 sm:mt-7 font-black tracking-tight text-center leading-[0.92] select-none transform-gpu"
        >
          <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[112px] xl:text-[124px] bg-gradient-to-b from-white via-[#f0f0f5] to-[#a2a2b0] bg-clip-text text-transparent drop-shadow-[0_12px_32px_rgba(255,255,255,0.08)]">
            GDG
          </span>
          <span className="block text-6xl sm:text-8xl md:text-9xl lg:text-[112px] xl:text-[124px] bg-gradient-to-b from-white via-[#f0f0f5] to-[#a2a2b0] bg-clip-text text-transparent drop-shadow-[0_12px_32px_rgba(255,255,255,0.08)]">
            RANCHI
            <span className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 rounded-full bg-[#4285F4] ml-2 sm:ml-3 mb-1 sm:mb-2 align-baseline shadow-[0_0_24px_rgba(66,133,244,0.9)]" />
          </span>
        </motion.h1>

        {/* 3. Tagline */}
        <motion.div
          variants={itemVariants}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          className="mt-5 sm:mt-6 text-xs sm:text-sm md:text-base font-bold tracking-[0.28em] text-white/85 uppercase transform-gpu"
        >
          BUILD · LEARN · CONNECT · GROW
        </motion.div>

        {/* 4. Description */}
        <motion.p
          variants={itemVariants}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          className="mt-3.5 sm:mt-4 max-w-xl text-xs sm:text-sm md:text-[15px] leading-relaxed text-white/60 transform-gpu"
        >
          A thriving developer community in Ranchi, empowering students, professionals and creators
          to learn, build and grow together with Google technologies.
        </motion.p>

        {/* 5. Call to Action Buttons */}
        <motion.div
          variants={itemVariants}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 transform-gpu"
        >
          <button
            type="button"
            onClick={showJoinCommunityModal}
            className="rounded-full bg-[#FBBC04] hover:bg-[#f5b200] text-black font-bold px-6 sm:px-8 py-3 text-xs sm:text-sm inline-flex items-center gap-2 shadow-[0_0_25px_rgba(251,188,4,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Join Our Community</span>
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>

          <Link
            to="/events"
            className="rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/35 text-white font-semibold px-6 sm:px-7 py-3 text-xs sm:text-sm inline-flex items-center gap-2 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Explore Events</span>
            <ArrowDown size={15} strokeWidth={2} />
          </Link>
        </motion.div>
      </motion.div>

      {/* ================= BOTTOM HIGHLIGHTS MARQUEE & GOOGLE 4-COLOR STRIP ================= */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        className="relative z-10 w-full border-t border-white/10 bg-[#070709]/95 backdrop-blur-xl mt-8 sm:mt-12 transform-gpu"
      >
        <div className="relative w-full overflow-hidden py-4 sm:py-5 [mask-image:linear-gradient(to_right,transparent,black_48px,black_calc(100%-48px),transparent)]">
          {/* Subtle edge fades for smooth entry/exit */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-14 sm:w-24 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-24 bg-gradient-to-l from-[#050505] to-transparent z-10" />

          {/* Marquee ticker - continuous non-stop moving */}
          <div
            className="flex w-max animate-marquee-left pointer-events-none select-none hover:![animation-play-state:running]"
            style={{ "--marquee-duration": "26s" } as React.CSSProperties}
          >
            {/* Primary Track */}
            <div className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12">
              {marqueeItems.map((item) => (
                <div key={`m1-${item.id}`} className="flex items-center gap-8 sm:gap-12 shrink-0">
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-black tracking-[0.24em] uppercase text-white whitespace-nowrap drop-shadow-[0_2px_12px_rgba(255,255,255,0.08)]">
                    {item.text}
                  </span>
                  <span
                    className={`${item.accentColor} text-sm sm:text-base md:text-lg font-bold shrink-0 drop-shadow-[0_0_10px_currentColor]`}
                  >
                    ✦
                  </span>
                </div>
              ))}
            </div>

            {/* Cloned Track (for seamless infinite loop) */}
            <div
              className="flex shrink-0 items-center gap-8 sm:gap-12 pr-8 sm:pr-12"
              aria-hidden="true"
            >
              {marqueeItems.map((item) => (
                <div key={`m2-${item.id}`} className="flex items-center gap-8 sm:gap-12 shrink-0">
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-[26px] font-black tracking-[0.24em] uppercase text-white whitespace-nowrap drop-shadow-[0_2px_12px_rgba(255,255,255,0.08)]">
                    {item.text}
                  </span>
                  <span
                    className={`${item.accentColor} text-sm sm:text-base md:text-lg font-bold shrink-0 drop-shadow-[0_0_10px_currentColor]`}
                  >
                    ✦
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Google 4-Color Bottom Bar */}
        <div className="h-1.5 w-full grid grid-cols-4 shadow-[0_0_16px_rgba(66,133,244,0.35)]">
          <div className="bg-[#4285F4]" />
          <div className="bg-[#EA4335]" />
          <div className="bg-[#FBBC04]" />
          <div className="bg-[#34A853]" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSec;
