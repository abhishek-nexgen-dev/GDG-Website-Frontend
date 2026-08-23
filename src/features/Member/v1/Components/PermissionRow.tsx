import { Trash2 } from "lucide-react";
import PermissionActionBadge from "./PermissionActionBadge";
import type { PermissionRowProps } from "../type/MemberDetails.type";

const PermissionRow = ({
  permission,
  onRemove,
  onLevelChange,
  disabled = false,
}: PermissionRowProps) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-3
        border-b
        border-[#232830]
        px-3
        py-3
        last:border-b-0
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:px-4
      "
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="
              break-all
              font-mono
              text-[10px]
              font-medium
              text-white/80
              sm:text-xs
            "
          >
            {permission.name}
          </span>

          <PermissionActionBadge action={permission.action} />
        </div>

        {permission.description && (
          <p className="mt-1 text-[9px] text-white/35 sm:text-[10px]">{permission.description}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[9px] text-white/30">Level</span>

        <input
          type="range"
          min={0}
          max={100}
          value={permission.level ?? 0}
          disabled={disabled}
          onChange={(event) => onLevelChange(Number(event.target.value))}
          className="
            w-20
            accent-green-500
            disabled:opacity-40
            sm:w-24
          "
        />

        <span className="w-7 text-right text-[9px] text-white/50">{permission.level ?? 0}</span>

        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          className="
            rounded-lg
            p-1.5
            text-white/25
            transition
            hover:bg-red-500/10
            hover:text-red-400
            disabled:pointer-events-none
            disabled:opacity-30
          "
          title="Remove permission"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
};

export default PermissionRow;
