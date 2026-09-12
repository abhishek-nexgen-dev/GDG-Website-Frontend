import { LayoutDashboard, Calendar, Images, Image, Users, Mail } from "lucide-react";

export interface SideBarItem {
  label: string;
  link: string;
  icon: typeof LayoutDashboard;
  subItems?: { label: string; link: string; permissionName?: string; permissionAction?: string }[];
  permissionName?: string;
  permissionAction?: string;
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
    permissionName: "event:view",
    permissionAction: "read",
    subItems: [
      { label: "Manage Events", link: "/member/events", permissionName: "event:view", permissionAction: "read" },
      { label: "Create Event", link: "/member/events/create", permissionName: "event:create", permissionAction: "create" },
    ],
  },
  {
    label: "Albums",
    link: "/member/albums",
    icon: Images,
    permissionName: "gallery:view",
    permissionAction: "read",
    subItems: [
      { label: "Manage Albums", link: "/member/albums", permissionName: "gallery:view", permissionAction: "read" },
      { label: "Create Album", link: "/member/albums/create", permissionName: "gallery:create", permissionAction: "create" },
    ],
  },
  {
    label: "Images",
    link: "/member/images",
    icon: Image,
    permissionName: "gallery:image:view",
    permissionAction: "read",
    subItems: [
      { label: "Manage Images", link: "/member/images", permissionName: "gallery:image:view", permissionAction: "read" },
      { label: "Upload Images", link: "/member/images/upload", permissionName: "gallery:image:upload", permissionAction: "create" },
    ],
  },
  {
    label: "Members",
    link: "/member/members",
    icon: Users,
    permissionName: "member:view",
    permissionAction: "read",
    subItems: [
      { label: "All Members", link: "/member/members", permissionName: "member:view", permissionAction: "read" },
      { label: "Add Member", link: "/member/create", permissionName: "member:create", permissionAction: "create" },
    ],
  },
  {
    label: "Emails",
    link: "/member/emails/send",
    icon: Mail,
    permissionName: "email:send",
    permissionAction: "create",
  },
];

export default sideBarConstant;
