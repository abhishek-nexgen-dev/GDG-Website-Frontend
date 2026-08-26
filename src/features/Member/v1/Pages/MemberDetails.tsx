import { useEffect, useState } from "react";
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
} from "lucide-react";
import { useNavigate, useParams } from "react-router";

import Section from "../../../../Components/Section";

import { Button } from "../../../../Components/Button";

import useFetchMemberProfile from "../hook/useFetchMemberProfile";
import useMembers from "../store/useMembers";
import useUpdateMember from "../utils/useDraftMember";
import TagEditor from "../Components/TagEditor";

import MemberProfile from "../section/MemberProfile";
import MemberPersonal_Info from "../section/MemberPersonal_Info";
import MemberLocation from "../section/MemberLocation";
import MemberSocialLink from "../section/MemberSocialLink";
import InternalNote from "../section/InternalNote";
import PermissionManager from "../Components/PermissionManager";
import AVAILABLE_PERMISSIONS_CONSTANT from "../Constant/AVAILABLE_PERMISSIONS.Constant";

const MemberDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Store State
  const singleMember = useMembers((state) => state.singleMember);
  const setIsEditSingleMember = useMembers((state) => state.setIsEditSingleMember);
  const { MemberUpdate } = useUpdateMember(singleMember?._id || "");

  // Local State
  const { mutate, isPending, isError } = useFetchMemberProfile();
  const [isEdit, setIsEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Fetch Member
  useEffect(() => {
    if (!id) return;
    mutate({ Slug: String(id) });
  }, [id, mutate]);

  // Handlers
  const startEditing = () => {
    setIsEdit(true);
    setIsEditSingleMember(true);
  };

  const cancelEditing = () => {
    setIsEdit(false);
    setIsEditSingleMember(false);
  };

  const saveMember = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      cancelEditing();
    }, 300);
  };

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

  const sendEmail = () => {
    if (!singleMember?.email) return;
    window.location.href = `mailto:${singleMember.email}`;
  };

  const downloadMemberData = () => {
    if (!singleMember) return;
    const blob = new Blob([JSON.stringify(singleMember, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${singleMember.firstName}-${singleMember.lastName}-member.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  const openPortfolio = () => {
    if (!singleMember) return;
    const url =
      singleMember.socialLinks?.portfolio ||
      singleMember.socialLinks?.website ||
      singleMember.socialLinks?.github;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Loading State
  if (isPending && !singleMember) {
    return (
      <div className="min-h-screen text-white">
        <main className="mx-auto w-full max-w-[1600px] px-3 py-5 sm:px-5 lg:px-8">
          <div className="animate-pulse space-y-5">
            <div className="h-8 w-60 rounded-lg bg-white/5" />
            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
              <div className="space-y-5">
                <div className="h-80 rounded-2xl bg-white/5" />
                <div className="h-64 rounded-2xl bg-white/5" />
                <div className="h-56 rounded-2xl bg-white/5" />
              </div>
              <div className="space-y-5">
                <div className="h-125 rounded-2xl bg-white/5" />
                <div className="h-64 rounded-2xl bg-white/5" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error State
  if (isError && !singleMember) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 text-white">
        <div className="text-center">
          <X size={32} className="mx-auto mb-3 text-red-400" />
          <h2 className="text-lg font-semibold">Failed to load member</h2>
          <p className="mt-2 text-sm text-white/40">Unable to fetch member details.</p>
          <Button type="button" onClick={() => navigate(-1)} className="mt-5">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <main className="mx-auto w-full max-w-[1600px] px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-7 xl:px-10 2xl:px-12">
        {/* Header */}
        <header className="mb-5 flex flex-col gap-4 border-b border-[#232830] pb-5 lg:mb-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] sm:text-[11px]">
              <span className="text-white/35">Members</span>
              <span className="text-white/20">/</span>
              <span className="truncate text-green-400">
                {singleMember?.firstName} {singleMember?.lastName}
              </span>
            </div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl lg:text-2xl">
              Member Details
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              onClick={() => navigate(-1)}
              className="!inline-flex !items-center !gap-2"
            >
              <ArrowLeft size={14} />
              Back
            </Button>

            {!isEdit ? (
              <>
                <Button
                  type="button"
                  onClick={startEditing}
                  className="!inline-flex !items-center !gap-2"
                >
                  <Pencil size={14} />
                  Edit Member
                </Button>
                <Button
                  type="button"
                  onClick={sendEmail}
                  className="!inline-flex !items-center !gap-2 !bg-green-500 !text-black"
                >
                  <Send size={14} />
                  Send Email
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  onClick={cancelEditing}
                  disabled={isSaving}
                  className="!inline-flex !items-center !gap-2"
                >
                  <X size={14} />
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={saveMember}
                  disabled={isSaving}
                  className="!inline-flex !items-center !gap-2 !bg-green-500 !text-black"
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
            <MemberPersonal_Info isEdit={isEdit} />
            <MemberLocation isEdit={isEdit} />
            <MemberSocialLink isEdit={isEdit} />

            <Section
              title="Skills & Interests"
              description="Technical skills and areas of interest"
              icon={<Sparkles size={17} />}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <TagEditor
                  label="Skills"
                  values={singleMember?.skills ?? []}
                  variant="green"
                  editable={isEdit}
                  onChange={(values: string[]) => MemberUpdate({ skills: values })}
                />
                <TagEditor
                  label="Areas of Interest"
                  values={singleMember?.areaOfInterest ?? []}
                  variant="purple"
                  editable={isEdit}
                  onChange={(values: string[]) => MemberUpdate({ areaOfInterest: values })}
                />
              </div>
            </Section>

            <Section
              title="Assign Permissions"
              description={`${5} permissions assigned`} // Dynamic count
              icon={<ShieldCheck size={17} />}
            >
              <PermissionManager
                isEdit={isEdit}
                permissions={AVAILABLE_PERMISSIONS_CONSTANT}
                onPermissionsChange={(newPerms) => {
                  // Optional: Handle side effects if needed
                  console.log("Permissions updated:", newPerms);
                }}
              />
            </Section>

            <InternalNote isEdit={isEdit} />
          </div>

          {/* Right Column */}
          <aside className="min-w-0 space-y-5">
            <Section
              title="Quick Actions"
              description="Common actions for this member"
              icon={<Zap size={17} />}
            >
              <div className="grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={sendEmail}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#232830] bg-[#121519] p-3 text-left transition hover:border-[#343b46] hover:bg-[#1b2027]"
                >
                  <Send size={16} className="text-white/45 group-hover:text-green-400" />
                  <div>
                    <div className="text-[11px] font-medium text-white/75">Send Email</div>
                    <div className="mt-1 text-[9px] text-white/30">Send email to member</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={copyEmail}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#232830] bg-[#121519] p-3 text-left transition hover:border-[#343b46] hover:bg-[#1b2027]"
                >
                  <Copy size={16} className="text-white/45 group-hover:text-blue-400" />
                  <div>
                    <div className="text-[11px] font-medium text-white/75">
                      {copySuccess ? "Copied" : "Copy Email"}
                    </div>
                    <div className="mt-1 text-[9px] text-white/30">Copy email address</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={startEditing}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#232830] bg-[#121519] p-3 text-left transition hover:border-[#343b46] hover:bg-[#1b2027]"
                >
                  <Pencil size={16} className="text-white/45 group-hover:text-blue-400" />
                  <div>
                    <div className="text-[11px] font-medium text-white/75">Edit Member</div>
                    <div className="mt-1 text-[9px] text-white/30">Update member information</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={downloadMemberData}
                  className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#232830] bg-[#121519] p-3 text-left transition hover:border-[#343b46] hover:bg-[#1b2027]"
                >
                  <Download size={16} className="text-white/45 group-hover:text-yellow-400" />
                  <div>
                    <div className="text-[11px] font-medium text-white/75">Download JSON</div>
                    <div className="mt-1 text-[9px] text-white/30">Export raw API data</div>
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
                      Open member's public portfolio
                    </div>
                  </div>
                </button>
              </div>
            </Section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default MemberDetails;
