import SingleEventCard from "../Components/SingleEventCard";

const UpcomingEvent = () => {
  const event = {
    title: "GDG Ranchi Hackathon 2026",
    category: "Hackathon",
    description:
      "Build, collaborate, and create something meaningful with developers and innovators from across Jharkhand.",
    date: "Aug 15 – Aug 17, 2026",
    time: "10:00 AM onwards",
    location: "Ranchi, Jharkhand",
    image: "/event.jpg",
  };

  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 md:px-12 lg:px-[8%] lg:py-[10vh] xl:px-[10%]">
      <div className="absolute left-[-100px] top-[-10px] h-80 w-80 rounded-full bg-amber-700/30 blur-[80px]" />

      <div className="absolute right-[-100px] bottom-0 h-80 w-80 rounded-full bg-emerald-600/30 blur-[80px]" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-[3vh] flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34A853] shadow-[0_0_10px_#34A853]" />

              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#34A853] sm:text-xs">
                What's happening next
              </p>
            </div>

            <h2 className="text-4xl font-black leading-none tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-[#EA4335] via-[#FBBC04] to-[#4285F4] bg-clip-text text-transparent">
                Event
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-white/35 sm:text-base">
            The next opportunity to learn, build, connect, and grow with the GDG Ranchi community.
          </p>
        </div>

        <SingleEventCard
          title={event.title}
          category="Hackathon"
          description="Build, collaborate, and create something meaningful with developers and innovators from across Jharkhand."
          date="Aug 15 – Aug 17, 2026"
          time="10:00 AM onwards"
          location="Ranchi, Jharkhand"
          registrationStatus="15-17 Aug"
          image="https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_6oW5Nxm"
        />
      </div>
    </section>
  );
};

export default UpcomingEvent;
