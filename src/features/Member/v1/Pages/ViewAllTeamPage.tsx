import { useState } from "react";
import ViewAllTeamPageHeader from "../Components/ViewAllTeamPageHeader";
import { AllTeam } from "../section/AllTeam";
import { usePublicTeam } from "../hook/usePublicTeam";

const ViewAllTeamPage = () => {
  const { members } = usePublicTeam();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Blur Effects */}
      <div className="pointer-events-none absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[140px]" />

      {/* Grid Background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
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
      <ViewAllTeamPageHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        totalMembersCount={members.length}
      />

      {/* Team Section */}
      <AllTeam
        members={members}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
};

export default ViewAllTeamPage;
