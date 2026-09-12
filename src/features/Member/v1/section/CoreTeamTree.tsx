import teamMembers from "../Constant/Team.Constant";
import { BentoTeamCard } from "../Components/BentoTeamCard";

export const CoreTeamTree = () => {
  const coreMembers = teamMembers.filter((m) => m.team === "Core");

  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
      {/* Header */}
      <div className="mb-12 flex flex-col justify-between md:flex-row md:items-end">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 text-2xl text-blue-400">
            ★
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Core Team</h2>
            <p className="text-sm text-gray-400">
              Leading the vision, strategy and overall community growth.
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm font-medium italic text-gray-500 md:mt-0">
          "Great communities are built by great people."
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {coreMembers.map((member) => (
          <BentoTeamCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
};
