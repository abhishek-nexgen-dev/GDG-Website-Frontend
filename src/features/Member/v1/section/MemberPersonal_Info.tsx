import { UserRound } from "lucide-react";
import Input from "../../../../Components/Input";
import useMembers from "../store/useMembers";

import useUpdateMember from "../utils/useDraftMember";
import Section from "../../../../Components/Section";

interface MemberPersonalInfoProps {
  isEdit: boolean;
}

const MemberPersonal_Info = ({ isEdit }: MemberPersonalInfoProps) => {
  const singleMember = useMembers((state) => state.singleMember);
  const { MemberUpdate } = useUpdateMember(singleMember?._id || "");

  if (!singleMember) return null;

  return (
    <Section
      title="Personal Information"
      description="Member account and profile information"
      icon={<UserRound size={17} />}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="First Name"
          value={singleMember.firstName || ""}
          onChange={(value) => MemberUpdate({ firstName: value })}
          readonly={!isEdit}
        />

        <Input
          label="Last Name"
          value={singleMember.lastName || ""}
          onChange={(value) => MemberUpdate({ lastName: value })}
          readonly={!isEdit}
        />

        <Input
          label="Email"
          type="email"
          value={singleMember.email || ""}
          onChange={(value) => MemberUpdate({ email: value })}
          readonly={!isEdit}
        />

        <Input
          label="Primary Role"
          value={singleMember.primaryRole || ""}
          onChange={(value) => MemberUpdate({ primaryRole: value })}
          readonly={!isEdit}
        />

        <div className="sm:col-span-2">
          <Input
            label="Bio"
            value={singleMember.Bio || ""}
            onChange={(value) => MemberUpdate({ Bio: value })}
            readonly={!isEdit}
          />
        </div>

        <Input label="Auth ID" value={singleMember.AuthId || ""} onChange={() => {}} readonly />

        <Input label="Member ID" value={singleMember._id || ""} onChange={() => {}} readonly />
      </div>
    </Section>
  );
};

export default MemberPersonal_Info;
