import BorderGlow from "../../../../Components/BorderGlow";

const EventCard = () => {
  // Mock data - replace with real props later
  const eventData = {
    title: "GDG Ranchi Hackathon 2026",
    description:
      "Join a vibrant community of developers to build real-world projects using Google technologies. Workshops, networking, and prizes await!",
    date: "Aug 15 - Aug 17, 2026",
    time: "10:00 AM IST",
    status: "open", // 'open' or 'closed'
    tags: ["AI/ML", "Web Dev", "Open Source"],
    image:
      "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_6oW5Nxm",
  };

  const isRegistrationOpen = eventData.status === "open";

  return (
    <BorderGlow
      edgeSensitivity={30}
      //   glowColor="255 255 255"
      backgroundColor="#121212"
      borderRadius={28}
      glowRadius={40}
      glowIntensity={1.5}
      coneSpread={25}
      animated={true}
      colors={["#c084fc", "#f472b6", "#38bdf8"]}
      className="flex flex-col w-[90%] h-[60vh] relative overflow-hidden group mb-[4vh]"
    >
      <div className="h-[60%] w-full relative">
        <img src={eventData.image} alt={eventData.title} className="h-full w-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#121212]" />

        <div
          className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg backdrop-blur-md border border-white/10
          ${isRegistrationOpen ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}
        `}
        >
          {isRegistrationOpen ? "Registration Open" : "Closed"}
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between relative z-10">
        {/* Title & Tags */}
        <div className="flex flex-col h-full">
          <div>
            <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
              {eventData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 text-[10px] sm:text-xs font-medium text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 rounded-md backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h2 className="text-xl sm:text-2xl md:text-2xl  font-bold text-white leading-tight mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-300">
              {eventData.title}
            </h2>

            <p className="text-gray-400 text-xs sm:text-sm md:text-lg line-clamp-2 sm:line-clamp-3 leading-relaxed">
              {eventData.description}
            </p>
          </div>

          {/* Date & Action */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-xs md:text-[0.8vw] text-gray-500 uppercase tracking-wider">
                Date
              </span>
              <span className="text-sm md:text-[1vw] font-semibold text-white">
                {eventData.date}
              </span>
            </div>

            <button className="w-full sm:w-auto px-5 py-2 bg-white text-black font-semibold rounded-lg text-sm md:text-[0.8vw] hover:bg-cyan-50 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Know More
            </button>
          </div>
        </div>
      </div>
    </BorderGlow>
  );
};

export default EventCard;
