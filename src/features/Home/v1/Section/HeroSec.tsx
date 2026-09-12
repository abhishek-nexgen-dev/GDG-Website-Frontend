import { motion, useMotionValue, useTransform } from "framer-motion";
import { Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { showJoinCommunityModal } from "../../../../utils/communityAlert";

const images = [
  "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=800&auto=format",
  "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format",
];

const HeroSec = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const shiftX1 = useTransform(mouseX, [-1000, 1000], [-15, 15]);
  const shiftY1 = useTransform(mouseY, [-1000, 1000], [-15, 15]);

  const shiftX2 = useTransform(mouseX, [-1000, 1000], [25, -25]);
  const shiftY2 = useTransform(mouseY, [-1000, 1000], [25, -25]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  return (
    <section
      className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[#050505] pt-28 pb-16 lg:py-0"
      onMouseMove={handleMouseMove}
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] top-0 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-[#4285F4]/10 blur-[150px]" />
        <div className="absolute -right-[10%] bottom-0 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full bg-[#FBBC04]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 sm:gap-16 px-4 sm:px-6 lg:flex-row lg:px-12">
        {/* Left Content */}
        <div className="w-full max-w-xl lg:w-1/2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0A0A0C] px-4 py-2 text-xs sm:text-sm font-semibold text-white/70 shadow-lg">
            <span className="text-[#34A853]">+</span> Google Developer Groups Ranchi
          </div>

          <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight text-white lg:text-7xl">
            Build. Learn. Connect.
            <br />
            <span className="text-primary">Grow Together.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed text-white/60">
            Join Ranchi's most vibrant developer community. Learn from Google technologies, connect
            with fellow developers, and build projects that matter.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
            <button
              onClick={showJoinCommunityModal}
              className="relative overflow-hidden rounded-xl bg-[#4285F4] px-6 sm:px-8 py-3 sm:py-3.5 font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-[#3367d6] hover:shadow-[0_0_40px_rgba(66,133,244,0.4)] group"
            >
              <span className="relative z-10 text-sm sm:text-base">Join Community</span>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-all duration-1000 group-hover:translate-x-full" />
            </button>
            <Link
              to="/events"
              className="rounded-xl border border-white/10 bg-white/5 px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:shadow-lg"
            >
              Explore Events
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-4">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#4285F4]">
                800<span className="text-[#4285F4]/70">+</span>
              </div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium tracking-wide text-white/50 uppercase">
                Members
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#EA4335]">
                25<span className="text-[#EA4335]/70">+</span>
              </div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium tracking-wide text-white/50 uppercase">
                Events
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#FBBC04]">
                15<span className="text-[#FBBC04]/70">+</span>
              </div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium tracking-wide text-white/50 uppercase">
                Communities
              </div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#34A853]">
                4<span className="text-[#34A853]/70">+</span>
              </div>
              <div className="mt-1 sm:mt-2 text-xs sm:text-sm font-medium tracking-wide text-white/50 uppercase">
                Projects
              </div>
            </div>
          </div>
        </div>

        {/* Right Composition (Parallax Collage) */}
        <div className="relative mt-12 w-full flex-1 items-center justify-center lg:mt-0 flex h-[400px] sm:h-[500px] lg:h-[600px]">
          {/* Image 1 (Back Left) */}
          <motion.div
            style={{ x: shiftX1, y: shiftY1 }}
            className="absolute left-[5%] lg:left-0 top-0 lg:top-10 h-[220px] w-[180px] sm:h-[260px] sm:w-[200px] lg:h-[300px] lg:w-[240px] -rotate-6 overflow-hidden rounded-2xl lg:rounded-3xl border-[3px] lg:border-[4px] border-[#0A0A0C] shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-105 hover:z-50"
          >
            <img
              src={images[0]}
              alt="Event 1"
              className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          {/* Image 2 (Front Center) */}
          <motion.div
            style={{ x: shiftX2, y: shiftY2 }}
            className="absolute z-20 left-[25%] lg:left-auto lg:right-10 top-[20%] lg:top-[15%] h-[260px] w-[200px] sm:h-[320px] sm:w-[240px] lg:h-[380px] lg:w-[280px] rotate-3 overflow-hidden rounded-2xl lg:rounded-3xl border-[3px] lg:border-[4px] border-[#0A0A0C] shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:rotate-0 hover:scale-105 hover:z-50"
          >
            <img
              src={images[1]}
              alt="Event 2"
              className="h-full w-full object-cover grayscale opacity-90 transition-all duration-500 hover:grayscale-0 hover:opacity-100"
            />
          </motion.div>

          {/* Floating Action Button */}
          <motion.button
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute bottom-10 right-[5%] lg:bottom-20 lg:right-0 z-30 flex h-14 w-14 sm:h-16 sm:w-16 lg:h-16 lg:w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-[0_0_30px_rgba(26,115,232,0.3)] transition-transform hover:scale-110"
          >
            <Users size={24} strokeWidth={2.5} className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroSec;
