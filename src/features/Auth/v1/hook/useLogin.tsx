import { useMutation } from "@tanstack/react-query";
import api from "../../../../utils/axios.utils";
import type { LoginResponse } from "../types/Auth.type";
import useAuth from "../store/useAuth";

type useLoginProps = {
  email: string;
  password: string;
};

const useLogin = () => {
  return useMutation<LoginResponse, Error, useLoginProps>({
    mutationFn: async ({ email, password }) => {
      const response = await api.post(`/api/v1/auth/login`, {
        email,
        password,
      });
      return response.data;
    },

    onSuccess: (data: LoginResponse) => {
      console.log("data-->", data);
      const perms = data.data.perms || data.data.permissions || [];
      useAuth.getState().setAuthUser({
        FindUser: data.data.FindUser,
        perms,
      });
    },
  });
};

export default useLogin;
