
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import BorderGlow from "../../../../Components/BorderGlow";

const EventCard = () => {
  const eventData = {
    title: "GDG Ranchi Hackathon 2026",
    description:
      "Join a vibrant community of developers to build real-world projects using Google technologies. Workshops, networking, mentorship, and exciting prizes await.",
    image:
      "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_6oW5Nxm",
    category: "Hackathon",
    tags: ["Google Technologies", "AI", "Web Development"],
    registrationStart: "Aug 01, 2026",
    registrationEnd: "Aug 14, 2026",
    eventDate: "Aug 15 – Aug 17, 2026",
  };

  return (
    <div className="group relative w-[90%]">
      <BorderGlow />

      <article className="relative overflow-hidden rounded-[24px] border border-white/[0.09] bg-white/[0.025] backdrop-blur-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:border-white/[0.16] group-hover:bg-white/[0.035]">
        {/* Image */}
        <div className="relative h-[250px] w-full overflow-hidden sm:h-[270px]">
          <img
            src={eventData.image}
            alt={eventData.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/10 to-transparent" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5">
            <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
              {eventData.category}
            </span>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/70 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight
                size={17}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#34A853]">
              Upcoming Event
            </p>

            <h2 className="max-w-[90%] text-2xl font-bold leading-tight tracking-[-0.025em] text-white sm:text-[27px]">
              {eventData.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <p className="line-clamp-3 text-sm leading-6 text-white/45">{eventData.description}</p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {eventData.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-[10px] font-medium text-white/45 transition-colors group-hover:text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Event information */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/[0.07] pt-5">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-white/30">
                <CalendarDays size={14} strokeWidth={1.7} />

                <span className="text-[9px] font-medium uppercase tracking-[0.16em]">
                  Event Date
                </span>
              </div>

              <p className="truncate text-xs font-medium text-white/70">{eventData.eventDate}</p>
            </div>

            <div className="min-w-0 border-l border-white/[0.07] pl-3">
              <div className="mb-2 flex items-center gap-2 text-white/30">
                <Clock3 size={14} strokeWidth={1.7} />

                <span className="text-[9px] font-medium uppercase tracking-[0.16em]">
                  Registration
                </span>
              </div>

              <p className="truncate text-xs font-medium text-white/70">
                {eventData.registrationStart}
              </p>

              <p className="mt-0.5 text-[10px] text-white/30">until {eventData.registrationEnd}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34A853] shadow-[0_0_8px_rgba(52,168,83,0.7)]" />

              <span className="text-[10px] text-white/35">Registration open</span>
            </div>

            <button
              type="button"
              className="flex items-center gap-2 text-xs font-semibold text-white/70 transition-colors hover:text-white"
            >
              View event
              <ArrowUpRight
                size={14}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default EventCard;
