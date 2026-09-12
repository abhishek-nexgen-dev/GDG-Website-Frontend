import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../utils/axios.utils";
import type { MemberType } from "../type/MemberDetails.type";

interface UpdateMemberPayload {
  memberId: string;
  data: Partial<MemberType>;
}

export const useUpdateMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, UpdateMemberPayload>({
    mutationFn: async ({ memberId, data }) => {
      // Assuming a PUT or PATCH endpoint exists
      const response = await api.put(`/api/v1/member/update/${memberId}`, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["memberProfile", variables.data.Slug] });
      queryClient.invalidateQueries({ queryKey: ["allMembers"] });
    },
  });
};

export default useUpdateMemberMutation;
