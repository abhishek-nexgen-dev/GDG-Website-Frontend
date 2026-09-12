import { create } from "zustand";
import type { fetchMembersType, MemberType } from "../type/MemberDetails.type";

const INITIAL_MEMBERS: fetchMembersType[] = [
  {
    _id: "m-1",
    Slug: "tushar-raj",
    firstName: "Tushar",
    lastName: "Raj",
    imageUrl:
      "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/tushar_raj_mumONGR.jpg",
    email: "tushar@gdgranchi.com",
    membershipStatus: "Active",
    primaryRole: "Organizer",
    createdAt: "2023-01-15T10:00:00.000Z",
  },
  {
    _id: "m-2",
    Slug: "vikas-shukla",
    firstName: "Vikas",
    lastName: "Shukla",
    imageUrl:
      "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/vikas_shukla_uvKihz8.jpg",
    email: "vikas@gdgranchi.com",
    membershipStatus: "Active",
    primaryRole: "Co-Organizer",
    createdAt: "2023-02-10T11:00:00.000Z",
  },
  {
    _id: "m-3",
    Slug: "ananya-sharma",
    firstName: "Ananya",
    lastName: "Sharma",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    email: "ananya@gdgranchi.com",
    membershipStatus: "Active",
    primaryRole: "Core Team",
    createdAt: "2023-06-20T09:30:00.000Z",
  },
  {
    _id: "m-4",
    Slug: "rahul-verma",
    firstName: "Rahul",
    lastName: "Verma",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80",
    email: "rahul.cloud@gdgranchi.com",
    membershipStatus: "Active",
    primaryRole: "Cloud Lead",
    createdAt: "2023-08-14T14:15:00.000Z",
  },
  {
    _id: "m-5",
    Slug: "priya-kumari",
    firstName: "Priya",
    lastName: "Kumari",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80",
    email: "priya.wtm@gdgranchi.com",
    membershipStatus: "Active",
    primaryRole: "WTM Lead",
    createdAt: "2023-09-01T08:00:00.000Z",
  },
  {
    _id: "m-6",
    Slug: "aman-kumar-singh",
    firstName: "Aman",
    lastName: "Singh",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80",
    email: "aman.singh@gdgranchi.com",
    membershipStatus: "Active",
    primaryRole: "AI/ML Lead",
    createdAt: "2024-01-10T12:00:00.000Z",
  },
  {
    _id: "m-7",
    Slug: "sneha-roy",
    firstName: "Sneha",
    lastName: "Roy",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80",
    email: "sneha.roy@gdgranchi.com",
    membershipStatus: "Active",
    primaryRole: "Web Lead",
    createdAt: "2024-02-18T16:40:00.000Z",
  },
  {
    _id: "m-8",
    Slug: "rohit-kumar",
    firstName: "Rohit",
    lastName: "Kumar",
    imageUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&q=80",
    email: "rohit.k@gdgranchi.com",
    membershipStatus: "Active",
    primaryRole: "Design Lead",
    createdAt: "2024-03-05T10:20:00.000Z",
  },
];

const DEFAULT_PROFILE: MemberType = {
  _id: "admin-current-user",
  Slug: "abhishek-gupta",
  firstName: "Abhishek",
  lastName: "Gupta",
  email: "abhishek.gupta@gdgranchi.in",
  imageUrl:
    "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/tushar_raj_mumONGR.jpg",
  primaryRole: "Full Stack Developer & Admin",
  membershipStatus: "Active",
  Bio: "Lead community organizer, full stack engineer, and Google Developer Group tech enthusiast passionate about open technology and community empowerment.",
  location: {
    city: "Ranchi",
    state: "Jharkhand",
    country: "India",
    pinCode: "834001",
  },
  socialLinks: {
    linkedin: "https://linkedin.com/in/abhishekgupta",
    github: "https://github.com/abhishekgupta",
    twitter: "https://twitter.com/abhishekgupta",
    website: "https://abhishekgupta.dev",
    instagram: "",
    youtube: "",
    portfolio: "https://abhishekgupta.dev",
    medium: "",
  },
  skills: ["React", "TypeScript", "Node.js", "Docker", "Cloud Native", "GDG Leadership"],
  areaOfInterest: ["Cloud Architecture", "Generative AI", "Web Ecosystems"],
  internalNotes: "Core community administrator and chapter organizer.",
};

const getInitialSingleMember = (): MemberType => {
  try {
    const stored = localStorage.getItem("gdg_member_single_profile");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.firstName) {
        return parsed;
      }
    }
  } catch {}
  return DEFAULT_PROFILE;
};

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

export const useMembers = create<UseMembersType>((set) => ({
  isEditSingleMember: false,
  members: INITIAL_MEMBERS,
  singleMember: getInitialSingleMember(),

  setMembers: (members) => set({ members }),

  setSingleMember: (singleMember) => {
    try {
      localStorage.setItem("gdg_member_single_profile", JSON.stringify(singleMember));
    } catch {}
    set({ singleMember });
  },

  addMember: (newMember) => {
    const id = `m-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

    const memberToAdd: fetchMembersType = {
      ...newMember,
      _id: id,
    };

    set((state) => ({
      members: [memberToAdd, ...state.members],
    }));
  },

  deleteMember: (id) => {
    set((state) => ({
      members: state.members.filter((member) => member._id !== id),
      singleMember: state.singleMember?._id === id ? null : state.singleMember,
    }));
  },

  updateMember: (id, updates) => {
    set((state) => {
      const shouldUpdateSingle = state.singleMember?._id === id;
      const updatedSingle = shouldUpdateSingle
        ? ({ ...state.singleMember, ...updates } as MemberType)
        : state.singleMember;

      if (updatedSingle) {
        try {
          localStorage.setItem("gdg_member_single_profile", JSON.stringify(updatedSingle));
        } catch {}
      }

      const updatedMembers = state.members.map((m) =>
        m._id === id
          ? ({
              ...m,
              firstName: (updates as any).firstName ?? m.firstName,
              lastName: (updates as any).lastName ?? m.lastName,
              email: (updates as any).email ?? m.email,
              primaryRole: (updates as any).primaryRole ?? m.primaryRole,
              membershipStatus:
                (updates as any).membershipStatus ?? m.membershipStatus,
            } as fetchMembersType)
          : m
      );

      return {
        singleMember: updatedSingle,
        members: updatedMembers,
      };
    });
  },

  setIsEditSingleMember: (isEdit) => {
    set({ isEditSingleMember: isEdit });
  },

  clearMembers: () => set({ members: [] }),
}));

export default useMembers;
