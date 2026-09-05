import { BsCalendarEventFill } from "react-icons/bs";

const GalleryHero = () => {
  return (
    <section className="relative mt-[7vh] flex min-h-[70vh] flex-col items-center justify-between gap-12 px-6 py-16 sm:px-10 md:flex-row md:px-16 lg:px-[8%] lg:py-20 xl:px-[10%]">
      {/* Left Content */}
      <div className="relative z-10 max-w-3xl">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm tracking-wider text-gray-300 backdrop-blur">
          📸 Gallery
        </span>

        <h2 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Every Picture Tells
          <br />
          <span className="bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#34A853] bg-clip-text text-transparent">
            a Story of Innovation
          </span>
        </h2>

        {/* Gradient Line */}
        <div className="mt-6 h-1 w-48 rounded-full bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#34A853]" />

        <p className="mt-8 text-base leading-8 text-gray-400 sm:text-lg">
          Every event tells a story of learning, collaboration, and innovation. Explore highlights
          from our workshops, hackathons, tech talks, and community meetups where ideas became
          projects, strangers became teammates, and every moment inspired the next generation of
          developers.
        </p>

        <div className="mt-[3.5vh] w-full flex gap-[2vw] h-[12vh]">
          <div className="flex items-center gap-5 bg-[#100F0F] w-[38%]  rounded-xl p-[1.5vw]">
            <div className="h-fit w-1/5">
              <img
                src="/solar_gallery-bold.png"
                alt="Gallery"
                className="relative z-10 w-[320px] transition-transform duration-500 hover:scale-105 lg:w-full"
              />
            </div>
            <div className=" ">
              <p className="text-[3.8vh] font-extrabold">1200+</p>
              <p className="text-[2vh]">Photos</p>
            </div>
          </div>

          <div className="flex items-center gap-5 bg-[#100F0F]  w-[38%] rounded-xl p-[1.5vw]">
            <div className="h-fit w-1/5">
              <BsCalendarEventFill className="relative z-10 transition-transform duration-500 hover:scale-105 text-[2vw]" />
            </div>
            <div className="">
              <p className="text-[3.8vh] font-extrabold ">10+</p>
              <p className="text-[2vh] ">Events Cover</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="hidden relative z-10 md:flex items-center justify-center">
        {/* Glow Behind Image */}
        <div className="absolute h-80 w-80 rounded-full bg-gradient-to-r from-[#EA4335]/30 via-[#FBBC04]/20 to-[#34A853]/30 blur-[100px]" />

        {/* Decorative Circles */}
        <div className="absolute -left-6 top-8 h-5 w-5 rounded-full bg-[#EA4335]" />
        <div className="absolute -right-4 top-20 h-3 w-3 rounded-full bg-[#FBBC04]" />
        <div className="absolute bottom-10 -left-8 h-6 w-6 rounded-full bg-[#34A853]" />

        <img
          src="/solar_gallery-bold.png"
          alt="Gallery"
          className="relative z-10 w-[320px] transition-transform duration-500 hover:scale-105 lg:w-[420px]"
        />
      </div>
    </section>
  );
};

export default GalleryHero;
