import { z } from "zod";
import { EVENT_CONSTANT } from "../Constant/Event.Constant";

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

const dateSchema = z
  .string()
  .trim()
  .min(1, "Date is required.")
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Invalid date format.",
  });

const objectIdSchema = z.string().length(24, "Invalid ID.");

const optionalString = (min: number, max: number, minMessage?: string, maxMessage?: string) =>
  z
    .string()
    .trim()
    .min(min, minMessage ?? `Must be at least ${min} characters.`)
    .max(max, maxMessage ?? `Cannot exceed ${max} characters.`)
    .optional();

const venueSchema = z.object({
  mode: z.enum(EventMode),
  venueName: optionalString(3, 100),
  address: optionalString(5, 200),
  city: optionalString(2, 50),
  state: optionalString(2, 50),
  country: optionalString(2, 50),
  latitude: z.number().min(-90, "Invalid latitude.").max(90, "Invalid latitude.").optional(),
  longitude: z.number().min(-180, "Invalid longitude.").max(180, "Invalid longitude.").optional(),
});

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
  .superRefine((data, ctx) => {
    const start = new Date(data.startAt).getTime();
    const end = new Date(data.endAt).getTime();

    if (end <= start) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Timeline end time must be after start time.",
        path: ["endAt"],
      });
    }
  });

const validateEventDates = (
  data: {
    registrationStartAt?: string;
    registrationEndAt?: string;
    timeline?: Array<{
      startAt: string;
      endAt: string;
    }>;
  },
  ctx: z.RefinementCtx,
) => {
  const registrationStart = data.registrationStartAt
    ? new Date(data.registrationStartAt).getTime()
    : undefined;

  const registrationEnd = data.registrationEndAt
    ? new Date(data.registrationEndAt).getTime()
    : undefined;

  if (
    registrationStart !== undefined &&
    registrationEnd !== undefined &&
    registrationEnd <= registrationStart
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Registration end date and time must be after registration start date and time.",
      path: ["registrationEndAt"],
    });
  }

  if (registrationStart === undefined || registrationEnd === undefined || !data.timeline?.length) {
    return;
  }

  data.timeline.forEach((item, index) => {
    const timelineStart = new Date(item.startAt).getTime();
    const timelineEnd = new Date(item.endAt).getTime();

    if (timelineStart < registrationStart) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Timeline cannot start before the registration start date and time.",
        path: ["timeline", index, "startAt"],
      });
    }

    if (timelineEnd > registrationEnd) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Timeline cannot end after the registration end date and time.",
        path: ["timeline", index, "endAt"],
      });
    }
  });
};

export const EventValidate = z
  .object({
    Slug: z.string().trim().min(3).max(100).optional(),

    title: z
      .string()
      .trim()
      .min(5, "Event title must be at least 5 characters.")
      .max(100, "Event title cannot exceed 100 characters."),

    shortDescription: z
      .string()
      .trim()
      .min(10, "Short description must be at least 10 characters.")
      .max(400, "Short description cannot exceed 400 characters."),

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

    coverImageUrl: z.string().trim().url("Please upload a valid cover image."),

    introVideoUrl: z.string().trim().url("Please provide a valid intro video URL.").optional(),

    registrationStartAt: dateSchema,

    registrationEndAt: dateSchema,

    venue: venueSchema,

    mentors: z.array(objectIdSchema).optional(),

    judges: z.array(objectIdSchema).optional(),

    partners: z.array(objectIdSchema).optional(),

    sponsors: z.array(objectIdSchema).optional(),

    tickets: z.array(ticketSchema).optional(),

    timeline: z.array(timelineSchema).optional(),

    rules: z
      .array(
        z
          .string()
          .trim()
          .min(5, "Rule must be at least 5 characters.")
          .max(200, "Rule cannot exceed 200 characters."),
      )
      .optional(),

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
  .superRefine(validateEventDates);

export const updateEventValidator = z
  .object({
    communityId: objectIdSchema.optional(),

    title: optionalString(
      5,
      100,
      "Event title must be at least 5 characters.",
      "Event title cannot exceed 100 characters.",
    ),

    shortDescription: optionalString(
      10,
      400,
      "Short description must be at least 10 characters.",
      "Short description cannot exceed 400 characters.",
    ),

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

    category: z.enum(EVENT_CONSTANT).optional(),

    visibility: z.enum(EventVisibility).optional(),

    status: z.enum(EventStatus).optional(),

    coverImageUrl: z.string().trim().url("Please provide a valid cover image.").optional(),

    introVideoUrl: z.string().trim().url("Please provide a valid intro video URL.").optional(),

    registrationStartAt: dateSchema.optional(),

    registrationEndAt: dateSchema.optional(),

    venue: venueSchema.partial().optional(),

    mentors: z.array(objectIdSchema).optional(),

    judges: z.array(objectIdSchema).optional(),

    partners: z.array(objectIdSchema).optional(),

    sponsors: z.array(objectIdSchema).optional(),

    tickets: z.array(ticketSchema).optional(),

    timeline: z.array(timelineSchema).optional(),

    rules: z.array(z.string().trim().min(5).max(200)).optional(),

    requirements: z.array(z.string().trim().min(5).max(200)).optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (Object.keys(data).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide at least one field to update.",
      });
      return;
    }

    validateEventDates(data, ctx);
  });

export type EventType = z.infer<typeof EventValidate>;

export type UpdateEventType = z.infer<typeof updateEventValidator>;

export type EventModeType = EventMode;

export type EventVisibilityType = EventVisibility;

export type EventStatusType = EventStatus;

export type RewardTypeValue = RewardType;
