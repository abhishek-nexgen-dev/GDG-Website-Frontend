import type { EventStats } from "../type/Event.type";

export type EventCategory = "Hackathon" | "Workshop" | "Meetup" | "Talk" | "Bootcamp";
export type EventStatus = "ONGOING" | "UPCOMING" | "COMPLETED" | "CANCELLED";
export type EventMode = "Offline" | "Online";
export type EventVisibility = "Public" | "Private" | "Member Only";

export const initialEventStats: EventStats = {
  totalEvents: { value: 24, trend: "▲ 6 this month" },
  upcomingEvents: { value: 8, label: "Starting soon" },
  ongoingEvents: { value: 3, label: "• Live now" },
  completedEvents: { value: 13, label: "This year" },
  cancelledEvents: { value: 2, label: "• This year" },
};
