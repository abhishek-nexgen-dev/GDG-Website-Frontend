import type { PermissionSchemaType } from "../type/MemberDetails.type";

const actionColors: Record<PermissionSchemaType["action"], string> = {
  create: "text-blue-400 bg-blue-500/10 border-blue-500/20",

  read: "text-green-400 bg-green-500/10 border-green-500/20",

  update: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",

  delete: "text-red-400 bg-red-500/10 border-red-500/20",
};

const PermissionActionBadge = ({ action }: { action: PermissionSchemaType["action"] }) => {
  return (
    <span
      className={`
        inline-flex
        rounded-md
        border
        px-2
        py-1
        text-[9px]
        font-semibold
        uppercase
        ${actionColors[action]}
      `}
    >
      {action}
    </span>
  );
};

export default PermissionActionBadge;
