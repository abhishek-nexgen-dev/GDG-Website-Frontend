import { useEffect, useState, useMemo } from "react";
import {
  ArrowLeft,
  Copy,
  Download,
  Globe2,
  Pencil,
  Save,
  Send,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
  Check,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Section from "../../../../Components/Section";
import { Button } from "../../../../Components/Button";
import useFetchMemberProfile from "../hook/useFetchMemberProfile";
import useMembers from "../store/useMembers";
import TagEditor from "../Components/TagEditor";

import MemberProfile from "../section/MemberProfile";
import MemberPersonal_Info from "../section/MemberPersonal_Info";
import MemberLocation from "../section/MemberLocation";
import MemberSocialLink from "../section/MemberSocialLink";
import InternalNote from "../section/InternalNote";
import PermissionManager from "../Components/PermissionManager";
import PermissionChecker from "../../../Permission/Components/PermissionChecker";
import PermissionDenied from "../../../Permission/Components/PermissionDenied";
import AVAILABLE_PERMISSIONS_CONSTANT from "../Constant/AVAILABLE_PERMISSIONS.Constant";
import type { MemberType } from "../type/MemberDetails.type";
import useMemberPermissionsQuery from "../../../Permission/hook/useMemberPermissionsQuery";
import useAssignPermissionsMutation from "../../../Permission/hook/useAssignPermissionsMutation";
import type { Permission } from "../../../Auth/v1/types/Auth.type";

const MemberDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Store State
  const members = useMembers((state) => state.members);
  const storeSingleMember = useMembers((state) => state.singleMember);
  const setSingleMember = useMembers((state) => state.setSingleMember);
  const updateMember = useMembers((state) => state.updateMember);
  const setIsEditSingleMember = useMembers((state) => state.setIsEditSingleMember);

  // Local React Form & Editing State (Replaces direct Zustand mutation on keystroke)
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<MemberType | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState(false);
  const [updatedPermissions, setUpdatedPermissions] = useState<Permission[] | null>(null);

  const { mutate, isPending } = useFetchMemberProfile();
  useMemberPermissionsQuery(id);
  const assignPermissionsMutation = useAssignPermissionsMutation();

  // Resolve active member from store, API, or fallback list
  const activeMember: MemberType | null = useMemo(() => {
    if (id && id !== "me") {
      if (storeSingleMember && (storeSingleMember._id === id || storeSingleMember.Slug === id)) {
        return storeSingleMember;
      }

      const found = members.find((m) => m._id === id || m.Slug === id);
      if (found) {
        return {
          _id: found._id,
          Slug: found.Slug,
          firstName: found.firstName,
          lastName: found.lastName,
          email: found.email,
          imageUrl: found.imageUrl,
          primaryRole: found.primaryRole,
          membershipStatus: (found.membershipStatus as any) || "Active",
          Bio: "Community core contributor and Google Developer Group tech enthusiast.",
          location: {
            city: "Ranchi",
            state: "Jharkhand",
            country: "India",
            pinCode: "834001",
          },
          socialLinks: {
            linkedin: `https://linkedin.com/in/${found.Slug}`,
            github: `https://github.com/${found.Slug}`,
            twitter: `https://twitter.com/${found.Slug}`,
            website: `https://${found.Slug}.dev`,
            instagram: "",
            youtube: "",
            portfolio: `https://${found.Slug}.dev`,
            medium: "",
          },
          skills: ["React", "TypeScript", "Google Cloud", "Community Building"],
          areaOfInterest: ["Generative AI", "Web Development", "Mobile Architecture"],
          internalNotes: "Verified active GDG Ranchi member.",
        };
      }
    }

    // Default or self-profile
    if (storeSingleMember) return storeSingleMember;
    if (members.length > 0) {
      const first = members[0];
      return {
        _id: first._id,
        Slug: first.Slug,
        firstName: first.firstName,
        lastName: first.lastName,
        email: first.email,
        imageUrl: first.imageUrl,
        primaryRole: first.primaryRole,
        membershipStatus: (first.membershipStatus as any) || "Active",
        Bio: "Community core contributor and Google Developer Group tech enthusiast.",
        location: {
          city: "Ranchi",
          state: "Jharkhand",
          country: "India",
          pinCode: "834001",
        },
        socialLinks: {
          linkedin: `https://linkedin.com/in/${first.Slug}`,
          github: `https://github.com/${first.Slug}`,
          twitter: `https://twitter.com/${first.Slug}`,
          website: `https://${first.Slug}.dev`,
          instagram: "",
          youtube: "",
          portfolio: `https://${first.Slug}.dev`,
          medium: "",
        },
        skills: ["React", "TypeScript", "Google Cloud", "Community Building"],
        areaOfInterest: ["Generative AI", "Web Development", "Mobile Architecture"],
        internalNotes: "Verified active GDG Ranchi member.",
      };
    }

    return {
      _id: "admin-current-user",
      Slug: "abhishek-gupta",
      firstName: "Abhishek",
      lastName: "Gupta",
      email: "abhishek.gupta@gdgranchi.in",
      imageUrl:
        "https://imgs.search.brave.com/no76xWdefnmcUXaHMUQlfShcooGDzJkYqZhSZGLlQkg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pMS53/cC5jb20vd3d3LnNo/dXR0ZXJzdG9jay5j/b20vYmxvZy93cC1j/b250ZW50L3VwbG9h/ZHMvc2l0ZXMvNS8y/MDI0LzA2L3Byb2Zp/bGVfcGhvdG9fc2Ft/cGxlXzEyLmpwZz9z/c2w9MQ",
      primaryRole: "Full Stack Developer & Admin",
      membershipStatus: "Active" as any,
      Bio: "Lead community organizer, full stack engineer, and Google Developer Group tech enthusiast.",
      location: {
        city: "Ranchi",
        state: "Jharkhand",
        country: "India",
        pinCode: "834001",
      },
      socialLinks: {
        linkedin: "https://linkedin.com/in/abhishekgupta",
        github: "https://github.com/abhishekgupta",
        twitter: "https://twitter.com/abhishekgupta",
        website: "https://abhishekgupta.dev",
        instagram: "",
        youtube: "",
        portfolio: "https://abhishekgupta.dev",
        medium: "",
      },
      skills: ["React", "TypeScript", "Node.js", "Cloud Architecture", "GDG Community"],
      areaOfInterest: ["Generative AI", "Web Development", "Community Leadership"],
      internalNotes: "Core Administrator & Chapter Lead.",
    };
  }, [storeSingleMember, members, id]);

  // Sync to store when fallback member is resolved and store was null
  useEffect(() => {
    if (!storeSingleMember && activeMember) {
      setSingleMember(activeMember);
    }
  }, [storeSingleMember, activeMember, setSingleMember]);

  // Trigger network fetch on mount and slug change
  useEffect(() => {
    const targetSlug = id ? String(id) : storeSingleMember?.Slug || "abhishek-gupta";
    if (targetSlug) {
      mutate({ Slug: targetSlug });
    }
  }, [id, storeSingleMember?.Slug, mutate]);

  // Handlers for Local Form Editing
  const startEditing = () => {
    if (activeMember) {
      setFormData(JSON.parse(JSON.stringify(activeMember)));
    }
    setIsEdit(true);
    setIsEditSingleMember(true);
  };

  const cancelEditing = () => {
    if (activeMember) {
      setFormData(JSON.parse(JSON.stringify(activeMember)));
    }
    setIsEdit(false);
    setIsEditSingleMember(false);
  };

  const handleFieldChange = (updates: Partial<MemberType>) => {
    setFormData((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const saveMember = () => {
    if (!formData || !activeMember) return;
    setIsSaving(true);

    // Commit local form state cleanly to the Zustand store once
    updateMember(activeMember._id, formData);

    // Persist permissions via API if adjusted
    if (updatedPermissions && activeMember._id) {
      assignPermissionsMutation.mutate({
        memberId: activeMember._id,
        permission: updatedPermissions.map((p) => ({
          name: p.name,
          action: p.action || "read",
          resource: p.resource || "general",
          description: p.description,
          level: (p as any).level || 1,
        })),
      });
    }

    setTimeout(() => {
      setIsSaving(false);
      setIsEdit(false);
      setIsEditSingleMember(false);
      setSaveSuccessNotice(true);
      Swal.fire({
        title: "Profile Saved!",
        text: "Member profile information updated successfully.",
        icon: "success",
        toast: true,
        position: "top-end",
        timer: 2500,
        showConfirmButton: false,
        background: "#181b20",
        color: "#ffffff",
      });
      setTimeout(() => setSaveSuccessNotice(false), 2500);
    }, 300);
  };

  const copyEmail = async () => {
    const targetEmail = formData?.email || activeMember?.email;
    if (!targetEmail) return;
    try {
      await navigator.clipboard.writeText(targetEmail);
      setCopySuccess(true);
      Swal.fire({
        title: "Email Copied!",
        text: targetEmail,
        icon: "info",
        toast: true,
        position: "top-end",
        timer: 2000,
        showConfirmButton: false,
        background: "#181b20",
        color: "#ffffff",
      });
      setTimeout(() => setCopySuccess(false), 1500);
    } catch {
      setCopySuccess(false);
    }
  };

  const sendEmail = () => {
    const targetEmail = formData?.email || activeMember?.email;
    if (!targetEmail) return;
    window.location.href = `mailto:${targetEmail}`;
  };

  const downloadMemberData = () => {
    const dataToExport = formData || activeMember;
    if (!dataToExport) return;
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${dataToExport.firstName}-${dataToExport.lastName}-member.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    Swal.fire({
      title: "Data Exported!",
      text: `${dataToExport.firstName}-${dataToExport.lastName}-member.json downloaded.`,
      icon: "success",
      toast: true,
      position: "top-end",
      timer: 2500,
      showConfirmButton: false,
      background: "#181b20",
      color: "#ffffff",
    });
  };

  const openPortfolio = () => {
    const current = formData || activeMember;
    if (!current) return;
    const url =
      current.socialLinks?.portfolio ||
      current.socialLinks?.website ||
      current.socialLinks?.github;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Loading skeleton if initial load with no cache
  if (isPending && !activeMember) {
    return (
      <div className="min-h-screen text-white">
        <main className="mx-auto w-full max-w-[1600px] px-3 py-5 sm:px-5 lg:px-8">
          <div className="animate-pulse space-y-5">
            <div className="h-8 w-48 rounded bg-white/10" />
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
              <div className="h-96 rounded-2xl bg-white/5" />
              <div className="h-64 rounded-2xl bg-white/5" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Active displayed data: when in edit mode, use isolated formData; otherwise activeMember
  const displayData = isEdit && formData ? formData : activeMember;

  return (
    <PermissionChecker
      permissionName="member:view"
      permissionAction="read"
      fallback={<PermissionDenied />}
    >
      <div className="min-h-screen text-white">
        <main className="mx-auto w-full max-w-[1600px] px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-7 xl:px-10 2xl:px-12">
          {/* Header */}
          <header className="mb-5 flex flex-col gap-4 border-b border-[#232830] pb-5 lg:mb-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <div className="mb-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px]">
                <span className="text-white/35">Members</span>
                <span className="text-white/20">/</span>
                <span className="truncate text-green-400">
                  {displayData?.firstName} {displayData?.lastName}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <h1 className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl lg:text-2xl">
                  {displayData?.firstName} {displayData?.lastName}
                </h1>

                {isEdit && (
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-0.5 text-xs font-semibold text-amber-400">
                    Editing Mode (Buffered)
                  </span>
                )}

                {saveSuccessNotice && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-0.5 text-xs font-semibold text-green-400 animate-fadeIn">
                    <Check size={12} /> Changes Saved Successfully
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                onClick={() => navigate(-1)}
                className="!inline-flex !items-center !gap-2"
              >
                <ArrowLeft size={14} />
                Back
              </Button>

              {!isEdit ? (
                <PermissionChecker permissionName="member:update" permissionAction="update">
                  <Button
                    type="button"
                    onClick={startEditing}
                    className="!inline-flex !items-center !gap-2 !bg-[#4285F4] !text-white hover:!bg-[#3367D6]"
                  >
                    <Pencil size={14} />
                    Edit Profile
                  </Button>
                </PermissionChecker>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={cancelEditing}
                    disabled={isSaving}
                    className="!inline-flex !items-center !gap-2 !border-white/20 !bg-white/5"
                  >
                    <X size={14} />
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={saveMember}
                    disabled={isSaving}
                    className="!inline-flex !items-center !gap-2 !bg-green-500 !text-black hover:!bg-green-400 font-semibold"
                  >
                    <Save size={14} />
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              )}
            </div>
          </header>

        {/* Main Grid */}
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px] 2xl:grid-cols-[minmax(0,1fr)_410px] 2xl:gap-6">
          {/* Left Column */}
          <div className="min-w-0 space-y-5">
            <MemberProfile />

            {/* Form inputs with isolated local buffered state for high performance */}
            <MemberPersonal_Info
              isEdit={isEdit}
              data={displayData}
              onChange={handleFieldChange}
            />

            <MemberLocation
              isEdit={isEdit}
              data={displayData}
              onChange={handleFieldChange}
            />

            <MemberSocialLink
              isEdit={isEdit}
              data={displayData}
              onChange={handleFieldChange}
            />

            <Section
              title="Skills & Interests"
              description="Technical skills and areas of interest"
              icon={<Sparkles size={17} />}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <TagEditor
                  label="Skills"
                  values={displayData?.skills ?? []}
                  variant="green"
                  editable={isEdit}
                  onChange={(values: string[]) => handleFieldChange({ skills: values })}
                />
                <TagEditor
                  label="Areas of Interest"
                  values={displayData?.areaOfInterest ?? []}
                  variant="purple"
                  editable={isEdit}
                  onChange={(values: string[]) =>
                    handleFieldChange({ areaOfInterest: values })
                  }
                />
              </div>
            </Section>

            <PermissionChecker permissionName="permission:update" permissionAction="update">
              <Section
                title="Assign Permissions"
                description="Role-based access permissions"
                icon={<ShieldCheck size={17} />}
              >
                <PermissionManager
                  isEdit={isEdit}
                  permissions={AVAILABLE_PERMISSIONS_CONSTANT}
                  onPermissionsChange={(newPerms) => {
                    setUpdatedPermissions(newPerms);
                  }}
                />
              </Section>
            </PermissionChecker>

            <InternalNote
              isEdit={isEdit}
              data={displayData}
              onChange={handleFieldChange}
            />
          </div>

          {/* Right Column */}
          <aside className="min-w-0 space-y-5">
            <Section
              title="Quick Actions"
              description="Common actions for this member"
              icon={<Zap size={17} />}
            >
              <div className="grid gap-2 sm:grid-cols-2">
                <PermissionChecker permissionName="email:send" permissionAction="create">
                  <button
                    type="button"
                    onClick={sendEmail}
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#232830] bg-[#121519] p-3 text-left transition hover:border-[#343b46] hover:bg-[#1b2027]"
                  >
                    <Send size={16} className="text-white/45 group-hover:text-green-400" />
                    <div>
                      <div className="text-[11px] font-medium text-white/75">Send Email</div>
                      <div className="mt-1 text-[9px] text-white/30">Direct email inquiry</div>
                    </div>
                  </button>
                </PermissionChecker>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#232830] bg-[#121519] p-3 text-left transition hover:border-[#343b46] hover:bg-[#1b2027]"
                >
                  <Copy size={16} className="text-white/45 group-hover:text-blue-400" />
                  <div>
                    <div className="text-[11px] font-medium text-white/75">
                      {copySuccess ? "Copied!" : "Copy Email"}
                    </div>
                    <div className="mt-1 text-[9px] text-white/30">Copy address to clipboard</div>
                  </div>
                </button>

                <PermissionChecker permissionName="member:update" permissionAction="update">
                  <button
                    type="button"
                    onClick={startEditing}
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#232830] bg-[#121519] p-3 text-left transition hover:border-[#343b46] hover:bg-[#1b2027]"
                  >
                    <Pencil size={16} className="text-white/45 group-hover:text-blue-400" />
                    <div>
                      <div className="text-[11px] font-medium text-white/75">Edit Member</div>
                      <div className="mt-1 text-[9px] text-white/30">Modify account fields</div>
                    </div>
                  </button>
                </PermissionChecker>

                <button
                  type="button"
                  onClick={downloadMemberData}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#232830] bg-[#121519] p-3 text-left transition hover:border-[#343b46] hover:bg-[#1b2027]"
                >
                  <Download size={16} className="text-white/45 group-hover:text-yellow-400" />
                  <div>
                    <div className="text-[11px] font-medium text-white/75">Export Data</div>
                    <div className="mt-1 text-[9px] text-white/30">Download profile JSON</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={openPortfolio}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#232830] bg-[#121519] p-3 text-left transition hover:border-[#343b46] hover:bg-[#1b2027] sm:col-span-2"
                >
                  <Globe2 size={16} className="text-white/45 group-hover:text-purple-400" />
                  <div>
                    <div className="text-[11px] font-medium text-white/75">View Portfolio</div>
                    <div className="mt-1 text-[9px] text-white/30">
                      Open member's public links
                    </div>
                  </div>
                </button>
              </div>
            </Section>
          </aside>
        </div>
      </main>
    </div>
    </PermissionChecker>
  );
};

export default MemberDetails;
