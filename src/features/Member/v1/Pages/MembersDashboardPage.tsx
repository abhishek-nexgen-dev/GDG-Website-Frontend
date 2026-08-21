import { useEffect, useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";

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

const ALL_FILTER = "All";
const DEFAULT_PAGE_SIZE = 10;

const formatJoinedDate = () =>
  new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const isJoinedThisMonth = (joinedOn: string) => {
  const date = new Date(joinedOn);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const now = new Date();

  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
};

const escapeCsvValue = (value: unknown) => {
  const stringValue = String(value ?? "");

  if (!/[",\n\r]/.test(stringValue)) {
    return stringValue;
  }

  return `"${stringValue.replace(/"/g, '""')}"`;
};

const MembersDashboardPage = () => {
  const [members, setMembers] = useState<MemberItem[]>(initialMembersList);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(ALL_FILTER);
  const [selectedStatus, setSelectedStatus] = useState(ALL_FILTER);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        !normalizedSearchQuery ||
        member.name.toLowerCase().includes(normalizedSearchQuery) ||
        member.email.toLowerCase().includes(normalizedSearchQuery) ||
        member.role.toLowerCase().includes(normalizedSearchQuery);

      const matchesRole = selectedRole === ALL_FILTER || member.role === selectedRole;

      const matchesStatus = selectedStatus === ALL_FILTER || member.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, normalizedSearchQuery, selectedRole, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));

  /**
   * Prevent the UI from pointing to a page that no longer exists
   * after deleting members, filtering, or changing page size.
   */
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedMembers = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;

    return filteredMembers.slice(startIndex, startIndex + pageSize);
  }, [filteredMembers, safeCurrentPage, pageSize]);

  const visibleMemberIds = useMemo(
    () => paginatedMembers.map((member) => member.id),
    [paginatedMembers],
  );

  const selectedMember = useMemo(
    () =>
      selectedMemberId ? (members.find((member) => member.id === selectedMemberId) ?? null) : null,
    [members, selectedMemberId],
  );

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedRole !== ALL_FILTER || selectedStatus !== ALL_FILTER;



  /* -------------------------------------------------------------------------- */
  /* Statistics                                                                 */
  /* -------------------------------------------------------------------------- */

  const computedStats = useMemo(() => {
    const totalMembers = members.length;

    const activeMembers = members.filter((member) => member.status === "Active").length;

    const organizers = members.filter(
      (member) => member.role === "Organizer" || member.role === "Admin",
    ).length;

    const offlineMembers = members.filter((member) => member.status === "Offline").length;

    const newThisMonth = members.filter((member) => isJoinedThisMonth(member.joinedOn)).length;

    const percentage = (value: number) =>
      totalMembers > 0
        ? `${Math.round((value / totalMembers) * 100)}% of members`
        : "0% of members";

    return {
      totalMembers: {
        value: totalMembers,
        trend: "Current community size",
      },

      activeMembers: {
        value: activeMembers,
        trend: percentage(activeMembers),
      },

      organizers: {
        value: organizers,
        trend: percentage(organizers),
      },

      newThisMonth: {
        value: newThisMonth,
        trend: "Joined this month",
      },

      offlineMembers: {
        value: offlineMembers,
        trend: percentage(offlineMembers),
      },
    };
  }, [members]);

  /* -------------------------------------------------------------------------- */
  /* Pagination Safety                                                          */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* -------------------------------------------------------------------------- */
  /* Filter Handlers                                                            */
  /* -------------------------------------------------------------------------- */

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedRole(ALL_FILTER);
    setSelectedStatus(ALL_FILTER);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  /* -------------------------------------------------------------------------- */
  /* Selection                                                                  */
  /* -------------------------------------------------------------------------- */

  const handleSelectAll = (checked: boolean) => {
    if (!visibleMemberIds.length) {
      return;
    }

    if (checked) {
      setSelectedIds((previous) => Array.from(new Set([...previous, ...visibleMemberIds])));

      return;
    }

    setSelectedIds((previous) => previous.filter((id) => !visibleMemberIds.includes(id)));
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedIds((previous) => {
      if (checked) {
        return previous.includes(id) ? previous : [...previous, id];
      }

      return previous.filter((selectedId) => selectedId !== id);
    });
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  /* -------------------------------------------------------------------------- */
  /* Member Actions                                                             */
  /* -------------------------------------------------------------------------- */

  const handleAddMember = (newMemberData: Omit<MemberItem, "id" | "joinedOn" | "events">) => {
    const newMember: MemberItem = {
      ...newMemberData,
      id: crypto.randomUUID(),
      joinedOn: formatJoinedDate(),
      events: 0,
    };

    setMembers((previous) => [newMember, ...previous]);

    setCurrentPage(1);
    setSelectedIds([]);
    setIsAddModalOpen(false);
  };

  const handleChangeRole = (id: string, newRole: MemberRole) => {
    setMembers((previous) =>
      previous.map((member) => (member.id === id ? { ...member, role: newRole } : member)),
    );
  };

  const handleChangeStatus = (id: string, newStatus: MemberStatus) => {
    setMembers((previous) =>
      previous.map((member) => (member.id === id ? { ...member, status: newStatus } : member)),
    );
  };

  const handleDeleteMember = (id: string) => {
    setMembers((previous) => previous.filter((member) => member.id !== id));

    setSelectedIds((previous) => previous.filter((selectedId) => selectedId !== id));

    if (selectedMemberId === id) {
      setSelectedMemberId(null);
    }
  };

  const handleDeleteSelected = () => {
    if (!selectedIds.length) {
      return;
    }

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected member${
        selectedIds.length === 1 ? "" : "s"
      }? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    const selectedSet = new Set(selectedIds);

    setMembers((previous) => previous.filter((member) => !selectedSet.has(member.id)));

    setSelectedIds([]);
  };

  /* -------------------------------------------------------------------------- */
  /* Member Details                                                             */
  /* -------------------------------------------------------------------------- */

  const handleViewMember = (member: MemberItem) => {
    setSelectedMemberId(member.id);
  };

  const handleCloseMemberDetails = () => {
    setSelectedMemberId(null);
  };

  /* -------------------------------------------------------------------------- */
  /* CSV Export                                                                 */
  /* -------------------------------------------------------------------------- */

  const handleExportCSV = () => {
    if (!filteredMembers.length) {
      return;
    }

    const headers = ["ID", "Name", "Email", "Role", "Status", "Joined On", "Events"];

    const rows = filteredMembers.map((member) => [
      member.id,
      member.name,
      member.email,
      member.role,
      member.status,
      member.joinedOn,
      member.events,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCsvValue).join(","))
      .join("\r\n");

    const blob = new Blob([`\uFEFF${csvContent}`], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `gdg-ranchi-members-${Date.now()}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  /* -------------------------------------------------------------------------- */
  /* Render                                                                     */
  /* -------------------------------------------------------------------------- */

  return (
    <main className="w-full min-w-0 px-4 py-5 text-white sm:px-6 lg:px-8">
      {/* -------------------------------------------------------------------- */}
      {/* Header                                                               */}
      {/* -------------------------------------------------------------------- */}

      <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Members</h1>

          <p className="mt-1 text-sm text-white/50">Manage and organize your community members.</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={!filteredMembers.length}
            aria-label="Export members as CSV"
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl border border-white/10
              bg-white/[0.03] px-4 py-2.5
              text-sm font-medium text-white/80
              transition-all duration-200
              hover:border-white/15 hover:bg-white/[0.06] hover:text-white
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-emerald-500/50
              disabled:cursor-not-allowed disabled:opacity-40
            "
          >
            <Download size={16} strokeWidth={2} />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            aria-label="Add a new member"
            className="
              inline-flex items-center justify-center gap-2
              rounded-xl bg-emerald-500 px-4 py-2.5
              text-sm font-semibold text-black
              transition-all duration-200
              hover:bg-emerald-400
              active:scale-[0.98]
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-emerald-500/50
            "
          >
            <Plus size={17} strokeWidth={2.5} />
            <span>Add Member</span>
          </button>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Statistics                                                           */}
      {/* -------------------------------------------------------------------- */}

      <section className="mb-6">
        <MemberStatsCards stats={computedStats} />
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Filters                                                              */}
      {/* -------------------------------------------------------------------- */}

      <section className="mb-4">
        <MemberFilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedRole={selectedRole}
          onRoleChange={handleRoleChange}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Bulk Selection                                                       */}
      {/* -------------------------------------------------------------------- */}

      {selectedIds.length > 0 && (
        <section
          aria-label="Bulk member actions"
          className="
            mb-4 flex flex-col gap-3
            rounded-xl border border-emerald-500/20
            bg-emerald-500/[0.06] px-4 py-3
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-emerald-400">{selectedIds.length}</span>

            <span className="text-white/60">
              member{selectedIds.length === 1 ? "" : "s"} selected
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDeleteSelected}
              className="
                rounded-lg border border-red-500/20
                bg-red-500/10 px-3 py-1.5
                text-xs font-medium text-red-300
                transition-colors
                hover:bg-red-500/15 hover:text-red-200
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-red-500/40
              "
            >
              Delete selected
            </button>

            <button
              type="button"
              onClick={handleClearSelection}
              className="
                rounded-lg px-2 py-1.5
                text-xs font-medium text-white/50
                transition-colors
                hover:text-white
                focus:outline-none focus-visible:ring-2
                focus-visible:ring-white/20
              "
            >
              Clear selection
            </button>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* Members Table                                                        */}
      {/* -------------------------------------------------------------------- */}

      <section className="mb-4 min-w-0">
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
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Pagination                                                           */}
      {/* -------------------------------------------------------------------- */}

      <section>
        <MemberPagination
          currentPage={safeCurrentPage}
          totalPages={totalPages}
          totalMembers={filteredMembers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
            setSelectedIds([]);
          }}
        />
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* Modals                                                               */}
      {/* -------------------------------------------------------------------- */}

      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddMember={handleAddMember}
      />

      <MemberDetailsModal
        isOpen={Boolean(selectedMemberId)}
        member={selectedMember}
        onClose={handleCloseMemberDetails}
      />
    </main>
  );
};

export default MembersDashboardPage;
