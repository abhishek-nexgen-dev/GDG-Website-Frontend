function Input({
  value,
  onChange,
  placeholder,
  maxLength,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="
        h-9
        w-full
        rounded-md
        border border-white/[0.07]
        bg-[#202126]
        px-3
        text-xs
        text-zinc-200
        outline-none
        placeholder:text-zinc-600
        transition
        focus:border-emerald-500/50
        focus:ring-1
        focus:ring-emerald-500/10
        sm:text-sm
      "
    />
  );
}

export default Input;
