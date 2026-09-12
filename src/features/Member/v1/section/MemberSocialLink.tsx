import { Link2 } from "lucide-react";
import Section from "../../../../Components/Section";
import Input from "../../../../Components/Input";
import useMembers from "../store/useMembers";
import useUpdateMember from "../utils/useDraftMember";
import type { MemberType } from "../type/MemberDetails.type";

interface MemberSocialLinkProps {
  isEdit: boolean;
  data?: MemberType | null;
  onChange?: (updates: Partial<MemberType>) => void;
}

const MemberSocialLink = ({ isEdit, data, onChange }: MemberSocialLinkProps) => {
  const storeMember = useMembers((state) => state.singleMember);
  const currentMember = data ?? storeMember;
  const { MemberUpdate } = useUpdateMember(currentMember?._id || "");

  if (!currentMember) return null;

  const socialLinks = currentMember.socialLinks;

  const handleSocialUpdate = (key: keyof NonNullable<MemberType["socialLinks"]>, value: string) => {
    const updatedSocial = {
      ...(socialLinks || {
        linkedin: "",
        github: "",
        twitter: "",
        website: "",
        instagram: "",
        youtube: "",
        portfolio: "",
        medium: "",
      }),
      [key]: value,
    };
    if (onChange) {
      onChange({ socialLinks: updatedSocial });
    } else {
      MemberUpdate({ socialLinks: updatedSocial });
    }
  };

  return (
    <Section
      title="Social Links"
      description="Public social and professional profiles"
      icon={<Link2 size={17} />}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="LinkedIn"
          value={socialLinks?.linkedin || ""}
          onChange={(value) => handleSocialUpdate("linkedin", value)}
          readonly={!isEdit}
        />

        <Input
          label="GitHub"
          value={socialLinks?.github || ""}
          onChange={(value) => handleSocialUpdate("github", value)}
          readonly={!isEdit}
        />

        <Input
          label="Twitter"
          value={socialLinks?.twitter || ""}
          onChange={(value) => handleSocialUpdate("twitter", value)}
          readonly={!isEdit}
        />

        <Input
          label="Website"
          value={socialLinks?.website || ""}
          onChange={(value) => handleSocialUpdate("website", value)}
          readonly={!isEdit}
        />

        <Input
          label="Instagram"
          value={socialLinks?.instagram || ""}
          onChange={(value) => handleSocialUpdate("instagram", value)}
          readonly={!isEdit}
        />

        <Input
          label="YouTube"
          value={socialLinks?.youtube || ""}
          onChange={(value) => handleSocialUpdate("youtube", value)}
          readonly={!isEdit}
        />
      </div>
    </Section>
  );
};

export default MemberSocialLink;
