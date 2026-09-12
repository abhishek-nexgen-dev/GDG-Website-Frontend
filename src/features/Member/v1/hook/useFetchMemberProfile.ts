import { useQuery } from "@tanstack/react-query";
import api from "../../../../utils/axios.utils";
import useMembers from "../store/useMembers";
import type { MemberType } from "../type/MemberDetails.type";

export const useFetchMemberProfile = (Slug: string) => {
  return useQuery<MemberType | null, Error>({
    queryKey: ["memberProfile", Slug],
    queryFn: async () => {
      if (!Slug || Slug === "me") return null;
      try {
        const response = await api.get(`/api/v1/find/memberBySlug/${Slug}`);
        const data = response.data?.data;
        if (data) {
          useMembers.getState().setSingleMember(data);
        }
        return data || null;
      } catch {
        console.warn("[GDG Ranchi] Member profile API offline, utilizing state fallback.");
        return null;
      }
    },
    enabled: !!Slug && Slug !== "me",
    staleTime: 5 * 60 * 1000,
  });
};

export default useFetchMemberProfile;
