import { useEffect, useState } from "react";
import teamMembers from "../Constant/Team.Constant";
import api from "../../../../utils/axios.utils";
import type { PublicTeamMember } from "../Components/TeamMemberModal";

export const usePublicTeam = () => {
  const [members, setMembers] = useState<PublicTeamMember[]>(() => {
    // Map initial constant members cleanly
    return teamMembers.map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      company: (m as any).company,
      image: m.image,
      socialLinks: m.socialLinks,
    }));
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchLiveMembers = async () => {
      try {
        setIsLoading(true);
        // Attempt live API fetch with short timeout so preview remains snappy
        const res = await api.get("/api/v1/member/get/allMembers?limit=100&page=1", {
          timeout: 4000,
        });

        if (res.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          if (isMounted) {
            const mappedApiMembers: PublicTeamMember[] = res.data.data.map(
              (m: any, idx: number) => ({
                id: m._id || m.id || idx,
                name: m.fullName || m.name || "Community Member",
                role: m.role || "Core Team",
                company: m.company || m.organization || undefined,
                image:
                  m.avatar ||
                  m.profileImage ||
                  m.image ||
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
                bio: m.bio || m.description,
                socialLinks: m.socialLinks || [],
              }),
            );
            setMembers(mappedApiMembers);
          }
        }
      } catch {
        // Safe fallback: backend offline or endpoint not yet seeded, keep fallback team members
        // Silently retain high-fidelity constant data
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchLiveMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  return { members, isLoading };
};
