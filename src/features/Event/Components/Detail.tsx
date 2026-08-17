type DetailProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  active?: boolean;
};

const Detail = ({ icon, label, value, active }: DetailProps) => {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] text-[#8B5CF6]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-[0.18em] text-white/25">{label}</p>

        <div className={`mt-1 text-xs leading-5 ${active ? "text-emerald-400" : "text-white/65"}`}>
          {value}
        </div>
      </div>
    </div>
  );
};


export default Detail