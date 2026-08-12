import ViewAllTeamPageHeader from "../Components/ViewAllTeamPageHeader";

import { AllTeam } from "../section/AllTeam";

const ViewAllTeamPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Blur Effects */}

      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[140px]" />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Header */}
      <ViewAllTeamPageHeader />

      <AllTeam />

      {/* Team Grid */}
    </div>
  );
};

export default ViewAllTeamPage;
