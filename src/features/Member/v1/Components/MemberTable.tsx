import { useState } from "react";
import { Eye, MoreVertical, Check, Trash2, Mail, Edit3, ShieldAlert } from "lucide-react";
import type { MemberItem, MemberRole, MemberStatus } from "../data/members.data";

interface MemberTableProps {
  members: MemberItem[];
  selectedIds: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectRow: (id: string, checked: boolean) => void;
  onViewMember: (member: MemberItem) => void;
  onDeleteMember?: (id: string) => void;
  onChangeRole?: (id: string, newRole: MemberRole) => void;
  onChangeStatus?: (id: string, newStatus: MemberStatus) => void;
}

const MemberTable = ({
  members,
  selectedIds,
  onSelectAll,
  onSelectRow,
  onViewMember,
  onDeleteMember,
  onChangeRole,
  onChangeStatus,
}: MemberTableProps) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const allSelected = members.length > 0 && members.every((m) => selectedIds.includes(m.id));
  const someSelected = members.some((m) => selectedIds.includes(m.id)) && !allSelected;

  const getRoleBadge = (role: MemberRole) => {
    switch (role) {
      case "Admin":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#1e5433] bg-[#153e25] px-2.5 py-1 text-xs font-medium text-[#4ade80]">
            Admin
          </span>
        );
      case "Organizer":
        return (
          <span className="inline-flex items-center rounded-lg border border-[#442661] bg-[#2f1c42] px-2.5 py-1 text-xs font-medium text-[#c084fc]">
            Organizer
          </span>
        );
      case "Member":
      default:
        return (
          <span className="inline-flex items-center rounded-lg border border-[#1d3d66] bg-[#152c4a] px-2.5 py-1 text-xs font-medium text-[#60a5fa]">
            Member
          </span>
        );
    }
  };

  const getStatusBadge = (status: MemberStatus) => {
    switch (status) {
      case "Active":
        return (
          <div className="flex items-center gap-2 text-xs font-medium text-[#22c55e]">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
            <span>Active</span>
          </div>
        );
      case "Inactive":
        return (
          <div className="flex items-center gap-2 text-xs font-medium text-[#f59e0b]">
            <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
            <span>Inactive</span>
          </div>
        );
      case "Offline":
      default:
        return (
          <div className="flex items-center gap-2 text-xs font-medium text-[#ef4444]">
            <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
            <span>Offline</span>
          </div>
        );
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#232830] bg-[#161a1f]">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#232830] bg-[#121519] text-xs font-semibold text-white/50">
              <th className="w-12 py-4 pl-5 pr-2">
                <label className="relative flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someSelected;
                    }}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                      allSelected
                        ? "border-[#22c55e] bg-[#22c55e] text-black"
                        : someSelected
                          ? "border-[#22c55e] bg-[#183522] text-[#22c55e]"
                          : "border-[#333a45] bg-[#121519] hover:border-[#4b5563]"
                    }`}
                  >
                    {allSelected && <Check size={11} strokeWidth={3} />}
                    {someSelected && <span className="h-1.5 w-1.5 rounded-sm bg-[#22c55e]" />}
                  </div>
                </label>
              </th>
              <th className="py-4 px-3 font-medium text-white/60">Member</th>
              <th className="py-4 px-3 font-medium text-white/60">Role</th>
              <th className="py-4 px-3 font-medium text-white/60">Status</th>
              <th className="py-4 px-3 font-medium text-white/60">Joined On</th>
              <th className="py-4 px-3 font-medium text-white/60">Events</th>
              <th className="py-4 px-4 text-right font-medium text-white/60">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#20252e]">
            {members.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-white/40">
                  No members found matching your search or filters.
                </td>
              </tr>
            ) : (
              members.map((member) => {
                const isSelected = selectedIds.includes(member.id);

                return (
                  <tr
                    key={member.id}
                    className={`group transition-colors ${
                      isSelected ? "bg-[#182a20] hover:bg-[#1c3326]" : "hover:bg-[#1b2027]"
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-3.5 pl-5 pr-2">
                      <label className="relative flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => onSelectRow(member.id, e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                            isSelected
                              ? "border-[#22c55e] bg-[#22c55e] text-black"
                              : "border-[#333a45] bg-[#121519] hover:border-[#4b5563]"
                          }`}
                        >
                          {isSelected && <Check size={11} strokeWidth={3} />}
                        </div>
                      </label>
                    </td>

                    {/* Member Details */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-9 w-9 rounded-full object-cover border border-[#2b323d]"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-white group-hover:text-white sm:text-sm">
                            {member.name}
                          </p>
                          <p className="truncate text-[11px] text-white/40">{member.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-3">{getRoleBadge(member.role)}</td>

                    {/* Status */}
                    <td className="py-3.5 px-3">{getStatusBadge(member.status)}</td>

                    {/* Joined On */}
                    <td className="py-3.5 px-3 text-xs text-white/70">{member.joinedOn}</td>

                    {/* Events */}
                    <td className="py-3.5 px-3 text-xs font-medium text-white/80">
                      {member.events}
                    </td>

                    {/* Actions */}
                    <td className="relative py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onViewMember(member)}
                          title="View member details"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                        >
                          <Eye size={15} />
                        </button>

                        <div className="relative">
                          <button
                            type="button"
                            onClick={() =>
                              setActiveMenuId(activeMenuId === member.id ? null : member.id)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                          >
                            <MoreVertical size={15} />
                          </button>

                          {/* Context Action Menu */}
                          {activeMenuId === member.id && (
                            <>
                              <div
                                className="fixed inset-0 z-20"
                                onClick={() => setActiveMenuId(null)}
                              />
                              <div className="absolute right-0 top-9 z-30 w-44 rounded-xl border border-[#2b323d] bg-[#1b2027] p-1.5 shadow-xl">
                                <button
                                  type="button"
                                  onClick={() => {
                                    onViewMember(member);
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                                >
                                  <Eye size={14} />
                                  <span>View Profile</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    window.open(`mailto:${member.email}`);
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                                >
                                  <Mail size={14} />
                                  <span>Send Email</span>
                                </button>

                                {onChangeRole && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const nextRole: MemberRole =
                                        member.role === "Admin"
                                          ? "Organizer"
                                          : member.role === "Organizer"
                                            ? "Member"
                                            : "Admin";
                                      onChangeRole(member.id, nextRole);
                                      setActiveMenuId(null);
                                    }}
                                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                                  >
                                    <Edit3 size={14} />
                                    <span>Toggle Role</span>
                                  </button>
                                )}

                                {onChangeStatus && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const nextStatus: MemberStatus =
                                        member.status === "Active"
                                          ? "Inactive"
                                          : member.status === "Inactive"
                                            ? "Offline"
                                            : "Active";
                                      onChangeStatus(member.id, nextStatus);
                                      setActiveMenuId(null);
                                    }}
                                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                                  >
                                    <ShieldAlert size={14} />
                                    <span>Toggle Status</span>
                                  </button>
                                )}

                                {onDeleteMember && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      onDeleteMember(member.id);
                                      setActiveMenuId(null);
                                    }}
                                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-[#f87171] transition hover:bg-[#38181a] hover:text-rose-300"
                                  >
                                    <Trash2 size={14} />
                                    <span>Remove Member</span>
                                  </button>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberTable;
