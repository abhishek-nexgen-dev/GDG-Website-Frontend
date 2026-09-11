import { useMutation } from "@tanstack/react-query";
import api from "../../../../utils/axios.utils";
import useMembers from "../store/useMembers";

type FetchVars = { Slug: string };
type MemberResponse = any;

const useFetchMemberProfile = () => {
  return useMutation<MemberResponse, Error, FetchVars>({
    mutationFn: async ({ Slug }) => {
      try {
        const response = await api.get(`/api/v1/find/memberBySlug/${Slug}`);
        return response.data;
      } catch {
        // Safe fallback if backend is offline
        console.warn("[GDG Ranchi] Member profile API offline, utilizing state fallback.");
        return null;
      }
    },
    onSuccess: (data) => {
      if (data?.data) {
        useMembers.getState().setSingleMember(data.data);
      }
    },
    onError: (error) => {
      console.warn("Member fetch notice:", error);
    },
  });
};

export default useFetchMemberProfile;
