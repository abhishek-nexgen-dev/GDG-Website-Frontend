import { Plus } from "lucide-react";
import { Link } from "react-router";
import PermissionChecker from "../../../Permission/Components/PermissionChecker";

const MemberHeader = () => {
  return (
    <section className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Members</h1>

        <p className="mt-1 text-sm text-white/50">Manage and organize your community members.</p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <PermissionChecker permissionName="member:create" permissionAction="create">
          <Link
            to="/member/create"

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
          </Link>
        </PermissionChecker>
      </div>
    </section>
  );
};

export default MemberHeader;
