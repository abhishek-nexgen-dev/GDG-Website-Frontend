import React, { useEffect, useState } from "react";
import { X, Building, Award, Globe, ExternalLink, Sparkles } from "lucide-react";

export type PublicTeamMember = {
  id: number | string;
  name: string;
  role: string;
  company?: string;
  image: string;
  bio?: string;
  skills?: string[];
  socialLinks?: Array<{
    name: string;
    icon: React.ReactNode;
    href: string;
  }>;
};

interface TeamMemberModalProps {
  member: PublicTeamMember | null;
  isOpen: boolean;
  onClose: () => void;
}

const getRoleCategoryBadge = (role: string) => {
  const r = role.toLowerCase();
  if (r.includes("organizer") || r.includes("lead")) {
    return {
      label: "Community Leadership",
      color: "border-[#4285F4]/30 bg-[#4285F4]/10 text-[#8AB4F8]",
    };
  }
  if (r.includes("tech") || r.includes("engineer") || r.includes("data")) {
    return {
      label: "Technical Track",
      color: "border-[#34A853]/30 bg-[#34A853]/10 text-[#81C995]",
    };
  }
  if (r.includes("design")) {
    return {
      label: "Design & UX Track",
      color: "border-[#FBBC04]/30 bg-[#FBBC04]/10 text-[#FDD663]",
    };
  }
  return {
    label: "Community & Outreach",
    color: "border-[#EA4335]/30 bg-[#EA4335]/10 text-[#F28B82]",
  };
};

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  member,
  isOpen,
  onClose,
}) => {
  const [failedImageId, setFailedImageId] = useState<string | number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  const imageError = failedImageId === member.id;
  const trackBadge = getRoleCategoryBadge(member.role);
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#121214] p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.8)] z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-400 transition-colors hover:bg-white/15 hover:text-white"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Member Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-white/20 bg-zinc-800 shadow-lg">
            {!imageError ? (
              <img
                src={member.image}
                alt={member.name}
                onError={() => setFailedImageId(member.id)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-zinc-900 font-bold text-2xl text-white">
                {initials}
              </div>
            )}
          </div>

          <div className="text-center sm:text-left flex-1">
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-medium ${trackBadge.color}`}
            >
              <Sparkles size={12} />
              {trackBadge.label}
            </span>

            <h2 className="mt-2 text-2xl font-bold text-white tracking-tight">
              {member.name}
            </h2>

            <p className="text-sm font-semibold text-[#8AB4F8]">
              {member.role}
            </p>

            {member.company && (
              <p className="mt-1 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-gray-400">
                <Building size={13} className="shrink-0 text-gray-500" />
                <span>{member.company}</span>
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-white/10" />

        {/* Bio / Description */}
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
            <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              <Award size={14} className="text-[#34A853]" />
              About & Contributions
            </h4>
            <p className="text-xs sm:text-sm text-gray-300">
              {member.bio ||
                `Active team member of Google Developer Group Ranchi contributing towards developer community sessions, organizing DevFest Ranchi, mentoring aspiring tech enthusiasts, and fostering open technology ecosystems.`}
            </p>
          </div>

          {/* Connect & Social Profiles */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Connect with {member.name.split(" ")[0]}
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {member.socialLinks && member.socialLinks.length > 0 ? (
                member.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs font-medium text-gray-200 transition-all hover:border-[#4285F4] hover:bg-[#4285F4]/20 hover:text-white"
                  >
                    <span>{social.icon || <Globe size={14} />}</span>
                    <span>{social.name}</span>
                    <ExternalLink size={12} className="text-gray-400" />
                  </a>
                ))
              ) : (
                <span className="text-xs text-gray-500">
                  Community profile managed by GDG Ranchi.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
          <span>GDG Ranchi Community Member</span>
          <button
            type="button"
            onClick={onClose}
            className="text-[#8AB4F8] hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
