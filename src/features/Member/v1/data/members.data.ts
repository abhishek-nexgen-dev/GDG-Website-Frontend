export type MemberRole = "Admin" | "Organizer" | "Member";
export type MemberStatus = "Active" | "Inactive" | "Offline";

export interface MemberItem {
  id: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  joinedOn: string;
  events: number;
  avatar: string;
  phone?: string;
  bio?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface MemberStats {
  totalMembers: { value: number; trend: string };
  activeMembers: { value: number; trend: string };
  organizers: { value: number; trend: string };
  newThisMonth: { value: number; trend: string };
  offlineMembers: { value: number; trend: string };
}

export const initialMemberStats: MemberStats = {
  totalMembers: { value: 120, trend: "▲ 12 this month" },
  activeMembers: { value: 89, trend: "▲ 8 this month" },
  organizers: { value: 12, trend: "▲ 2 this month" },
  newThisMonth: { value: 15, trend: "▲ 15 this month" },
  offlineMembers: { value: 31, trend: "▲ 4 this month" },
};

export const initialMembersList: MemberItem[] = [
  {
    id: "mem-1",
    name: "Abhishek Kumar",
    email: "abhishek@email.com",
    role: "Admin",
    status: "Active",
    joinedOn: "15 Jun 2025",
    events: 24,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43210",
    bio: "Lead Organizer & Community Architect at GDG Ranchi. Passionate about Cloud and AI systems.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-2",
    name: "Priya Sharma",
    email: "priya@email.com",
    role: "Organizer",
    status: "Active",
    joinedOn: "18 Jun 2025",
    events: 18,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43211",
    bio: "Co-organizer and WTM Ambassador. Focused on Web development and community outreach.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-3",
    name: "Rohit Verma",
    email: "rohit@email.com",
    role: "Member",
    status: "Active",
    joinedOn: "20 Jun 2025",
    events: 12,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43212",
    bio: "Full Stack Engineer interested in Next.js, Flutter, and serverless architectures.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-4",
    name: "Sneha Gupta",
    email: "sneha@email.com",
    role: "Member",
    status: "Active",
    joinedOn: "22 Jun 2025",
    events: 9,
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43213",
    bio: "UI/UX Designer & Frontend enthusiast who loves building accessible interfaces.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-5",
    name: "Aman Raj",
    email: "aman@email.com",
    role: "Member",
    status: "Inactive",
    joinedOn: "10 Jun 2025",
    events: 4,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43214",
    bio: "Mobile app developer exploring Jetpack Compose and Kotlin Multiplatform.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-6",
    name: "Vikash Kumar",
    email: "vikash@email.com",
    role: "Member",
    status: "Offline",
    joinedOn: "5 Jun 2025",
    events: 2,
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43215",
    bio: "Data Science student passionate about machine learning and TensorFlow.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-7",
    name: "Neha Kumari",
    email: "neha@email.com",
    role: "Member",
    status: "Inactive",
    joinedOn: "8 Jun 2025",
    events: 3,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43216",
    bio: "DevOps explorer and open source contributor passionate about Kubernetes and Docker.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-8",
    name: "Amit Patel",
    email: "amit.patel@email.com",
    role: "Organizer",
    status: "Active",
    joinedOn: "12 May 2025",
    events: 16,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43217",
    bio: "Cloud Architect and GDG Tech Lead managing hackathons and study jams.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-9",
    name: "Pooja Singh",
    email: "pooja.singh@email.com",
    role: "Member",
    status: "Active",
    joinedOn: "28 May 2025",
    events: 7,
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43218",
    bio: "Cybersecurity enthusiast and penetration tester.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-10",
    name: "Rahul Mishra",
    email: "rahul.mishra@email.com",
    role: "Member",
    status: "Offline",
    joinedOn: "02 Apr 2025",
    events: 5,
    avatar:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43219",
    bio: "Backend developer specializing in Golang and high performance APIs.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-11",
    name: "Ananya Roy",
    email: "ananya.roy@email.com",
    role: "Admin",
    status: "Active",
    joinedOn: "10 Jan 2025",
    events: 31,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43220",
    bio: "Community Manager and event producer with 5+ years organizing tech conferences.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-12",
    name: "Deepankar Sen",
    email: "deepankar@email.com",
    role: "Member",
    status: "Active",
    joinedOn: "14 Feb 2025",
    events: 11,
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43221",
    bio: "Generative AI researcher experimenting with Gemini APIs and LLM agents.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-13",
    name: "Kavita Rao",
    email: "kavita.rao@email.com",
    role: "Organizer",
    status: "Active",
    joinedOn: "01 Mar 2025",
    events: 15,
    avatar:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43222",
    bio: "Product Designer and speaker at DevFest Ranchi.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-14",
    name: "Siddharth Jha",
    email: "siddharth.jha@email.com",
    role: "Member",
    status: "Offline",
    joinedOn: "19 Mar 2025",
    events: 6,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43223",
    bio: "Blockchain and smart contract enthusiast.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    id: "mem-15",
    name: "Tanvi Saxena",
    email: "tanvi.saxena@email.com",
    role: "Member",
    status: "Active",
    joinedOn: "25 Apr 2025",
    events: 8,
    avatar:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43224",
    bio: "React and Next.js frontend engineer building accessible design systems.",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
];
