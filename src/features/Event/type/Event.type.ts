export interface EventPerson {
  _id: string;
  name: string;
  role: string;
  image?: string;
}

export interface EventOrganization {
  _id: string;
  name: string;
  role: string;
  logo?: string;
}

export interface EventTimeline {
  _id: string;
  title: string;
  description: string;
  startAt: string;
  endAt: string;
}

export interface EventVenue {
  mode: "OFFLINE" | "ONLINE" | "HYBRID";
  venueName: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

export interface EventData {
  _id: string;
  Slug: string;
  communityId: string;
  createdBy: string;

  title: string;
  shortDescription: string;
  descriptionMarkdown: string;

  redirectUrl?: string;
  introVideoUrl?: string;

  tags: string[];
  category: string;
  visibility: string;
  status: string;

  coverImageUrl: string;

  registrationStartAt: string;
  registrationEndAt: string;

  venue: EventVenue;

  mentors: EventPerson[];
  judges: EventPerson[];

  partners: EventOrganization[];
  sponsors: EventOrganization[];

  timeline: EventTimeline[];

  rules: string[];
  requirements: string[];

  tickets: unknown[];

  createdAt: string;
  updatedAt: string;
}
