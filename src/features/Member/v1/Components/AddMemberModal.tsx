import { useState } from "react";
import { X, UserPlus, Sparkles } from "lucide-react";
import type { MemberItem, MemberRole, MemberStatus } from "../data/members.data";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: Omit<MemberItem, "id" | "joinedOn" | "events">) => void;
}

const AddMemberModal = ({ isOpen, onClose, onAddMember }: AddMemberModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<MemberRole>("Member");
  const [status, setStatus] = useState<MemberStatus>("Active");
  const [avatar, setAvatar] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const defaultAvatar =
      avatar ||
      `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`;

    onAddMember({
      name,
      email,
      role,
      status,
      avatar: defaultAvatar,
      phone,
      bio,
      github,
      linkedin,
    });

    // Reset & close
    setName("");
    setEmail("");
    setRole("Member");
    setStatus("Active");
    setAvatar("");
    setPhone("");
    setBio("");
    setGithub("");
    setLinkedin("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/80 transition-opacity" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#232830] bg-[#161a1f] p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#232830] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#143321] text-[#22c55e] border border-[#1c472d]">
              <UserPlus size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Add New Member</h3>
              <p className="text-xs text-white/40">Register a new member to the GDG community</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#232830] bg-[#121519] text-white/40 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Full Name <span className="text-[#22c55e]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Email Address <span className="text-[#22c55e]">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul@email.com"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as MemberRole)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3 py-2 text-xs text-white focus:border-[#22c55e] focus:outline-none"
              >
                <option value="Member" className="bg-[#161a1f] text-white">
                  Member
                </option>
                <option value="Organizer" className="bg-[#161a1f] text-white">
                  Organizer
                </option>
                <option value="Admin" className="bg-[#161a1f] text-white">
                  Admin
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as MemberStatus)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3 py-2 text-xs text-white focus:border-[#22c55e] focus:outline-none"
              >
                <option value="Active" className="bg-[#161a1f] text-white">
                  Active
                </option>
                <option value="Inactive" className="bg-[#161a1f] text-white">
                  Inactive
                </option>
                <option value="Offline" className="bg-[#161a1f] text-white">
                  Offline
                </option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Avatar Image URL (Optional)
            </label>
            <input
              type="url"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">LinkedIn URL</label>
              <input
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Bio / Notes</label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief description of tech stack, skills, or GDG role..."
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#232830] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
            >
              <Sparkles size={14} />
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
