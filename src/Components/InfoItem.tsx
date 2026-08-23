const InfoItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) => (
  <div className="min-w-0">
    <div className="mb-1.5 flex items-center gap-1.5 text-[10px] text-white/35 sm:text-[11px]">
      {icon}
      <span>{label}</span>
    </div>

    <div
      title={value}
      className="
        break-words
        text-[11px]
        leading-5
        text-white/75
        sm:text-xs
        lg:text-[13px]
      "
    >
      {value || "—"}
    </div>
  </div>
);

export default InfoItem;
