import React, { useMemo, useState } from "react";
import TeamCard from "../Components/TeamCard";
import { TeamMemberModal, type PublicTeamMember } from "../Components/TeamMemberModal";
import { SearchX, Sparkles, Filter } from "lucide-react";

interface AllTeamProps {
  members: PublicTeamMember[];
  searchQuery: string;
  selectedCategory: string;
  onResetFilters: () => void;
}

export const AllTeam: React.FC<AllTeamProps> = ({
  members,
  searchQuery,
  selectedCategory,
  onResetFilters,
}) => {
  const [selectedMember, setSelectedMember] = useState<PublicTeamMember | null>(null);

  // Filter members by search query first
  const searchedMembers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return members;

    return members.filter((m) => {
      const nameMatch = m.name?.toLowerCase().includes(q);
      const roleMatch = m.role?.toLowerCase().includes(q);
      const companyMatch = m.company?.toLowerCase().includes(q);
      return nameMatch || roleMatch || companyMatch;
    });
  }, [members, searchQuery]);

  // Categorize helper
  const isOrganizer = (role: string) => {
    const r = role.toLowerCase();
    return r.includes("organizer") || r.includes("lead") || r.includes("founder");
  };

  const isTech = (role: string) => {
    const r = role.toLowerCase();
    return (
      r.includes("tech") ||
      r.includes("engineer") ||
      r.includes("developer") ||
      r.includes("analyst") ||
      r.includes("data") ||
      r.includes("cloud")
    );
  };

  const isDesign = (role: string) => {
    const r = role.toLowerCase();
    return r.includes("design") || r.includes("ui") || r.includes("ux");
  };

  const isSocial = (role: string) => {
    const r = role.toLowerCase();
    return (
      r.includes("social") ||
      r.includes("media") ||
      r.includes("outreach") ||
      r.includes("marketing") ||
      r.includes("content")
    );
  };

  // Grouped members
  const organizers = useMemo(
    () => searchedMembers.filter((m) => isOrganizer(m.role)),
    [searchedMembers],
  );

  const techTeam = useMemo(
    () => searchedMembers.filter((m) => !isOrganizer(m.role) && isTech(m.role)),
    [searchedMembers],
  );

  const designTeam = useMemo(
    () => searchedMembers.filter((m) => !isOrganizer(m.role) && isDesign(m.role)),
    [searchedMembers],
  );

  const socialTeam = useMemo(
    () =>
      searchedMembers.filter(
        (m) =>
          !isOrganizer(m.role) &&
          !isTech(m.role) &&
          !isDesign(m.role) &&
          isSocial(m.role),
      ),
    [searchedMembers],
  );

  const coreTeam = useMemo(
    () =>
      searchedMembers.filter(
        (m) =>
          !isOrganizer(m.role) &&
          !isTech(m.role) &&
          !isDesign(m.role) &&
          !isSocial(m.role),
      ),
    [searchedMembers],
  );

  // Determine which sections to render based on selectedCategory
  const showOrganizers =
    (selectedCategory === "all" || selectedCategory === "organizer") &&
    organizers.length > 0;
  const showTech =
    (selectedCategory === "all" || selectedCategory === "tech") &&
    techTeam.length > 0;
  const showDesign =
    (selectedCategory === "all" || selectedCategory === "design") &&
    designTeam.length > 0;
  const showSocial =
    (selectedCategory === "all" || selectedCategory === "social") &&
    socialTeam.length > 0;
  const showCore =
    (selectedCategory === "all" || selectedCategory === "core") &&
    coreTeam.length > 0;

  const hasAnyResults =
    showOrganizers || showTech || showDesign || showSocial || showCore;

  return (
    <div className="relative pb-24">
      {/* Empty State */}
      {!hasAnyResults && (
        <div className="relative z-10 mx-auto max-w-md px-6 py-24 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-400">
            <SearchX size={32} />
          </div>
          <h3 className="mt-6 text-xl font-bold text-white">No team members found</h3>
          <p className="mt-2 text-sm text-gray-400">
            We couldn't find anyone matching "{searchQuery || selectedCategory}". Try searching for
            another name, role, or clearing your active filters.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#4285F4]/40 bg-[#4285F4]/20 px-5 py-2.5 text-sm font-semibold text-[#8AB4F8] transition-all hover:bg-[#4285F4]/30"
          >
            <Filter size={16} /> Reset Filters
          </button>
        </div>
      )}

      {/* 1. Organizers & Leads */}
      {showOrganizers && (
        <section className="relative z-10 px-6 pt-12 lg:px-[8%] xl:px-[10%]">
          <div className="mb-10 flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4285F4]/30 bg-[#4285F4]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#8AB4F8]">
              <Sparkles size={13} />
              Community Leadership
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Our <span className="text-[#4285F4]">Organizers & Leads</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
            {organizers.map((member) => (
              <TeamCard
                key={member.id}
                FullName={member.name}
                Role={member.role}
                company={member.company}
                imageUrl={member.image}
                SocialLink={member.socialLinks || []}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 2. Tech Team */}
      {showTech && (
        <section className="relative z-10 px-6 pt-20 lg:px-[8%] xl:px-[10%]">
          <div className="mb-10 flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#34A853]/30 bg-[#34A853]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#81C995]">
              <Sparkles size={13} />
              Engineering & Cloud
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Tech <span className="text-[#34A853]">Team</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
            {techTeam.map((member) => (
              <TeamCard
                key={member.id}
                FullName={member.name}
                Role={member.role}
                company={member.company}
                imageUrl={member.image}
                SocialLink={member.socialLinks || []}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 3. Design Team */}
      {showDesign && (
        <section className="relative z-10 px-6 pt-20 lg:px-[8%] xl:px-[10%]">
          <div className="mb-10 flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FBBC04]/30 bg-[#FBBC04]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#FDD663]">
              <Sparkles size={13} />
              UI / UX & Visual Arts
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Design <span className="text-[#FBBC04]">Team</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
            {designTeam.map((member) => (
              <TeamCard
                key={member.id}
                FullName={member.name}
                Role={member.role}
                company={member.company}
                imageUrl={member.image}
                SocialLink={member.socialLinks || []}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. Social Media & Outreach */}
      {showSocial && (
        <section className="relative z-10 px-6 pt-20 lg:px-[8%] xl:px-[10%]">
          <div className="mb-10 flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#EA4335]/30 bg-[#EA4335]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#F28B82]">
              <Sparkles size={13} />
              Outreach & Community
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Social Media <span className="text-[#EA4335]">Team</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
            {socialTeam.map((member) => (
              <TeamCard
                key={member.id}
                FullName={member.name}
                Role={member.role}
                company={member.company}
                imageUrl={member.image}
                SocialLink={member.socialLinks || []}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </section>
      )}

      {/* 5. Core Members */}
      {showCore && (
        <section className="relative z-10 px-6 pt-20 lg:px-[8%] xl:px-[10%]">
          <div className="mb-10 flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300">
              <Sparkles size={13} />
              Special Contributors
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
              Core <span className="text-purple-400">Team</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-items-center">
            {coreTeam.map((member) => (
              <TeamCard
                key={member.id}
                FullName={member.name}
                Role={member.role}
                company={member.company}
                imageUrl={member.image}
                SocialLink={member.socialLinks || []}
                onClick={() => setSelectedMember(member)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Interactive Detail Modal */}
      <TeamMemberModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
};
