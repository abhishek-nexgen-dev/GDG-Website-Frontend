import { useEffect, useMemo, useState } from "react";
import useMembers from "../store/useMembers";
import type { fetchMembersType } from "../type/MemberDetails.type";
import useFetchMember from "../hook/useFetchMembers";
import MemberStatsCards from "../Components/MemberStatsCards";
import MemberFilterBar from "../Components/MemberFilterBar";
import MemberTable from "../Components/MemberTable";
import MemberPagination from "../Components/MemberPagination";

import MemberHeader from "../Components/MemberHeader";

const ALL_FILTER = "All";
const DEFAULT_PAGE_SIZE = 10;

const isJoinedThisMonth = (joinedOn: string) => {
  const date = new Date(joinedOn);
  if (Number.isNaN(date.getTime())) return false;
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
};



const MembersDashboardPage = () => {
  const members = useMembers((state) => state.members);
  const setMembers = useMembers((state) => state.setMembers);

  const deleteMember = useMembers((state) => state.deleteMember);
  const updateMember = useMembers((state) => state.updateMember);

  const { mutate, data, isSuccess } = useFetchMember();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(ALL_FILTER);
  const [selectedStatus, setSelectedStatus] = useState(ALL_FILTER);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  useEffect(() => {
    if (members.length === 0) {
      mutate({ limit: 100, page: 1 });
    }
  }, [members.length, mutate]);

  useEffect(() => {
    if (isSuccess && data && Array.isArray(data) && data.length > 0) {
      setMembers(data);
    }
  }, [isSuccess, data, setMembers]);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesSearch =
        !normalizedSearchQuery ||
        member.firstName.toLowerCase().includes(normalizedSearchQuery) ||
        member.email.toLowerCase().includes(normalizedSearchQuery) ||
        member.primaryRole.toLowerCase().includes(normalizedSearchQuery);

      const matchesRole = selectedRole === ALL_FILTER || member.primaryRole === selectedRole;
      const matchesStatus =
        selectedStatus === ALL_FILTER || member.membershipStatus === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, normalizedSearchQuery, selectedRole, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedMembers = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    return filteredMembers.slice(startIndex, startIndex + pageSize);
  }, [filteredMembers, safeCurrentPage, pageSize]);

  const visibleMemberIds = useMemo(
    () => paginatedMembers.map((member) => member._id),
    [paginatedMembers],
  );

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedRole !== ALL_FILTER || selectedStatus !== ALL_FILTER;

  const computedStats = useMemo(() => {
    const totalMembers = members.length;
    const activeMembers = members.filter((m) => m.membershipStatus === "Active").length;
    const organizers = members.filter(
      (m) => m.primaryRole === "Organizer" || m.primaryRole === "Admin",
    ).length;
    const offlineMembers = members.filter((m) => m.membershipStatus === "Offline").length;
    const newThisMonth = members.filter((m) =>
      isJoinedThisMonth(m.createdAt || new Date().toISOString()),
    ).length;

    const percentage = (value: number) =>
      totalMembers > 0
        ? `${Math.round((value / totalMembers) * 100)}% of members`
        : "0% of members";

    return {
      totalMembers: { value: totalMembers, trend: "Current community size" },
      activeMembers: { value: activeMembers, trend: percentage(activeMembers) },
      organizers: { value: organizers, trend: percentage(organizers) },
      newThisMonth: { value: newThisMonth, trend: "Joined this month" },
      offlineMembers: { value: offlineMembers, trend: percentage(offlineMembers) },
    };
  }, [members]);

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

  const handleSelectAll = (checked: boolean) => {
    if (!visibleMemberIds.length) return;
    if (checked) {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleMemberIds])));
    } else {
      setSelectedIds((prev) => prev.filter((id) => !visibleMemberIds.includes(id)));
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      if (checked) return prev.includes(id) ? prev : [...prev, id];
      return prev.filter((selectedId) => selectedId !== id);
    });
  };

  const handleClearSelection = () => setSelectedIds([]);

  const handleDeleteMember = (id: string) => {
    if (window.confirm("Delete this member?")) {
      deleteMember(id);
      if (selectedMemberId === id) setSelectedMemberId(null);
      setSelectedIds((prev) => prev.filter((sid) => sid !== id));
    }
  };

  const handleDeleteSelected = () => {
    if (!selectedIds.length) return;
    if (window.confirm(`Delete ${selectedIds.length} selected members?`)) {
      selectedIds.forEach((id) => deleteMember(id));
      setSelectedIds([]);
    }
  };

  const handleViewMember = (member: fetchMembersType) => setSelectedMemberId(member._id);

  // if (!isSuccess && members.length === 0) return <div className="p-4 text-white">Loading members...</div>;

  return (
    <main className="w-full min-w-0 px-4 py-5 text-white sm:px-6 lg:px-8">
      <MemberHeader />

      <section className="mb-6">
        <MemberStatsCards stats={computedStats} />
      </section>

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

      {selectedIds.length > 0 && (
        <section className="mb-4 flex flex-col gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
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
              className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/15 hover:text-red-200"
            >
              Delete selected
            </button>
            <button
              type="button"
              onClick={handleClearSelection}
              className="rounded-lg px-2 py-1.5 text-xs font-medium text-white/50 transition-colors hover:text-white"
            >
              Clear selection
            </button>
          </div>
        </section>
      )}

      <section className="mb-4 min-w-0">
        <MemberTable
          members={paginatedMembers}
          selectedIds={selectedIds}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          onViewMember={handleViewMember}
          onDeleteMember={handleDeleteMember}
          onChangeRole={(id, role) => updateMember(id, { primaryRole: role })}
          onChangeStatus={(id, status) => updateMember(id, { membershipStatus: status })}
        />
      </section>

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
    </main>
  );
};

export default MembersDashboardPage;
