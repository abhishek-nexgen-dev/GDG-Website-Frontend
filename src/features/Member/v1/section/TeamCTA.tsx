import { ArrowRight, Heart } from "lucide-react";

export const TeamCTA = () => {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-[#4285F4]/30 bg-gradient-to-br from-[#111111] to-[#0A192F] p-8 md:p-12">
        {/* Abstract shapes in the background */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[60px]" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-green-500/10 blur-[60px]" />

        {/* Wavy line SVG */}
        <svg
          className="absolute inset-0 h-full w-full opacity-20"
          preserveAspectRatio="none"
          viewBox="0 0 1200 400"
        >
          <path
            d="M0 200 C300 100 600 300 1200 200 L1200 400 L0 400 Z"
            fill="url(#cta-gradient)"
          />
          <defs>
            <linearGradient id="cta-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4285F4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#34A853" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl">
              Want to be a part of the team?
            </h2>
            <p className="text-lg text-gray-400">
              We're always looking for passionate individuals to help us build, learn and grow together.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-bold text-white transition-transform hover:scale-105 hover:opacity-90 sm:w-auto">
              Apply Now <ArrowRight size={18} />
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-600 px-8 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/5 sm:w-auto">
              <Heart size={18} className="text-gray-400" /> Know More
            </button>
          </div>

          {/* Right hand-drawn text */}
          {/* <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 rotate-[-10deg] font-caveat text-xl text-green-400 lg:block">
            Build<br />Learn<br />Belong
          </div> */}

          {/* Orange Arrow Graphic */}
          {/* <div className="absolute right-32 top-[40%] hidden h-0 w-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-orange-500 rotate-[135deg] lg:block" /> */}
        </div>
      </div>
    </section>
  );
};
