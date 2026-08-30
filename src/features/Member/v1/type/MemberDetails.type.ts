export type PermissionSchemaType = {
  name: string;
  action: "create" | "read" | "update" | "delete"; // create, read, update, delete
  resource: string; // create event , read event, update event, delete event
  description?: string;
  level?: number; // 0..100 where 100 is master
};

export type PermissionGroup = {
  name: string;
  icon: React.ReactNode;
  count: number;
  permissions?: PermissionSchemaType[];
};

export type BadgeVariant = "green" | "purple" | "blue" | "gray" | "red";

export type onBoardingSourceType =
  "website" | "referral" | "social_media" | "event" | "direct_invitation" | "other";

export type memberStatusType = "On Boarding" | "inactive" | "Active" | "Suspended" | "Banned";

export interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

/* ============================================================
   TAG EDITOR
============================================================ */

export interface TagEditorProps {
  label: string;

  values: string[];

  variant: "green" | "purple";

  editable: boolean;

  onChange: (values: string[]) => void;
}

export type MemberType = {
  _id: string;
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
    city: string;
    state: string;
    country: string;
    pinCode: string;
  };
  skills?: string[];
  areaOfInterest?: string[];
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
    website: string;
    instagram: string;
    youtube: string;
    portfolio: string;
    medium: string;
  };
  internalNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type fetchMembersType = {
  _id: string;
  Slug: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  membershipStatus: string;
  primaryRole: string;
  createdAt: string;
};

export interface ApiLocation {
  city?: string;
  state?: string;
  country?: string;
  pinCode?: string;
}

export interface ApiSocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  instagram?: string;
  youtube?: string;
  portfolio?: string;
  medium?: string;
}

export interface ApiMember {
  _id: string;
  Slug: string;

  firstName: string;
  lastName: string;

  imageUrl?: string;

  email: string;

  Bio?: string;

  membershipStatus?: string;
  onboardingSource?: string;

  AuthId?: string;

  primaryRole?: string;

  skills?: string[];

  areaOfInterest?: string[];

  internalNotes?: string;

  location?: ApiLocation;

  socialLinks?: ApiSocialLinks;
}

export interface PermissionRowProps {
  permission: PermissionSchemaType;

  onRemove: () => void;

  onLevelChange: (level: number) => void;

  disabled?: boolean;
}
