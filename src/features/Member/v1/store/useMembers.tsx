import { create } from "zustand";
import type { fetchMembersType, MemberType } from "../type/MemberDetails.type";

interface UseMembersState {
  members: fetchMembersType[];
  singleMember: MemberType | null;
  isEditSingleMember: boolean;
}

interface UseMembersActions {
  setMembers: (members: fetchMembersType[]) => void;
  setSingleMember: (singleMember: MemberType) => void;
  addMember: (member: Omit<fetchMembersType, "_id">) => void;
  deleteMember: (id: string) => void;
  updateMember: (id: string, updates: Partial<MemberType>) => void;
  clearMembers: () => void;
  setIsEditSingleMember: (isEdit: boolean) => void;
}

interface UseMembersType extends UseMembersState, UseMembersActions {}

const useMembers = create<UseMembersType>((set) => ({
  isEditSingleMember: false,
  members: [],
  singleMember: null,

  setMembers: (members) => set({ members }),

  setSingleMember: (singleMember) => set({ singleMember }),

  addMember: (newMember) => {
    const id = crypto.randomUUID();

    // Explicitly cast the new member to fetchMembersType to resolve type conflicts
    // This tells TS to trust that the data structure is correct despite the createdAt mismatch
    const memberToAdd: fetchMembersType = {
      ...newMember,
      _id: id,
      // Ensure dates are strings if your type expects strings, or leave as is if the type allows Date
      // If your type strictly requires string for createdAt, you might need to parse it here:
      // createdAt: newMember.createdAt ? new Date(newMember.createdAt).toISOString() : undefined,
    };

    set((state) => ({
      members: [memberToAdd, ...state.members],
    }));
  },

  deleteMember: (id) => {
    set((state) => ({
      members: state.members.filter((member) => member._id !== id),
    }));
  },

  updateMember: (id, updates) => {
    set((state) => {
      const shouldUpdateSingle = state.singleMember?._id === id;

      return {
        singleMember: shouldUpdateSingle
          ? ({ ...state.singleMember, ...updates } as MemberType)
          : state.singleMember,

        // Explicitly return members unchanged
        members: state.members,
      };
    });
  },

  setIsEditSingleMember: (isEdit) => {
    set({ isEditSingleMember: isEdit });
  },

  clearMembers: () => set({ members: [] }),
}));

export default useMembers;
