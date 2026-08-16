export type EventCategory = "Hackathon" | "Workshop" | "Meetup" | "Talk" | "Bootcamp";
export type EventStatus = "ONGOING" | "UPCOMING" | "COMPLETED" | "CANCELLED";
export type EventMode = "Offline" | "Online";
export type EventVisibility = "Public" | "Private" | "Member Only";

export interface EventItem {
  id: string;
  title: string;
  isLive?: boolean;
  category: EventCategory;
  tags: string[];
  date: string;
  time: string;
  venue: string;
  location: string;
  mode: EventMode;
  status: EventStatus;
  visibility: EventVisibility;
  registrations: number;
  maxRegistrations: number;
  percentage: number;
  bannerTitle: string;
  bannerColor?: string;
  description?: string;
  speakers?: string[];
}

export interface EventStats {
  totalEvents: { value: number; trend: string };
  upcomingEvents: { value: number; label: string };
  ongoingEvents: { value: number; label: string };
  completedEvents: { value: number; label: string };
  cancelledEvents: { value: number; label: string };
}

export const initialEventStats: EventStats = {
  totalEvents: { value: 24, trend: "▲ 6 this month" },
  upcomingEvents: { value: 8, label: "Starting soon" },
  ongoingEvents: { value: 3, label: "• Live now" },
  completedEvents: { value: 13, label: "This year" },
  cancelledEvents: { value: 2, label: "• This year" },
};

