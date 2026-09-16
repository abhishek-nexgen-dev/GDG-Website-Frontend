import { useMemo } from "react";
import { ImageIcon, Loader2 } from "lucide-react";
import type { ImageFormData } from "../types/image.type";
import VisibilitySelector from "./VisibilitySelector";
import useFetchAllEventNamesQuery from "../../Event/hook/useFetchAllEventNamesQuery";
import useFetchAllAlbumNamesQuery from "../hooks/useFetchAllAlbumNamesQuery";

interface Props {
  form: ImageFormData;
  update: <K extends keyof ImageFormData>(key: K, value: ImageFormData[K]) => void;
}

const ImageDetails = ({ form, update }: Props) => {
  const { data: eventNamesData, isLoading: isEventsLoading } = useFetchAllEventNamesQuery();
  const { data: albumNamesData, isLoading: isAlbumsLoading } = useFetchAllAlbumNamesQuery();

  const eventList: string[] = useMemo(() => {
    if (Array.isArray(eventNamesData) && eventNamesData.length > 0) {
      const titles = eventNamesData
        .map((ev: any) => (typeof ev === "string" ? ev : ev?.title)?.trim())
        .filter((t: any): t is string => Boolean(t));
      return [...new Set(titles)];
    }
    return [];
  }, [eventNamesData]);

  const albumList: string[] = useMemo(() => {
    if (Array.isArray(albumNamesData) && albumNamesData.length > 0) {
      const titles = albumNamesData
        .map((alb: any) => (typeof alb === "string" ? alb : alb?.title)?.trim())
        .filter((t: any): t is string => Boolean(t));
      return [...new Set(titles)];
    }
    return [];
  }, [albumNamesData]);

  return (
    <section className="rounded-xl border border-white/[0.07] bg-[#151a20]">
      <div className="border-b border-white/[0.06] px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <ImageIcon size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-zinc-200">Image Details</h2>

            <p className="mt-1 text-xs text-zinc-500">Add details about this image</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-400">
            Title <span className="text-red-400">*</span>
          </label>

          <input
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            placeholder="Enter image title"
            className="h-10 w-full rounded-lg border border-white/[0.08] bg-[#1a2027] px-3 text-xs text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/50"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-400">Caption</label>

            <span className="text-[10px] text-zinc-600">{form.caption.length}/200</span>
          </div>

          <textarea
            value={form.caption}
            maxLength={200}
            onChange={(event) => update("caption", event.target.value)}
            placeholder="Describe this image"
            className="h-20 w-full resize-none rounded-lg border border-white/[0.08] bg-[#1a2027] px-3 py-2.5 text-xs text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/50"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-zinc-400">
                Event <span className="text-red-400">*</span>
              </label>
              {isEventsLoading && (
                <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <Loader2 size={10} className="animate-spin" /> Loading
                </span>
              )}
            </div>

            <select
              value={form.event}
              onChange={(event) => update("event", event.target.value)}
              className="h-10 w-full rounded-lg border border-white/[0.08] bg-[#1a2027] px-3 text-xs text-zinc-300 outline-none focus:border-emerald-500/50"
            >
              <option value="">{isEventsLoading ? "Loading events..." : "Select event"}</option>

              {eventList.map((event: string) => (
                <option key={event} value={event}>
                  {event}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-medium text-zinc-400">
                Album <span className="text-red-400">*</span>
              </label>
              {isAlbumsLoading && (
                <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <Loader2 size={10} className="animate-spin" /> Loading
                </span>
              )}
            </div>

            <select
              value={form.album}
              onChange={(event) => update("album", event.target.value)}
              className="h-10 w-full rounded-lg border border-white/[0.08] bg-[#1a2027] px-3 text-xs text-zinc-300 outline-none focus:border-emerald-500/50"
            >
              <option value="">{isAlbumsLoading ? "Loading albums..." : "Select album"}</option>

              {albumList.map((album: string) => (
                <option key={album} value={album}>
                  {album}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-400">Tags</label>

          <input
            value={form.tags.join(", ")}
            onChange={(event) =>
              update(
                "tags",
                event.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              )
            }
            placeholder="e.g. keynote, speaker, devfest"
            className="h-10 w-full rounded-lg border border-white/[0.08] bg-[#1a2027] px-3 text-xs text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/50"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-400">
            Visibility <span className="text-red-400">*</span>
          </label>

          <VisibilitySelector
            value={form.visibility}
            onChange={(value) => update("visibility", value)}
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-400">Alt Text</label>

          <input
            value={form.altText}
            onChange={(event) => update("altText", event.target.value)}
            placeholder="Describe the image for accessibility"
            className="h-10 w-full rounded-lg border border-white/[0.08] bg-[#1a2027] px-3 text-xs text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/50"
          />

          <p className="mt-1.5 text-[10px] text-zinc-600">Describe the image for accessibility</p>
        </div>
      </div>
    </section>
  );
};

export default ImageDetails;
