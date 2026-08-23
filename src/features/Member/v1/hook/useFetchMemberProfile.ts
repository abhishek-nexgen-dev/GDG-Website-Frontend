import { useMutation } from "@tanstack/react-query";
import api from "../../../../utils/axios.utils";
import useMembers from "../store/useMembers";

type FetchVars = { Slug: string };
type MemberResponse = any; // Replace with your actual response type

const useFetchMemberProfile = () => {
  return useMutation<MemberResponse, Error, FetchVars>({
    mutationFn: async ({ Slug }) => {
      const response = await api.get(`/api/v1/find/memberBySlug/${Slug}`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
      useMembers.getInitialState().setSingleMember(data.data);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};

export default useFetchMemberProfile;
