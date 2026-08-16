import EventCard from "../Components/EventCard";
import { ArrowUpRight, Sparkles } from "lucide-react";
import SingleEventCard from "../Components/SingleEventCard";


export const PastEvents_Constant = [
  {
    id: 1,
    title: "GDG Ranchi Hackathon",
    category: "Hackathon",
    description:
      "Build, collaborate, and create something meaningful with developers and innovators from across Jharkhand.",
    date: "Aug 15 – Aug 17, 2026",
    time: "10:00 AM onwards",
    location: "Ranchi, Jharkhand",
    registrationStatus: "Past",
    image:
      "https://res.cloudinary.com/startup-grind/image/upload/c_scale,w_2560/c_crop,h_640,w_2560,y_0.0_mul_h_sub_0.0_mul_640/c_crop,h_640,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/event_banners/blob_6oW5Nxm",
  },

  {
    id: 2,
    title: "Google I/O Extended Ranchi",
    category: "Tech Meetup",
    description:
      "Explore the latest innovations from Google I/O, connect with developers, and discover what's next in technology.",
    date: "Sep 12, 2026",
    time: "11:00 AM onwards",
    location: "Ranchi, Jharkhand",
    registrationStatus: "Past",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
  },

  {
    id: 3,
    title: "AI & Gemini Developer Workshop",
    category: "Workshop",
    description:
      "Learn how to build intelligent applications using Gemini APIs, generative AI, and modern developer tools.",
    date: "Sep 26, 2026",
    time: "10:00 AM onwards",
    location: "Ranchi, Jharkhand",
    registrationStatus: "Past",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80",
  },

  {
    id: 4,
    title: "Open Source Community Meetup",
    category: "Community",
    description:
      "Meet open-source contributors, learn how to contribute to real projects, and collaborate with the community.",
    date: "Oct 10, 2026",
    time: "2:00 PM onwards",
    location: "Ranchi, Jharkhand",
    registrationStatus: "Past",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80",
  },

  {
    id: 5,
    title: "Web Development Bootcamp",
    category: "Bootcamp",
    description:
      "A hands-on session covering modern frontend development, React, APIs, and building production-ready applications.",
    date: "Oct 24 – Oct 25, 2026",
    time: "9:30 AM onwards",
    location: "Ranchi, Jharkhand",
    registrationStatus: "Past",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  },

  {
    id: 6,
    title: "DevFest Ranchi 2026",
    category: "Conference",
    description:
      "A developer-focused conference featuring technical sessions, community networking, workshops, and inspiring talks.",
    date: "Nov 21, 2026",
    time: "9:00 AM onwards",
    location: "Ranchi, Jharkhand",
    registrationStatus: "Past",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1600&q=80",
  },
];

const PastEvents = () => {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-5 py-20 sm:px-8 sm:py-24 md:px-12 lg:px-[8%] lg:py-[12vh] xl:px-[10%]">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-[#4285F4]/[0.035] blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#34A853]/[0.035] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[2.8rem] font-black leading-[0.92] tracking-[-0.055em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              PAST EVENTS
              <br />
              <span className="bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#FBBC04] bg-clip-text text-transparent">
                Explore what we've hosted.
              </span>
            </h2>
          </div>

          <div className="flex max-w-md flex-col gap-5 lg:items-end lg:text-right">
            <button
              type="button"
              className="group flex w-fit items-center gap-2 text-xs font-semibold text-white/55 transition-colors hover:text-white"
            >
              Explore all events
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.08]">
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-gradient-to-r from-white/10 via-white/[0.05] to-transparent lg:mt-12" />


        

        <div className="w-full h-full flex flex-col gap-[7vh] ">

           {PastEvents_Constant.map((el)=>{
              return (
                    <SingleEventCard
          title={el.title}
          category={el.category}
          description={el.description}
          date={el.date}
          time={el.time}
          location={el.location}
          registrationStatus={el.registrationStatus}
          image={el.image}
        />

              ) 
           })}
        </div>

        {/* Event Cards */}
        {/* <div className="mt-8 grid grid-cols-1 gap-[10vh] sm:grid-cols-2 lg:mt-10">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />

        </div> */}
      </div>
    </section>
  );
};

export default PastEvents;
