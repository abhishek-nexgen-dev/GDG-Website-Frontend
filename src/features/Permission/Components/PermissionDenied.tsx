import { ShieldX } from "lucide-react";

const PermissionDenied = () => {
  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-[#0b0c0e] px-6">
      <div className="flex max-w-md flex-col items-center text-center">
        {/* Logo / Icon */}

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#151719] shadow-lg">
          <ShieldX size={25} strokeWidth={1.7} className="text-zinc-400" />
        </div>

        {/* Title */}

        <h1 className="mt-5 text-base font-semibold tracking-tight text-zinc-100 sm:text-lg">
          Access Restricted
        </h1>

        {/* Description */}

        <p className="mt-2 max-w-sm text-xs leading-5 text-zinc-500 sm:text-sm sm:leading-6">
          You don't have permission to access this resource. Please contact an Organizer or
          Administrator if you need access.
        </p>

        {/* Small Status */}

        <div className="mt-5 flex items-center gap-2 rounded-full border border-white/[0.06] bg-[#121416] px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400" />

          <span className="text-[10px] text-zinc-500">Permission required</span>
        </div>

        {/* Branding */}

        <p className="mt-6 text-[9px] font-medium uppercase tracking-[0.18em] text-zinc-700">
          GDG Ranchi · Organization
        </p>
      </div>
    </div>
  );
};

export default PermissionDenied;
