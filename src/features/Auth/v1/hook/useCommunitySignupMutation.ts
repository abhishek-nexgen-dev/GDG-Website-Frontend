import { useMutation } from "@tanstack/react-query";
import api from "../../../../utils/axios.utils";

export interface CommunitySignupPayload {
  CommunityName: string;
  password: string;
  Bio: string;
  City: string;
  Country: string;
  ContactPhone: string;
  OfficialEmail: string;
  Website: string;
  LogoUrl?: string;
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    discord?: string;
  };
}

export interface CommunitySignupResponse {
  success: boolean;
  message: string;
  data: any;
}

export const useCommunitySignupMutation = () => {
  return useMutation<CommunitySignupResponse, Error, CommunitySignupPayload>({
    mutationFn: async (payload) => {
      const response = await api.post<CommunitySignupResponse>(
        "/api/v1/auth/community-signup",
        payload
      );
      return response.data;
    },
  });
};

export default useCommunitySignupMutation;
