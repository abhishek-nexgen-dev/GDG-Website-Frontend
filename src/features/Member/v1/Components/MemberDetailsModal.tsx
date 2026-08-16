import { X, Mail, Phone, Calendar, Award } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import type { MemberItem } from "../data/members.data";

interface MemberDetailsModalProps {
  member: MemberItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const MemberDetailsModal = ({ member, isOpen, onClose }: MemberDetailsModalProps) => {
  if (!isOpen || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#232830] bg-[#161a1f] p-6 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[#232830] bg-[#121519] text-white/40 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
        >
          <X size={16} />
        </button>

        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <img
              src={member.avatar}
              alt={member.name}
              className="h-20 w-20 rounded-full border-2 border-[#2b323d] object-cover"
            />
            <span
              className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#161a1f] ${
                member.status === "Active"
                  ? "bg-[#22c55e]"
                  : member.status === "Inactive"
                    ? "bg-[#f59e0b]"
                    : "bg-[#ef4444]"
              }`}
            />
          </div>

          <h3 className="mt-3 text-lg font-bold text-white">{member.name}</h3>
          <p className="text-xs text-white/50">{member.email}</p>

          <div className="mt-2.5 flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-medium ${
                member.role === "Admin"
                  ? "border-[#1e5433] bg-[#153e25] text-[#4ade80]"
                  : member.role === "Organizer"
                    ? "border-[#442661] bg-[#2f1c42] text-[#c084fc]"
                    : "border-[#1d3d66] bg-[#152c4a] text-[#60a5fa]"
              }`}
            >
              {member.role}
            </span>

            <span
              className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-0.5 text-xs font-medium ${
                member.status === "Active"
                  ? "border-[#1e5433] bg-[#153e25] text-[#4ade80]"
                  : member.status === "Inactive"
                    ? "border-[#523314] bg-[#33200d] text-[#fbbf24]"
                    : "border-[#521c1f] bg-[#331113] text-[#f87171]"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  member.status === "Active"
                    ? "bg-[#22c55e]"
                    : member.status === "Inactive"
                      ? "bg-[#f59e0b]"
                      : "bg-[#ef4444]"
                }`}
              />
              {member.status}
            </span>
          </div>
        </div>

        {/* Bio */}
        {member.bio && (
          <div className="mt-5 rounded-xl border border-[#232830] bg-[#121519] p-3.5 text-xs leading-relaxed text-white/70">
            {member.bio}
          </div>
        )}

        {/* Stats & Meta */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3">
            <div className="flex items-center gap-2 text-white/40">
              <Calendar size={13} />
              <span className="text-[11px]">Joined On</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-white">{member.joinedOn}</p>
          </div>

          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3">
            <div className="flex items-center gap-2 text-white/40">
              <Award size={13} />
              <span className="text-[11px]">Events Attended</span>
            </div>
            <p className="mt-1 text-xs font-semibold text-[#4ade80]">{member.events} Events</p>
          </div>
        </div>

        {/* Contact info */}
        <div className="mt-4 space-y-2 text-xs">
          {member.phone && (
            <div className="flex items-center gap-2.5 rounded-lg border border-[#232830] bg-[#121519] p-2.5 text-white/70">
              <Phone size={14} className="text-white/40" />
              <span>{member.phone}</span>
            </div>
          )}

          <div className="flex items-center gap-2.5 rounded-lg border border-[#232830] bg-[#121519] p-2.5 text-white/70">
            <Mail size={14} className="text-white/40" />
            <span className="truncate">{member.email}</span>
          </div>
        </div>

        {/* Social Links & Action */}
        <div className="mt-5 flex items-center justify-between border-t border-[#232830] pt-4">
          <div className="flex items-center gap-2">
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#232830] bg-[#121519] text-white/60 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
              >
                <FaGithub size={14} />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#232830] bg-[#121519] text-white/60 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
              >
                <FaLinkedinIn size={14} />
              </a>
            )}
          </div>

          <a
            href={`mailto:${member.email}`}
            className="flex items-center gap-1.5 rounded-xl bg-[#153e25] border border-[#1e5433] px-3.5 py-1.5 text-xs font-medium text-[#4ade80] transition-colors hover:bg-[#1a4a2d]"
          >
            <Mail size={13} />
            Contact Member
          </a>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsModal;

