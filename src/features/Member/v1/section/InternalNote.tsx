import { Bell } from "lucide-react";
import useMembers from "../store/useMembers";
import useUpdateMember from "../utils/useDraftMember";
import Section from "../../../../Components/Section";
import type { MemberType } from "../type/MemberDetails.type";

interface InternalNotePropsType {
  isEdit: boolean;
  data?: MemberType | null;
  onChange?: (updates: Partial<MemberType>) => void;
}

const InternalNote = ({ isEdit, data, onChange }: InternalNotePropsType) => {
  const storeMember = useMembers((state) => state.singleMember);
  const currentMember = data ?? storeMember;
  const { MemberUpdate } = useUpdateMember(currentMember?._id || "");

  if (!currentMember) {
    return null;
  }

  const handleNotesChange = (value: string) => {
    if (onChange) {
      onChange({ internalNotes: value });
    } else {
      MemberUpdate({ internalNotes: value });
    }
  };

  return (
    <Section
      title="Internal Notes"
      description="Private administrative information"
      icon={<Bell size={17} />}
    >
      <textarea
        value={currentMember.internalNotes || ""}
        readOnly={!isEdit}
        onChange={(event) => handleNotesChange(event.target.value)}
        rows={5}
        placeholder="Add administrative notes, internal member history, or notes for co-organizers..."
        className="
          w-full
          resize-y
          rounded-xl
          border
          border-[#232830]
          bg-[#121519]
          px-3.5
          py-3
          text-xs
          leading-relaxed
          text-white/70
          outline-none
          placeholder:text-white/20
          focus:border-green-500/40
        "
      />
    </Section>
  );
};

export default InternalNote;
