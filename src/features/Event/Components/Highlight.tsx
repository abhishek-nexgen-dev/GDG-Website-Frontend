const Highlight = ({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-3 border-white/[0.07] p-4 sm:border-r">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/[0.08] text-purple-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">{value}</p>

        <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-white/30">{label}</p>
      </div>
    </div>
  );
};


export default Highlight