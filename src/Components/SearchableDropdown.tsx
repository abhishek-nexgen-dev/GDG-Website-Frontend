import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import clsx from "clsx";

interface SearchableDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  label?: string;
}

export function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  error,
  label,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) => opt.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset search when closing
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setActiveIndex(-1);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
          onChange(filteredOptions[activeIndex]);
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="relative z-50 w-full" ref={dropdownRef}>
      {label && (
        <label className="text-[10px] font-medium text-white/35 mb-1.5 block sm:text-[11px] md:text-lg">
          {label}
        </label>
      )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={clsx(
          "flex h-10 w-full items-center justify-between rounded-md border bg-[#202126] px-3 text-md text-zinc-200 outline-none transition cursor-pointer group",
          error ? "border-red-500/50 ring-1 ring-red-500/20" : "border-white/[0.07]",
          !value && "text-zinc-600",
          "focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10",
          "hover:border-white/15",
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronsUpDown className="h-4 w-4 shrink-0 text-zinc-600 group-hover:text-zinc-400 transition-opacity" />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1.5 w-full rounded-md border border-white/[0.07] bg-[#202126] shadow-xl animate-in fade-in zoom-in-95 duration-150 ease-out">
          <div className="flex items-center border-b border-white/[0.07] px-3 pb-1.5 pt-1">
            <Search className="mr-2 h-4 w-4 shrink-0 text-zinc-600" />
            <input
              autoFocus
              className="flex h-9 w-full bg-transparent py-3 text-md text-zinc-200 outline-none placeholder:text-zinc-600"
              placeholder="Search options..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveIndex(0);
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-[240px] overflow-y-auto mt-1 custom-scrollbar">
            {filteredOptions.length === 0 ? (
              <div className="py-6 px-3 text-sm text-zinc-600 text-center">No options found.</div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(option);
                    setIsOpen(false);
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={clsx(
                    "relative flex w-full cursor-pointer select-none items-center rounded-md py-2.5 px-9 text-md text-zinc-200 outline-none transition-colors",
                    index === activeIndex
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "hover:bg-white/[0.03]",
                    value === option && "bg-emerald-500/10 font-medium text-emerald-400",
                  )}
                >
                  {value === option && (
                    <span className="absolute left-3 flex h-3.5 w-3.5 items-center justify-center">
                      <Check className="h-4 w-4 stroke-[3] text-emerald-400" />
                    </span>
                  )}
                  {option}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}
