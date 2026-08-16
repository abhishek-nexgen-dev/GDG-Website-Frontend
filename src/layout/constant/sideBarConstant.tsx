import { LayoutDashboard, Calendar, Images, Image, Users, Mail } from "lucide-react";

export interface SideBarItem {
  label: string;
  link: string;
  icon: typeof LayoutDashboard;
  subItems?: { label: string; link: string }[];
}

const sideBarConstant: SideBarItem[] = [
  {
    label: "Dashboard",
    link: "/member/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Events",
    link: "/member/events",
    icon: Calendar,
    subItems: [
      { label: "Manage Events", link: "/member/events" },
      { label: "Create Event", link: "/member/events/create" },
    ],
  },
  {
    label: "Albums",
    link: "/member/albums",
    icon: Images,
    subItems: [
      { label: "Manage Albums", link: "/member/albums" },
      { label: "Create Album", link: "/member/albums/create" },
    ],
  },
  {
    label: "Images",
    link: "/member/images",
    icon: Image,
    subItems: [
      { label: "Manage Images", link: "/member/images" },
      { label: "Upload Images", link: "/member/images/upload" },
    ],
  },
  {
    label: "Members",
    link: "/member/members",
    icon: Users,
  },
  {
    label: "Emails",
    link: "/member/emails",
    icon: Mail,
    subItems: [
      { label: "Campaigns", link: "/member/emails" },
      { label: "Send Bulk Email", link: "/member/emails/send" },
    ],
  },
];

export default sideBarConstant;
