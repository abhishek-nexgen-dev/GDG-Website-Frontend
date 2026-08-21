import { Users, CalendarDays, Shield, Award, XCircle } from "lucide-react";
import type { EventStats } from "../data/events.data";

interface EventStatsCardsProps {
  stats: EventStats;
}

const EventStatsCards = ({ stats }: EventStatsCardsProps) => {
  const cards = [
    {
      title: "Total Events",
      value: stats.totalEvents.value,
      subtitle: stats.totalEvents.trend,
      subtitleColor: "text-[#22c55e]",
      icon: Users,
      badgeStyle: "bg-[#143321] text-[#22c55e] border border-[#1c472d]",
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents.value,
      subtitle: stats.upcomingEvents.label,
      subtitleColor: "text-[#60a5fa]",
      icon: CalendarDays,
      badgeStyle: "bg-[#122844] text-[#3b82f6] border border-[#193961]",
    },
    {
      title: "Ongoing Events",
      value: stats.ongoingEvents.value,
      subtitle: stats.ongoingEvents.label,
      subtitleColor: "text-[#c084fc]",
      icon: Shield,
      badgeStyle: "bg-[#28163d] text-[#a855f7] border border-[#3b1f59]",
    },
    {
      title: "Completed Events",
      value: stats.completedEvents.value,
      subtitle: stats.completedEvents.label,
      subtitleColor: "text-[#f59e0b]",
      icon: Award,
      badgeStyle: "bg-[#382410] text-[#f59e0b] border border-[#4e3216]",
    },
    {
      title: "Cancelled Events",
      value: stats.cancelledEvents.value,
      subtitle: stats.cancelledEvents.label,
      subtitleColor: "text-[#ef4444]",
      icon: XCircle,
      badgeStyle: "bg-[#381113] text-[#ef4444] border border-[#521c1f]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-[#232830] bg-[#161a1f] p-4 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26]"
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.badgeStyle}`}
            >
              <Icon size={22} strokeWidth={1.9} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-white/50">{card.title}</p>
              <h3 className="mt-0.5 text-2xl font-bold tracking-tight text-white">{card.value}</h3>
              <p
                className={`mt-1 flex items-center gap-1 text-[11px] font-medium ${card.subtitleColor}`}
              >
                <span>{card.subtitle}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventStatsCards;
