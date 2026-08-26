import { Plus, ShieldCheck, Trash2 } from "lucide-react";

import type { EventFormData } from "../type/Event.type";
import Section from "../../../Components/Section";
import Input from "../../../Components/Input";

interface EventRulesProps {
  form: EventFormData;

  update: <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => void;
}

const EventRules = ({ form, update }: EventRulesProps) => {
  /* =====================================================
     ADD RULE
  ===================================================== */

  const addRule = () => {
    update("rules", [...form.rules, ""]);
  };

  /* =====================================================
     REMOVE RULE
  ===================================================== */

  const removeRule = (index: number) => {
    update(
      "rules",
      form.rules.filter((_, ruleIndex) => ruleIndex !== index),
    );
  };

  /* =====================================================
     UPDATE RULE
  ===================================================== */

  const updateRule = (index: number, value: string) => {
    update(
      "rules",
      form.rules.map((rule, ruleIndex) => (ruleIndex === index ? value : rule)),
    );
  };

  return (
    <Section
      title="Rules"
      description="Add rules and guidelines for participants"
      icon={<ShieldCheck size={15} />}
      action={
        <button
          type="button"
          onClick={addRule}
          className="
            flex
            items-center
            gap-1.5
            rounded-md
            bg-lime-500/10
            px-3
            py-1.5
            text-xs
            font-medium
            text-lime-400
            transition
            hover:bg-lime-500/20
          "
        >
          <Plus size={14} />

          <span className="hidden sm:inline">Add Rule</span>

          <span className="sm:hidden">Add</span>
        </button>
      }
    >
      <div className="space-y-2.5">
        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {form.rules.length === 0 ? (
          <div
            className="
              flex
              min-h-32
              flex-col
              items-center
              justify-center
              rounded-lg
              border
              border-dashed
              border-white/10
              bg-white/[0.01]
              px-4
              py-6
              text-center
            "
          >
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-lime-500/10">
              <ShieldCheck size={17} className="text-lime-400" />
            </div>

            <p className="text-xs font-medium text-zinc-300">No rules added yet</p>

            <p className="mt-1 text-[10px] text-zinc-600 sm:text-xs">
              Add rules and guidelines for participants.
            </p>

            <button
              type="button"
              onClick={addRule}
              className="
                mt-3
                text-xs
                font-medium
                text-lime-400
                transition
                hover:text-lime-300
              "
            >
              Add your first rule
            </button>
          </div>
        ) : (
          /* =================================================
             RULE LIST
          ================================================= */

          form.rules.map((rule, index) => (
            <div
              key={index}
              className="
                group
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-white/[0.06]
                bg-[#171917]
                p-2
                transition
                hover:border-lime-500/20
              "
            >
              {/* Number */}

              <div
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  bg-lime-500/10
                  text-[10px]
                  font-semibold
                  text-lime-400
                "
              >
                {index + 1}
              </div>

              {/* Rule */}

              <div className="min-w-0 flex-1">
                <Input
                  value={rule}
                  onChange={(value) => updateRule(index, value)}
                  placeholder="Enter event rule"
                  className="
                    h-9
                    border-transparent
                    bg-transparent
                    px-2
                    text-xs
                    text-zinc-200
                    placeholder:text-zinc-600
                    focus:border-white/[0.08]
                    focus:bg-[#202126]
                    sm:text-sm
                  "
                />
              </div>

              {/* Delete */}

              <button
                type="button"
                onClick={() => removeRule(index)}
                title="Remove rule"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-md
                  text-zinc-600
                  transition
                  hover:bg-red-500/10
                  hover:text-red-400
                "
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}

        {/* =================================================
            ADD ANOTHER RULE
        ================================================= */}

        {form.rules.length > 0 && (
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={addRule}
              className="
                flex
                items-center
                gap-1.5
                rounded-lg
                border
                border-dashed
                border-white/15
                px-4
                py-2
                text-xs
                font-medium
                text-zinc-500
                transition
                hover:border-lime-500/40
                hover:bg-lime-500/[0.03]
                hover:text-lime-400
              "
            >
              <Plus size={14} />
              Add Another Rule
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default EventRules;
