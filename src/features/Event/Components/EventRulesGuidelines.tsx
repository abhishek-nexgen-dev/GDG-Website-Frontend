import { BookOpen, ShieldCheck } from "lucide-react";
import RulesList from "./RulesList";

interface EventRulesGuidelinesProps {
  rules?: string[];
  requirements?: string[];
}

const EventRulesGuidelines = ({ rules = [], requirements = [] }: EventRulesGuidelinesProps) => {
  return (
    <div className="w-full py-6 sm:py-8 px-5 sm:px-8 rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
      <div className="max-w-3xl mx-auto sm:mx-0 mb-8">
        <div className="mb-3 flex items-center gap-2">
          <ShieldCheck size={13} strokeWidth={1.8} className="text-[#34A853]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#34A853]">
            Important Guidelines
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.875rem] sm:leading-tight">
          Rules & Requirements
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45 sm:text-[15px]">
          Please review and follow these guidelines to ensure a fair, productive, and enjoyable experience for all participants.
        </p>
      </div>

      {/* Subtle divider */}
      <div className="my-8 h-px w-full bg-white/[0.07]" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 px-1 sm:px-0">
        {rules.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-purple-950/20 to-black p-6 sm:p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Rules</h3>
            </div>
            <RulesList items={rules} />
          </div>
        )}

        {requirements.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-emerald-950/20 to-black p-6 sm:p-8 shadow-xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Requirements</h3>
            </div>
            <RulesList items={requirements} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventRulesGuidelines;
