import MonacoEditor from "@monaco-editor/react";
import { FileText } from "lucide-react";
import type { EventFormData } from "../type/Event.type";
import Section from "../../../Components/Section";
import MarkdownPreview from "../../../Components/MarkdownPreview";
import { useState } from "react";

interface Props {
  form: EventFormData;
  update: <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => void;
}

const EventDescription = ({ form, update }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(true);

  return (
    <Section
      title="Event Description"
      description="Provide detailed information about your event"
      icon={<FileText size={14} />}
    >
      <div className="overflow-hidden  border border-white/[0.06]">
        <div className="flex justify-end border-b rounded-md overflow-hidden">
          <button
            className={`
    p-2 border-r 
    ${
      isEdit
        ? "bg-[#2563EB] text-black border-[#2563EB]"
        : "bg-[#1F2124] text-[#F8F9FA] border-transparent"
    }
  `}
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>

          <button
            className={`p-2 ${!isEdit ? "text-[#F8F9FA]" : "text-[#9CA3AF]"}`}
            onClick={() => setIsEdit(false)}
          >
            Preview
          </button>
        </div>

        {/* Editor/Preview Content */}
        {isEdit ? (
          <MonacoEditor
            language="markdown"
            theme="vs-dark"
            className="py-1.5 min-h-[20vh]"
            value={form.descriptionMarkdown}
            onChange={(value) => update("descriptionMarkdown", value || "")}
            width="100%"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "off",
              wordWrap: "on",
              scrollBeyondLastLine: false,
              padding: { top: 8, bottom: 8 },
            }}
          />
        ) : (
          <div className="p-3 min-h-[20vh]">
            <MarkdownPreview
              content={form.descriptionMarkdown}
              textColor="text-gray-300"
              backgroundColor="bg-transparent"
              headingColor="text-gray-100"
              strongColor="text-gray-100"
              linkColor="text-blue-400"
              linkUnderlineColor="decoration-blue-400"
              blockquoteBgColor="bg-gray-800"
              blockquoteBorderColor="border-blue-500"
            />
          </div>
        )}
      </div>
    </Section>
  );
};

export default EventDescription;
