import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type DropDownOption = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
};

type DropDownProps = {
  options: DropDownOption[];
  value?: string;
  onChange?: (value: string) => void;

  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;

  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
};

const DropDown: React.FC<DropDownProps> = ({
  options,
  value,
  onChange,

  placeholder = "Select an option",

  label,
  error,
  disabled,

  className = "",
  triggerClassName = "",
  menuClassName = "",
}) => {
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(() => {
    return options.find((item) => item.value === value);
  }, [options, value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {label && <label className="mb-2 block text-sm font-medium text-white">{label}</label>}

      {/* Trigger */}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex h-14 w-full items-center justify-between
          rounded-xl
          border border-white/10
          bg-[#111111]/80
          px-4
          text-left
          text-white
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-[#4285F4]
          disabled:cursor-not-allowed
          disabled:opacity-50
          ${triggerClassName}
        `}
      >
        <div className="flex items-center gap-3 truncate">
          {selectedOption?.icon}

          <span className={selectedOption ? "text-white" : "text-gray-500"}>
            {selectedOption?.label ?? placeholder}
          </span>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Menu */}

      <div
        className={`
          absolute left-0 top-[calc(100%+10px)]
          z-50
          w-full
          overflow-hidden
          rounded-xl
          border border-white/10
          bg-[#111111]/95
          backdrop-blur-2xl
          shadow-2xl
          transition-all
          duration-200
          ${
            open
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          }
          ${menuClassName}
        `}
      >
        {options.map((option) => {
          const active = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              disabled={option.disabled}
              onClick={() => {
                if (option.disabled) return;

                onChange?.(option.value);

                setOpen(false);
              }}
              className={`
                flex
                w-full
                items-center
                justify-between
                px-4
                py-3
                text-left
                transition-all
                duration-200
                ${
                  active
                    ? "bg-[#4285F4]/10 text-[#4285F4]"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }
                ${option.disabled ? "cursor-not-allowed opacity-40" : ""}
              `}
            >
              <div className="flex items-center gap-3">
                {option.icon}

                <span>{option.label}</span>
              </div>

              {active && <Check size={18} className="text-[#4285F4]" />}
            </button>
          );
        })}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default DropDown;
