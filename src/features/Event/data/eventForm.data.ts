import type { EventFormData } from "../type/Event.type";

export const initialEventFormData: EventFormData = {
  title: "",

  shortDescription: "",

  category: "",

  visibility: "",

  status: "REGISTRATION_OPEN",

  descriptionMarkdown: "",

  coverImageUrl: "",

  introVideoUrl: "",

  redirectUrl: "",

  registrationStartAt: "",

  registrationEndAt: "",

  // ==============================
  // VENUE
  // ==============================

  venue: {
    mode: "OFFLINE",

    venueName: "",

    address: "",

    city: "Ranchi",

    state: "Jharkhand",

    country: "India",

    latitude: undefined,

    longitude: undefined,
  },

  // ==============================
  // TIMELINE
  // ==============================

  timeline: [
    {
      title: "Registration Closed",

      startAt: "2026-07-14T23:59",

      endAt: "2026-07-14T23:59",
    },

    {
      title: "Team Formation",

      startAt: "2026-07-15T08:00",

      endAt: "2026-07-15T09:00",
    },

    {
      title: "Opening Ceremony",

      startAt: "2026-07-15T09:30",

      endAt: "2026-07-15T10:30",
    },

    {
      title: "Hackathon Starts (LIVE)",

      startAt: "2026-07-15T11:00",

      endAt: "2026-07-16T11:00",
    },
  ],

  // ==============================
  // RULES
  // ==============================

  rules: [
    "Each team must have 2 to 4 members.",

    "Participants must carry a valid college ID.",

    "All code must be written during the event.",
  ],

  // ==============================
  // REQUIREMENTS
  // ==============================

  requirements: ["Laptop with 8GB+ RAM", "Valid ID Card", "Git/GitHub account"],
};
