import { Image as ImageIcon, Link as LinkIcon, Video } from "lucide-react";
import Section from "../../../Components/Section";
import Label from "../../../Components/Label";
import Input from "../../../Components/Input";
import type { EventFormData } from "../type/Event.type";

interface EventMediaProps {
  form: EventFormData;
  update: <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => void;

  uploadingImage: boolean;
  uploadingVideo: boolean;
  videoProgress: number;

  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;

  onVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventMedia = ({
  form,
  update,
  uploadingImage,
  uploadingVideo,
  videoProgress,
  onImageUpload,
  onVideoUpload,
}: EventMediaProps) => {
  return (
    <Section
      title="Media & Links"
      description="Add images, videos and important links"
      icon={<ImageIcon size={14} />}
    >
      <div className="space-y-4">
        {/* COVER IMAGE */}
        <div className="space-y-2">
          <Label required>Cover Image</Label>

          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={form.coverImageUrl}
                onChange={(value: string) => update("coverImageUrl", value)}
                placeholder="Image URL or upload..."
              />
            </div>

            <label
              className={`flex h-9 w-10 cursor-pointer items-center justify-center rounded-md border border-white/[0.06] bg-[#202126] text-blue-400 transition hover:bg-white/[0.06] ${
                uploadingImage ? "pointer-events-none opacity-50" : ""
              }`}
            >
              {uploadingImage ? (
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-blue-400 border-t-transparent" />
              ) : (
                <ImageIcon size={14} />
              )}

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={onImageUpload}
              />
            </label>
          </div>

          {form.coverImageUrl && (
            <div className="overflow-hidden rounded-md border border-white/[0.06]">
              <img
                src={form.coverImageUrl}
                alt="Event cover"
                className="h-40 w-full object-cover"
              />
            </div>
          )}
        </div>

        {/* INTRO VIDEO */}
        <div className="space-y-2">
          <Label>Intro Video</Label>

          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={form.introVideoUrl}
                onChange={(value: string) => update("introVideoUrl", value)}
                placeholder="Video URL or upload..."
              />
            </div>

            <label
              className={`flex h-9 w-10 cursor-pointer items-center justify-center rounded-md border border-white/[0.06] bg-[#202126] text-red-400 transition hover:bg-white/[0.06] ${
                uploadingVideo ? "pointer-events-none opacity-50" : ""
              }`}
            >
              {uploadingVideo ? (
                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
              ) : (
                <Video size={14} />
              )}

              <input
                type="file"
                accept="video/mp4,video/webm,video/quicktime"
                className="hidden"
                onChange={onVideoUpload}
              />
            </label>
          </div>

          {uploadingVideo && (
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] text-zinc-500">
                <span>Uploading video...</span>
                <span>{videoProgress}%</span>
              </div>

              <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full bg-red-500 transition-all"
                  style={{
                    width: `${videoProgress}%`,
                  }}
                />
              </div>
            </div>
          )}

          {form.introVideoUrl && !uploadingVideo && (
            <video
              src={form.introVideoUrl}
              controls
              className="max-h-48 w-full rounded-md border border-white/[0.06] object-cover"
            />
          )}
        </div>

        {/* REDIRECT URL */}
        <div className="space-y-2">
          <Label required>Redirect URL</Label>

          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={form.redirectUrl}
                onChange={(value: string) => update("redirectUrl", value)}
                placeholder="https://your-event-website.com"
              />
            </div>

            <div className="flex h-9 w-10 items-center justify-center rounded-md border border-white/[0.06] bg-[#202126] text-blue-400">
              <LinkIcon size={14} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default EventMedia;
