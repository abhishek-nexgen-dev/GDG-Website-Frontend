import { useMutation } from "@tanstack/react-query";
import api from "../../../../utils/axios.utils";
import useMembers from "../store/useMembers";

type FetchVars = { limit?: number; page?: number };
type MemberResponse = any; // Replace with your actual response type

const useFetchMember = () => {
  return useMutation<MemberResponse, Error, FetchVars>({
    mutationFn: async ({ limit = 20, page = 1 }) => {
      try {
        const response = await api.get(`/api/v1/member/get/allMembers?limit=${limit}&page=${page}`);
        return response.data;
      } catch (err) {
        console.warn("[GDG Ranchi] Fetch all members API notice, maintaining active state:", err);
        return null;
      }
    },
    onSuccess: (data) => {
      if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
        useMembers.getState().setMembers(data.data);
      }
    },
    onError: (error) => {
      console.warn("Mutation error:", error);
    },
  });
};

export default useFetchMember;
