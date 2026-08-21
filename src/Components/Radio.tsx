function Radio({
  checked,
  onClick,
  icon,
  title,
  description,
}: {
  checked: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-start gap-2.5 text-left">
      <span
        className={`
          mt-0.5
          flex
          h-4
          w-4
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          ${checked ? "border-emerald-400" : "border-zinc-600"}
        `}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
      </span>

      <span className="flex min-w-0 items-start gap-2">
        {icon && (
          <span className={checked ? "mt-0.5 text-emerald-400" : "mt-0.5 text-zinc-600"}>
            {icon}
          </span>
        )}

        <span className="min-w-0">
          <span
            className={`
              block
              text-xs
              ${checked ? "text-zinc-200" : "text-zinc-400"}
            `}
          >
            {title}
          </span>

          {description && (
            <span className="mt-0.5 block text-[10px] text-zinc-600">{description}</span>
          )}
        </span>
      </span>
    </button>
  );
}

export default Radio;
