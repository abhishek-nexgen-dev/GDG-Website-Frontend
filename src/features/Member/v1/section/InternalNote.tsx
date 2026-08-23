import { Bell, ShieldCheck } from "lucide-react";


import useMembers from "../store/useMembers";
import useUpdateMember from "../utils/useDraftMember";
import Section from "../../../../Components/Section";

type InterNotePropsType = {
  isEdit: boolean;
};

const InternalNote = ({ isEdit }: InterNotePropsType) => {
  const singleMember = useMembers((state) => state.singleMember);
  const { MemberUpdate } = useUpdateMember(singleMember?._id || "");

  // Safety check if singleMember is not loaded
  if (!singleMember) {
    return null;
  }

  return (
    <Section
      title="Internal Notes"
      description="Private administrative information"
      icon={<Bell size={17} />}
    >
      <textarea
        value={singleMember.internalNotes || ""}
        readOnly={!isEdit}
        onChange={(event) => MemberUpdate({ internalNotes: event.target.value })}
        rows={5}
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
          read-only:opacity-70
        "
        placeholder={isEdit ? "Add internal notes..." : "No internal notes"}
      />

      <div
        className="
          mt-3
          flex
          items-center
          gap-2
          text-[10px]
          text-white/30
        "
      >
        <ShieldCheck size={13} />
        Only admins can see this note
      </div>
    </Section>
  );
};

export default InternalNote;
