import type { Dispatch, SetStateAction } from "react";
import Swal from "sweetalert2";
import type { EventFormData } from "../type/Event.type";
import uploadImage from "../../../utils/uploadImage";
import uploadVideo from "../../../utils/uploadVideo";
import api from "../../../utils/axios.utils";
import { EventValidate } from "../Validation/event.validation";

interface UploadImageParams {
  event: React.ChangeEvent<HTMLInputElement>;
  update: <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => void;
  setUploadingImage: Dispatch<SetStateAction<boolean>>;
}

interface UploadVideoParams {
  event: React.ChangeEvent<HTMLInputElement>;
  update: <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => void;
  setUploadingVideo: Dispatch<SetStateAction<boolean>>;
  setVideoProgress: Dispatch<SetStateAction<number>>;
}

export const handleCoverImageUpload = async ({
  event,
  update,
  setUploadingImage,
}: UploadImageParams) => {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    await Swal.fire({
      icon: "warning",
      title: "Invalid Image",
      text: "Please select a valid image file.",
      background: "#18191d",
      color: "#fff",
      confirmButtonColor: "#059669",
    });

    event.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    await Swal.fire({
      icon: "warning",
      title: "Image Too Large",
      text: "Cover image must be smaller than 5MB.",
      background: "#18191d",
      color: "#fff",
      confirmButtonColor: "#059669",
    });

    event.target.value = "";
    return;
  }

  try {
    setUploadingImage(true);

    const result = await uploadImage(file);

    update("coverImageUrl", result.secure_url);
  } catch (error: any) {
    console.error("Cover image upload failed:", error?.response?.data || error);

    await Swal.fire({
      icon: "error",
      title: "Upload Failed",
      text: error?.response?.data?.error?.message || "Failed to upload cover image.",
      background: "#18191d",
      color: "#fff",
      confirmButtonColor: "#059669",
    });
  } finally {
    setUploadingImage(false);
    event.target.value = "";
  }
};

export const handleIntroVideoUpload = async ({
  event,
  update,
  setUploadingVideo,
  setVideoProgress,
}: UploadVideoParams) => {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("video/")) {
    await Swal.fire({
      icon: "warning",
      title: "Invalid Video",
      text: "Please select a valid video file.",
      background: "#18191d",
      color: "#fff",
      confirmButtonColor: "#059669",
    });

    event.target.value = "";
    return;
  }

  if (file.size > 100 * 1024 * 1024) {
    await Swal.fire({
      icon: "warning",
      title: "Video Too Large",
      text: "Intro video must be smaller than 100MB.",
      background: "#18191d",
      color: "#fff",
      confirmButtonColor: "#059669",
    });

    event.target.value = "";
    return;
  }

  try {
    setUploadingVideo(true);
    setVideoProgress(0);

    const result = await uploadVideo(file, (progress) => {
      setVideoProgress(progress);
    });

    update("introVideoUrl", result.secure_url);
  } catch (error: any) {
    console.error("Intro video upload failed:", error?.response?.data || error);

    await Swal.fire({
      icon: "error",
      title: "Upload Failed",
      text: error?.response?.data?.error?.message || "Failed to upload intro video.",
      background: "#18191d",
      color: "#fff",
      confirmButtonColor: "#059669",
    });
  } finally {
    setUploadingVideo(false);
    setVideoProgress(0);
    event.target.value = "";
  }
};

export const validateEvent = (form: EventFormData): boolean => {
  console.log("__Issue in validator____");
  console.log("FOrm data", form);
  const result = EventValidate.safeParse(form);

  console.log(result);

  if (!result.success) {
    const issue = result.error.issues[0];

    Swal.fire({
      icon: "warning",
      title: "Check Event Details",
      text: issue.message,
      background: "#18191d",
      color: "#e4e4e7",
      confirmButtonColor: "#059669",
      customClass: {
        popup: "rounded-xl border border-white/[0.08]",
        title: "text-base font-semibold",
        htmlContainer: "text-xs text-zinc-400",
      },
    });

    return false;
  }

  return true;
};

export const saveDraft = async (
  form: EventFormData,
  setSaving: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    if (!validateEvent(form)) {
      return;
    }

    setSaving(true);

    const payload = {
      ...form,
      status: "DRAFT",
      communityId: "9f8e2d3c4b5a678901234567",
    };

    console.log("Payload", payload);

    const { data } = await api.post("/api/v1/create/newEvent", payload);

    console.log("Draft created:", data);

    await Swal.fire({
      icon: "success",
      title: "Draft Saved",
      text: "Your event draft has been saved successfully.",
      background: "#18191d",
      color: "#e4e4e7",
      confirmButtonColor: "#059669",
      timer: 1800,
      showConfirmButton: false,
    });

    // return data;
  } catch (error: any) {
    console.error("Save draft failed:", error?.response?.data || error);

    await Swal.fire({
      icon: "error",
      title: "Save Failed",
      text: error?.response?.data?.message || "Unable to save the event draft.",
      background: "#18191d",
      color: "#e4e4e7",
      confirmButtonColor: "#059669",
    });

    throw error;
  } finally {
    setSaving(false);
  }
};

export const publishEvent = async (
  form: EventFormData,
  setSaving: Dispatch<SetStateAction<boolean>>,
) => {
  if (!validateEvent(form)) {
    return;
  }

  try {
    setSaving(true);

    const payload = {
      ...form,
      status: "REGISTRATION_OPEN",
      communityId: "9f8e2d3c4b5a678901234567",
    };

    console.log("Payload", payload);

    const { data } = await api.post("/api/v1/create/newEvent", payload);

    console.log("Event published:", data);

    await Swal.fire({
      icon: "success",
      title: "Event Published",
      text: "Your event is now live.",
      background: "#18191d",
      color: "#e4e4e7",
      confirmButtonColor: "#059669",
      timer: 1800,
      showConfirmButton: false,
    });

    // return data;
  } catch (error: any) {
    console.error("Publish event failed:", error || error?.response?.data);

    await Swal.fire({
      icon: "error",
      title: "Publish Failed",
      text: error?.response?.data?.message || "Something went wrong while publishing the event.",
      background: "#18191d",
      color: "#e4e4e7",
      confirmButtonColor: "#059669",
    });

    throw error;
  } finally {
    setSaving(false);
  }
};
