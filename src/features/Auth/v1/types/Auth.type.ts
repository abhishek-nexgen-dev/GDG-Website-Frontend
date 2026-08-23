type onBoardingSourceType =
  "website" | "referral" | "social_media" | "event" | "direct_invitation" | "other";

type memberStatusType = "On Boarding" | "inactive" | "Active" | "Suspended" | "Banned";

export type MemberType = {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  Bio: string;
  AuthId?: string;
  email: string;
  Slug: string;
  membershipStatus?: memberStatusType;
  onboardingSource?: onBoardingSourceType;
  primaryRole?: string;
  location: {
    city: String;
    state: String;
    country: String;
    pinCode: String;
  };
  skills?: string[];
  areaOfInterest?: string[];
  socialLinks: {
    linkedin: String;
    github: String;
    twitter: String;
    website: String;
    instagram: String;
    youtube: String;
    portfolio: String;
    medium: String;
  };
  internalNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export interface Permission {
  _id?: string;
  name: string;
  action: "create" | "read" | "update" | "delete";
  resource: string;
  description: string;
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export interface User {
  _id: string;
  email: string;
  role: string;
  passwordHash: string;
  emailVerified: boolean;
  failedLoginAttempts: number;
  isBanned: boolean;
  refreshTokens: string[]; // Assuming array of strings (tokens)
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface LoginData {
  FindUser: User;
  perms: Permission[];
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}
