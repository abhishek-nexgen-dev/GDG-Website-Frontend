import React, { useMemo, useState } from "react";
import { Check, Search, ShieldCheck, X } from "lucide-react";

import type { Permission } from "../../../Auth/v1/types/Auth.type";
import useAuth from "../../../Auth/v1/store/useAuth";

interface PermissionManagerProps {
  isEdit: boolean;

  /**
   * All permissions available in the system.
   *
   * This comes from the backend.
   */
  permissions?: Permission[] | null;

  /**
   * Called whenever assigned permissions change.
   */
  onPermissionsChange?: (permissions: Permission[]) => void;
}

const PermissionManager: React.FC<PermissionManagerProps> = ({
  isEdit,
  permissions,
  onPermissionsChange,
}) => {
  /*
   * `perms` = currently assigned permissions.
   */
  const { perms, setPerms } = useAuth();
  console.log(perms);

  const [searchQuery, setSearchQuery] = useState("");

  /*
   * ---------------------------------------------------------
   * SAFE ARRAYS
   * ---------------------------------------------------------
   *
   * API data may be undefined during the first render.
   *
   * Instead of:
   *
   * permissions.forEach(...)
   *
   * we always work with an array.
   */
  const availablePermissions = useMemo<Permission[]>(
    () => (Array.isArray(permissions) ? permissions : []),
    [permissions],
  );

  const assignedPermissions = useMemo<Permission[]>(
    () => (Array.isArray(perms) ? perms : []),
    [perms],
  );

  /*
   * ---------------------------------------------------------
   * ASSIGNED PERMISSION IDS
   * ---------------------------------------------------------
   *
   * Set gives fast O(1) lookup.
   */
  const assignedPermissionIds = useMemo(() => {
    return new Set(assignedPermissions.map((permission) => permission?.name).filter(Boolean));
  }, [assignedPermissions]);

  /*
   * ---------------------------------------------------------
   * GROUP + SEARCH
   * ---------------------------------------------------------
   */
  const groupedPermissions = useMemo(() => {
    const groups: Record<string, Permission[]> = {};

    const query = searchQuery.trim().toLowerCase();

    availablePermissions.forEach((permission) => {
      if (!permission) return;

      const name = String(permission.name ?? "");
      const resource = String(permission.resource ?? "Other");
      const action = String(permission.action ?? "");
      const description = String(permission.description ?? "");

      const searchableText = [name, resource, action, description].join(" ").toLowerCase();

      if (query.length > 0 && !searchableText.includes(query)) {
        return;
      }

      if (!groups[resource]) {
        groups[resource] = [];
      }

      groups[resource].push(permission);
    });

    return groups;
  }, [availablePermissions, searchQuery]);

  /*
   * ---------------------------------------------------------
   * VISIBLE PERMISSIONS
   * ---------------------------------------------------------
   */
  const visiblePermissions = useMemo(() => {
    return Object.values(groupedPermissions).flat();
  }, [groupedPermissions]);

  /*
   * ---------------------------------------------------------
   * COUNTS
   * ---------------------------------------------------------
   */
  const selectedCount = useMemo(() => {
    return availablePermissions.filter((permission) => assignedPermissionIds.has(permission?.name))
      .length;
  }, [availablePermissions, assignedPermissionIds]);

  const totalCount = availablePermissions.length;

  /*
   * ---------------------------------------------------------
   * CHECK PERMISSION
   * ---------------------------------------------------------
   */
  const isPermissionAssigned = (permissionId?: string): boolean => {
    if (!permissionId) return false;

    return assignedPermissionIds.has(permissionId);
  };

  /*
   * ---------------------------------------------------------
   * UPDATE PERMISSIONS
   * ---------------------------------------------------------
   *
   * Centralized function prevents accidentally forgetting
   * either Zustand state or callback.
   */
  const updatePermissions = (newPermissions: Permission[]) => {
    setPerms(newPermissions);
    onPermissionsChange?.(newPermissions);
  };

  /*
   * ---------------------------------------------------------
   * TOGGLE ONE PERMISSION
   * ---------------------------------------------------------
   */
  const handleTogglePermission = (permission: Permission) => {
    if (!isEdit) return;

    if (!permission?.name) return;

    const isAssigned = assignedPermissionIds.has(permission.name);

    if (isAssigned) {
      const newPermissions = assignedPermissions.filter((item) => item?._id !== permission._id);

      updatePermissions(newPermissions);

      return;
    }

    /*
     * Prevent duplicates.
     */
    const alreadyExists = assignedPermissions.some((item) => item?._id === permission._id);

    if (alreadyExists) return;

    updatePermissions([...assignedPermissions, permission]);
  };

  /*
   * ---------------------------------------------------------
   * SELECT ALL
   * ---------------------------------------------------------
   */
  const handleSelectAll = () => {
    if (!isEdit) return;

    const existingIds = new Set(assignedPermissions.map((permission) => permission?.name));

    const missingPermissions = availablePermissions.filter(
      (permission) => permission?.name && !existingIds.has(permission.name),
    );

    if (missingPermissions.length === 0) return;

    updatePermissions([...assignedPermissions, ...missingPermissions]);
  };

  /*
   * ---------------------------------------------------------
   * CLEAR ALL
   * ---------------------------------------------------------
   */
  const handleClearAll = () => {
    if (!isEdit) return;

    if (assignedPermissions.length === 0) return;

    updatePermissions([]);
  };

  /*
   * ---------------------------------------------------------
   * SELECT ALL VISIBLE
   * ---------------------------------------------------------
   */
  const handleSelectVisible = () => {
    if (!isEdit) return;

    const existingIds = new Set(assignedPermissions.map((permission) => permission?.name));

    const missingPermissions = visiblePermissions.filter(
      (permission) => permission?.name && !existingIds.has(permission.name),
    );

    if (missingPermissions.length === 0) return;

    updatePermissions([...assignedPermissions, ...missingPermissions]);
  };

  /*
   * ---------------------------------------------------------
   * CLEAR VISIBLE
   * ---------------------------------------------------------
   */
  const handleClearVisible = () => {
    if (!isEdit) return;

    if (visiblePermissions.length === 0) return;

    const visibleIds = new Set(
      visiblePermissions.map((permission) => permission?.name).filter(Boolean),
    );

    const newPermissions = assignedPermissions.filter(
      (permission) => !visibleIds.has(permission?.name),
    );

    updatePermissions(newPermissions);
  };

  /*
   * ---------------------------------------------------------
   * RESOURCE TOGGLE
   * ---------------------------------------------------------
   */
  const handleToggleResource = (resourcePermissions: Permission[]) => {
    if (!isEdit) return;

    if (resourcePermissions.length === 0) return;

    const resourceIds = new Set(
      resourcePermissions.map((permission) => permission?.name).filter(Boolean),
    );

    const selectedCountInResource = resourcePermissions.filter((permission) =>
      assignedPermissionIds.has(permission?.name),
    ).length;

    const allSelected = selectedCountInResource === resourcePermissions.length;

    /*
     * If everything is selected -> remove everything.
     */
    if (allSelected) {
      const newPermissions = assignedPermissions.filter(
        (permission) => !resourceIds.has(permission?.name),
      );

      updatePermissions(newPermissions);

      return;
    }

    /*
     * Otherwise add missing permissions.
     */
    const existingIds = new Set(assignedPermissions.map((permission) => permission?.name));

    const missingPermissions = resourcePermissions.filter(
      (permission) => permission?.name && !existingIds.has(permission.name),
    );

    updatePermissions([...assignedPermissions, ...missingPermissions]);
  };

  /*
   * ---------------------------------------------------------
   * SEARCH STATE
   * ---------------------------------------------------------
   */
  const hasSearch = searchQuery.trim().length > 0;

  const allVisibleSelected =
    visiblePermissions.length > 0 &&
    visiblePermissions.every((permission) => assignedPermissionIds.has(permission?.name));

  const someVisibleSelected = visiblePermissions.some((permission) =>
    assignedPermissionIds.has(permission?.name),
  );

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */
  return (
    <div className="w-full max-w-4xl">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">
            <ShieldCheck size={18} className="text-blue-400" />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Permissions</h3>

            <p className="text-xs text-white/40">
              {selectedCount} of {totalCount} selected
            </p>
          </div>
        </div>

        {isEdit && totalCount > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleSelectAll}
              disabled={selectedCount === totalCount}
              className="rounded-lg border border-[#232830] bg-[#121519] px-3 py-1.5 text-xs font-medium text-white/70 transition hover:border-blue-500/40 hover:bg-blue-500/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              Select all
            </button>

            <button
              type="button"
              onClick={handleClearAll}
              disabled={selectedCount === 0}
              className="rounded-lg border border-[#232830] bg-[#121519] px-3 py-1.5 text-xs font-medium text-white/70 transition hover:border-red-500/40 hover:bg-red-500/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* =====================================================
          SEARCH
      ====================================================== */}
      <div className="mb-4">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search permissions..."
            className="w-full rounded-lg border border-[#232830] bg-[#121519] py-2.5 pl-9 pr-10 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 transition hover:text-white"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Search actions */}
        {isEdit && hasSearch && visiblePermissions.length > 0 && (
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[11px] text-white/30">
              {visiblePermissions.length}{" "}
              {visiblePermissions.length === 1 ? "permission" : "permissions"} found
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSelectVisible}
                disabled={allVisibleSelected}
                className="text-[11px] font-medium text-blue-400 transition hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-30"
              >
                Select visible
              </button>

              <button
                type="button"
                onClick={handleClearVisible}
                disabled={!someVisibleSelected}
                className="text-[11px] font-medium text-white/40 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
              >
                Clear visible
              </button>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================
          SINGLE SCROLL CONTAINER
      ====================================================== */}
      <div className="h-[50vh] min-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#232830]">
        {/* No backend permissions */}
        {availablePermissions.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-[#232830] px-6 text-center">
            <ShieldCheck size={28} className="mb-3 text-white/15" />

            <p className="text-sm text-white/40">No permissions available.</p>

            <p className="mt-1 text-xs text-white/20">Permissions could not be loaded yet.</p>
          </div>
        ) : Object.keys(groupedPermissions).length === 0 ? (
          /* No search result */
          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-[#232830] px-6 text-center">
            <Search size={26} className="mb-3 text-white/15" />

            <p className="text-sm text-white/40">No permissions found.</p>

            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-2 text-xs text-blue-400 transition hover:text-blue-300"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-6 pb-3">
            {Object.entries(groupedPermissions).map(([resource, resourcePermissions]) => {
              const selectedInResource = resourcePermissions.filter((permission) =>
                assignedPermissionIds.has(permission?.name),
              ).length;

              const resourceFullySelected = selectedInResource === resourcePermissions.length;

              return (
                <section key={resource} className="space-y-3">
                  {/* Resource Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400/80">
                        {resource}
                      </h4>

                      <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/30">
                        {selectedInResource}/{resourcePermissions.length}
                      </span>
                    </div>

                    {isEdit && (
                      <button
                        type="button"
                        onClick={() => handleToggleResource(resourcePermissions)}
                        className="text-[11px] font-medium text-blue-400 transition hover:text-blue-300"
                      >
                        {resourceFullySelected ? "Deselect all" : "Select all"}
                      </button>
                    )}
                  </div>

                  {/* Permission Cards */}
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    {resourcePermissions.map((permission) => {
                      const isChecked = isPermissionAssigned(permission?.name);

                      return (
                        <label
                          key={permission?.name ?? permission?.name}
                          className={`
                                group relative flex
                                items-start gap-3
                                rounded-lg border p-3
                                transition-all
                                ${
                                  isChecked
                                    ? "border-blue-500/50 bg-blue-500/5"
                                    : "border-[#232830] bg-[#121519] hover:border-[#333840] hover:bg-[#1a1e24]"
                                }
                                ${isEdit ? "cursor-pointer" : "cursor-default opacity-60"}
                              `}
                        >
                          {/* Checkbox */}
                          <div
                            className={`
                                  mt-0.5 flex h-5 w-5
                                  shrink-0 items-center
                                  justify-center rounded-md
                                  border transition-all
                                  ${
                                    isChecked
                                      ? "border-blue-500 bg-blue-500"
                                      : "border-white/20 bg-transparent group-hover:border-white/40"
                                  }
                                `}
                          >
                            {isChecked && (
                              <Check size={13} strokeWidth={3} className="text-white" />
                            )}
                          </div>

                          {/* Permission Info */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`
                                      text-sm font-medium
                                      ${isChecked ? "text-white" : "text-white/70"}
                                    `}
                              >
                                {permission?.name ?? "Unnamed permission"}
                              </span>

                              {permission?.action && (
                                <span
                                  className={`
                                        rounded-md px-1.5 py-0.5
                                        text-[9px] font-medium
                                        uppercase tracking-wide
                                        ${
                                          isChecked
                                            ? "bg-blue-500/10 text-blue-400"
                                            : "bg-white/5 text-white/30"
                                        }
                                      `}
                                >
                                  {permission.action}
                                </span>
                              )}
                            </div>

                            {permission?.description && (
                              <span className="mt-1.5 block text-[11px] leading-relaxed text-white/30">
                                {permission.description}
                              </span>
                            )}
                          </div>

                          {/* Full Card Click Target */}
                          {isEdit && (
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleTogglePermission(permission)}
                              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                              aria-label={`Toggle ${permission?.name ?? "permission"}`}
                            />
                          )}
                        </label>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionManager;
