import { useCallback } from "react";
import useMembers from "../store/useMembers";
import type { MemberType } from "../type/MemberDetails.type";

export const useUpdateMember = (_id: string) => {
  const updateMember = useMembers((state) => state.updateMember);

  const MemberUpdate = useCallback(
    (data: Partial<MemberType>) => {
      // Pass the _id and the data object directly.
      // Do NOT wrap data in an array.
      updateMember(_id, data);
    },
    [updateMember, _id],
  );

  return {
    MemberUpdate,
  };
};

export default useUpdateMember;
