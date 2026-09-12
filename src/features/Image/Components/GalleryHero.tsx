import { BsCalendarEventFill } from "react-icons/bs";
import { Sparkles, Image as ImageIcon } from "lucide-react";

const GalleryHero = () => {
  return (
    <section className="relative pt-28 sm:pt-36 pb-12 flex flex-col items-center justify-between gap-12 px-4 sm:px-8 md:flex-row md:px-12 lg:px-[8%] xl:px-[10%]">
      {/* Left Content */}
      <div className="relative z-10 max-w-3xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wider text-gray-300 backdrop-blur">
          <Sparkles size={14} className="text-[#FBBC04]" />
          COMMUNITY MEMORIES & GALLERY
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight leading-tight sm:text-5xl lg:text-6xl text-white">
          Every Picture Tells
          <br />
          <span className="bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent">
            a Story of Innovation
          </span>
        </h1>

        {/* Gradient Line */}
        <div className="mt-6 h-1 w-48 rounded-full bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#34A853]" />

        <p className="mt-6 sm:mt-8 text-base leading-relaxed text-gray-300 sm:text-lg">
          Every event tells a story of learning, collaboration, and innovation. Explore highlights
          from our workshops, hackathons, tech talks, and community meetups where ideas became
          projects, strangers became teammates, and every moment inspired the next generation of
          developers.
        </p>

        {/* Stats row */}
        <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0e0e12] px-5 py-4 shadow-xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4285F4]/15 text-[#4285F4]">
              <ImageIcon size={24} />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">1,200+</p>
              <p className="text-xs sm:text-sm font-medium text-gray-400">Captured Photos</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0e0e12] px-5 py-4 shadow-xl">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#34A853]/15 text-[#34A853]">
              <BsCalendarEventFill size={22} />
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white">10+</p>
              <p className="text-xs sm:text-sm font-medium text-gray-400">Events Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Visual */}
      <div className="relative z-10 flex items-center justify-center shrink-0">
        {/* Glow Behind Image */}
        <div className="absolute h-72 w-72 sm:h-80 sm:w-80 rounded-full bg-gradient-to-r from-[#EA4335]/25 via-[#FBBC04]/20 to-[#34A853]/25 blur-[90px]" />

        {/* Decorative Circles */}
        <div className="absolute -left-4 top-8 h-4 w-4 rounded-full bg-[#EA4335]" />
        <div className="absolute -right-2 top-16 h-3 w-3 rounded-full bg-[#FBBC04]" />
        <div className="absolute bottom-8 -left-4 h-5 w-5 rounded-full bg-[#34A853]" />

        <img
          src="/solar_gallery-bold.png"
          alt="Gallery Visual"
          className="relative z-10 w-[260px] sm:w-[320px] lg:w-[380px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-transform duration-500 hover:scale-105"
        />
      </div>
    </section>
  );
};

export default GalleryHero;
