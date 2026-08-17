import { Check } from "lucide-react";

const RulesList = ({ items }: { items: string[] }) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={`${item}-${index}`} className="flex gap-3">
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
            <Check size={10} strokeWidth={2.5} />
          </span>

          <p className="text-xs leading-5 text-white/45">{item}</p>
        </div>
      ))}
    </div>
  );
};

export default RulesList