import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import type { TeamMember } from "../Constant/Team.Constant";
import React, { useRef } from "react";

// Map roles/teams to their specific glow colors
export const ROLE_COLORS: Record<string, string> = {
  "Chapter Lead": "from-blue-600",
  "Technical Co-Lead": "from-green-600",
  "Community Co-Lead": "from-yellow-600",
  "Event Lead": "from-purple-600",
  "Content Lead": "from-blue-600",
  "Tech Lead": "from-red-600",
  "Partnerships Lead": "from-green-600",
  "Operations Lead": "from-yellow-600",
  "PR & Social Lead": "from-purple-600",
  // Fallbacks for teams
  "Events": "from-purple-600",
  "Content": "from-blue-600",
  "Tech": "from-red-600",
  "Partnerships": "from-green-600",
  "Operations": "from-yellow-600",
  "PR": "from-purple-600",
  "Community": "from-orange-600",
  "Design": "from-pink-600",
  "Outreach": "from-teal-600",
};

export const BADGE_COLORS: Record<string, string> = {
  "Chapter Lead": "bg-blue-600 text-white",
  "Technical Co-Lead": "bg-green-600 text-white",
  "Community Co-Lead": "bg-yellow-600 text-black",
  "Event Lead": "bg-purple-600 text-white",
  "Content Lead": "bg-blue-600 text-white",
  "Tech Lead": "bg-red-600 text-white",
  "Partnerships Lead": "bg-green-600 text-white",
  "Operations Lead": "bg-yellow-600 text-black",
  "PR & Social Lead": "bg-purple-600 text-white",
  // Fallbacks for teams
  "Events": "bg-purple-600 text-white",
  "Content": "bg-blue-600 text-white",
  "Tech": "bg-red-600 text-white",
  "Partnerships": "bg-green-600 text-white",
  "Operations": "bg-yellow-600 text-black",
  "PR": "bg-purple-600 text-white",
  "Community": "bg-orange-600 text-white",
  "Design": "bg-pink-600 text-white",
  "Outreach": "bg-teal-600 text-white",
};

export const BentoTeamCard = ({ member }: { member: TeamMember }) => {
  const glowColor = ROLE_COLORS[member.role] || ROLE_COLORS[member.team] || "from-gray-600";
  const badgeClass = BADGE_COLORS[member.role] || BADGE_COLORS[member.team] || "bg-gray-600 text-white";

  const ref = useRef<HTMLDivElement>(null);

  const xPct = useMotionValue(0);
  const yPct = useMotionValue(0);
  
  // Raw pixel coordinates for the mask
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const mouseXSpring = useSpring(xPct, { damping: 20, stiffness: 150 });
  const mouseYSpring = useSpring(yPct, { damping: 20, stiffness: 150 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  // Template for the pixel hover mask
  const maskImage = useMotionTemplate`radial-gradient(250px circle at ${rawX}px ${rawY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    xPct.set(mouseX / width - 0.5);
    yPct.set(mouseY / height - 0.5);
    rawX.set(mouseX);
    rawY.set(mouseY);
  };

  const handleMouseLeave = () => {
    xPct.set(0);
    yPct.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="group relative flex flex-col items-center overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0c] p-8 text-center shadow-2xl"
    >
      {/* Dynamic Pixel Hover Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='6' height='6' x='0' y='0' fill='%23ffffff' fill-opacity='0.08'/%3E%3Crect width='6' height='6' x='12' y='12' fill='%23ffffff' fill-opacity='0.05'/%3E%3Crect width='6' height='6' x='0' y='12' fill='%23ffffff' fill-opacity='0.03'/%3E%3Crect width='6' height='6' x='12' y='0' fill='%23ffffff' fill-opacity='0.02'/%3E%3C/svg%3E")`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Glow Gradient */}
      <div
        className={`absolute left-0 top-0 h-40 w-full bg-gradient-to-b ${glowColor} to-transparent opacity-[0.05] transition-opacity duration-500 group-hover:opacity-20`}
      />

      {/* Avatar */}
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="relative z-10 mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-[#0a0a0c] bg-[#111] shadow-2xl transition-transform duration-500 group-hover:border-white/10"
      >
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Badge */}
      <span
        style={{ transform: "translateZ(60px)" }}
        className={`relative z-10 mb-4 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest ${badgeClass} shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
      >
        {member.role === "Member" ? member.team : member.role}
      </span>

      {/* Info */}
      <h3 
        style={{ transform: "translateZ(40px)" }}
        className="relative z-10 mb-1.5 text-2xl font-black text-white transition-colors duration-300"
      >
        {member.name}
      </h3>
      <p 
        style={{ transform: "translateZ(30px)" }}
        className="relative z-10 mb-8 text-sm font-semibold text-gray-400"
      >
        {member.department || member.role}
      </p>

      {/* Socials */}
      <div 
        style={{ transform: "translateZ(40px)" }}
        className="relative z-10 mt-auto flex gap-4 text-gray-500"
      >
        <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <FaLinkedinIn size={16} />
        </a>
        <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <FaGithub size={16} />
        </a>
        <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <FaEnvelope size={16} />
        </a>
      </div>
    </motion.div>
  );
};
