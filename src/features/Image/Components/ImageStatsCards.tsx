import { Images, Folder, Calendar, Lock, HardDrive } from "lucide-react";
import type { ImageStats } from "../data/images.data";

interface ImageStatsCardsProps {
  stats: ImageStats;
}

const ImageStatsCards = ({ stats }: ImageStatsCardsProps) => {
  const cards = [
    {
      title: "Total Images",
      value: stats.totalImages.value,
      subtitle: stats.totalImages.trend,
      subtitleColor: "text-[#22c55e]",
      icon: Images,
      badgeStyle: "bg-[#143321] text-[#22c55e] border border-[#1c472d]",
    },
    {
      title: "Total Albums",
      value: stats.totalAlbums.value,
      subtitle: stats.totalAlbums.trend,
      subtitleColor: "text-[#60a5fa]",
      icon: Folder,
      badgeStyle: "bg-[#122844] text-[#3b82f6] border border-[#193961]",
    },
    {
      title: "Total Events",
      value: stats.totalEvents.value,
      subtitle: stats.totalEvents.trend,
      subtitleColor: "text-[#c084fc]",
      icon: Calendar,
      badgeStyle: "bg-[#28163d] text-[#a855f7] border border-[#3b1f59]",
    },
    {
      title: "Storage Used",
      value: stats.storageUsed.value,
      subtitle: stats.storageUsed.trend,
      subtitleColor: "text-[#f59e0b]",
      icon: Lock,
      badgeStyle: "bg-[#382410] text-[#f59e0b] border border-[#4e3216]",
    },
    {
      title: "Avg. Image Size",
      value: stats.avgImageSize.value,
      subtitle: stats.avgImageSize.trend,
      subtitleColor: "text-[#f87171]",
      icon: HardDrive,
      badgeStyle: "bg-[#102d33] text-[#06b6d4] border border-[#164049]",
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
              <p className={`mt-1 flex items-center gap-1 text-[11px] font-medium ${card.subtitleColor}`}>
                <span>{card.subtitle}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImageStatsCards;
