import { create } from "zustand";
import type { PermissionItem } from "../types/Permission.type";

interface PermissionStoreState {
  permissions: PermissionItem[];
  setPermissions: (permissions: PermissionItem[]) => void;
  hasPermission: (permissionName: string) => boolean;
  canPerformAction: (action: string, resource: string) => boolean;
  clearPermissions: () => void;
}

export const usePermissionStore = create<PermissionStoreState>((set, get) => ({
  permissions: [],

  setPermissions: (permissions) => set({ permissions }),

  hasPermission: (permissionName) => {
    return (get().permissions || []).some((p) => p.name === permissionName);
  },

  canPerformAction: (action, resource) => {
    return (get().permissions || []).some(
      (p) =>
        p.action.toLowerCase() === action.toLowerCase() &&
        p.resource.toLowerCase() === resource.toLowerCase()
    );
  },

  clearPermissions: () => set({ permissions: [] }),
}));

export default usePermissionStore;
