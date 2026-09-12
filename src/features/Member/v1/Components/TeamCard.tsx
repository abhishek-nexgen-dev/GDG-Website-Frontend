import React, { useState } from "react";

type SocialLink = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

type TeamCardProps = {
  FullName: string;
  imageUrl: string;
  Role: string;
  company?: string;
  SocialLink: SocialLink[];
  onClick?: () => void;
};

// Map role to accent colors
const getRoleAccent = (role: string) => {
  const r = role.toLowerCase();
  if (r.includes("organizer") || r.includes("lead")) {
    return {
      glow: "bg-blue-500/20 group-hover:bg-blue-500/35",
      border: "group-hover:border-[#4285F4]/60",
      text: "text-[#8AB4F8]",
      dot: "bg-[#4285F4]",
    };
  }
  if (r.includes("tech") || r.includes("engineer") || r.includes("data")) {
    return {
      glow: "bg-emerald-500/20 group-hover:bg-emerald-500/35",
      border: "group-hover:border-[#34A853]/60",
      text: "text-[#81C995]",
      dot: "bg-[#34A853]",
    };
  }
  if (r.includes("design")) {
    return {
      glow: "bg-amber-500/20 group-hover:bg-amber-500/35",
      border: "group-hover:border-[#FBBC04]/60",
      text: "text-[#FDD663]",
      dot: "bg-[#FBBC04]",
    };
  }
  return {
    glow: "bg-rose-500/20 group-hover:bg-rose-500/35",
    border: "group-hover:border-[#EA4335]/60",
    text: "text-[#F28B82]",
    dot: "bg-[#EA4335]",
  };
};

const TeamCard = ({
  imageUrl,
  FullName,
  Role,
  company,
  SocialLink,
  onClick,
}: TeamCardProps) => {
  const [imageError, setImageError] = useState(false);
  const accent = getRoleAccent(Role);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative flex w-full max-w-[340px] mx-auto min-h-[440px] flex-col overflow-visible text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]"
    >
      {/* Background Ambient Glow */}
      <div
        className={`pointer-events-none absolute left-1/2 top-0 z-0 h-[65%] w-[85%] -translate-x-1/2 rounded-full blur-[80px] transition-all duration-700 ${accent.glow}`}
      />

      {/* Profile Image Container */}
      <div
        className={`absolute left-1/2 top-2 z-30 aspect-square w-[80%] max-w-[220px] -translate-x-1/2 rounded-full border-[3px] border-white/20 bg-gradient-to-br from-zinc-700 via-zinc-900 to-black p-2 shadow-[0_20px_60px_rgba(0,0,0,0.65)] transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-105 ${accent.border}`}
      >
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border border-white/10 bg-zinc-900">
          {!imageError ? (
            <img
              src={imageUrl}
              alt={FullName}
              onError={() => setImageError(true)}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950 font-bold text-2xl text-white/90">
              {getInitials(FullName)}
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-black/50 via-transparent to-white/10" />
        </div>

        {/* Active Status Badge */}
        <div
          className={`absolute bottom-[5%] right-[6%] flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-[#100F0F] ${accent.dot} shadow-[0_0_15px_rgba(66,133,244,0.6)]`}
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
        </div>
      </div>

      {/* Info Card Content */}
      <div className="mt-[160px] relative z-20 flex flex-1 flex-col items-center justify-between rounded-2xl border border-white/10 bg-[#100F0F]/85 p-6 pt-20 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:border-white/20 group-hover:bg-[#141416]/95">
        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-white">
            {FullName}
          </h3>

          <span
            className={`mt-1.5 inline-block text-xs font-semibold uppercase tracking-[0.14em] ${accent.text}`}
          >
            {Role}
          </span>

          {company && (
            <p className="mt-2 line-clamp-1 max-w-[240px] text-xs text-gray-400">
              {company}
            </p>
          )}
        </div>

        {/* Social Links */}
        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-2.5"
          onClick={(e) => e.stopPropagation()}
        >
          {SocialLink?.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${FullName}'s ${social.name}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-[#4285F4] hover:bg-[#4285F4] hover:text-white hover:shadow-[0_4px_16px_rgba(66,133,244,0.4)]"
            >
              <span className="text-sm">{social.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
