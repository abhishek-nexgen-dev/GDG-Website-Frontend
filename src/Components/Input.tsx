import React from "react";
import InfoItem from "./InfoItem";

type InputProps = {
  value: string;
  onChange: (value: string) => void;

  label?: string;
  placeholder?: string;
  maxLength?: number;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  labelClassName?: string;
  /**
   * When true, the input becomes a read-only
   * InfoItem instead of an editable input.
   */
  readonly?: boolean;

  disabled?: boolean;
};

function Input({
  value,
  onChange,
  label,
  placeholder,
  maxLength,
  className,
  labelClassName,
  type = "text",
  readonly = false,
  disabled = false,
}: InputProps) {
  // ============================================================
  // READ ONLY
  // ============================================================

  if (readonly) {
    return <InfoItem label={label ?? ""} value={value} />;
  }

  // ============================================================
  // EDITABLE
  // ============================================================

  return (
    <div className="w-full">
      {label && (
        <label
          className={`
            ${labelClassName}
            mb-1.5
            block
            text-[10px]

            font-medium
            text-white/35
            sm:text-[11px]
            md:text-lg
          `}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        maxLength={maxLength}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          ${className}
          h-10
          w-full
          rounded-md
          border border-white/[0.07]
          bg-[#202126]
          px-3
          text-md
          text-zinc-200
          outline-none
          transition

          placeholder:text-zinc-600

          focus:border-emerald-500/50
          focus:ring-1
          focus:ring-emerald-500/10

          disabled:cursor-not-allowed
          disabled:opacity-50

          lg:text-[1rem]
        `}
      />
    </div>
  );
}

export default Input;
