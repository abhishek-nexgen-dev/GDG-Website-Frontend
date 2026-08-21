export type CampaignStatus = "Sent" | "Scheduled" | "Draft" | "Sending" | "Failed";

export type AudienceType =
  | "All Members"
  | "Event Attendees"
  | "Hackathon Participants"
  | "Core Volunteers"
  | "Speakers & Mentors"
  | "Custom Bulk List";

export interface EmailCampaignItem {
  id: string;
  title: string;
  subject: string;
  previewText: string;
  audience: AudienceType;
  recipientCount: number;
  deliveredCount: number;
  deliveryRate: string;
  openedCount: number;
  openRate: string;
  clickedCount: number;
  clickRate: string;
  bouncedCount: number;
  status: CampaignStatus;
  sentDate?: string;
  scheduledDate?: string;
  senderName: string;
  senderEmail: string;
  tags?: string[];
  content?: string;
}

export interface EmailStats {
  totalSent: { value: string; trend: string };
  deliveryRate: { value: string; trend: string };
  openRate: { value: string; trend: string };
  clickRate: { value: string; trend: string };
  bouncedRate: { value: string; trend: string };
}

export interface EmailTemplate {
  id: string;
  name: string;
  category: string;
  subject: string;
  content: string;
}

export const initialEmailStats: EmailStats = {
  totalSent: { value: "48,250", trend: "▲ 12.4% this month" },
  deliveryRate: { value: "99.2%", trend: "▲ 0.4% delivery" },
  openRate: { value: "42.8%", trend: "▲ 5.2% vs average" },
  clickRate: { value: "18.6%", trend: "▲ 2.1% CTR" },
  bouncedRate: { value: "0.8%", trend: "▼ 0.2% reduced" },
};

export const emailTemplates: EmailTemplate[] = [
  {
    id: "tpl-1",
    name: "Event Announcement",
    category: "Events",
    subject: "🚀 Join us for {{event_name}} at GDG Ranchi!",
    content: `Hi {{name}},

We are thrilled to invite you to our upcoming flagship event: **{{event_name}}**!

📅 Date: {{date}}
📍 Venue: {{venue}}

Reserve your free ticket now before seats fill up.

See you there!
The GDG Ranchi Team`,
  },
  {
    id: "tpl-2",
    name: "Hackathon Confirmation & Ticket",
    category: "Hackathon",
    subject: "🎟️ Your Ticket & Instructions for {{event_name}}",
    content: `Hello {{name}},

Congratulations! Your registration for **{{event_name}}** is confirmed.

Your Ticket ID: **{{ticket_id}}**
Check-in Time: 9:00 AM IST

Please bring your college/work ID card and laptop.

Happy Hacking!
GDG Ranchi Team`,
  },
  {
    id: "tpl-3",
    name: "Monthly Community Newsletter",
    category: "Newsletter",
    subject: "⚡ GDG Ranchi Highlights & Upcoming Tech Talks (July Edition)",
    content: `Hey {{name}},

Here is what went down at GDG Ranchi this past month!

🔥 Top Highlights:
- Over 600+ developers joined our AI Workshop.
- New open-source contributions to community projects.
- Upcoming Flutter & Android Study Jams.

Read the full report on our website.

Cheers,
GDG Ranchi Lead`,
  },
  {
    id: "tpl-4",
    name: "Certificate of Participation",
    category: "Certificates",
    subject: "🏆 Your Certificate for Attending {{event_name}}",
    content: `Dear {{name}},

Thank you for being part of **{{event_name}}**!

We truly appreciate your active enthusiasm and participation. You can download and verify your official digital certificate from the link below:

🔗 {{certificate_link}}

Keep building!
GDG Ranchi Community`,
  },
];

