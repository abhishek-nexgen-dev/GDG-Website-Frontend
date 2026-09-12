import { LayoutDashboard, Calendar, Images, Image, Users } from "lucide-react";
import {
  Event_Permissions,
  Gallery_Permissions,
  Member_Permissions,
} from "../../features/Permission/constant/Permission.constant";

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
    permissionName: Event_Permissions.VIEW_EVENT,
    permissionAction: "read",
    subItems: [
      { label: "Manage Events", link: "/member/events", permissionName: Event_Permissions.VIEW_EVENT, permissionAction: "read" },
      { label: "Create Event", link: "/member/events/create", permissionName: Event_Permissions.CREATE_EVENT, permissionAction: "create" },
    ],
  },
  {
    label: "Albums",
    link: "/member/albums",
    icon: Images,
    permissionName: Gallery_Permissions.VIEW_GALLERY,
    permissionAction: "read",
    subItems: [
      { label: "Manage Albums", link: "/member/albums", permissionName: Gallery_Permissions.VIEW_GALLERY, permissionAction: "read" },
      { label: "Create Album", link: "/member/albums/create", permissionName: Gallery_Permissions.CREATE_GALLERY, permissionAction: "create" },
    ],
  },
  {
    label: "Images",
    link: "/member/images",
    icon: Image,
    permissionName: Gallery_Permissions.VIEW_IMAGE,
    permissionAction: "read",
    subItems: [
      { label: "Manage Images", link: "/member/images", permissionName: Gallery_Permissions.VIEW_IMAGE, permissionAction: "read" },
      { label: "Upload Images", link: "/member/images/upload", permissionName: Gallery_Permissions.UPLOAD_IMAGE, permissionAction: "create" },
    ],
  },
  {
    label: "Members",
    link: "/member/members",
    icon: Users,
    permissionName: Member_Permissions.VIEW_MEMBER,
    permissionAction: "read",
    subItems: [
      { label: "All Members", link: "/member/members", permissionName: Member_Permissions.VIEW_MEMBER, permissionAction: "read" },
      { label: "Add Member", link: "/member/create", permissionName: Member_Permissions.CREATE_MEMBER, permissionAction: "create" },
    ],
  },
];

export default sideBarConstant;
