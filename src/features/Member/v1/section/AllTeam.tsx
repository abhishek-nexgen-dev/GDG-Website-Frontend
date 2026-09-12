import { useState } from "react";
import teamMembers from "../Constant/Team.Constant";
import { Users } from "lucide-react";
import { BentoTeamCard } from "../Components/BentoTeamCard";

const FILTERS = ["All Teams", "Events", "Content", "Tech", "Partnerships", "Operations", "PR & Social"];

export const AllTeam = () => {
  const [activeFilter, setActiveFilter] = useState("All Teams");

  // Get only regular members
  const members = teamMembers.filter((m) => m.role === "Member");

  // Filter based on active selection
  const displayedMembers =
    activeFilter === "All Teams"
      ? members
      : members.filter((m) => m.team.toLowerCase().includes(activeFilter.split(' ')[0].toLowerCase()));

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
      {/* Header & Filter Row */}
      <div className="mb-12 flex flex-col justify-between gap-6 border-b border-gray-800 pb-8 md:flex-row md:items-end">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-2xl text-blue-400">
            <Users size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Team Members</h2>
            <p className="text-sm text-gray-400">
              The amazing folks who make it all happen.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                activeFilter === filter
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {displayedMembers.map((member) => (
          <BentoTeamCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
};
