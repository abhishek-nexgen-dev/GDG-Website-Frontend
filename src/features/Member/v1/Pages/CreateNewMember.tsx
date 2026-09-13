import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm, Controller, useWatch } from "react-hook-form";
import {
  ArrowLeft,
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
  Upload,
  Loader2,
} from "lucide-react";

import Section from "../../../../Components/Section";
import Input from "../../../../Components/Input";
import Label from "../../../../Components/Label";
import Badge from "../../../../Components/Badge";
import { Button } from "../../../../Components/Button";

import PermissionChecker from "../../../Permission/Components/PermissionChecker";
import PermissionDenied from "../../../Permission/Components/PermissionDenied";
import useCreateMemberMutation from "../hook/useCreateMemberMutation";
import uploadImage from "../../../../utils/uploadImage";
import { useCreateMemberDraft, type CreateMemberData } from "../store/useCreateMemberDraft";

// ============================================================
// CONSTANTS
// ============================================================
const roles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "Product Manager",
  "Core Team",
  "Organizer",
  "Contributor",
];

const membershipStatuses = ["Active", "Inactive", "On Boarding", "Offline"];
const onboardingSources = ["website", "referral", "event", "social_media"];

const CreateNewMember = () => {
  const navigate = useNavigate();
  const createMemberMutation = useCreateMemberMutation();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [skillInput, setSkillInput] = useState("");

  const setDraft = useCreateMemberDraft((state) => state.setDraft);
  const clearDraft = useCreateMemberDraft((state) => state.clearDraft);
  const [initialDraft] = useState(() => useCreateMemberDraft.getState().draft);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateMemberData>({
    defaultValues: initialDraft,
  });

  // Watch all values to auto-save to draft
  const currentValues = useWatch({ control }) as CreateMemberData;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDraft(currentValues);
    }, 500); // Debounce to improve performance
    return () => clearTimeout(handler);
  }, [currentValues, setDraft]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const res = await uploadImage(file);
      setValue("imageUrl", res.secure_url, { shouldValidate: true, shouldDirty: true });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Upload Failed",
        text: "Could not upload the image. Please try again or use a manual URL.",
        icon: "error",
        background: "#111116",
        color: "#ffffff",
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  // ==========================================================
  // SKILLS
  // ==========================================================
  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill) return;

    const currentSkills = control._formValues.skills || [];
    const exists = currentSkills.some((item: string) => item.toLowerCase() === skill.toLowerCase());

    if (exists) {
      setSkillInput("");
      return;
    }

    setValue("skills", [...currentSkills, skill]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    const currentSkills = control._formValues.skills || [];
    setValue("skills", currentSkills.filter((item: string) => item !== skill));
  };

  // ==========================================================
  // INTERESTS
  // ==========================================================
  const toggleInterest = (interest: string) => {
    const currentInterests = control._formValues.areaOfInterest || [];
    const exists = currentInterests.includes(interest);
    
    if (exists) {
      setValue("areaOfInterest", currentInterests.filter((item: string) => item !== interest));
    } else {
      setValue("areaOfInterest", [...currentInterests, interest]);
    }
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================
  const onSubmitForm = (data: CreateMemberData) => {
    if (!data.firstName?.trim() || !data.lastName?.trim() || !data.email?.trim() || !data.primaryRole) {
      alert("First name, last name, email, and primary role are required.");
      return;
    }

    const payload: CreateMemberData = {
      ...data,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.trim(),
      Bio: data.Bio.trim(),
      imageUrl: data.imageUrl.trim(),
      publicProfileUrl: data.publicProfileUrl.trim(),
      location: {
        city: data.location.city.trim(),
        state: data.location.state.trim(),
        country: data.location.country.trim(),
        pinCode: data.location.pinCode.trim(),
      },
      socialLinks: {
        linkedin: data.socialLinks.linkedin.trim(),
        github: data.socialLinks.github.trim(),
        twitter: data.socialLinks.twitter.trim(),
        website: data.socialLinks.website.trim(),
        instagram: data.socialLinks.instagram.trim(),
        youtube: data.socialLinks.youtube.trim(),
        portfolio: data.socialLinks.portfolio.trim(),
        medium: data.socialLinks.medium.trim(),
      },
      internalNotes: data.internalNotes.trim(),
    };

    createMemberMutation.mutate(payload, {
      onSuccess: (res) => {
        Swal.fire({
          title: "Member Created!",
          text: res.message || `${payload.firstName} ${payload.lastName} has been onboarded successfully.`,
          icon: "success",
          background: "#111116",
          color: "#ffffff",
          confirmButtonColor: "#34A853",
        }).then(() => {
          clearDraft();
          navigate("/member/members");
        });
      },
      onError: (error: any) => {
        Swal.fire({
          title: "Error",
          text: error?.response?.data?.message || "Something went wrong while creating the member.",
          icon: "error",
          background: "#111116",
          color: "#ffffff",
          confirmButtonColor: "#EF4444",
        });
      },
    });
  };

  const handleReset = React.useCallback(() => {
    clearDraft();
    reset(useCreateMemberDraft.getState().draft);
    setSkillInput("");
  }, [clearDraft, reset]);

  return (
    <PermissionChecker
      permissionAction="create"
      permissionName="member:create"
      fallback={<PermissionDenied />}
    >
      <div className="min-h-screen bg-[#0A0A0A] text-white">
        {/* ==================================================
          HEADER
        ================================================== */}
        <header
          className="
          sticky
          top-0
          z-10
          border-b
          border-[#232830]
          bg-[#0A0A0A]/80
          px-4
          py-4
          backdrop-blur-md
          sm:px-6
          lg:px-8
        "
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => navigate("/member/members")}
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-[#1A1A1A]
                  text-white/60
                  transition-colors
                  hover:bg-[#232830]
                  hover:text-white
                "
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
                  <UserRound size={22} className="text-emerald-400" />
                  Onboard Member
                </h1>
                <p className="mt-1 text-xs text-white/50">Add a new member to the community</p>
              </div>
            </div>
          </div>
        </header>

        {/* ==================================================
          MAIN CONTENT
        ================================================== */}
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <form id="create-member-form" onSubmit={handleSubmit(onSubmitForm)}>
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
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="First Name"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter first name"
                        />
                      )}
                    />

                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Last Name"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter last name"
                        />
                      )}
                    />

                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Email"
                          type="email"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="member@example.com"
                        />
                      )}
                    />

                    <Controller
                      name="publicProfileUrl"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Public Profile URL"
                          type="url"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="https://..."
                        />
                      )}
                    />

                    <div className="sm:col-span-2">
                      <Controller
                        name="Bio"
                        control={control}
                        render={({ field }) => (
                          <Input
                            label="Bio"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Backend Developer | Open Source Contributor"
                          />
                        )}
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
                  "
                  >
                    <div className="flex flex-col items-center gap-3 sm:items-start">
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
                        {currentValues.imageUrl ? (
                          <img
                            src={currentValues.imageUrl}
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

                    <div className="flex flex-col gap-3 w-full">
                      <Controller
                        name="imageUrl"
                        control={control}
                        render={({ field }) => (
                          <Input
                            label="Image URL"
                            type="url"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="https://example.com/avatar.jpg"
                          />
                        )}
                      />
                      
                      <div className="flex items-center gap-4">
                        <div className="h-[1px] flex-1 bg-white/10" />
                        <span className="text-xs font-medium text-white/40 uppercase tracking-widest">or</span>
                        <div className="h-[1px] flex-1 bg-white/10" />
                      </div>

                      <div className="flex flex-col gap-2">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                        />
                        <button
                          type="button"
                          disabled={isUploadingImage}
                          onClick={() => fileInputRef.current?.click()}
                          className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            border
                            border-white/10
                            bg-white/[0.03]
                            px-4
                            py-2.5
                            text-sm
                            font-medium
                            text-white/80
                            transition
                            hover:bg-white/[0.08]
                            disabled:opacity-50
                          "
                        >
                          {isUploadingImage ? (
                            <Loader2 size={16} className="animate-spin text-emerald-400" />
                          ) : (
                            <Upload size={16} className="text-white/60" />
                          )}
                          {isUploadingImage ? "Uploading..." : "Upload Image"}
                        </button>
                      </div>
                    </div>
                  </div>
                </Section>

                {/* =================================================
                  LOCATION
              ================================================= */}

                <Section
                  title="Location"
                  description="Where is this member based?"
                  icon={<MapPin size={17} />}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Controller
                      name="location.city"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="City"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="e.g., Ranchi"
                        />
                      )}
                    />
                    <Controller
                      name="location.state"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="State"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="e.g., Jharkhand"
                        />
                      )}
                    />
                    <Controller
                      name="location.country"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Country"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="e.g., India"
                        />
                      )}
                    />
                    <Controller
                      name="location.pinCode"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Pin Code"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="e.g., 834001"
                        />
                      )}
                    />
                  </div>
                </Section>

                {/* =================================================
                  SOCIAL LINKS
              ================================================= */}

                <Section
                  title="Social Links"
                  description="Connect the member's online profiles"
                  icon={<Globe2 size={17} />}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Controller
                      name="socialLinks.linkedin"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="LinkedIn URL"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="https://linkedin.com/in/..."
                        />
                      )}
                    />
                    <Controller
                      name="socialLinks.github"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="GitHub URL"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="https://github.com/..."
                        />
                      )}
                    />
                    <Controller
                      name="socialLinks.twitter"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Twitter URL"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="https://twitter.com/..."
                        />
                      )}
                    />
                    <Controller
                      name="socialLinks.website"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Personal Website"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="https://..."
                        />
                      )}
                    />
                  </div>
                </Section>
              </div>

              {/* ==================================================
                RIGHT SIDEBAR
            ================================================== */}

              <aside className="min-w-0 space-y-5">
                {/* =================================================
                  SKILLS & INTERESTS
              ================================================= */}
                <Section
                  title="Skills & Interests"
                  description="Areas of expertise"
                  icon={<Sparkles size={17} />}
                >
                  <div className="space-y-5">
                    {/* Skills */}
                    <div>
                      <Label>Skills</Label>
                      <div className="mt-1 flex gap-2">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addSkill();
                            }
                          }}
                          placeholder="e.g., React, Node.js"
                          className="
                          h-9
                          w-full
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
                        />
                        <button
                          type="button"
                          onClick={addSkill}
                          className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-md
                          bg-white/[0.05]
                          text-white/60
                          transition
                          hover:bg-white/10
                          hover:text-white
                        "
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {currentValues.skills && currentValues.skills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {currentValues.skills.map((skill: string) => (
                            <span
                              key={skill}
                              className="
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-md
                              border
                              border-white/10
                              bg-white/[0.03]
                              px-2
                              py-1
                              text-xs
                              text-white/70
                            "
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => removeSkill(skill)}
                                className="text-white/40 hover:text-red-400"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Interests */}
                    <div>
                      <Label>Areas of Interest</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {[
                          "Web Development",
                          "Cloud Computing",
                          "Machine Learning",
                          "Open Source",
                          "Community Building",
                        ].map((interest) => {
                          const isSelected = currentValues.areaOfInterest?.includes(interest);
                          return (
                            <button
                              key={interest}
                              type="button"
                              onClick={() => toggleInterest(interest)}
                              className={`
                              rounded-md border px-2 py-1 text-xs transition
                              ${
                                isSelected
                                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                                  : "border-white/10 bg-white/[0.03] text-white/50 hover:bg-white/[0.08] hover:text-white"
                              }
                            `}
                            >
                              {interest}
                            </button>
                          );
                        })}
                      </div>
                    </div>
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
                  <Controller
                    name="internalNotes"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        value={field.value}
                        onChange={field.onChange}
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
                    )}
                  />
                </Section>

                {/* =================================================
                  STATUS & ROLE
              ================================================= */}

                <Section
                  title="Status & Role"
                  description="Set the member's position and status"
                  icon={<Users size={17} />}
                >
                  <div className="space-y-4">
                    <div>
                      <Label>Primary Role</Label>
                      <Controller
                        name="primaryRole"
                        control={control}
                        render={({ field }) => (
                          <select
                            value={field.value}
                            onChange={field.onChange}
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
                        )}
                      />
                    </div>

                    <div>
                      <Label>Membership Status</Label>
                      <Controller
                        name="membershipStatus"
                        control={control}
                        render={({ field }) => (
                          <select
                            value={field.value}
                            onChange={field.onChange}
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
                        )}
                      />
                    </div>

                    <div>
                      <Label>Onboarding Source</Label>
                      <Controller
                        name="onboardingSource"
                        control={control}
                        render={({ field }) => (
                          <select
                            value={field.value}
                            onChange={field.onChange}
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
                        )}
                      />
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
                      {currentValues.imageUrl ? (
                        <img
                          src={currentValues.imageUrl}
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
                        {currentValues.firstName || "First"} {currentValues.lastName || "Last"}
                      </h3>
                      <p className="mt-1 truncate text-[10px] text-white/35">
                        {currentValues.email || "email@example.com"}
                      </p>
                      <div className="mt-2">
                        <Badge variant="green">{currentValues.membershipStatus}</Badge>
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
                    <Badge variant="purple">{currentValues.primaryRole}</Badge>
                  </div>

                  {currentValues.areaOfInterest && currentValues.areaOfInterest.length > 0 && (
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
                        {currentValues.areaOfInterest.map((interest: string) => (
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
                      disabled={createMemberMutation.isPending || isSubmitting}
                      className="
                      !flex
                      !w-full
                      !items-center
                      !justify-center
                      !gap-2
                      !bg-green-500
                      !text-black
                      disabled:opacity-60
                    "
                    >
                      <Save size={14} />
                      {createMemberMutation.isPending || isSubmitting ? "Creating..." : "Create Member"}
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
    </PermissionChecker>
  );
};

export default CreateNewMember;
