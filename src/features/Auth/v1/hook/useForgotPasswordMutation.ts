import { useMutation } from "@tanstack/react-query";
import api from "../../../../utils/axios.utils";

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  data: null;
}

export interface ForgotPasswordPayload {
  email: string;
}

export const useForgotPasswordMutation = () => {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordPayload>({
    mutationFn: async ({ email }) => {
      // Endpoint expects URL encoded or JSON with email
      const response = await api.post<ForgotPasswordResponse>(
        "/api/v1/auth/forgot-password",
        new URLSearchParams({ email }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data;
    },
  });
};

export default useForgotPasswordMutation;
