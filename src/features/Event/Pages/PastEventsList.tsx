import { ArrowRight, Clock, Calendar, MapPin } from "lucide-react";

const pastEvents = [
  {
    id: 1,
    title: "Build with Gemini",
    tag: "TECH TALK",
    date: "14 Sept 2025",
    location: "Ranchi",
    desc: "Exploring the power of Gemini for developers.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
    color: "#4285F4"
  },
  {
    id: 2,
    title: "Flutter Fest Ranchi",
    tag: "WORKSHOP",
    date: "22 Aug 2025",
    location: "Ranchi",
    desc: "Hands-on Flutter workshop for all skill levels.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    color: "#34A853"
  },
  {
    id: 3,
    title: "Web Dev Bootcamp",
    tag: "BOOTCAMP",
    date: "12 July 2025",
    location: "Online",
    desc: "A 3-day intensive on modern web development.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
    color: "#a142f4"
  },
  {
    id: 4,
    title: "Google I/O Extended 2025",
    tag: "I/O EXTENDED",
    date: "18 May 2025",
    location: "Ranchi",
    desc: "Live stream, discussions and community sessions from Google I/O.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80",
    color: "#4285F4"
  },
  {
    id: 5,
    title: "Career in Tech",
    tag: "PANEL DISCUSSION",
    date: "10 Feb 2025",
    location: "Ranchi",
    desc: "Panel with industry experts on career paths in tech.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
    color: "#34A853"
  },
  {
    id: 6,
    title: "DevFest Ranchi 2024",
    tag: "DEVFEST",
    date: "21 Dec 2024",
    location: "Ranchi",
    desc: "A full-day celebration of developers, learning and innovation.",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=600&q=80",
    color: "#a142f4"
  }
];

export const PastEventsList = ({ searchQuery = "" }: { searchQuery?: string }) => {
  const filteredEvents = pastEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    event.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredEvents.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-white" size={24} />
            <h2 className="text-3xl font-bold text-white tracking-tight">Past Events</h2>
          </div>
          <p className="text-zinc-400 text-sm">Relive the moments. Explore what we've built together.</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#4285F4] hover:text-[#1a73e8] transition">
          View All Past Events <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="group relative overflow-hidden rounded-2xl bg-[#0a0a0c] border border-white/10 transition-all hover:border-white/20">
            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden border-b border-white/10">
               <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
            </div>

            {/* Content Container */}
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-bold text-white">{event.title}</h3>
                <span className="inline-block rounded-full px-2 py-0.5 text-[9px] font-bold tracking-wider" style={{ backgroundColor: `${event.color}20`, color: event.color }}>
                  {event.tag}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin size={13} />
                  <span>{event.location}</span>
                </div>
              </div>

              <p className="text-sm text-zinc-400 line-clamp-2">
                {event.desc}
              </p>

              {/* Arrow Button */}
              <div className="absolute right-5 bottom-5">
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-transparent text-white transition group-hover:bg-white/10">
                  <ArrowRight size={14} className="-rotate-45" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
