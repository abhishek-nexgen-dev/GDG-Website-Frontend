import { Plus, X } from "lucide-react";
import Badge from "../../../../Components/Badge";
import { useState } from "react";
import type { TagEditorProps } from "../type/MemberDetails.type";

const TagEditor = ({ label, values = [], variant, editable, onChange }: TagEditorProps) => {
  const [input, setInput] = useState("");

  const addTag = () => {
    const value = input.trim();

    if (!value) return;

    const exists = values.some((item) => item.toLowerCase() === value.toLowerCase());

    if (exists) {
      setInput("");
      return;
    }

    onChange([...values, value]);

    setInput("");
  };

  const removeTag = (value: string) => {
    onChange(values.filter((item) => item !== value));
  };

  return (
    <div>
      <p
        className="
          mb-2.5
          text-[10px]
          font-medium
          uppercase
          tracking-wider
          text-white/35
        "
      >
        {label}
      </p>

      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <span key={value} className="inline-flex items-center gap-1">
            <Badge variant={variant}>{value}</Badge>

            {editable && (
              <button
                type="button"
                onClick={() => removeTag(value)}
                className="
                  rounded-full
                  p-0.5
                  text-white/30
                  hover:text-red-400
                "
              >
                <X size={10} />
              </button>
            )}
          </span>
        ))}

        {editable && (
          <div className="flex w-full gap-2 pt-1">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addTag();
                }
              }}
              placeholder={`Add ${label.toLowerCase()}...`}
              className="
                min-w-0
                flex-1
                rounded-lg
                border
                border-[#232830]
                bg-[#121519]
                px-3
                py-2
                text-[10px]
                text-white
                outline-none
                placeholder:text-white/20
                focus:border-green-500/40
              "
            />

            <button
              type="button"
              onClick={addTag}
              className="
                rounded-lg
                border
                border-green-500/20
                bg-green-500/10
                px-3
                text-green-400
              "
            >
              <Plus size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagEditor;
