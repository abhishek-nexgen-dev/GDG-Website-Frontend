import { UserRound } from "lucide-react";
import Input from "../../../../Components/Input";
import useMembers from "../store/useMembers";
import useUpdateMember from "../utils/useDraftMember";
import Section from "../../../../Components/Section";
import type { MemberType } from "../type/MemberDetails.type";

interface MemberPersonalInfoProps {
  isEdit: boolean;
  data?: MemberType | null;
  onChange?: (updates: Partial<MemberType>) => void;
}

const MemberPersonal_Info = ({ isEdit, data, onChange }: MemberPersonalInfoProps) => {
  const storeMember = useMembers((state) => state.singleMember);
  const currentMember = data ?? storeMember;
  const { MemberUpdate } = useUpdateMember(currentMember?._id || "");

  if (!currentMember) return null;

  const handleUpdate = (updates: Partial<MemberType>) => {
    if (onChange) {
      onChange(updates);
    } else {
      MemberUpdate(updates);
    }
  };

  return (
    <Section
      title="Personal Information"
      description="Member account and profile information"
      icon={<UserRound size={17} />}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="First Name"
          value={currentMember.firstName || ""}
          onChange={(value) => handleUpdate({ firstName: value })}
          readonly={!isEdit}
        />

        <Input
          label="Last Name"
          value={currentMember.lastName || ""}
          onChange={(value) => handleUpdate({ lastName: value })}
          readonly={!isEdit}
        />

        <Input
          label="Email"
          type="email"
          value={currentMember.email || ""}
          onChange={(value) => handleUpdate({ email: value })}
          readonly={!isEdit}
        />

        <Input
          label="Primary Role"
          value={currentMember.primaryRole || ""}
          onChange={(value) => handleUpdate({ primaryRole: value })}
          readonly={!isEdit}
        />

        <div className="sm:col-span-2">
          <Input
            label="Bio"
            value={currentMember.Bio || ""}
            onChange={(value) => handleUpdate({ Bio: value })}
            readonly={!isEdit}
          />
        </div>

        <Input label="Auth ID" value={currentMember.AuthId || ""} onChange={() => {}} readonly />

        <Input label="Member ID" value={currentMember._id || ""} onChange={() => {}} readonly />
      </div>
    </Section>
  );
};

export default MemberPersonal_Info;
