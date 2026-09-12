import { Search } from "lucide-react";

type GalleryFilterBarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const GalleryFilterBar = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
}: GalleryFilterBarProps) => {
  const tabs = ["All Photos", "Events", "Workshops", "Talks", "Community", "Hackathons", "Meetups"];

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 mt-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        
        {/* Tabs */}
        <div className="flex w-full overflow-x-auto no-scrollbar items-center gap-2 md:w-auto pb-2 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap rounded-lg px-6 py-2.5 text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#353535] text-white"
                  : "bg-transparent text-zinc-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search photos, events, or people..."
            className="w-full rounded-full border border-white/10 bg-[#0F0F0F] py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none transition-all focus:border-[#4285F4]/50 focus:ring-1 focus:ring-[#4285F4]/50"
          />
        </div>
      </div>
    </section>
  );
};