export const initialCampaignsList: EmailCampaignItem[] = [
  {
    id: "cmp-101",
    title: "Jharkhand Tech Summit 2026 - Registration Open",
    subject: "🚀 Registrations Now Open for Jharkhand Tech Summit 2026!",
    previewText:
      "Join 1,000+ developers at BIT Mesra for 24 hours of non-stop coding, talks, and swag.",
    audience: "All Members",
    recipientCount: 2850,
    deliveredCount: 2835,
    deliveryRate: "99.5%",
    openedCount: 1420,
    openRate: "50.1%",
    clickedCount: 685,
    clickRate: "24.2%",
    bouncedCount: 15,
    status: "Sent",
    sentDate: "16 Jul 2026, 10:30 AM",
    senderName: "GDG Ranchi Team",
    senderEmail: "team@gdgranchi.in",
    tags: ["JTS 2026", "Announcement", "Summit"],
  },
  {
    id: "cmp-102",
    title: "Hackathon Check-in & Rules Guide",
    subject: "📋 Important Instructions & Check-in QR for Hackathon 2026",
    previewText: "Please read before arriving at BIT Mesra tomorrow morning.",
    audience: "Hackathon Participants",
    recipientCount: 450,
    deliveredCount: 448,
    deliveryRate: "99.6%",
    openedCount: 395,
    openRate: "88.2%",
    clickedCount: 290,
    clickRate: "64.7%",
    bouncedCount: 2,
    status: "Sent",
    sentDate: "14 Jul 2026, 06:00 PM",
    senderName: "Abhishek Gupta",
    senderEmail: "abhishek@gdgranchi.in",
    tags: ["Instructions", "Hackathon"],
  },
  {
    id: "cmp-103",
    title: "MERN Stack Workshop Confirmation & Setup",
    subject: "💻 Prerequisites & Setup Guide: MERN Stack Workshop",
    previewText: "Make sure Node.js v20 and MongoDB Compass are installed on your machine.",
    audience: "Event Attendees",
    recipientCount: 220,
    deliveredCount: 218,
    deliveryRate: "99.1%",
    openedCount: 135,
    openRate: "61.9%",
    clickedCount: 78,
    clickRate: "35.8%",
    bouncedCount: 2,
    status: "Sent",
    sentDate: "21 Jun 2026, 04:15 PM",
    senderName: "Priya Sharma",
    senderEmail: "priya@gdgranchi.in",
    tags: ["MERN", "Workshop", "Prerequisites"],
  },
  {
    id: "cmp-104",
    title: "Post-Event Survey & Feedback Form",
    subject: "🌟 We'd love your feedback on Dev Connect Meetup!",
    previewText: "Help us make future GDG Ranchi meetups even better. Takes only 2 minutes.",
    audience: "Event Attendees",
    recipientCount: 95,
    deliveredCount: 95,
    deliveryRate: "100%",
    openedCount: 52,
    openRate: "54.7%",
    clickedCount: 34,
    clickRate: "35.8%",
    bouncedCount: 0,
    status: "Sent",
    sentDate: "06 Jun 2026, 11:00 AM",
    senderName: "GDG Ranchi Team",
    senderEmail: "team@gdgranchi.in",
    tags: ["Feedback", "Survey"],
  },
  {
    id: "cmp-105",
    title: "AI in Action: Tech Talk Reminder & Stream Link",
    subject: "🔴 Live in 1 Hour: AI in Action – Real-world AI Applications",
    previewText: "Join YouTube live stream or join us at GDG auditorium in Ranchi.",
    audience: "All Members",
    recipientCount: 2850,
    deliveredCount: 0,
    deliveryRate: "0%",
    openedCount: 0,
    openRate: "0%",
    clickedCount: 0,
    clickRate: "0%",
    bouncedCount: 0,
    status: "Scheduled",
    scheduledDate: "28 Aug 2026, 03:00 PM",
    senderName: "Abhishek Gupta",
    senderEmail: "abhishek@gdgranchi.in",
    tags: ["AI", "Live Stream", "Reminder"],
  },
  {
    id: "cmp-106",
    title: "Core Volunteers Briefing & Logistics Call",
    subject: "🤝 Core Team Meeting: JTS 2026 Logistics & Stage Prep",
    previewText: "Google Meet link for tomorrow 8:00 PM sync call.",
    audience: "Core Volunteers",
    recipientCount: 32,
    deliveredCount: 0,
    deliveryRate: "0%",
    openedCount: 0,
    openRate: "0%",
    clickedCount: 0,
    clickRate: "0%",
    bouncedCount: 0,
    status: "Draft",
    senderName: "Priya Sharma",
    senderEmail: "priya@gdgranchi.in",
    tags: ["Internal", "Volunteers"],
  },
  {
    id: "cmp-107",
    title: "Cloud Native Bootcamp Early Bird Invites",
    subject: "☁️ Exclusive Early Access: Google Cloud Native Bootcamp",
    previewText: "Get certified with free GCP credits and hands-on labs.",
    audience: "Custom Bulk List",
    recipientCount: 500,
    deliveredCount: 0,
    deliveryRate: "0%",
    openedCount: 0,
    openRate: "0%",
    clickedCount: 0,
    clickRate: "0%",
    bouncedCount: 0,
    status: "Draft",
    senderName: "GDG Ranchi Team",
    senderEmail: "team@gdgranchi.in",
    tags: ["GCP", "Cloud", "Early Access"],
  },
];
