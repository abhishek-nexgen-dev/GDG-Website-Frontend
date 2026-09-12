import { ArrowRight, Calendar, MapPin, Sparkles, Cloud, Users } from "lucide-react";

interface UpcomingEvent {
  id: string;
  title: string;
  tag: string;
  date: string;
  time: string;
  location: string;
  description: string;
  theme: "green" | "blue" | "purple";
  image: string;
}

const upcomingEvents: UpcomingEvent[] = [
  {
    id: "ai-bharat",
    title: "AI for Bharat",
    tag: "WORKSHOP",
    date: "12 Oct 2025",
    time: "10:00 AM – 1:00 PM",
    location: "Ranchi (Venue TBA)",
    description: "Hands-on session on building AI-powered solutions for real-world problems.",
    theme: "green",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "cloud-jam",
    title: "Cloud Study Jam",
    tag: "STUDY JAM",
    date: "26 Oct 2025",
    time: "11:00 AM – 4:00 PM",
    location: "Online",
    description: "Learn, practice and get Google Cloud certified together.",
    theme: "blue",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "women-tech",
    title: "Women in Tech Panel",
    tag: "PANEL DISCUSSION",
    date: "08 Nov 2025",
    time: "4:00 PM – 6:00 PM",
    location: "Ranchi (Venue TBA)",
    description: "Inspiring stories, real conversations, and opportunities in tech.",
    theme: "purple",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80",
  },
];

const ThemeConfig = {
  green: {
    bg: "bg-[#0c1f14]",
    border: "border-[#34A853]/20",
    hoverBorder: "hover:border-[#34A853]/50",
    gradient: "from-[#0c1f14] via-[#0c1f14]/90 to-[#0c1f14]/30",
    iconColor: "text-[#34A853]",
    tagBg: "bg-[#34A853]/20",
    tagText: "text-[#34A853]",
    icon: Sparkles,
    btnBorder: "border-[#34A853]/30",
    btnBg: "bg-[#34A853]/10",
    btnHoverBg: "group-hover:bg-[#34A853]",
    btnHoverBorder: "group-hover:border-[#34A853]",
  },
  blue: {
    bg: "bg-[#0c1626]",
    border: "border-[#4285F4]/20",
    hoverBorder: "hover:border-[#4285F4]/50",
    gradient: "from-[#0c1626] via-[#0c1626]/90 to-[#0c1626]/30",
    iconColor: "text-[#4285F4]",
    tagBg: "bg-[#4285F4]/20",
    tagText: "text-[#4285F4]",
    icon: Cloud,
    btnBorder: "border-[#4285F4]/30",
    btnBg: "bg-[#4285F4]/10",
    btnHoverBg: "group-hover:bg-[#4285F4]",
    btnHoverBorder: "group-hover:border-[#4285F4]",
  },
  purple: {
    bg: "bg-[#1a0f2e]",
    border: "border-[#a142f4]/20",
    hoverBorder: "hover:border-[#a142f4]/50",
    gradient: "from-[#1a0f2e] via-[#1a0f2e]/90 to-[#1a0f2e]/30",
    iconColor: "text-[#a142f4]",
    tagBg: "bg-[#a142f4]/20",
    tagText: "text-[#a142f4]",
    icon: Users,
    btnBorder: "border-[#a142f4]/30",
    btnBg: "bg-[#a142f4]/10",
    btnHoverBg: "group-hover:bg-[#a142f4]",
    btnHoverBorder: "group-hover:border-[#a142f4]",
  }
};

export const UpcomingEventsList = ({ searchQuery = "" }: { searchQuery?: string }) => {
  const filteredEvents = upcomingEvents.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    event.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredEvents.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-white" size={24} />
            <h2 className="text-3xl font-bold text-white tracking-tight">Upcoming Events</h2>
          </div>
          <p className="text-zinc-400 text-sm">Be the first to join. Save the date and don't miss out!</p>
        </div>
        <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#4285F4] hover:text-[#1a73e8] transition">
          View All Upcoming <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const theme = ThemeConfig[event.theme];
          const Icon = theme.icon;
          
          return (
            <div key={event.id} className={`group relative overflow-hidden rounded-[24px] border ${theme.border} p-6 transition ${theme.hoverBorder} min-h-[380px] flex flex-col justify-end`}>
              {/* Background Image & Overlay */}
              <img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-105" />
              <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient}`} />
              
              <div className="absolute -top-10 -right-10 opacity-20 transition group-hover:scale-110 group-hover:opacity-40 z-0">
                <Icon size={160} className={theme.iconColor} />
              </div>
              
              <div className="relative z-10 mt-auto">
                <span className={`inline-block rounded-md ${theme.tagBg} px-2 py-1 text-[10px] font-bold tracking-wider ${theme.tagText} mb-3`}>
                  {event.tag}
                </span>
                <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>

                <div className="flex flex-col gap-2 text-xs text-zinc-300 mb-6 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className={theme.iconColor} />
                    <span>{event.date}</span>
                    <span className="w-px h-3 bg-zinc-600 mx-1"></span>
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className={theme.iconColor} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-zinc-400 mb-6 line-clamp-2">
                  {event.description}
                </p>

                <div className={`flex justify-between items-center border-t ${theme.border} pt-4`}>
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">Upcoming</span>
                  <button className={`flex h-10 w-10 items-center justify-center rounded-full border ${theme.btnBorder} ${theme.btnBg} text-white transition ${theme.btnHoverBg} ${theme.btnHoverBorder}`}>
                    <ArrowRight size={18} className="-rotate-45" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
