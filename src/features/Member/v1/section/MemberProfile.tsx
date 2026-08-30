import React, { useState } from "react";
import { UserRound, Copy, Check, MapPin, Globe2, ExternalLink, Link2 } from "lucide-react";

import Section from "../../../../Components/Section";
import Badge from "../../../../Components/Badge";
import Input from "../../../../Components/Input";
import useMembers from "../store/useMembers";

import { BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";

const SocialLink = ({
  href,
  label,
  icon,
}: {
  href?: string;
  label: string;
  icon: React.ReactNode;
}) => {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex
        items-center
        gap-1.5
        rounded-lg
        border
        border-[#232830]
        bg-[#121519]
        px-2.5
        py-1.5
        text-[10px]
        text-white/60
        transition
        hover:border-green-500/30
        hover:text-green-400
      "
    >
      {icon}
      <span>{label}</span>
    </a>
  );
};

const MemberProfile = () => {
  const singleMember = useMembers((state) => state.singleMember);

  const [copySuccess, setCopySuccess] = useState(false);

  const copyEmail = async () => {
    if (!singleMember?.email) return;
    try {
      await navigator.clipboard.writeText(singleMember.email);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 1500);
    } catch {
      setCopySuccess(false);
    }
  };

  if (!singleMember) return null;

  return (
    <Section
      title="Member Profile"
      description="Overview and membership information"
      icon={<UserRound size={17} />}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start lg:gap-6">
        {/* Avatar */}
        <div className="relative mx-auto shrink-0 sm:mx-0">
          <img
            src={
              singleMember.imageUrl ||
              `https://api.dicebear.com/9.x/initials/svg?seed=${singleMember.firstName}`
            }
            alt={`${singleMember.firstName} ${singleMember.lastName}`}
            className="h-24 w-24 rounded-2xl border border-white/10 bg-[#24282d] object-cover sm:h-28 sm:w-28 lg:h-32 lg:w-32"
            onError={(event) => {
              event.currentTarget.src = `https://api.dicebear.com/9.x/initials/svg?seed=${singleMember.firstName}`;
            }}
          />

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <Badge variant="green">
              <Check size={10} className="mr-1" />
              {singleMember.membershipStatus || "Active"}
            </Badge>
          </div>

          <span className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full border-2 border-[#161a1f] bg-green-500" />
        </div>

        {/* Profile Info */}
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-[26px]">
            {singleMember.firstName} {singleMember.lastName}
          </h2>

          <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 text-[10px] text-white/40 sm:justify-start sm:text-[11px]">
            <span className="break-all">{singleMember.email}</span>
            <button
              type="button"
              onClick={copyEmail}
              title="Copy email"
              className="text-white/30 hover:text-white"
            >
              {copySuccess ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            </button>
            {copySuccess && <span className="text-green-400">Copied</span>}
          </div>

          {/* Bio */}
          {singleMember.Bio && (
            <p className="mt-3 text-xs leading-relaxed text-white/55 sm:text-sm">
              {singleMember.Bio}
            </p>
          )}

          {/* Social Links */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
            <SocialLink
              href={String(singleMember.socialLinks?.github)}
              label="GitHub"
              icon={<Globe2 size={13} />}
            />
            <SocialLink
              href={String(singleMember.socialLinks?.linkedin)}
              label="LinkedIn"
              icon={<BsLinkedin size={13} />}
            />
            <SocialLink
              href={String(singleMember.socialLinks?.twitter)}
              label="Twitter"
              icon={<ExternalLink size={13} />}
            />
            <SocialLink
              href={String(singleMember.socialLinks?.website)}
              label="Website"
              icon={<Link2 size={13} />}
            />
            <SocialLink
              href={String(singleMember.socialLinks?.instagram)}
              label="Instagram"
              icon={<BsInstagram size={13} />}
            />
            <SocialLink
              href={String(singleMember.socialLinks?.youtube)}
              label="YouTube"
              icon={<BsYoutube size={13} />}
            />
            <SocialLink
              href={String(singleMember.socialLinks?.portfolio)}
              label="Portfolio"
              icon={<Globe2 size={13} />}
            />
            <SocialLink
              href={String(singleMember.socialLinks?.medium)}
              label="Medium"
              icon={<ExternalLink size={13} />}
            />
          </div>

          {/* Meta */}
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-[#232830] pt-4 sm:grid-cols-3">
            <Input label="Member ID" value={singleMember._id || ""} onChange={() => {}} readonly />
            <Input label="Slug" value={singleMember.Slug || ""} onChange={() => {}} readonly />
            <Input
              label="Onboarding"
              value={singleMember.onboardingSource || "Unknown"}
              onChange={() => {}}
              readonly
            />
          </div>
        </div>
      </div>

      {/* Status Badges */}
      <div className="mt-6 grid gap-2 rounded-xl border border-[#232830] bg-[#121519] p-2 sm:grid-cols-3">
        <div className="rounded-lg bg-[#181c21] p-3">
          <div className="mb-2 text-[10px] text-white/35">Primary Role</div>
          <Badge variant="purple">{singleMember.primaryRole || "N/A"}</Badge>
        </div>

        <div className="rounded-lg bg-[#181c21] p-3">
          <div className="mb-2 text-[10px] text-white/35">Membership Status</div>
          <Badge variant="green">
            <Check size={10} className="mr-1" />
            {singleMember.membershipStatus || "Active"}
          </Badge>
        </div>

        <div className="rounded-lg bg-[#181c21] p-3">
          <div className="mb-2 text-[10px] text-white/35">Location</div>
          <Badge variant="blue">
            <MapPin size={10} className="mr-1" />
            {singleMember.location?.city && singleMember.location?.country
              ? `${singleMember.location.city}, ${singleMember.location.country}`
              : singleMember.location?.city || singleMember.location?.country || "N/A"}
          </Badge>
        </div>
      </div>
    </Section>
  );
};

export default MemberProfile;
