import { create } from "zustand";
import type { LoginData, Permission, User } from "../types/Auth.type";
import AVAILABLE_PERMISSIONS_CONSTANT from "../../../Member/v1/Constant/AVAILABLE_PERMISSIONS.Constant";

interface UseAuthType {
  user: User | null;
  perms: Permission[];
  setUser: (user: User) => void;
  setPerms: (perms: Permission[]) => void;
  setAuthUser: (data: LoginData) => void;
  resetDefaultPerms: () => void;
}

const getInitialPerms = (): Permission[] => {
  try {
    const stored = localStorage.getItem("gdg_auth_perms");
    if (stored && stored !== "undefined" && stored !== "null") {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Failed to load perms from localStorage", err);
  }
  return AVAILABLE_PERMISSIONS_CONSTANT;
};

const getInitialUser = (): User | null => {
  try {
    const stored = localStorage.getItem("gdg_auth_user");
    if (stored && stored !== "undefined" && stored !== "null") {
      return JSON.parse(stored);
    }
  } catch (err) {
    console.warn("Failed to load user from localStorage", err);
  }
  return {
    _id: "admin-user-001",
    firstName: "Abhishek",
    lastName: "Gupta",
    email: "abhishek.gupta@gdgranchi.in",
    role: "Admin",
  } as unknown as User;
};

const useAuth = create<UseAuthType>((set) => ({
  user: getInitialUser(),
  perms: getInitialPerms(),

  setUser: (user) => {
    try {
      localStorage.setItem("gdg_auth_user", JSON.stringify(user));
    } catch {}
    set({ user });
  },

  setPerms: (perms) => {
    try {
      localStorage.setItem("gdg_auth_perms", JSON.stringify(perms));
    } catch {}
    set({ perms });
  },

  setAuthUser: (data) => {
    try {
      const permsToStore = data.perms || data.permissions || [];
      localStorage.setItem("gdg_auth_user", JSON.stringify(data.FindUser));
      localStorage.setItem("gdg_auth_perms", JSON.stringify(permsToStore));
      set({ user: data.FindUser, perms: permsToStore });
    } catch {}
  },

  resetDefaultPerms: () => {
    try {
      localStorage.setItem("gdg_auth_perms", JSON.stringify(AVAILABLE_PERMISSIONS_CONSTANT));
    } catch {}
    set({ perms: AVAILABLE_PERMISSIONS_CONSTANT });
  },
}));

export default useAuth;
