import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../utils/axios.utils";

export interface CreateMemberPayload {
  firstName: string;
  lastName: string;
  email: string;
  Bio?: string;
  imageUrl?: string;
  publicProfileUrl?: string;
  membershipStatus?: string;
  onboardingSource?: string;
  primaryRole?: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
    pinCode?: string;
  };
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
    instagram?: string;
    youtube?: string;
    portfolio?: string;
    medium?: string;
  };
  skills?: string[];
  areaOfInterest?: string[];
  internalNotes?: string;
}

export interface CreateMemberResponse {
  success: boolean;
  message: string;
  data: {
    memberId: string;
    status: string;
  };
}

export const useCreateMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateMemberResponse, Error, CreateMemberPayload>({
    mutationFn: async (payload) => {
      const response = await api.post<CreateMemberResponse>(
        "/api/v1/member/create",
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMembers"] });
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
};

export default useCreateMemberMutation;
