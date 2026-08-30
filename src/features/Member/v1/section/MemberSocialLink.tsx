import { Link2 } from "lucide-react";

import Section from "../../../../Components/Section";
import Input from "../../../../Components/Input";
import useMembers from "../store/useMembers";
import useUpdateMember from "../utils/useDraftMember";

interface MemberSocialLinkProps {
  isEdit: boolean;
}

const MemberSocialLink = ({ isEdit }: MemberSocialLinkProps) => {
  const singleMember = useMembers((state) => state.singleMember);
  const { MemberUpdate } = useUpdateMember(singleMember?._id || "");

  if (!singleMember) return null;

  const socialLinks = singleMember.socialLinks;

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
          onChange={(value) => MemberUpdate({ socialLinks: { ...socialLinks, linkedin: value } })}
          readonly={!isEdit}
        />

        <Input
          label="GitHub"
          value={socialLinks?.github || ""}
          onChange={(value) => MemberUpdate({ socialLinks: { ...socialLinks, github: value } })}
          readonly={!isEdit}
        />

        <Input
          label="Twitter"
          value={socialLinks?.twitter || ""}
          onChange={(value) => MemberUpdate({ socialLinks: { ...socialLinks, twitter: value } })}
          readonly={!isEdit}
        />

        <Input
          label="Website"
          value={socialLinks?.website || ""}
          onChange={(value) => MemberUpdate({ socialLinks: { ...socialLinks, website: value } })}
          readonly={!isEdit}
        />

        <Input
          label="Instagram"
          value={socialLinks?.instagram || ""}
          onChange={(value) => MemberUpdate({ socialLinks: { ...socialLinks, instagram: value } })}
          readonly={!isEdit}
        />

        <Input
          label="YouTube"
          value={socialLinks?.youtube || ""}
          onChange={(value) => MemberUpdate({ socialLinks: { ...socialLinks, youtube: value } })}
          readonly={!isEdit}
        />

        <Input
          label="Portfolio"
          value={socialLinks?.portfolio || ""}
          onChange={(value) => MemberUpdate({ socialLinks: { ...socialLinks, portfolio: value } })}
          readonly={!isEdit}
        />

        <Input
          label="Medium"
          value={socialLinks?.medium || ""}
          onChange={(value) => MemberUpdate({ socialLinks: { ...socialLinks, medium: value } })}
          readonly={!isEdit}
        />
      </div>
    </Section>
  );
};

export default MemberSocialLink;
