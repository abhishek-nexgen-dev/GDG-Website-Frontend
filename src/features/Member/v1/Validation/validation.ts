import { z } from "zod";

export const MemberProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  imageUrl: z.string().url().or(z.literal("")).optional(),
  Bio: z.string().min(1, "Bio is required"),
  AuthId: z.string().optional(),
  email: z.string().email("Invalid email address"),
  Slug: z.string().min(1, "Slug is required"),
  membershipStatus: z.string().optional(),
  onboardingSource: z.string().optional(),
  primaryRole: z.string().optional(),
  location: z.object({
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    pinCode: z.string().min(1),
  }),
  skills: z.array(z.string()).optional(),
  areaOfInterest: z.array(z.string()).optional(),
  socialLinks: z.object({
    linkedin: z.string().url().or(z.literal("")).optional(),
    github: z.string().url().or(z.literal("")).optional(),
    twitter: z.string().url().or(z.literal("")).optional(),
    website: z.string().url().or(z.literal("")).optional(),
    instagram: z.string().url().or(z.literal("")).optional(),
    youtube: z.string().url().or(z.literal("")).optional(),
    portfolio: z.string().url().or(z.literal("")).optional(),
    medium: z.string().url().or(z.literal("")).optional(),
  }),
  internalNotes: z.string().optional(),
  createdAt: z.any().optional(), // Usually handled by backend
  updatedAt: z.any().optional(),
});

export type MemberProfileFormValues = z.infer<typeof MemberProfileSchema>;
