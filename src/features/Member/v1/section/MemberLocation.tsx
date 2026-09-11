import { MapPin } from "lucide-react";
import Section from "../../../../Components/Section";
import Input from "../../../../Components/Input";
import useMembers from "../store/useMembers";
import useUpdateMember from "../utils/useDraftMember";
import type { MemberType } from "../type/MemberDetails.type";

interface MemberLocationProps {
  isEdit: boolean;
  data?: MemberType | null;
  onChange?: (updates: Partial<MemberType>) => void;
}

const MemberLocation = ({ isEdit, data, onChange }: MemberLocationProps) => {
  const storeMember = useMembers((state) => state.singleMember);
  const currentMember = data ?? storeMember;
  const { MemberUpdate } = useUpdateMember(currentMember?._id || "");

  if (!currentMember) return null;

  const location = currentMember.location;

  const handleLocationUpdate = (key: keyof NonNullable<MemberType["location"]>, value: string) => {
    const updatedLocation = {
      ...(location || { city: "", state: "", country: "", pinCode: "" }),
      [key]: value,
    };
    if (onChange) {
      onChange({ location: updatedLocation });
    } else {
      MemberUpdate({ location: updatedLocation });
    }
  };

  return (
    <Section title="Location" description="Member's current location" icon={<MapPin size={17} />}>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Input
          label="City"
          value={location?.city || ""}
          onChange={(value) => handleLocationUpdate("city", value)}
          readonly={!isEdit}
        />

        <Input
          label="State"
          value={location?.state || ""}
          onChange={(value) => handleLocationUpdate("state", value)}
          readonly={!isEdit}
        />

        <Input
          label="Country"
          value={location?.country || ""}
          onChange={(value) => handleLocationUpdate("country", value)}
          readonly={!isEdit}
        />

        <Input
          label="PIN Code"
          value={location?.pinCode || ""}
          onChange={(value) => handleLocationUpdate("pinCode", value)}
          readonly={!isEdit}
        />
      </div>
    </Section>
  );
};

export default MemberLocation;
