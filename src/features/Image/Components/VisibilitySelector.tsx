import { Eye, Globe2, Lock } from "lucide-react";
import type { ImageVisibility } from "../types/image.type";

interface Props {
  value: ImageVisibility;
  onChange: (value: ImageVisibility) => void;
}

const options = [
  {
    value: "PUBLIC" as const,
    label: "Public",
    description: "Anyone can view",
    icon: Globe2,
  },
  {
    value: "PRIVATE" as const,
    label: "Private",
    description: "Only members",
    icon: Lock,
  },
  {
    value: "UNLISTED" as const,
    label: "Unlisted",
    description: "Only with link",
    icon: Eye,
  },
];

const VisibilitySelector = ({ value, onChange }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {options.map((option) => {
        const Icon = option.icon;
        const active = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`flex items-center gap-3 rounded-lg border p-3 text-left transition ${
              active
                ? "border-emerald-500/40 bg-emerald-500/[0.08]"
                : "border-white/[0.07] bg-[#171c22] hover:bg-white/[0.03]"
            }`}
          >
            <Icon size={17} className={active ? "text-emerald-400" : "text-zinc-500"} />

            <div>
              <p className={`text-xs font-medium ${active ? "text-emerald-300" : "text-zinc-300"}`}>
                {option.label}
              </p>

              <p className="mt-0.5 text-[10px] text-zinc-500">{option.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default VisibilitySelector;
