import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Location = {
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

export type SocialLinks = {
  linkedin: string;
  github: string;
  twitter: string;
  website: string;
  instagram: string;
  youtube: string;
  portfolio: string;
  medium: string;
};

export type CreateMemberData = {
  firstName: string;
  lastName: string;
  email: string;

  Bio: string;

  imageUrl: string;
  publicProfileUrl: string;

  membershipStatus: string;
  onboardingSource: string;
  primaryRole: string;

  location: Location;
  socialLinks: SocialLinks;

  skills: string[];
  areaOfInterest: string[];

  internalNotes: string;
};

export const initialMember: CreateMemberData = {
  firstName: "",
  lastName: "",
  email: "",
  Bio: "",
  imageUrl: "",
  publicProfileUrl: "",
  membershipStatus: "On Boarding",
  onboardingSource: "website",
  primaryRole: "Full Stack Developer",
  location: {
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  socialLinks: {
    linkedin: "",
    github: "",
    twitter: "",
    website: "",
    instagram: "",
    youtube: "",
    portfolio: "",
    medium: "",
  },
  skills: [],
  areaOfInterest: [],
  internalNotes: "",
};

interface CreateMemberDraftState {
  draft: CreateMemberData;
  setDraft: (draft: CreateMemberData) => void;
  clearDraft: () => void;
}

export const useCreateMemberDraft = create<CreateMemberDraftState>()(
  persist(
    (set) => ({
      draft: initialMember,
      setDraft: (draft) => set({ draft }),
      clearDraft: () => set({ draft: initialMember }),
    }),
    {
      name: "create-member-draft",
    }
  )
);
