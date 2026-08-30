import { z } from "zod";
import { EVENT_CONSTANT, EventMode_Constant } from "../Constant/Event.Constant";

export const EventMode = {
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
  HYBRID: "HYBRID",
} as const;

export type EventMode = (typeof EventMode)[keyof typeof EventMode];

export const RewardType = {
  CASH: "CASH",
  CREDIT: "CREDIT",
  SWAG: "SWAG",
  HIRING: "HIRING",
  INTERNSHIP: "INTERNSHIP",
} as const;

export type RewardType = (typeof RewardType)[keyof typeof RewardType];

export const EventVisibility = {
  PUBLIC: "PUBLIC",
  PRIVATE: "PRIVATE",
  UNLISTED: "UNLISTED",
} as const;

export type EventVisibility = (typeof EventVisibility)[keyof typeof EventVisibility];

export const EventStatus = {
  DRAFT: "DRAFT",
  REGISTRATION_OPEN: "REGISTRATION_OPEN",
  REGISTRATION_CLOSED: "REGISTRATION_CLOSED",
  LIVE: "LIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];

// ============================================================
// HELPER SCHEMAS
// ============================================================

const dateSchema = z
  .string()
  .min(1, "Date is required.")
  .refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Invalid date format.",
  });

// ============================================================
// VENUE
// ============================================================

const venueSchema = z.object({
  mode: z.enum(EventMode),

  venueName: z
    .string()
    .trim()
    .min(3, "Venue name must be at least 3 characters.")
    .max(100, "Venue name cannot exceed 100 characters.")
    .optional(),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters.")
    .max(200, "Address cannot exceed 200 characters.")
    .optional(),

  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters.")
    .max(50, "City cannot exceed 50 characters.")
    .optional(),

  state: z
    .string()
    .trim()
    .min(2, "State must be at least 2 characters.")
    .max(50, "State cannot exceed 50 characters.")
    .optional(),

  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters.")
    .max(50, "Country cannot exceed 50 characters.")
    .optional(),

  latitude: z.number().min(-90, "Invalid latitude.").max(90, "Invalid latitude.").optional(),

  longitude: z.number().min(-180, "Invalid longitude.").max(180, "Invalid longitude.").optional(),
});

// ============================================================
// TICKET
// ============================================================

const ticketSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Ticket name must be at least 3 characters.")
    .max(50, "Ticket name cannot exceed 50 characters."),

  price: z.number().min(0, "Ticket price cannot be negative."),

  quantity: z
    .number()
    .int("Ticket quantity must be a whole number.")
    .min(1, "Ticket quantity must be at least 1."),
});

// ============================================================
// TIMELINE
// ============================================================

const timelineSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Timeline title must be at least 3 characters.")
      .max(100, "Timeline title cannot exceed 100 characters."),

    startAt: dateSchema,

    endAt: dateSchema,
  })
  .refine((data) => new Date(data.endAt).getTime() > new Date(data.startAt).getTime(), {
    message: "Timeline end time must be after start time.",
    path: ["endAt"],
  });

// ============================================================
// CREATE EVENT VALIDATION
// ============================================================

export const EventValidate = z
  .object({
    // ----------------------------------------------------------
    // Optional slug
    // ----------------------------------------------------------

    Slug: z.string().trim().min(3).max(100).optional(),

    // ----------------------------------------------------------
    // Basic Information
    // ----------------------------------------------------------

    title: z
      .string()
      .trim()
      .min(5, "Event title must be at least 5 characters.")
      .max(100, "Event title cannot exceed 100 characters."),

    shortDescription: z
      .string()
      .trim()
      .min(10, "Short description must be at least 10 characters.")
      .max(400, "Short description cannot exceed 200 characters."),

    descriptionMarkdown: z.string().trim().min(20, "Description must be at least 20 characters."),

    redirectUrl: z.string().trim().url("Please provide a valid redirect URL."),

    tags: z
      .array(z.string().trim().min(1))
      .min(1, "At least one tag is required.")
      .max(10, "Maximum 10 tags are allowed.")
      .optional(),

    category: z.enum(EVENT_CONSTANT),

    visibility: z.enum(EventVisibility),

    status: z.enum(EventStatus),

    // ----------------------------------------------------------
    // Media
    // ----------------------------------------------------------

    coverImageUrl: z.string().trim().url("Please upload a valid cover image."),

    introVideoUrl: z.string().trim().url("Please provide a valid intro video URL.").optional(),

    // ----------------------------------------------------------
    // Registration
    // ----------------------------------------------------------

    registrationStartAt: dateSchema,

    registrationEndAt: dateSchema,

    // ----------------------------------------------------------
    // Venue
    // ----------------------------------------------------------

    venue: venueSchema,

    // ----------------------------------------------------------
    // People
    // ----------------------------------------------------------

    mentors: z.array(z.string().length(24)).optional(),

    judges: z.array(z.string().length(24)).optional(),

    partners: z.array(z.string().length(24)).optional(),

    sponsors: z.array(z.string().length(24)).optional(),

    // ----------------------------------------------------------
    // Tickets
    // ----------------------------------------------------------

    tickets: z.array(ticketSchema).optional(),

    // ----------------------------------------------------------
    // Timeline
    // ----------------------------------------------------------

    timeline: z.array(timelineSchema).optional(),

    // ----------------------------------------------------------
    // Rules
    // ----------------------------------------------------------

    rules: z
      .array(
        z
          .string()
          .trim()
          .min(5, "Rule must be at least 5 characters.")
          .max(200, "Rule cannot exceed 200 characters."),
      )
      .optional(),

    // ----------------------------------------------------------
    // Requirements
    // ----------------------------------------------------------

    requirements: z
      .array(
        z
          .string()
          .trim()
          .min(5, "Requirement must be at least 5 characters.")
          .max(200, "Requirement cannot exceed 200 characters."),
      )
      .optional(),
  })
  .refine(
    (data) =>
      new Date(data.registrationEndAt).getTime() > new Date(data.registrationStartAt).getTime(),
    {
      message: "Registration end must be after registration start.",
      path: ["registrationEndAt"],
    },
  );

