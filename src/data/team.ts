export interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: "Organizer" | "Co-Organizer" | "Core Team";
  image: string;
  color: string; // Google color code: e.g. '#4285F4'
  glowColors: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "aman-dangi",
    name: "Aman Dangi",
    role: "GDG Lead & Organizer",
    category: "Organizer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    color: "#4285F4",
    glowColors: ["#4285F4", "#3b82f6", "#93c5fd"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
  {
    id: "priya-sharma",
    name: "Priya Sharma",
    role: "Co-Organizer & WTM Lead",
    category: "Co-Organizer",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    color: "#EA4335",
    glowColors: ["#EA4335", "#ef4444", "#fca5a5"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: "rahul-verma",
    name: "Rahul Verma",
    role: "Core Team (Google Cloud)",
    category: "Core Team",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    color: "#FBBC05",
    glowColors: ["#FBBC05", "#f59e0b", "#fde047"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "ankita-roy",
    name: "Ankita Roy",
    role: "Core Team (Android & Mobile)",
    category: "Core Team",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    color: "#34A853",
    glowColors: ["#34A853", "#10b981", "#6ee7b7"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      github: "https://github.com",
    },
  },
];
