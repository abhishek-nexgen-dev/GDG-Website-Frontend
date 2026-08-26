import { useState } from "react";
import { ExternalLink, Save } from "lucide-react";

import type { EventFormData } from "../type/Event.type";
import { initialEventFormData } from "../data/eventForm.data";

import BasicInformation from "../Components/BasicInformation";
import EventDescription from "../Components/EventDescription";
import RegistrationPeriod from "../Components/RegistrationPeriod";
import EventVenue from "../Components/EventVenue";
import EventMedia from "../Components/EventMedia";
import EventTimeline from "../Components/EventTimeline";
import EventRules from "../Components/EventRules";
import EventRequirements from "../Components/EventRequirements";

import {
  handleCoverImageUpload,
  handleIntroVideoUpload,
  saveDraft,
  publishEvent,
} from "../utils/create-event-utils";

const CreateEvent = () => {
  const [form, setForm] = useState<EventFormData>(initialEventFormData);

  const [uploadingImage, setUploadingImage] = useState(false);

  const [uploadingVideo, setUploadingVideo] = useState(false);

  const [videoProgress, setVideoProgress] = useState(0);

  const [saving, setSaving] = useState(false);

  /* =====================================================
     FORM UPDATE
  ===================================================== */

  const update = <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  /* =====================================================
     IMAGE UPLOAD
  ===================================================== */

  const onImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    return handleCoverImageUpload({
      event,
      update,
      setUploadingImage,
    });
  };

  /* =====================================================
     VIDEO UPLOAD
  ===================================================== */

  const onVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    return handleIntroVideoUpload({
      event,
      update,
      setUploadingVideo,
      setVideoProgress,
    });
  };

  /* =====================================================
     SAVE DRAFT
  ===================================================== */

  const onSaveDraft = () => {
    if (saving) return;

    return saveDraft(form, setSaving);
  };

  /* =====================================================
     PUBLISH EVENT
  ===================================================== */

  const onPublishEvent = () => {
    if (saving) return;

    return publishEvent(form, setSaving);
  };

  /* =====================================================
     BUSY STATE
  ===================================================== */

  const isBusy = saving || uploadingImage || uploadingVideo;

  return (
    <div className="min-h-screen w-full bg-[#0b0d0c] text-white">
      {/* =================================================
          HEADER
      ================================================= */}

      <header
        className="
          sticky
          top-0
          z-30
          border-b
          border-white/[0.06]
          bg-[#0b0d0c]
        "
      >
        <div
          className="
            mx-auto
            flex
            min-h-[64px]
             
            items-center
            justify-between
            gap-4
            px-4
            sm:px-6
          "
        >
          {/* Title */}

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[12px]">
              <span className="text-zinc-600">Dashboard</span>

              <span className="text-zinc-700">/</span>

              <span className="text-zinc-600">Events</span>

              <span className="text-zinc-700">/</span>

              <span className="text-lime-400">Create</span>
            </div>

            <h1 className="mt-1 truncate text-md font-semibold text-zinc-100 ">Create New Event</h1>
          </div>

          {/* Actions */}

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              disabled={isBusy}
              className="
                hidden
                rounded-md
                border
                border-white/[0.08]
                px-3
                py-2
                text-[10px]
                font-medium
                text-zinc-500
                transition
                hover:bg-white/[0.03]
                hover:text-zinc-300
                disabled:cursor-not-allowed
                disabled:opacity-40
                sm:block
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onSaveDraft}
              disabled={isBusy}
              className="
                flex
                items-center
                gap-1.5
                rounded-md
                border
                border-white/[0.08]
                bg-[#151816]
                px-3
                py-2
                text-[10px]
                font-medium
                text-zinc-300
                transition
                hover:border-lime-500/20
                hover:bg-[#191c1a]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <Save size={12} />

              <span className="hidden sm:inline">{saving ? "Saving..." : "Save Draft"}</span>

              <span className="sm:hidden">Save</span>
            </button>

            <button
              type="button"
              onClick={onPublishEvent}
              disabled={isBusy}
              className="
                flex
                items-center
                gap-1.5
                rounded-md
                bg-lime-500
                px-3
                py-2
                text-[10px]
                font-semibold
                text-[#0b0d0c]
                transition
                hover:bg-lime-400
                disabled:cursor-not-allowed
                disabled:opacity-40
                sm:px-4
              "
            >
              <ExternalLink size={12} />

              <span>{saving ? "Publishing..." : "Publish Event"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main
        className="
          mx-auto
          w-full
          lg:w-[80%]
          px-4
          py-5
          sm:px-6
          sm:py-7
          lg:py-8
        "
      >
        {/* Page Description */}

        <div className="mb-6">
          <p className="max-w-2xl text-xs leading-5 text-zinc-600 sm:text-sm">
            Configure your event information, schedule, venue, media, rules, and participant
            requirements.
          </p>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <BasicInformation form={form} update={update} />

          <EventDescription form={form} update={update} />

          <RegistrationPeriod form={form} update={update} />

          <EventVenue form={form} update={update} />

          <EventMedia
            form={form}
            update={update}
            uploadingImage={uploadingImage}
            uploadingVideo={uploadingVideo}
            videoProgress={videoProgress}
            onImageUpload={onImageUpload}
            onVideoUpload={onVideoUpload}
          />

          <EventTimeline form={form} update={update} />

          <EventRules form={form} update={update} />

          <EventRequirements form={form} update={update} />
        </div>

        {/* Bottom Actions */}

        <div className="mt-6 flex items-center justify-end gap-2 border-t border-white/[0.06] pt-5">
          <button
            type="button"
            disabled={isBusy}
            className="
              rounded-md
              border
              border-white/[0.08]
              px-4
              py-2.5
              text-xs
              font-medium
              text-zinc-500
              transition
              hover:bg-white/[0.03]
              hover:text-zinc-300
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSaveDraft}
            disabled={isBusy}
            className="
              flex
              items-center
              gap-1.5
              rounded-md
              border
              border-white/[0.08]
              bg-[#151816]
              px-4
              py-2.5
              text-xs
              font-medium
              text-zinc-300
              transition
              hover:border-lime-500/20
              hover:bg-[#191c1a]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Save size={13} />

            {saving ? "Saving..." : "Save Draft"}
          </button>

          <button
            type="button"
            onClick={onPublishEvent}
            disabled={isBusy}
            className="
              flex
              items-center
              gap-1.5
              rounded-md
              bg-lime-500
              px-5
              py-2.5
              text-xs
              font-semibold
              text-[#0b0d0c]
              transition
              hover:bg-lime-400
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <ExternalLink size={13} />

            {saving ? "Publishing..." : "Publish Event"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default CreateEvent;
