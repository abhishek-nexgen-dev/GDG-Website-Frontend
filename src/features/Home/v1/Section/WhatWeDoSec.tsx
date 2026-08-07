const WhatWeDoSec = () => {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-28">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-40 h-96 w-96 rounded-full bg-[#EA4335]/10 blur-[140px]" />
        <div className="absolute right-0 top-32 h-96 w-96 rounded-full bg-[#34A853]/10 blur-[140px]" />
        <div className="absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#4285F4]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur">
            ✦ WHAT WE DO
          </span>
        </div>

        {/* Heading */}
        <h2 className="mt-8 text-center text-5xl font-black leading-none text-white sm:text-6xl lg:text-7xl">
          What{" "}
          <span className="bg-gradient-to-r from-[#EA4335] via-[#FBBC04] via-[#34A853] to-[#4285F4] bg-clip-text text-transparent">
            We Do
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-9 text-gray-400">
          We create opportunities for developers to <span className="text-white">learn</span>,
          <span className="text-white"> build</span>,<span className="text-white"> connect</span>,
          and
          <span className="text-white"> grow</span>. Through workshops, hackathons, study jams,
          networking events, and real-world projects, GDG Ranchi empowers students and professionals
          to innovate with modern Google technologies.
        </p>
      </div>

      <div className="h-screen"></div>
    </section>
  );
};

export default WhatWeDoSec;
