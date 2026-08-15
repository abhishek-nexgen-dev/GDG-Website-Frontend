import { LayoutDashboard, Images, Image, Users, Mail } from "lucide-react";

const sideBarConstant = [
  {
    label: "Dashboard",
    link: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Albums",
    link: "/albums",
    icon: Images,
  },
  {
    label: "Images",
    link: "/images",
    icon: Image,
  },
  {
    label: "Members",
    link: "/members",
    icon: Users,
  },
  {
    label: "Emails",
    link: "/emails",
    icon: Mail,
  },
];

export default sideBarConstant;
