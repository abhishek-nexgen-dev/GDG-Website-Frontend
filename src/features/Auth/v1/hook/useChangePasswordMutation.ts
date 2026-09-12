import { useMutation } from "@tanstack/react-query";
import api from "../../../../utils/axios.utils";

export interface ChangePasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
  data: any;
}

export const useChangePasswordMutation = () => {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload>({
    mutationFn: async ({ email, otp, newPassword, confirmPassword }) => {
      const params = new URLSearchParams({
        otp,
        newPassword,
        confirmPassword,
      });

      const response = await api.post<ChangePasswordResponse>(
        `/api/v1/auth/change-password?email=${encodeURIComponent(email)}`,
        params,
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

export default useChangePasswordMutation;
