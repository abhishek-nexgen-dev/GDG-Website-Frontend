import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../utils/axios.utils";
import type {
  AssignPermissionPayload,
  AssignPermissionResponse,
} from "../types/Permission.type";

export const useAssignPermissionsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AssignPermissionResponse, Error, AssignPermissionPayload>({
    mutationFn: async (payload) => {
      const response = await api.post<AssignPermissionResponse>(
        "/api/v1/permission/add/member/permissions",
        payload
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["memberPermissions", variables.memberId],
      });
    },
  });
};

export default useAssignPermissionsMutation;
