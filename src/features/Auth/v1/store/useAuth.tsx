import { create } from "zustand";
import type { LoginData, Permission, User } from "../types/Auth.type";

interface UseAuthType {
  user: User | null;
  perms: Permission[];
  setUser: (user: User) => void;
  setPerms: (perms: Permission[]) => void;
  setAuthUser: (data: LoginData) => void;
}

const useAuth = create<UseAuthType>((set) => ({
  user: null,
  perms: [],

  setUser: (user) => set({ user }),
  setPerms: (perms) => set({ perms }),

  setAuthUser: (data) => set({ user: data.FindUser, perms: data.perms }),
}));

export default useAuth;
