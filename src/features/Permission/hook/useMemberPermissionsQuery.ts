import { useQuery } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import type { MemberPermissionsResponse, PermissionItem } from "../types/Permission.type";
import usePermissionStore from "../store/usePermissionStore";

export const useMemberPermissionsQuery = (userId?: string) => {
  return useQuery<PermissionItem[], Error>({
    queryKey: ["memberPermissions", userId],
    queryFn: async () => {
      if (!userId) return [];
      const response = await api.get<MemberPermissionsResponse>(
        `/api/v1/permission/get/member/permissions?userId=${encodeURIComponent(userId)}`
      );
      const perms = response.data?.data || [];
      usePermissionStore.getState().setPermissions(perms);
      return perms;
    },
    enabled: Boolean(userId),
    staleTime: 5 * 60 * 1000,
  });
};

export default useMemberPermissionsQuery;
