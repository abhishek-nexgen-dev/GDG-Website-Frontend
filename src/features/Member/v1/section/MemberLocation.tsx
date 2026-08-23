
import { MapPin } from "lucide-react";

import Section from "../../../../Components/Section";
import Input from "../../../../Components/Input";
import useMembers from "../store/useMembers";
import useUpdateMember from "../utils/useDraftMember";


interface MemberLocationProps {
  isEdit: boolean;
}

const MemberLocation = ({ isEdit }: MemberLocationProps) => {
  const singleMember = useMembers((state) => state.singleMember);
  const { MemberUpdate } = useUpdateMember(singleMember?._id || "");

  if (!singleMember) return null;

  const location = singleMember.location;

  return (
    <Section title="Location" description="Member's current location" icon={<MapPin size={17} />}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Input
          label="City"
          value={location?.city || ""}
          onChange={(value) => MemberUpdate({ location: { ...location, city: value } })}
          readonly={!isEdit}
        />

        <Input
          label="State"
          value={location?.state || ""}
          onChange={(value) => MemberUpdate({ location: { ...location, state: value } })}
          readonly={!isEdit}
        />

        <Input
          label="Country"
          value={location?.country || ""}
          onChange={(value) => MemberUpdate({ location: { ...location, country: value } })}
          readonly={!isEdit}
        />

        <Input
          label="PIN Code"
          value={location?.pinCode || ""}
          onChange={(value) => MemberUpdate({ location: { ...location, pinCode: value } })}
          readonly={!isEdit}
        />
      </div>
    </Section>
  );
};

export default MemberLocation;
