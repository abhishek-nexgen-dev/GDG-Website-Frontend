import { UserRound, Upload, Loader2 } from "lucide-react";
import React, { useState, useRef } from "react";
import Swal from "sweetalert2";
import Input from "../../../../Components/Input";
import useMembers from "../store/useMembers";
import useUpdateMember from "../utils/useDraftMember";
import Section from "../../../../Components/Section";
import type { MemberType } from "../type/MemberDetails.type";
import uploadImage from "../../../../utils/uploadImage";

interface MemberPersonalInfoProps {
  isEdit: boolean;
  data?: MemberType | null;
  onChange?: (updates: Partial<MemberType>) => void;
}

const MemberPersonal_Info = ({ isEdit, data, onChange }: MemberPersonalInfoProps) => {
  const storeMember = useMembers((state) => state.singleMember);
  const currentMember = data ?? storeMember;
  const { MemberUpdate } = useUpdateMember(currentMember?._id || "");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!currentMember) return null;

  const handleUpdate = (updates: Partial<MemberType>) => {
    if (onChange) {
      onChange(updates);
    } else {
      MemberUpdate(updates);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingImage(true);
      const res = await uploadImage(file);
      handleUpdate({ imageUrl: res.secure_url });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Upload Failed",
        text: "Could not upload the image. Please try again.",
        icon: "error",
        background: "#111116",
        color: "#ffffff",
      });
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <Section
      title="Personal Information"
      description="Member account and profile information"
      icon={<UserRound size={17} />}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="First Name"
          value={currentMember.firstName || ""}
          onChange={(value) => handleUpdate({ firstName: value })}
          readonly={!isEdit}
        />

        <Input
          label="Last Name"
          value={currentMember.lastName || ""}
          onChange={(value) => handleUpdate({ lastName: value })}
          readonly={!isEdit}
        />

        <Input
          label="Email"
          type="email"
          value={currentMember.email || ""}
          onChange={(value) => handleUpdate({ email: value })}
          readonly={!isEdit}
        />

        <Input
          label="Primary Role"
          value={currentMember.primaryRole || ""}
          onChange={(value) => handleUpdate({ primaryRole: value })}
          readonly={!isEdit}
        />

        <div className="sm:col-span-2">
          <Input
            label="Bio"
            value={currentMember.Bio || ""}
            onChange={(value) => handleUpdate({ Bio: value })}
            readonly={!isEdit}
          />
        </div>

        {isEdit && (
          <div className="sm:col-span-2 flex flex-col gap-3 w-full border-t border-white/5 pt-4 mt-2">
            <Input
              label="Image URL"
              type="url"
              value={currentMember.imageUrl || ""}
              onChange={(value) => handleUpdate({ imageUrl: value })}
              readonly={!isEdit}
              placeholder="https://example.com/avatar.jpg"
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
        )}

        <Input label="Auth ID" value={currentMember.AuthId || ""} onChange={() => {}} readonly />

        <Input label="Member ID" value={currentMember._id || ""} onChange={() => {}} readonly />
      </div>
    </Section>
  );
};

export default MemberPersonal_Info;
