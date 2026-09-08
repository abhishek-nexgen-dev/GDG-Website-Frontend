import type { Dispatch, SetStateAction } from "react";

import type { EventFormData } from "../type/Event.type";
import uploadImage from "../../../utils/uploadImage";
import uploadVideo from "../../../utils/uploadVideo";
import api from "../../../utils/axios.utils";
import { EventValidate } from "../Validation/event.validation";
import showAlert from "../../../utils/showAlert";

interface UploadImageParams {
  event: React.ChangeEvent<HTMLInputElement>;
  update: <K extends keyof EventFormData>(
    key: K,
    value: EventFormData[K],
  ) => void;
  setUploadingImage: Dispatch<SetStateAction<boolean>>;
}

interface UploadVideoParams {
  event: React.ChangeEvent<HTMLInputElement>;
  update: <K extends keyof EventFormData>(
    key: K,
    value: EventFormData[K],
  ) => void;
  setUploadingVideo: Dispatch<SetStateAction<boolean>>;
  setVideoProgress: Dispatch<SetStateAction<number>>;
}



const getErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (typeof error === "object" && error !== null) {
    const apiError = error as {
      response?: {
        data?: {
          message?: string;
          error?: {
            message?: string;
          };
        };
      };
      message?: string;
    };

    return (
      apiError.response?.data?.error?.message ||
      apiError.response?.data?.message ||
      apiError.message ||
      fallback
    );
  }

  return fallback;
};


export const handleCoverImageUpload = async ({
  event,
  update,
  setUploadingImage,
}: UploadImageParams) => {
  const file = event.target.files?.[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    await showAlert(
      "warning",
      "Invalid Image",
      "Please select a valid image file.",
    );

    event.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    await showAlert(
      "warning",
      "Image Too Large",
      "Cover image must be smaller than 5MB.",
    );

    event.target.value = "";
    return;
  }

  try {
    setUploadingImage(true);

    const result = await uploadImage(file);

    if (!result?.secure_url) {
      throw new Error("Image URL was not returned from the upload service.");
    }

    update("coverImageUrl", result.secure_url);

    await showAlert(
      "success",
      "Image Uploaded",
      "Cover image uploaded successfully.",
      {
        timer: 1500,
        showConfirmButton: false,
      },
    );
  } catch (error) {
    console.error("Cover image upload failed:", error);

    await showAlert(
      "error",
      "Upload Failed",
      getErrorMessage(error, "Failed to upload cover image."),
    );
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
    await showAlert(
      "warning",
      "Invalid Video",
      "Please select a valid video file.",
    );

    event.target.value = "";
    return;
  }

  if (file.size > 100 * 1024 * 1024) {
    await showAlert(
      "warning",
      "Video Too Large",
      "Intro video must be smaller than 100MB.",
    );

    event.target.value = "";
    return;
  }

  try {
    setUploadingVideo(true);
    setVideoProgress(0);

    const result = await uploadVideo(file, (progress) => {
      setVideoProgress(Math.min(100, Math.max(0, progress)));
    });

    if (!result?.secure_url) {
      throw new Error("Video URL was not returned from the upload service.");
    }

    update("introVideoUrl", result.secure_url);
    setVideoProgress(100);

    await showAlert(
      "success",
      "Video Uploaded",
      "Intro video uploaded successfully.",
      {
        timer: 1500,
        showConfirmButton: false,
      },
    );
  } catch (error) {
    console.error("Intro video upload failed:", error);

    await showAlert(
      "error",
      "Upload Failed",
      getErrorMessage(error, "Failed to upload intro video."),
    );
  } finally {
    setUploadingVideo(false);
    setVideoProgress(0);
    event.target.value = "";
  }
};

export const validateEvent = async (
  form: EventFormData,
): Promise<boolean> => {
  try {
    const result = EventValidate.safeParse(form);

    if (result.success) {
      return true;
    }

    const issue = result.error.issues[0];

    await showAlert(
      "warning",
      "Check Event Details",
      issue?.message || "Please check the event details.",
    );

    return false;
  } catch (error) {
    console.error("Event validation failed:", error);

    await showAlert(
      "error",
      "Validation Failed",
      "Unable to validate event details.",
    );

    return false;
  }
};

export const saveDraft = async (
  form: EventFormData,
  setSaving: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    setSaving(true);

    const isValid = await validateEvent({
      ...form,
      status: "DRAFT",
    });

    if (!isValid) return;

    const payload = {
      ...form,
      status: "DRAFT",
    };

    const { data } = await api.post(
      "/api/v1/create/newEvent",
      payload,
    );

    await showAlert(
      "success",
      "Draft Saved",
      "Your event draft has been saved successfully.",
      {
        timer: 1800,
        showConfirmButton: false,
      },
    );

    return data;
  } catch (error) {
    console.error("Save draft failed:", error);

    await showAlert(
      "error",
      "Save Failed",
      getErrorMessage(error, "Unable to save the event draft."),
    );

    return null;
  } finally {
    setSaving(false);
  }
};

export const publishEvent = async (
  form: EventFormData,
  setSaving: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    setSaving(true);

    const isValid = await validateEvent(form);

    if (!isValid) return;

    const { data } = await api.post(
      "/api/v1/create/newEvent",
      form,
    );

    await showAlert(
      "success",
      "Event Published",
      "Your event has been published successfully.",
      {
        timer: 1800,
        showConfirmButton: false,
      },
    );

    return data;
  } catch (error) {
    console.error("Publish event failed:", error);

    await showAlert(
      "error",
      "Publish Failed",
      getErrorMessage(
        error,
        "Something went wrong while publishing the event.",
      ),
    );

    return null;
  } finally {
    setSaving(false);
  }
};