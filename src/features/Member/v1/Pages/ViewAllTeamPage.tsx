import React from "react";
import ViewAllTeamPageHeader from "../Components/ViewAllTeamPageHeader";

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
      <section className="relative h-screen z-10 grid grid-cols-1 gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3 lg:px-[8%] xl:px-[10%]">
        {/* <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard />
        <TeamCard /> */}
      </section>
    </div>
  );
};

export default ViewAllTeamPage;