// ============================================================
// UPDATE EVENT VALIDATION
// ============================================================

export const updateEventValidator = z
  .object({
    // ----------------------------------------------------------
    // Community
    // ----------------------------------------------------------

    communityId: z.string().length(24, "Invalid community ID.").optional(),

    // ----------------------------------------------------------
    // Basic Information
    // ----------------------------------------------------------

    title: z
      .string()
      .trim()
      .min(5, "Event title must be at least 5 characters.")
      .max(100, "Event title cannot exceed 100 characters.")
      .optional(),

    shortDescription: z
      .string()
      .trim()
      .min(10, "Short description must be at least 10 characters.")
      .max(200, "Short description cannot exceed 200 characters.")
      .optional(),

    descriptionMarkdown: z
      .string()
      .trim()
      .min(20, "Description must be at least 20 characters.")
      .optional(),

    redirectUrl: z.string().trim().url("Please provide a valid redirect URL.").optional(),

    tags: z
      .array(z.string().trim().min(1))
      .min(1, "At least one tag is required.")
      .max(10, "Maximum 10 tags are allowed.")
      .optional(),

    category: z.enum(EventMode_Constant).optional(),

    visibility: z.enum(EventVisibility).optional(),

    status: z.enum(EventStatus).optional(),

    // ----------------------------------------------------------
    // Media
    // ----------------------------------------------------------

    coverImageUrl: z.string().trim().url("Please provide a valid cover image.").optional(),

    introVideoUrl: z.string().trim().url("Please provide a valid intro video URL.").optional(),

    // ----------------------------------------------------------
    // Registration
    // ----------------------------------------------------------

    registrationStartAt: dateSchema.optional(),

    registrationEndAt: dateSchema.optional(),

    // ----------------------------------------------------------
    // Venue
    // ----------------------------------------------------------

    venue: z
      .object({
        mode: z.enum(EventMode).optional(),

        venueName: z.string().trim().min(3).max(100).optional(),

        address: z.string().trim().min(5).max(200).optional(),

        city: z.string().trim().min(2).max(50).optional(),

        state: z.string().trim().min(2).max(50).optional(),

        country: z.string().trim().min(2).max(50).optional(),

        latitude: z.number().min(-90).max(90).optional(),

        longitude: z.number().min(-180).max(180).optional(),
      })
      .optional(),

    // ----------------------------------------------------------
    // People
    // ----------------------------------------------------------

    mentors: z.array(z.string().length(24)).optional(),

    judges: z.array(z.string().length(24)).optional(),

    partners: z.array(z.string().length(24)).optional(),

    sponsors: z.array(z.string().length(24)).optional(),

    // ----------------------------------------------------------
    // Tickets
    // ----------------------------------------------------------

    tickets: z.array(ticketSchema).optional(),

    // ----------------------------------------------------------
    // Timeline
    // ----------------------------------------------------------

    timeline: z.array(timelineSchema).optional(),

    // ----------------------------------------------------------
    // Rules
    // ----------------------------------------------------------

    rules: z.array(z.string().trim().min(5).max(200)).optional(),

    // ----------------------------------------------------------
    // Requirements
    // ----------------------------------------------------------

    requirements: z.array(z.string().trim().min(5).max(200)).optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    // ----------------------------------------------------------
    // At least one field must be updated
    // ----------------------------------------------------------

    if (Object.keys(data).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide at least one field to update.",
      });

      return;
    }

    // ----------------------------------------------------------
    // Registration date validation
    // ----------------------------------------------------------

    if (data.registrationStartAt && data.registrationEndAt) {
      const start = new Date(data.registrationStartAt).getTime();

      const end = new Date(data.registrationEndAt).getTime();

      if (end <= start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Registration end must be after registration start.",
          path: ["registrationEndAt"],
        });
      }
    }
  });

// ============================================================
// TYPES
// ============================================================

export type EventType = z.infer<typeof EventValidate>;

export type UpdateEventType = z.infer<typeof updateEventValidator>;

// ============================================================
// HELPER TYPES
// ============================================================

export type EventModeType = EventMode;

export type EventVisibilityType = EventVisibility;

export type EventStatusType = EventStatus;

export type RewardTypeValue = RewardType;
