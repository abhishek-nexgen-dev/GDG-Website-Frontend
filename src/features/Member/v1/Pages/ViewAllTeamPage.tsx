import ViewAllTeamPageHeader from "../Components/ViewAllTeamPageHeader";
import { CoreTeamTree } from "../section/CoreTeamTree";
import { TeamLeadsGrid } from "../section/TeamLeadsGrid";
import { AllTeam } from "../section/AllTeam";
import { TeamCTA } from "../section/TeamCTA";

const ViewAllTeamPage = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
        <div className="absolute left-[-10%] top-[-10%] h-[40vw] w-[40vw] rounded-full bg-blue-900/20 blur-[150px]" />
        <div className="absolute right-[-10%] top-[40%] h-[30vw] w-[30vw] rounded-full bg-purple-900/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] h-[35vw] w-[35vw] rounded-full bg-green-900/10 blur-[150px]" />
      </div>

      {/* Main Content */}
      <ViewAllTeamPageHeader />
      <CoreTeamTree />
      <TeamLeadsGrid />
      <AllTeam />
      <TeamCTA />
      
    </div>
  );
};

export default ViewAllTeamPage;
