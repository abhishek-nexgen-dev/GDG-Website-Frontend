import { motion, useMotionValue, useTransform } from "framer-motion";
import { Users } from "lucide-react";
import React from "react";

const images = [
  "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=800&auto=format",
  "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format",
  "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format",
];

const HeroSec = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const shiftX1 = useTransform(mouseX, [-1000, 1000], [-15, 15]);
  const shiftY1 = useTransform(mouseY, [-1000, 1000], [-15, 15]);

  const shiftX2 = useTransform(mouseX, [-1000, 1000], [25, -25]);
  const shiftY2 = useTransform(mouseY, [-1000, 1000], [25, -25]);

  const shiftX3 = useTransform(mouseX, [-1000, 1000], [-30, 30]);
  const shiftY3 = useTransform(mouseY, [-1000, 1000], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-[#050505]"
      onMouseMove={handleMouseMove}
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] top-0 h-[500px] w-[500px] rounded-full bg-[#4285F4]/10 blur-[150px]" />
        <div className="absolute -right-[10%] bottom-0 h-[600px] w-[600px] rounded-full bg-[#FBBC04]/10 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row lg:px-12">
        {/* Left Content */}
        <div className="w-full max-w-xl lg:w-1/2">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0A0A0C] px-4 py-2 text-sm font-semibold text-white/70 shadow-lg">
            <span className="text-[#34A853]">+</span> Google Developer Groups Ranchi
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Build. Learn. Connect.<br />
            <span className="bg-gradient-to-r from-[#4285F4] to-[#FBBC04] bg-clip-text text-transparent">
              Grow Together.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
            Join Ranchi's most vibrant developer community. Learn from Google technologies, connect
            with fellow developers, and build projects that matter.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-xl bg-[#D6FF38] px-8 py-3.5 font-bold text-black transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(214,255,56,0.3)]">
              Join Community
            </button>
            <button className="rounded-xl border border-white/15 bg-transparent px-8 py-3.5 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5">
              Explore Events
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div>
              <div className="text-4xl font-black text-[#4285F4]">800<span className="text-[#4285F4]/70">+</span></div>
              <div className="mt-2 text-sm font-medium tracking-wide text-white/50 uppercase">Members</div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#EA4335]">25<span className="text-[#EA4335]/70">+</span></div>
              <div className="mt-2 text-sm font-medium tracking-wide text-white/50 uppercase">Events</div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#FBBC04]">15<span className="text-[#FBBC04]/70">+</span></div>
              <div className="mt-2 text-sm font-medium tracking-wide text-white/50 uppercase">Communities</div>
            </div>
            <div>
              <div className="text-4xl font-black text-[#34A853]">4<span className="text-[#34A853]/70">+</span></div>
              <div className="mt-2 text-sm font-medium tracking-wide text-white/50 uppercase">Projects</div>
            </div>
          </div>
        </div>

        {/* Right Composition (Parallax Collage) */}
        <div className="relative mt-10 hidden w-full flex-1 items-center justify-center lg:mt-0 lg:flex h-[600px]">
          {/* Image 1 (Back Left) */}
          <motion.div
            style={{ x: shiftX1, y: shiftY1 }}
            className="absolute left-0 top-10 h-[300px] w-[240px] -rotate-6 overflow-hidden rounded-3xl border-[4px] border-[#0A0A0C] shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-105 hover:z-50"
          >
            <img src={images[0]} alt="Event 1" className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>

          {/* Image 2 (Front Center) */}
          <motion.div
            style={{ x: shiftX2, y: shiftY2 }}
            className="absolute z-20 h-[380px] w-[280px] rotate-3 overflow-hidden rounded-3xl border-[4px] border-[#0A0A0C] shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:rotate-0 hover:scale-105 hover:z-50"
          >
            <img src={images[1]} alt="Event 2" className="h-full w-full object-cover grayscale opacity-90 transition-all duration-500 hover:grayscale-0 hover:opacity-100" />
          </motion.div>

          {/* Image 3 (Bottom Right) */}
          <motion.div
            style={{ x: shiftX3, y: shiftY3 }}
            className="absolute bottom-10 right-4 z-10 h-[260px] w-[220px] -rotate-3 overflow-hidden rounded-3xl border-[4px] border-[#0A0A0C] shadow-2xl transition-transform duration-500 hover:rotate-0 hover:scale-105 hover:z-50"
          >
            <img src={images[2]} alt="Event 3" className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0" />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>

          {/* Floating Action Button */}
          <motion.button
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute bottom-20 right-0 z-30 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#D6FF38] text-black shadow-[0_0_30px_rgba(214,255,56,0.3)] transition-transform hover:scale-110"
          >
            <Users size={24} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default HeroSec;
