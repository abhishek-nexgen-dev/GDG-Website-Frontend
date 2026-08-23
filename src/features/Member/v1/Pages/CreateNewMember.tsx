import React, { useState } from "react";

import {
  ArrowLeft,
  FileText,
  Globe2,
  Image as ImageIcon,
  MapPin,
  Plus,
  Save,
  Sparkles,
  StickyNote,
  UserRound,
  Users,
  X,
} from "lucide-react";

import Section from "../../../../Components/Section";
import Input from "../../../../Components/Input";
import Label from "../../../../Components/Label";
import Badge from "../../../../Components/Badge";
import { Button } from "../../../../Components/Button";
import { BsGithub, BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from "react-icons/bs";

// ============================================================
// TYPES
// ============================================================

type Location = {
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

type SocialLinks = {
  linkedin: string;
  github: string;
  twitter: string;
  website: string;
  instagram: string;
  youtube: string;
  portfolio: string;
  medium: string;
};

type CreateMemberData = {
  firstName: string;
  lastName: string;
  email: string;

  Bio: string;

  imageUrl: string;
  publicProfileUrl: string;

  membershipStatus: string;
  onboardingSource: string;
  primaryRole: string;

  location: Location;

  socialLinks: SocialLinks;

  skills: string[];
  areaOfInterest: string[];

  internalNotes: string;
};

// ============================================================
// INITIAL STATE
// ============================================================

const initialMember: CreateMemberData = {
  firstName: "",
  lastName: "",
  email: "",

  Bio: "",

  imageUrl: "",
  publicProfileUrl: "",

  membershipStatus: "On Boarding",
  onboardingSource: "website",
  primaryRole: "Full Stack Developer",

  location: {
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },

  socialLinks: {
    linkedin: "",
    github: "",
    twitter: "",
    website: "",
    instagram: "",
    youtube: "",
    portfolio: "",
    medium: "",
  },

  skills: [],

  areaOfInterest: [],

  internalNotes: "",
};

// ============================================================
// CONSTANTS
// ============================================================

const roles = [
  "Full Stack Developer",
  "Backend Developer",
  "Frontend Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "AI/ML Engineer",
  "Mobile Developer",
  "Organizer",
];

const membershipStatuses = ["On Boarding", "Active", "Inactive", "Suspended"];

const onboardingSources = ["website", "referral", "event", "community", "social_media", "other"];

const interests = [
  "OPEN_SOURCE",
  "AI",
  "WEB_DEVELOPMENT",
  "MOBILE_DEVELOPMENT",
  "DEVOPS",
  "CLOUD",
  "CYBER_SECURITY",
  "UI_UX",
];

// ============================================================
// SOCIAL FIELD
// ============================================================

const SocialField = ({
  label,
  icon,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="min-w-0">
      <div
        className="
          mb-1.5
          flex
          items-center
          gap-1.5
          text-[10px]
          font-medium
          text-white/35
          sm:text-[11px]
        "
      >
        <span className="text-white/30">{icon}</span>

        {label}
      </div>

      <Input value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

// ============================================================
// CREATE MEMBER
// ============================================================

const CreateNewMember = () => {
  const [formData, setFormData] = useState<CreateMemberData>(initialMember);

  const [skillInput, setSkillInput] = useState("");

  // ==========================================================
  // BASIC FIELD UPDATE
  // ==========================================================

  const updateField = <K extends keyof CreateMemberData>(key: K, value: CreateMemberData[K]) => {
    setFormData((current) => ({
      ...current,
      [key]: value,
    }));
  };

  // ==========================================================
  // LOCATION UPDATE
  // ==========================================================

  const updateLocation = <K extends keyof Location>(key: K, value: Location[K]) => {
    setFormData((current) => ({
      ...current,

      location: {
        ...current.location,
        [key]: value,
      },
    }));
  };

  // ==========================================================
  // SOCIAL UPDATE
  // ==========================================================

  const updateSocial = <K extends keyof SocialLinks>(key: K, value: SocialLinks[K]) => {
    setFormData((current) => ({
      ...current,

      socialLinks: {
        ...current.socialLinks,
        [key]: value,
      },
    }));
  };

  // ==========================================================
  // SKILLS
  // ==========================================================

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    const exists = formData.skills.some((item) => item.toLowerCase() === skill.toLowerCase());

    if (exists) {
      setSkillInput("");
      return;
    }

    setFormData((current) => ({
      ...current,
      skills: [...current.skills, skill],
    }));

    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setFormData((current) => ({
      ...current,

      skills: current.skills.filter((item) => item !== skill),
    }));
  };

  // ==========================================================
  // INTERESTS
  // ==========================================================

  const toggleInterest = (interest: string) => {
    setFormData((current) => {
      const exists = current.areaOfInterest.includes(interest);

      return {
        ...current,

        areaOfInterest: exists
          ? current.areaOfInterest.filter((item) => item !== interest)
          : [...current.areaOfInterest, interest],
      };
    });
  };

  // ==========================================================
  // VALIDATION
  // ==========================================================

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      alert("First name is required.");
      return false;
    }

    if (!formData.lastName.trim()) {
      alert("Last name is required.");
      return false;
    }

    if (!formData.email.trim()) {
      alert("Email is required.");
      return false;
    }

    if (!formData.primaryRole) {
      alert("Primary role is required.");
      return false;
    }

    return true;
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    const payload: CreateMemberData = {
      ...formData,

      firstName: formData.firstName.trim(),

      lastName: formData.lastName.trim(),

      email: formData.email.trim(),

      Bio: formData.Bio.trim(),

      imageUrl: formData.imageUrl.trim(),

      publicProfileUrl: formData.publicProfileUrl.trim(),

      location: {
        city: formData.location.city.trim(),

        state: formData.location.state.trim(),

        country: formData.location.country.trim(),

        pinCode: formData.location.pinCode.trim(),
      },

      socialLinks: {
        linkedin: formData.socialLinks.linkedin.trim(),

        github: formData.socialLinks.github.trim(),

        twitter: formData.socialLinks.twitter.trim(),

        website: formData.socialLinks.website.trim(),

        instagram: formData.socialLinks.instagram.trim(),

        youtube: formData.socialLinks.youtube.trim(),

        portfolio: formData.socialLinks.portfolio.trim(),

        medium: formData.socialLinks.medium.trim(),
      },

      internalNotes: formData.internalNotes.trim(),
    };

    // --------------------------------------------------------
    // Replace this with your API call.
    // --------------------------------------------------------

    console.log("CREATE MEMBER PAYLOAD:", payload);
  };

  // ==========================================================
  // RESET
  // ==========================================================

  const handleReset = () => {
    const confirmed = window.confirm("Clear all entered member information?");

    if (!confirmed) return;

    setFormData(initialMember);
    setSkillInput("");
  };

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen text-white">
      <main
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-3
          py-4
          sm:px-5
          sm:py-6
          lg:px-8
          lg:py-7
          xl:px-10
          2xl:px-12
        "
      >
        {/* ==================================================
            HEADER
        ================================================== */}

        <header
          className="
            mb-5
            flex
            flex-col
            gap-4
            border-b
            border-[#232830]
            pb-5
            lg:mb-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          <div>
            <div
              className="
                mb-1.5
                flex
                items-center
                gap-1.5
                text-[10px]
                text-white/35
                sm:text-[11px]
              "
            >
              <span>Members</span>

              <span className="text-white/20">/</span>

              <span className="text-green-400">Create New</span>
            </div>

            <h1
              className="
                text-lg
                font-bold
                tracking-tight
                sm:text-xl
                lg:text-2xl
              "
            >
              Create New Member
            </h1>

            <p
              className="
                mt-1
                text-[10px]
                text-white/35
                sm:text-[11px]
              "
            >
              Add a new member to your community.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              onClick={() => window.history.back()}
              className="
                !inline-flex
                !items-center
                !gap-2
              "
            >
              <ArrowLeft size={14} />
              Cancel
            </Button>

            <Button
              type="submit"
              form="create-member-form"
              className="
                !inline-flex
                !items-center
                !gap-2
                !bg-green-500
                !text-black
              "
            >
              <Save size={14} />
              Create Member
            </Button>
          </div>
        </header>

        {/* ==================================================
            FORM
        ================================================== */}

        <form id="create-member-form" onSubmit={handleSubmit}>
          <div
            className="
              grid
              gap-5
              xl:grid-cols-[minmax(0,1fr)_380px]
              2xl:grid-cols-[minmax(0,1fr)_420px]
              2xl:gap-6
            "
          >
            {/* ==================================================
                LEFT
            ================================================== */}

            <div className="min-w-0 space-y-5">
              {/* =================================================
                  BASIC INFORMATION
              ================================================= */}

              <Section
                title="Basic Information"
                description="Add the basic details about the member"
                icon={<UserRound size={17} />}
              >
                <div
                  className="
                    grid
                    gap-4
                    sm:grid-cols-2
                  "
                >
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(value) => updateField("firstName", value)}
                    placeholder="Enter first name"
                  />

                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(value) => updateField("lastName", value)}
                    placeholder="Enter last name"
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(value) => updateField("email", value)}
                    placeholder="member@example.com"
                  />

                  <Input
                    label="Public Profile URL"
                    type="url"
                    value={formData.publicProfileUrl}
                    onChange={(value) => updateField("publicProfileUrl", value)}
                    placeholder="https://..."
                  />

                  <div className="sm:col-span-2">
                    <Input
                      label="Bio"
                      value={formData.Bio}
                      onChange={(value) => updateField("Bio", value)}
                      placeholder="Backend Developer | Open Source Contributor"
                    />
                  </div>
                </div>
              </Section>

              {/* =================================================
                  PROFILE IMAGE
              ================================================= */}

              <Section
                title="Profile Image"
                description="Add the member's profile image"
                icon={<ImageIcon size={17} />}
              >
                <div
                  className="
                    grid
                    gap-5
                    lg:grid-cols-[140px_minmax(0,1fr)]
                    lg:items-center
                  "
                >
                  <div
                    className="
                      flex
                      justify-center
                      lg:justify-start
                    "
                  >
                    <div
                      className="
                        flex
                        h-28
                        w-28
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/10
                        bg-[#121519]
                      "
                    >
                      {formData.imageUrl ? (
                        <img
                          src={formData.imageUrl}
                          alt="Member preview"
                          className="
                            h-full
                            w-full
                            object-cover
                          "
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <UserRound size={30} className="text-white/20" />
                      )}
                    </div>
                  </div>

                  <Input
                    label="Image URL"
                    type="url"
                    value={formData.imageUrl}
                    onChange={(value) => updateField("imageUrl", value)}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              </Section>

              {/* =================================================
                  LOCATION
              ================================================= */}

              <Section
                title="Location"
                description="Add the member's current location"
                icon={<MapPin size={17} />}
              >
                <div
                  className="
                    grid
                    grid-cols-2
                    gap-4
                    sm:grid-cols-4
                  "
                >
                  <Input
                    label="City"
                    value={formData.location.city}
                    onChange={(value) => updateLocation("city", value)}
                    placeholder="Toronto"
                  />

                  <Input
                    label="State / Province"
                    value={formData.location.state}
                    onChange={(value) => updateLocation("state", value)}
                    placeholder="Ontario"
                  />

                  <Input
                    label="Country"
                    value={formData.location.country}
                    onChange={(value) => updateLocation("country", value)}
                    placeholder="Canada"
                  />

                  <Input
                    label="Pin Code"
                    value={formData.location.pinCode}
                    onChange={(value) => updateLocation("pinCode", value)}
                    placeholder="M5V 3L9"
                  />
                </div>
              </Section>

              {/* =================================================
                  SOCIAL LINKS
              ================================================= */}

              <Section
                title="Social Links"
                description="Connect the member's social and professional profiles"
                icon={<Globe2 size={17} />}
              >
                <div
                  className="
                    grid
                    gap-4
                    sm:grid-cols-2
                  "
                >
                  <SocialField
                    label="LinkedIn"
                    icon={<BsLinkedin size={13} />}
                    value={formData.socialLinks.linkedin}
                    placeholder="https://linkedin.com/in/..."
                    onChange={(value) => updateSocial("linkedin", value)}
                  />

                  <SocialField
                    label="GitHub"
                    icon={<BsGithub size={13} />}
                    value={formData.socialLinks.github}
                    placeholder="https://github.com/..."
                    onChange={(value) => updateSocial("github", value)}
                  />

                  <SocialField
                    label="Twitter / X"
                    icon={<BsTwitter size={13} />}
                    value={formData.socialLinks.twitter}
                    placeholder="https://twitter.com/..."
                    onChange={(value) => updateSocial("twitter", value)}
                  />

                  <SocialField
                    label="Website"
                    icon={<Globe2 size={13} />}
                    value={formData.socialLinks.website}
                    placeholder="https://example.com"
                    onChange={(value) => updateSocial("website", value)}
                  />

                  <SocialField
                    label="Instagram"
                    icon={<BsInstagram size={13} />}
                    value={formData.socialLinks.instagram}
                    placeholder="https://instagram.com/..."
                    onChange={(value) => updateSocial("instagram", value)}
                  />

                  <SocialField
                    label="YouTube"
                    icon={<BsYoutube size={13} />}
                    value={formData.socialLinks.youtube}
                    placeholder="https://youtube.com/@..."
                    onChange={(value) => updateSocial("youtube", value)}
                  />

                  <SocialField
                    label="Portfolio"
                    icon={<Globe2 size={13} />}
                    value={formData.socialLinks.portfolio}
                    placeholder="https://portfolio..."
                    onChange={(value) => updateSocial("portfolio", value)}
                  />

                  <SocialField
                    label="Medium"
                    icon={<FileText size={13} />}
                    value={formData.socialLinks.medium}
                    placeholder="https://medium.com/@..."
                    onChange={(value) => updateSocial("medium", value)}
                  />
                </div>
              </Section>

              {/* =================================================
                  SKILLS
              ================================================= */}

              <Section
                title="Skills"
                description="Add the member's technical skills"
                icon={<Sparkles size={17} />}
              >
                <div className="flex gap-2">
                  <div className="min-w-0 flex-1">
                    <Input
                      value={skillInput}
                      onChange={setSkillInput}
                      placeholder="Type a skill and press Enter"
                    />
                  </div>

                  <Button
                    type="button"
                    onClick={addSkill}
                    className="
                      !inline-flex
                      !h-9
                      !shrink-0
                      !items-center
                      !gap-1.5
                      !bg-green-500
                      !px-3
                      !text-black
                    "
                  >
                    <Plus size={13} />
                    Add
                  </Button>
                </div>

                {formData.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-lg
                            border
                            border-emerald-500/20
                            bg-emerald-500/10
                            px-2.5
                            py-1.5
                            text-[10px]
                            text-emerald-400
                          "
                      >
                        {skill}

                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="
                              text-emerald-400/50
                              transition
                              hover:text-red-400
                            "
                        >
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </Section>

              {/* =================================================
                  INTERESTS
              ================================================= */}

              <Section
                title="Areas of Interest"
                description="Select the areas that match the member's interests"
                icon={<Sparkles size={17} />}
              >
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => {
                    const selected = formData.areaOfInterest.includes(interest);

                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`
                            rounded-lg
                            border
                            px-3
                            py-2
                            text-[10px]
                            font-medium
                            transition

                            ${
                              selected
                                ? `
                                  border-purple-500/30
                                  bg-purple-500/10
                                  text-purple-400
                                `
                                : `
                                  border-white/[0.07]
                                  bg-[#121519]
                                  text-white/40
                                  hover:border-white/15
                                  hover:text-white/70
                                `
                            }
                          `}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </Section>

              {/* =================================================
                  INTERNAL NOTES
              ================================================= */}

              <Section
                title="Internal Notes"
                description="Private notes visible only to authorized members"
                icon={<StickyNote size={17} />}
              >
                <textarea
                  value={formData.internalNotes}
                  onChange={(event) => updateField("internalNotes", event.target.value)}
                  rows={4}
                  placeholder="Add internal notes..."
                  className="
                    w-full
                    resize-y
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-[#202126]
                    px-3
                    py-3
                    text-xs
                    leading-5
                    text-zinc-200
                    outline-none
                    transition

                    placeholder:text-zinc-600

                    focus:border-emerald-500/50
                    focus:ring-1
                    focus:ring-emerald-500/10

                    sm:text-sm
                  "
                />
              </Section>
            </div>

            {/* ==================================================
                RIGHT SIDEBAR
            ================================================== */}

            <aside className="min-w-0 space-y-5">
              {/* =================================================
                  MEMBERSHIP
              ================================================= */}

              <Section
                title="Membership"
                description="Configure membership information"
                icon={<Users size={17} />}
              >
                <div className="space-y-4">
                  <div>
                    <Label>Primary Role</Label>

                    <select
                      value={formData.primaryRole}
                      onChange={(event) => updateField("primaryRole", event.target.value)}
                      className="
                        h-9
                        w-full
                        appearance-none
                        rounded-md
                        border
                        border-white/[0.07]
                        bg-[#202126]
                        px-3
                        text-xs
                        text-zinc-200
                        outline-none
                        transition
                        focus:border-emerald-500/50
                        focus:ring-1
                        focus:ring-emerald-500/10
                        sm:text-sm
                      "
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Membership Status</Label>

                    <select
                      value={formData.membershipStatus}
                      onChange={(event) => updateField("membershipStatus", event.target.value)}
                      className="
                        h-9
                        w-full
                        appearance-none
                        rounded-md
                        border
                        border-white/[0.07]
                        bg-[#202126]
                        px-3
                        text-xs
                        text-zinc-200
                        outline-none
                        transition
                        focus:border-emerald-500/50
                        focus:ring-1
                        focus:ring-emerald-500/10
                        sm:text-sm
                      "
                    >
                      {membershipStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label>Onboarding Source</Label>

                    <select
                      value={formData.onboardingSource}
                      onChange={(event) => updateField("onboardingSource", event.target.value)}
                      className="
                        h-9
                        w-full
                        appearance-none
                        rounded-md
                        border
                        border-white/[0.07]
                        bg-[#202126]
                        px-3
                        text-xs
                        text-zinc-200
                        outline-none
                        transition
                        focus:border-emerald-500/50
                        focus:ring-1
                        focus:ring-emerald-500/10
                        sm:text-sm
                      "
                    >
                      {onboardingSources.map((source) => (
                        <option key={source} value={source}>
                          {source}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </Section>

              {/* =================================================
                  PREVIEW
              ================================================= */}

              <Section
                title="Member Preview"
                description="Preview of the profile information"
                icon={<UserRound size={17} />}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      h-14
                      w-14
                      shrink-0
                      overflow-hidden
                      rounded-xl
                      border
                      border-white/10
                      bg-[#121519]
                    "
                  >
                    {formData.imageUrl ? (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                        "
                      >
                        <UserRound size={20} className="text-white/20" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-white/80">
                      {formData.firstName || "First"} {formData.lastName || "Last"}
                    </h3>

                    <p className="mt-1 truncate text-[10px] text-white/35">
                      {formData.email || "email@example.com"}
                    </p>

                    <div className="mt-2">
                      <Badge variant="green">{formData.membershipStatus}</Badge>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    mt-5
                    border-t
                    border-[#232830]
                    pt-4
                  "
                >
                  <div className="mb-2 text-[10px] text-white/35">Primary Role</div>

                  <Badge variant="purple">{formData.primaryRole}</Badge>
                </div>

                {formData.areaOfInterest.length > 0 && (
                  <div
                    className="
                      mt-4
                      border-t
                      border-[#232830]
                      pt-4
                    "
                  >
                    <div className="mb-2 text-[10px] text-white/35">Interests</div>

                    <div className="flex flex-wrap gap-1.5">
                      {formData.areaOfInterest.map((interest) => (
                        <Badge key={interest} variant="purple">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Section>

              {/* =================================================
                  ACTIONS
              ================================================= */}

              <Section
                title="Actions"
                description="Create or reset this member form"
                icon={<Save size={17} />}
              >
                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="
                      !flex
                      !w-full
                      !items-center
                      !justify-center
                      !gap-2
                      !bg-green-500
                      !text-black
                    "
                  >
                    <Save size={14} />
                    Create Member
                  </Button>

                  <Button
                    type="button"
                    onClick={handleReset}
                    className="
                      !flex
                      !w-full
                      !items-center
                      !justify-center
                      !gap-2
                    "
                  >
                    <X size={14} />
                    Clear Form
                  </Button>
                </div>
              </Section>
            </aside>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateNewMember;
