export interface Event {
  id: string;
  title: string;
  bannerTitle: string;
  category: string;
  dateMonth: string;
  dateDay: string;
  location: string;
  attendees: string;
  bannerGradient: string;
  categoryColor: "blue" | "green" | "orange";
  glowColors: string[];
  avatars: string[];
}

export const events: Event[] = [
  {
    id: "devfest-2026",
    title: "DevFest Ranchi 2026",
    bannerTitle: "DEVFEST RANCHI 2026",
    category: "Conference",
    dateMonth: "NOV",
    dateDay: "22",
    location: "Shardaynand Hall, Ranchi",
    attendees: "285+ Going",
    bannerGradient: "from-purple-900 via-indigo-800 to-blue-900",
    categoryColor: "blue",
    glowColors: ["#818cf8", "#c084fc", "#4285F4"],
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "ai-study-jam",
    title: "AI Study Jam",
    bannerTitle: "AI Study Jam with Gemini",
    category: "Workshop",
    dateMonth: "OCT",
    dateDay: "05",
    location: "GDG Ranchi Office",
    attendees: "120+ Going",
    bannerGradient: "from-teal-900 via-emerald-800 to-green-950",
    categoryColor: "green",
    glowColors: ["#34A853", "#2dd4bf", "#C8FF3D"],
    avatars: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "build-firebase",
    title: "Build with Firebase",
    bannerTitle: "Build with Firebase",
    category: "Hands-on",
    dateMonth: "OCT",
    dateDay: "18",
    location: "Online",
    attendees: "85+ Going",
    bannerGradient: "from-orange-900 via-amber-800 to-rose-950",
    categoryColor: "orange",
    glowColors: ["#FBBC05", "#f97316", "#EA4335"],
    avatars: [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "cloud-jam",
    title: "Google Cloud Study Jam",
    bannerTitle: "Cloud Infrastructure Essentials",
    category: "Workshop",
    dateMonth: "DEC",
    dateDay: "02",
    location: "Ranchi Tech Hub",
    attendees: "160+ Going",
    bannerGradient: "from-blue-900 via-cyan-800 to-sky-950",
    categoryColor: "blue",
    glowColors: ["#4285F4", "#38bdf8", "#60a5fa"],
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    ],
  },
  {
    id: "android-summit",
    title: "Android Dev Bootcamp",
    bannerTitle: "Modern Android with Jetpack Compose",
    category: "Hands-on",
    dateMonth: "DEC",
    dateDay: "14",
    location: "Ranchi, Jharkhand",
    attendees: "210+ Going",
    bannerGradient: "from-emerald-900 via-green-800 to-teal-950",
    categoryColor: "green",
    glowColors: ["#34A853", "#A3E635", "#4ADE80"],
    avatars: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    ],
  },
];
