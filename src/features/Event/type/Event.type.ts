// Event.type.ts

import type { EventCategory } from "../data/events.data";

// ============================================================
// ENUM / BASIC TYPES
// ============================================================

export type EventMode = "ONLINE" | "OFFLINE" | "HYBRID";

export type EventVisibility = "public" | "private" | "unlisted";

export type EventStatus =
  "REGISTRATION_OPEN" | "REGISTRATION_CLOSED" | "LIVE" | "COMPLETED" | "CANCELLED";

// ============================================================
// VENUE
// ============================================================

export interface EventVenue {
  mode: EventMode;

  venueName: string;

  address: string;

  city: string;

  state: string;

  country: string;

  latitude?: number;

  longitude?: number;
}

// ============================================================
// TICKET
// ============================================================

export interface EventTicket {
  name: string;

  price: number;

  quantity: number;
}

// ============================================================
// TIMELINE
// ============================================================

export interface EventTimelineItem {
  title: string;

  startAt: string;

  endAt: string;
}

export interface EventFormData {
  communityId?: string;

  title: string;

  shortDescription: string;

  descriptionMarkdown: string;

  category: string;

  visibility: EventVisibility | "";

  status: string;

  coverImageUrl: string;

  introVideoUrl: string;

  redirectUrl: string;

  registrationStartAt: string;

  registrationEndAt: string;

  venue: EventVenue;

  mentors?: string[];

  judges?: string[];

  partners?: string[];

  sponsors?: string[];

  tickets?: EventTicket[];

  timeline: EventTimelineItem[];

  rules: string[];

  requirements: string[];
}

export type CreateEventData = EventFormData;

export interface UpdateEventData {
  communityId?: string;

  title?: string;

  shortDescription?: string;

  descriptionMarkdown?: string;

  redirectUrl?: string;

  tags?: string[];

  category?: string;

  visibility?: EventVisibility;

  status?: EventStatus;

  coverImageUrl?: string;

  introVideoUrl?: string;

  registrationStartAt?: string;

  registrationEndAt?: string;

  venue?: Partial<EventVenue>;

  mentors?: string[];

  judges?: string[];

  partners?: string[];

  sponsors?: string[];

  tickets?: EventTicket[];

  timeline?: EventTimelineItem[];

  rules?: string[];

  requirements?: string[];
}

export interface EventResponse {
  _id?: string;
  Slug?: string;

  communityId?: string;

  title: string;

  shortDescription: string;

  descriptionMarkdown: string;

  redirectUrl?: string;

  tags: string[];

  category: string;

  visibility: EventVisibility;

  status: EventStatus;

  coverImageUrl: string;

  introVideoUrl?: string;

  registrationStartAt: string;

  registrationEndAt: string;

  venue: EventVenue;

  mentors?: string[];

  judges?: string[];

  partners?: string[];

  sponsors?: string[];

  tickets?: EventTicket[];

  timeline: EventTimelineItem[];

  rules: string[];

  requirements: string[];

  createdAt?: string;

  updatedAt?: string;
}

export interface ApiVenue {
  venueName: string;
  address: string;
}

export interface findAllEventResponse {
  Slug: string;
  title: string;
  isLive?: boolean;
  category: EventCategory;
  tags?: string[];
  registrationStartAt: string;

  venue: {
    venueName: string;
    address: string;
  };
  coverImageUrl: string;

  status: EventStatus;
  visibility: EventVisibility;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: findAllEventResponse[];
}

export interface EventItem {
  Slug: string;
  title: string;
  isLive?: boolean;
  category: EventCategory;
  tags?: string[];
  registrationStartAt: string;

  venue: {
    venueName: string;
    address: string;
  };
  coverImageUrl: string;

  status: EventStatus;
  visibility: EventVisibility;
}

export interface EventStats {
  totalEvents: { value: number; trend: string };
  upcomingEvents: { value: number; label: string };
  ongoingEvents: { value: number; label: string };
  completedEvents: { value: number; label: string };
  cancelledEvents: { value: number; label: string };
}