export const initialEventsList: EventItem[] = [
  {
    id: "evt-1",
    title: "Jharkhand Tech Summit 2026",
    isLive: true,
    category: "Hackathon",
    tags: ["Hackathon", "AI", "AgriTech", "+3"],
    date: "15 - 16 Jul 2026",
    time: "11:00 AM - 6:30 PM",
    venue: "BIT Mesra Main Auditorium",
    location: "BIT Mesra, Ranchi",
    mode: "Offline",
    status: "ONGOING",
    visibility: "Public",
    registrations: 256,
    maxRegistrations: 300,
    percentage: 85,
    bannerTitle: "JHARKHAND TECH SUMMIT 2026",
    bannerColor: "from-[#1d1b4b] to-[#311042]",
    description:
      "State-level premier developer summit bringing together 300+ developers, student innovators, and industry leaders across AI, Cloud, and Web3.",
    speakers: ["Tushar Raj", "Vikas Shukla", "Aman Dangi"],
  },
  {
    id: "evt-2",
    title: "MERN Stack Workshop",
    isLive: false,
    category: "Workshop",
    tags: ["Workshop", "Web Dev", "Beginner"],
    date: "22 Jun 2026",
    time: "10:00 AM - 2:00 PM",
    venue: "GDG Ranchi Office",
    location: "GDG Ranchi Office",
    mode: "Offline",
    status: "UPCOMING",
    visibility: "Public",
    registrations: 42,
    maxRegistrations: 50,
    percentage: 84,
    bannerTitle: "MERN STACK WORKSHOP",
    bannerColor: "from-[#0f2838] to-[#151f33]",
    description:
      "Hands-on building with React 19, Node.js, Express, and MongoDB. Learn full-stack CRUD, JWT auth, and deployment on Google Cloud Run.",
    speakers: ["Abhishek Gupta", "Priya Sharma"],
  },
  {
    id: "evt-3",
    title: "Dev Connect Meetup",
    isLive: false,
    category: "Meetup",
    tags: ["Meetup", "Community", "Networking"],
    date: "5 Jun 2026",
    time: "6:00 PM - 9:00 PM",
    venue: "Oorja Cafe",
    location: "Oorja Cafe, Ranchi",
    mode: "Offline",
    status: "COMPLETED",
    visibility: "Public",
    registrations: 78,
    maxRegistrations: 80,
    percentage: 98,
    bannerTitle: "DEV CONNECT MEETUP",
    bannerColor: "from-[#28163d] to-[#1a1230]",
    description:
      "Casual evening networking, lightning tech talks, and open mic for developers, tech founders, and open-source contributors.",
    speakers: ["Rishav Sinha", "Ananya Roy"],
  },
  {
    id: "evt-4",
    title: "AI in Action - Tech Talk",
    isLive: false,
    category: "Talk",
    tags: ["Talk", "AI", "Tech"],
    date: "28 May 2026",
    time: "7:00 PM - 8:30 PM",
    venue: "Online",
    location: "Online Event",
    mode: "Online",
    status: "COMPLETED",
    visibility: "Public",
    registrations: 124,
    maxRegistrations: 150,
    percentage: 83,
    bannerTitle: "AI IN ACTION TECH TALK",
    bannerColor: "from-[#143321] to-[#102419]",
    description:
      "Exploring multimodal Gemini 2.0 Flash models, structured outputs, agentic workflows, and deploying LLM pipelines with Vertex AI.",
    speakers: ["Deepankar Sen", "Tushar Raj"],
  },
  {
    id: "evt-5",
    title: "Cloud Native Bootcamp",
    isLive: false,
    category: "Workshop",
    tags: ["Workshop", "Cloud", "Advanced"],
    date: "10 May 2026",
    time: "10:00 AM - 5:00 PM",
    venue: "GDG Ranchi Office",
    location: "GDG Ranchi Office",
    mode: "Offline",
    status: "CANCELLED",
    visibility: "Member Only",
    registrations: 18,
    maxRegistrations: 40,
    percentage: 45,
    bannerTitle: "CLOUD NATIVE BOOTCAMP",
    bannerColor: "from-[#1e2330] to-[#151821]",
    description:
      "Deep dive into Kubernetes, Docker containerization, CI/CD with Cloud Build, and microservices observability with Google Cloud Monitoring.",
    speakers: ["Vikas Shukla"],
  },
  {
    id: "evt-6",
    title: "Flutter Forward Hands-on",
    isLive: false,
    category: "Workshop",
    tags: ["Workshop", "Flutter", "Mobile"],
    date: "18 Apr 2026",
    time: "11:00 AM - 3:00 PM",
    venue: "IIM Ranchi Auditorium",
    location: "IIM Ranchi",
    mode: "Offline",
    status: "COMPLETED",
    visibility: "Public",
    registrations: 95,
    maxRegistrations: 100,
    percentage: 95,
    bannerTitle: "FLUTTER FORWARD",
    bannerColor: "from-[#112438] to-[#1c3047]",
    description: "Cross-platform mobile development with Flutter 3 and Dart.",
    speakers: ["Aman Raj"],
  },
  {
    id: "evt-7",
    title: "Women Techmakers Ranchi Summit",
    isLive: false,
    category: "Meetup",
    tags: ["WTM", "Diversity", "Leadership"],
    date: "08 Mar 2026",
    time: "10:00 AM - 4:00 PM",
    venue: "Chanakya BNR Hotel",
    location: "Station Road, Ranchi",
    mode: "Offline",
    status: "COMPLETED",
    visibility: "Public",
    registrations: 110,
    maxRegistrations: 120,
    percentage: 92,
    bannerTitle: "WTM RANCHI SUMMIT",
    bannerColor: "from-[#381c33] to-[#251022]",
    description: "Celebrating women in tech with inspiring keynotes and panel discussions.",
    speakers: ["Priya Sharma", "Neha Kumari"],
  },
  {
    id: "evt-8",
    title: "Android 15 Architecture Deep Dive",
    isLive: false,
    category: "Talk",
    tags: ["Talk", "Android", "Kotlin"],
    date: "02 Feb 2026",
    time: "6:30 PM - 8:00 PM",
    venue: "Online",
    location: "Google Meet",
    mode: "Online",
    status: "COMPLETED",
    visibility: "Public",
    registrations: 140,
    maxRegistrations: 160,
    percentage: 88,
    bannerTitle: "ANDROID 15 TALK",
    bannerColor: "from-[#1a3826] to-[#13261a]",
    description: "Jetpack Compose navigation, MVI architecture, and performance benchmarking.",
    speakers: ["Ankita Roy"],
  },
];
