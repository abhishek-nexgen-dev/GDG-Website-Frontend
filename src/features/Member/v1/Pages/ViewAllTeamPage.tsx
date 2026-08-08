import TeamCard from "../Components/TeamCard";
import ViewAllTeamPageHeader from "../Components/ViewAllTeamPageHeader";
import teamMembers from "../Constant/Team.Constant";

const ViewAllTeamPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Blur Effects */}

      <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[140px]" />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.05]">
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

      {/* Team Grid */}

      <div className="flex flex-col relative z-10  gap-[2vw] px-6 py-16  lg:px-[8%] xl:px-[10%]">
        <h1 className="w-full text-center text-[3vh] font-extrabold">
          Organizers & <span className="text-blue-500">Co Organizers</span>
        </h1>

        <section className="relative z-10 grid grid-cols-1 gap-[5vw] px-6 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:px-[8%] xl:px-[10%]">
          {teamMembers.map((data) => (
            <TeamCard
              key={data.id}
              FullName={data.name}
              Role={data.role}
              imageUrl={data.image}
              SocialLink={data.socialLinks}
            />
          ))}
        </section>
      </div>
    </div>
  );
};

export default ViewAllTeamPage;
