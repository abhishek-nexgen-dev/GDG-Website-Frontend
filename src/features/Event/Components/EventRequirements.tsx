import { Plus, Trash2, Users } from "lucide-react";

import type { EventFormData } from "../type/Event.type";

import Section from "../../../Components/Section";
import Input from "../../../Components/Input";

interface EventRequirementsProps {
  form: EventFormData;

  update: <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => void;
}

const EventRequirements = ({ form, update }: EventRequirementsProps) => {
  /* =====================================================
     ADD REQUIREMENT
  ===================================================== */

  const addRequirement = () => {
    update("requirements", [...form.requirements, ""]);
  };

  /* =====================================================
     REMOVE REQUIREMENT
  ===================================================== */

  const removeRequirement = (index: number) => {
    update(
      "requirements",
      form.requirements.filter((_, requirementIndex) => requirementIndex !== index),
    );
  };

  /* =====================================================
     UPDATE REQUIREMENT
  ===================================================== */

  const updateRequirement = (index: number, value: string) => {
    update(
      "requirements",
      form.requirements.map((requirement, requirementIndex) =>
        requirementIndex === index ? value : requirement,
      ),
    );
  };

  return (
    <Section
      title="Requirements"
      description="List the requirements for participants"
      icon={<Users size={15} />}
      action={
        <button
          type="button"
          onClick={addRequirement}
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

          <span className="hidden sm:inline">Add Requirement</span>

          <span className="sm:hidden">Add</span>
        </button>
      }
    >
      <div className="space-y-2.5">
        {/* =================================================
            EMPTY STATE
        ================================================= */}

        {form.requirements.length === 0 ? (
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
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/10">
              <Users size={17} className="text-blue-400" />
            </div>

            <p className="text-xs font-medium text-zinc-300">No requirements added yet</p>

            <p className="mt-1 text-[10px] text-zinc-600 sm:text-xs">
              Add requirements participants need to meet.
            </p>

            <button
              type="button"
              onClick={addRequirement}
              className="
                mt-3
                text-xs
                font-medium
                text-lime-400
                transition
                hover:text-lime-300
              "
            >
              Add your first requirement
            </button>
          </div>
        ) : (
          /* =================================================
             REQUIREMENT LIST
          ================================================= */

          form.requirements.map((requirement, index) => (
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
                  hover:border-blue-500/20
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
                    bg-blue-500/10
                    text-[10px]
                    font-semibold
                    text-blue-400
                  "
              >
                {index + 1}
              </div>

              {/* Requirement */}

              <div className="min-w-0 flex-1">
                <Input
                  value={requirement}
                  onChange={(value) => updateRequirement(index, value)}
                  placeholder="Enter participant requirement"
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
                onClick={() => removeRequirement(index)}
                title="Remove requirement"
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
            ADD ANOTHER
        ================================================= */}

        {form.requirements.length > 0 && (
          <div className="flex justify-center pt-1">
            <button
              type="button"
              onClick={addRequirement}
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
                hover:border-blue-500/40
                hover:bg-blue-500/[0.03]
                hover:text-blue-400
              "
            >
              <Plus size={14} />
              Add Another Requirement
            </button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default EventRequirements;
