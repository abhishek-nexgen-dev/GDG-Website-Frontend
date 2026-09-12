import { FaGithub, FaLinkedinIn, } from "react-icons/fa";

export type SocialLink = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  department?: string; // used for sub-labels on leads
  team: string; // used for filtering regular members
  image: string;
  socialLinks: SocialLink[];
};

const teamMembers: TeamMember[] = [
  // CORE TEAM
  {
    id: 1,
    name: "Tushar Raj",
    role: "Chapter Lead",
    team: "Core",
    image: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/tushar_raj_mumONGR.jpg",
    socialLinks: [
      { name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com/" },
      { name: "GitHub", icon: <FaGithub />, href: "https://github.com/" },
    ],
  },
  {
    id: 2,
    name: "Vikas Shukla",
    role: "Technical Co-Lead",
    department: "Technical Programs & Developer Relations",
    team: "Core",
    image: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/vikas_shukla_uvKihz8.jpg",
    socialLinks: [
      { name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com/" },
      { name: "GitHub", icon: <FaGithub />, href: "https://github.com/" },
    ],
  },
  {
    id: 3,
    name: "Rishav Sinha",
    role: "Community Co-Lead",
    department: "Community & Outreach Lead",
    team: "Core",
    image: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/rishav_sinha_Parael5.png",
    socialLinks: [
      { name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com/" },
      { name: "GitHub", icon: <FaGithub />, href: "https://github.com/" },
    ],
  },

  // TEAM LEADS
  {
    id: 4,
    name: "Sneha Verma",
    role: "Event Lead",
    department: "Events & Experiences",
    team: "Leads",
    image: "https://imgs.search.brave.com/ijvuC2HomtbCaEOikn_Lxazuo8jAs-5i_cZTDYOQfJ4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4uc3RhYmxlZGlm/ZnVzaW9ud2ViLmNv/bS8yMDI2LzUvMTgv/YTg1OTcwYTUtMTQy/OC00ZWFiLWI3NmIt/MjVhZGJhMWQyMDhl/LndlYnA",
    socialLinks: [{ name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com/" }, { name: "GitHub", icon: <FaGithub />, href: "https://github.com/" }],
  },
  {
    id: 5,
    name: "Karan Mehta",
    role: "Content Lead",
    department: "Content & Design",
    team: "Leads",
    image: "https://imgs.search.brave.com/uR91XUWcb13rrp6r7r7yjmRBfGCepu_vBDlWawOqCfc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzA1L2Jm/LzdkLzA1YmY3ZDlh/OGQwZDYxN2UxMWUz/MDNiNDQ1OTIwY2E5/LmpwZw",
    socialLinks: [{ name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com/" }, { name: "GitHub", icon: <FaGithub />, href: "https://github.com/" }],
  },
  {
    id: 6,
    name: "Nikhil Raj",
    role: "Tech Lead",
    department: "Workshops & Tech",
    team: "Leads",
    image: "https://imgs.search.brave.com/csH8ZQs6Qqhgvvq8f_UQHg5ZhUsF7mH99hPeP1AlppM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lYXN5/LXBlYXN5LmFpL2Nk/bi1jZ2kvaW1hZ2Uv/cXVhbGl0eT05NSxm/b3JtYXQ9YXV0byx3/aWR0aD04MDAvaHR0/cHM6Ly9tZWRpYS5l/YXN5LXBlYXN5LmFp/LzI3ZmViMmJiLWFl/YjQtNGE4My05ZmI2/LThmM2YyYTE1ODg1/ZS9lN2MzMzY2NC1k/ZjRhLTQ4ZGYtOTAx/Mi0wZmJjNGY4OTM1/NDEucG5n",
    socialLinks: [{ name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com/" }, { name: "GitHub", icon: <FaGithub />, href: "https://github.com/" }],
  },
  {
    id: 7,
    name: "Muskan Gupta",
    role: "Partnerships Lead",
    department: "Partnerships & Sponsorships",
    team: "Leads",
    image: "https://imgs.search.brave.com/jvRYOjnJoFsWgS9n4eDam6vrtQFzqBGywjSpGPAMcjM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4uc3RhYmxlZGlm/ZnVzaW9ud2ViLmNv/bS8yMDI2LzUvOC83/ZGM0ZWUyYy03Y2Ji/LTQ5NjctOGRlOS1m/YzA4MzI2OTI1OWIu/d2VicA",
    socialLinks: [{ name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com/" }, { name: "GitHub", icon: <FaGithub />, href: "https://github.com/" }],
  },
  {
    id: 8,
    name: "Rohit Singh",
    role: "Operations Lead",
    department: "Operations & Logistics",
    team: "Leads",
    image: "https://imgs.search.brave.com/71Eflp7XOdwvqi7Rmuckmnbtl8CZeHPHgOeASMVSYfI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2VkLzE4/LzkxL2VkMTg5MTkx/ZGMyMjE2OWYwZTY3/ODZhODVmMDY4NjE2/LmpwZw",
    socialLinks: [{ name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com/" }, { name: "GitHub", icon: <FaGithub />, href: "https://github.com/" }],
  },
  {
    id: 9,
    name: "Ishita Rai",
    role: "PR & Social Lead",
    department: "Public Relations & Social",
    team: "Leads",
    image: "https://imgs.search.brave.com/xW8kNqR2r1RXUZ2XZZgVKt2wgS2av2Kmh5NYqyzdt5U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lYXN5/LXBlYXN5LmFpL2Nk/bi1jZ2kvaW1hZ2Uv/cXVhbGl0eT03MCxm/b3JtYXQ9YXV0byx3/aWR0aD01MDAvaHR0/cHM6Ly9tZWRpYS5l/YXN5LXBlYXN5LmFp/Lzc0OWM4ZGY1LWZk/YzAtNDAwYi1hZThi/LTI0OWVkNmU0NjJi/MC81NTQwMjkxMC0z/Mzk1LTRmYzMtYTk0/NC1iZDk2Yzg0Yzdi/M2YucG5n",
    socialLinks: [{ name: "LinkedIn", icon: <FaLinkedinIn />, href: "https://linkedin.com/" }, { name: "GitHub", icon: <FaGithub />, href: "https://github.com/" }],
  },

  // REGULAR MEMBERS
  {
    id: 10,
    name: "Aarav",
    role: "Member",
    team: "Events",
    image: "https://imgs.search.brave.com/-J4J__3VL9MYC_99RGxsGy4sotqDx__ETiMHqWiHgMw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzU2LzQw/L2RiLzU2NDBkYjRl/YjExZWE2MGQ3YTBj/NmE1NjVjYjlhYTBm/LmpwZw",
    socialLinks: [],
  },
  {
    id: 11,
    name: "Priya",
    role: "Member",
    team: "Content",
    image: "https://imgs.search.brave.com/iVoUMoovUSFcbIC2EwlVcbqQ_QCggDquYH4a4ltnO7A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjIw/NjUxNDY4My9waG90/by95b3VuZy13b21h/bi13aXRoLWxvbmct/YnJvd24taGFpci1h/bmQtc3RyYWJpc211/cy1zaG93aW5nLW5l/dXRyYWwtZXhwcmVz/c2lvbi1hZ2FpbnN0/LXdoaXRlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1hZXVl/X2ZvS3BndmFKdW5O/R2Z6cmh0M3puZEtN/TndXdGRUbHBBYllJ/akZ3PQ",
    socialLinks: [],
  },
  {
    id: 12,
    name: "Devansh",
    role: "Member",
    team: "Tech",
    image: "https://imgs.search.brave.com/PzKQn0mMBx6FGFvJ0jqxVRlN4DFhyLRz8I2-n7mfShs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2EyLzE2/LzZmL2EyMTY2ZmMz/YTkzYzhmNTUwZTU4/ZTdiODhhNDcwMTJi/LmpwZw",
    socialLinks: [],
  },
  {
    id: 13,
    name: "Simran",
    role: "Member",
    team: "Community",
    image: "https://imgs.search.brave.com/N9SVjC0GfoOZVLG1gRoq7ErEO5-pD7U9ns49ualFER0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzc5Lzc0LzQx/LzM2MF9GXzc5NzQ0/MTQ3X0N3R0lqSW9W/aWlJQWhsVktnWE5q/cVd0cmlnTHFjaGll/LmpwZw",
    socialLinks: [],
  },
  {
    id: 14,
    name: "Harsh",
    role: "Member",
    team: "Design",
    image: "https://imgs.search.brave.com/G2idHk9f7hGJTsWXEnEE4qjkv2mdLngwt133RwbsxR4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWdj/ZG4uc3RhYmxlZGlm/ZnVzaW9ud2ViLmNv/bS8yMDI2LzYvMy80/MTZmY2M0NS1hNmI0/LTRlZGUtODQzOS0x/MzRmMTY4MjNjZDgu/d2VicA",
    socialLinks: [],
  },
  {
    id: 15,
    name: "Ananya",
    role: "Member",
    team: "Operations",
    image: "https://imgs.search.brave.com/fzoLKpvcs7L9lXkfT-FVXrKE7I_h9qrBz-CG4FbG1j0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzk4L2I2/LzIwLzk4YjYyMDFl/OGY5M2Y4ZjU1ODM4/NTVlZTgzM2M5YThi/LmpwZw",
    socialLinks: [],
  },
  {
    id: 16,
    name: "Vivek",
    role: "Member",
    team: "Outreach",
    image: "https://imgs.search.brave.com/xVZIELqDnM7n2zc1RJDdkcslXjYPLHzUMpXlp5T6yaA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wYXNz/cG9ydC1waWN0dXJl/LW1vZGVybi1hZnJp/Y2FuLXdvbWFuLWlz/b2xhdGVkLXdoaXRl/LWJhY2tncm91bmQt/Y3V0LW91dC01ODUy/MDIzOC5qcGc",
    socialLinks: [],
  },
  {
    id: 17,
    name: "Tanya",
    role: "Member",
    team: "PR",
    image: "https://imgs.search.brave.com/jRlRzBnnSILE_hOE4d0hOT4NR4h2twq8Cr1tq0YWY5M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMzY2/NTIwMjkvcGV4ZWxz/LXBob3RvLTM2NjUy/MDI5L2ZyZWUtcGhv/dG8tb2YtcHJvZmVz/c2lvbmFsLXBvcnRy/YWl0LW9mLXlvdW5n/LWFkdWx0LW1hbGUu/anBlZz9hdXRvPWNv/bXByZXNzJmNzPXRp/bnlzcmdiJmRwcj0x/Jnc9NTAw",
    socialLinks: [],
  },
];

export default teamMembers;
