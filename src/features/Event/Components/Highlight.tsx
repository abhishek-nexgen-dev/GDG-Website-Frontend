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
    <div className="group flex min-w-0 items-center gap-3 py-2.5 pr-6 sm:border-r sm:border-white/[0.08] ml-2.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-blue-400 transition-colors duration-300 group-hover:bg-blue-500/10">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate text-md font-semibold tracking-tight text-white">{value}</p>

        <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.18em] text-white/30">
          {label}
        </p>
      </div>
    </div>
  );
};

export default Highlight;
