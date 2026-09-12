import { Search, ChevronDown } from "lucide-react";

interface EventsFilterBarProps {
  activeTab: "all" | "upcoming" | "past";
  setActiveTab: (tab: "all" | "upcoming" | "past") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const EventsFilterBar = ({ activeTab, setActiveTab, searchQuery, setSearchQuery }: EventsFilterBarProps) => {
  const getTabClass = (tab: "all" | "upcoming" | "past") => {
    const baseClass = "font-medium text-sm whitespace-nowrap transition py-2 relative";
    return activeTab === tab 
      ? `${baseClass} text-white` 
      : `${baseClass} text-zinc-400 hover:text-white`;
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-8 pt-8 border-b border-white/10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Left Tabs */}
        <div className="flex items-center gap-8 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
          <button onClick={() => setActiveTab("all")} className={getTabClass("all")}>
            All Events
            {activeTab === "all" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1a73e8]" />}
          </button>
          <button onClick={() => setActiveTab("upcoming")} className={getTabClass("upcoming")}>
            Upcoming
            {activeTab === "upcoming" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1a73e8]" />}
          </button>
          <button onClick={() => setActiveTab("past")} className={getTabClass("past")}>
            Past Events
            {activeTab === "past" && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1a73e8]" />}
          </button>
        </div>

        {/* Right Filters */}
        <div className="flex items-center gap-4 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 lg:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, topics, or keywords..." 
              className="w-full bg-black border border-white/10 rounded-full py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition"
            />
          </div>

          {/* Dropdowns */}
          <button className="hidden sm:flex items-center gap-2 bg-black border border-white/10 rounded-full px-4 py-2 text-xs text-zinc-400 hover:text-white transition whitespace-nowrap">
            Event Type <ChevronDown size={14} />
          </button>
          <button className="hidden sm:flex items-center gap-2 bg-black border border-white/10 rounded-full px-4 py-2 text-xs text-zinc-400 hover:text-white transition whitespace-nowrap">
            Format <ChevronDown size={14} />
          </button>
          <button className="hidden sm:flex items-center gap-2 bg-black border border-white/10 rounded-full px-4 py-2 text-xs text-zinc-400 hover:text-white transition whitespace-nowrap">
            Year <ChevronDown size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};
