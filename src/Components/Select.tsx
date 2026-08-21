import { ChevronDown } from "lucide-react";

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-9
          w-full
          appearance-none
          rounded-md
          border border-white/[0.07]
          bg-[#202126]
          px-3
          pr-9
          text-xs
          text-zinc-300
          outline-none
          focus:border-emerald-500/50
          focus:ring-1
          focus:ring-emerald-500/10
          sm:text-sm
        "
      >
        {children}
      </select>

      <ChevronDown
        size={14}
        className="
          pointer-events-none
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-zinc-500
        "
      />
    </div>
  );
}

export default Select;
