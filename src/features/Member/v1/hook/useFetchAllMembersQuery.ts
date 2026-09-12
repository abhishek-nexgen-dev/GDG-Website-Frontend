import { useQuery } from "@tanstack/react-query";
import api from "../../../../utils/axios.utils";

export interface MemberListItem {
  _id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  email: string;
  membershipStatus?: string;
  primaryRole?: string;
}

export interface FetchAllMembersResponse {
  success: boolean;
  message: string;
  data: MemberListItem[];
}

export const useFetchAllMembersQuery = (page = 1, limit = 20) => {
  return useQuery<MemberListItem[], Error>({
    queryKey: ["allMembers", page, limit],
    queryFn: async () => {
      const response = await api.get<FetchAllMembersResponse>(
        `/api/v1/member/get/allMembers?limit=${limit}&page=${page}`
      );
      return response.data?.data || [];
    },
    staleTime: 2 * 60 * 1000,
  });
};

export default useFetchAllMembersQuery;
