import { useMemo } from "react";
import teamMembers from "../Constant/Team.Constant";
import type { PublicTeamMember } from "../Components/TeamMemberModal";
import useFetchAllMembersQuery from "./useFetchAllMembersQuery";

export const usePublicTeam = () => {
  const { data: apiMembers, isLoading } = useFetchAllMembersQuery(1, 100);

  const members: PublicTeamMember[] = useMemo(() => {
    if (apiMembers && Array.isArray(apiMembers) && apiMembers.length > 0) {
      return apiMembers.map((m: any, idx: number) => ({
        id: m._id || m.id || String(idx),
        name: `${m.firstName || ""} ${m.lastName || ""}`.trim() || m.fullName || m.name || "Community Member",
        role: m.primaryRole || m.role || "Core Team",
        company: m.company || m.organization || undefined,
        image:
          m.imageUrl ||
          m.avatar ||
          m.image ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        bio: m.Bio || m.bio || m.description,
        socialLinks: m.socialLinks || [],
      }));
    }

    return teamMembers.map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      company: (m as any).company,
      image: m.image,
      socialLinks: m.socialLinks,
    }));
  }, [apiMembers]);

  return { members, isLoading };
};
