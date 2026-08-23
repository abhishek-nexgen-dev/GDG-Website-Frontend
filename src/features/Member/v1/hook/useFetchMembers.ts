import { useMutation } from "@tanstack/react-query";
import api from "../../../../utils/axios.utils";
import useMembers from "../store/useMembers";

type FetchVars = { limit?: number; page?: number };
type MemberResponse = any; // Replace with your actual response type

const useFetchMember = () => {
  return useMutation<MemberResponse, Error, FetchVars>({
    mutationFn: async ({ limit = 2, page = 1 }) => {
      const response = await api.get(`/api/v1/member/get/allMembers?limit=${limit}&page=${page}`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
      useMembers.getInitialState().setMembers(data.data);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });
};

export default useFetchMember;
