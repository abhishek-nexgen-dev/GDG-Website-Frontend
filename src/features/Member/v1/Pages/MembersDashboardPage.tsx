import { useState, useMemo } from "react";
import { Plus, Download } from "lucide-react";
import {
  initialMembersList,
  type MemberItem,
  type MemberRole,
  type MemberStatus,
} from "../data/members.data";
import MemberStatsCards from "../Components/MemberStatsCards";
import MemberFilterBar from "../Components/MemberFilterBar";
import MemberTable from "../Components/MemberTable";
import MemberPagination from "../Components/MemberPagination";
import AddMemberModal from "../Components/AddMemberModal";
import MemberDetailsModal from "../Components/MemberDetailsModal";

const MembersDashboardPage = () => {
  const [members, setMembers] = useState<MemberItem[]>(initialMembersList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filtered members
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Search matching (name, email, role)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.email.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q);

      // Role matching
      const matchesRole = selectedRole === "All" || member.role === selectedRole;

      // Status matching
      const matchesStatus = selectedStatus === "All" || member.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, searchQuery, selectedRole, selectedStatus]);

  // Paginated members
  const totalPages = Math.ceil(filteredMembers.length / pageSize) || 1;
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMembers.slice(start, start + pageSize);
  }, [filteredMembers, currentPage, pageSize]);

  // Dynamic stats calculated from state
  const computedStats = useMemo(() => {
    const total = members.length;
    const active = members.filter((m) => m.status === "Active").length;
    const organizers = members.filter((m) => m.role === "Organizer" || m.role === "Admin").length;
    const offline = members.filter((m) => m.status === "Offline").length;

    return {
      totalMembers: { value: total, trend: "▲ 12 this month" },
      activeMembers: { value: active, trend: "▲ 8 this month" },
      organizers: { value: organizers, trend: "▲ 2 this month" },
      newThisMonth: { value: 15, trend: "▲ 15 this month" },
      offlineMembers: { value: offline, trend: "▲ 4 this month" },
    };
  }, [members]);

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredMembers.map((m) => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  // Add Member
  const handleAddMember = (newMemberData: Omit<MemberItem, "id" | "joinedOn" | "events">) => {
    const newMember: MemberItem = {
      ...newMemberData,
      id: `mem-${Date.now()}`,
      joinedOn: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      events: 0,
    };
    setMembers((prev) => [newMember, ...prev]);
  };

  // Role & Status toggles
  const handleChangeRole = (id: string, newRole: MemberRole) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, role: newRole } : m)),
    );
  };

  const handleChangeStatus = (id: string, newStatus: MemberStatus) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m)),
    );
  };

  // Delete Member
  const handleDeleteMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
  };

  // View Member Details
  const handleViewMember = (member: MemberItem) => {
    setSelectedMember(member);
    setIsDetailsModalOpen(true);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Email", "Role", "Status", "Joined On", "Events"];
    const rows = filteredMembers.map((m) => [
      m.id,
      `"${m.name}"`,
      m.email,
      m.role,
      m.status,
      `"${m.joinedOn}"`,
      m.events,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gdg_ranchi_members_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasActiveFilters = searchQuery !== "" || selectedRole !== "All" || selectedStatus !== "All";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedRole("All");
    setSelectedStatus("All");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-full w-full py-5 px-4 sm:px-6 lg:px-8 text-white max-w-full">
      {/* Header Section */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Members</h1>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            Manage and organize all community members
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-xl border border-[#232830] bg-[#161a1f] px-4 py-2.5 text-xs font-semibold text-white/90 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
          >
            <Download size={15} strokeWidth={2} />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      {/* 5 Stats Cards Grid */}
      <div className="mb-6">
        <MemberStatsCards stats={computedStats} />
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-4">
        <MemberFilterBar
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          selectedRole={selectedRole}
          onRoleChange={(role) => {
            setSelectedRole(role);
            setCurrentPage(1);
          }}
          selectedStatus={selectedStatus}
          onStatusChange={(status) => {
            setSelectedStatus(status);
            setCurrentPage(1);
          }}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Selected items notification bar if rows are selected */}
      {selectedIds.length > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-[#1e5433] bg-[#153e25] px-4 py-2.5 text-xs text-[#4ade80]">
          <span>{selectedIds.length} member(s) selected</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMembers((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
                setSelectedIds([]);
              }}
              className="rounded-lg bg-[#38181a] border border-[#522226] px-2.5 py-1 text-[11px] font-medium text-rose-300 transition hover:bg-[#481e22]"
            >
              Delete Selected
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="text-white/60 hover:text-white"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* Members Table */}
      <div className="mb-4">
        <MemberTable
          members={paginatedMembers}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          onViewMember={handleViewMember}
          onDeleteMember={handleDeleteMember}
          onChangeRole={handleChangeRole}
          onChangeStatus={handleChangeStatus}
        />
      </div>

      {/* Pagination Bar */}
      <div>
        <MemberPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalMembers={filteredMembers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
        />
      </div>

      {/* Modals */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMember={handleAddMember}
      />

      <MemberDetailsModal
        isOpen={isDetailsModalOpen}
        member={selectedMember}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedMember(null);
        }}
      />
    </div>
  );
};

export default MembersDashboardPage;
