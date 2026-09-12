import teamMembers from "../Constant/Team.Constant";
import { BentoTeamCard } from "../Components/BentoTeamCard";

export const TeamLeadsGrid = () => {
  const leads = teamMembers.filter((m) => m.team === "Leads");

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
      {/* Header */}
      <div className="mb-12 flex items-center gap-4 border-b border-gray-800 pb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20 text-2xl text-purple-400">
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
          </svg>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Team Leads</h2>
          <p className="text-sm text-gray-400">
            Turning ideas into action across key areas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {leads.map((lead) => (
          <BentoTeamCard key={lead.id} member={lead} />
        ))}
      </div>
    </section>
  );
};
