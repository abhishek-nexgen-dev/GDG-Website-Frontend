import type { EventResponse } from "../type/Event.type";

export const singleEventData: EventResponse = {
  _id: "6a5cc0b1653c4a80abc2a622",
  Slug: "jharkhand-tech-summit-2026-25b39a0a",
  title: "Jharkhand Tech Summit 2026",
  shortDescription: "A 24-hour live hackathon happening now in Ranchi focusing on AgriTech and FinTech solutions.",
  descriptionMarkdown: "# 🚀 Jharkhand Tech Summit 2026 (LIVE)\n\nJoin us live at BIT Mesra for an intense 24-hour coding marathon.\n\n## What's Happening Now\n- 💻 **Live Coding**: Teams are building solutions for local farmers.\n- 🤖 **AI Integration**: Real-time mentorship on LLMs.\n- ☁️ **Cloud Deployment**: Live demos on AWS.\n- 🏆 **Prizes**: ₹5 Lakh in cash prizes.\n\n**Status**: The hackathon is currently in progress. Check-ins ended 2 hours ago.",
  redirectUrl: "https://jharkhandtechsummit.dev/live",
  tags: [
    "Hackathon",
    "AgriTech",
    "FinTech",
    "AI",
    "Web3"
  ],
  category: "Hackathon",
  visibility: "public",
  status: "LIVE",
  coverImageUrl: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,dpr_3,f_auto,g_center,h_175,q_auto:good,w_175/v1/gcs/platform-data-dsc/events/Screenshot%202025-01-20%20202951.png",
  registrationStartAt: "2026-03-10T10:00:00Z",
  registrationEndAt: "2026-03-24T18:00:00Z",
  venue: {
    mode: "OFFLINE",
    venueName: "BIT Mesra, Ranchi",
    address: "Birla Institute of Technology",
    city: "Ranchi",
    state: "Jharkhand",
    country: "India"
  },
  mentors: [
    {
      _id: "mentor-1",
      firstName: "Aarav",
      lastName: "Mehta",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      Bio: "Specializing in Large Language Models, Generative AI workflows, and distributed inference architectures.",
      role: "Staff AI Engineer",
      company: "Google",
      socialLinks: {
        linkedin: "https://linkedin.com/in/aaravmehta",
        github: "https://github.com/aaravmehta",
        twitter: "https://twitter.com/aaravmehta",
        website: "https://aarav.dev",
      },
    },
    {
      _id: "mentor-2",
      firstName: "Priya",
      lastName: "Sharma",
      imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80",
      Bio: "Architecting cloud-native microservices, Kubernetes clusters, and high-throughput serverless systems.",
      role: "Cloud Solutions Architect",
      company: "Microsoft",
      socialLinks: {
        linkedin: "https://linkedin.com/in/priyasharma",
        github: "https://github.com/priyasharma",
        twitter: "https://twitter.com/priya_cloud",
      },
    },
    {
      _id: "mentor-3",
      firstName: "Rohan",
      lastName: "Verma",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
      Bio: "Full stack leader, Web Performance evangelist, and passionate open-source contributor in React & Next.js ecosystem.",
      role: "Lead Full Stack Architect",
      company: "Atlassian",
      socialLinks: {
        linkedin: "https://linkedin.com/in/rohanverma",
        github: "https://github.com/rohanverma",
        website: "https://rohan.design",
      },
    },
    {
      _id: "mentor-4",
      firstName: "Ananya",
      lastName: "Deshmukh",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
      Bio: "Guiding developers on secure software lifecycle, zero-trust infrastructure, and automated vulnerability scanning.",
      role: "Senior Security Specialist",
      company: "Cisco Systems",
      socialLinks: {
        linkedin: "https://linkedin.com/in/ananyadeshmukh",
        twitter: "https://twitter.com/ananya_sec",
      },
    },
  ],
  judges: [
    {
      _id: "judge-1",
      firstName: "Dr. Rajesh",
      lastName: "Kumar",
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
      Bio: "Professor of Computer Science & Dean of Innovation at BIT Mesra with 18+ years mentoring deep-tech startups.",
      role: "Head of Research & CS",
      company: "BIT Mesra",
      socialLinks: {
        linkedin: "https://linkedin.com/in/rajeshkumar",
        website: "https://bitmesra.ac.in",
      },
    },
    {
      _id: "judge-2",
      firstName: "Sneha",
      lastName: "Mukherjee",
      imageUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=500&auto=format&fit=crop&q=80",
      Bio: "Evaluating product viability, unit economics, and go-to-market scaling for early stage SaaS & FinTech innovators.",
      role: "Principal Product Director",
      company: "Razorpay",
      socialLinks: {
        linkedin: "https://linkedin.com/in/snehamukherjee",
        twitter: "https://twitter.com/sneha_pm",
      },
    },
    {
      _id: "judge-3",
      firstName: "Vikram",
      lastName: "Singhania",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
      Bio: "Early-stage angel investor backing developer tools, AI infrastructure, and decentralized ecosystems across India.",
      role: "Partner & Tech Investor",
      company: "Sequoia Capital (Peak XV)",
      socialLinks: {
        linkedin: "https://linkedin.com/in/vikramsinghania",
        twitter: "https://twitter.com/vikram_vc",
      },
    },
  ],
  timeline: [
    {
      title: "Opening Ceremony",
      description: "Kickoff and Keynote.",
      startAt: "2026-03-25T09:00:00Z",
      endAt: "2026-03-25T10:30:00Z"
    }
  ],
  rules: [
    "All code must be written during the hackathon.",
    "Teams can use open-source libraries.",
    "Max 4 members per team."
  ],
  requirements: [
    "Bring your own laptops.",
    "Valid student ID required for entry."
  ]
};
