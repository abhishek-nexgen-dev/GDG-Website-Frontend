import { create } from "zustand";
import type { MemberType } from "../types/Auth.type";

interface useAuthType {
  email: string;
  password: string;
  setAuthUser: (user: MemberType) => void;
}

const useAuth = create<useAuthType>()((set) => ({
  email: "",
  password: "",

  setAuthUser: (user) => set(user),
}));

export default useAuth;
