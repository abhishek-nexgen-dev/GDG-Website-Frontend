import { Settings2 } from "lucide-react";
import type { ImageFormData } from "../types/image.type";

interface Props {
  form: ImageFormData;
  update: <K extends keyof ImageFormData>(key: K, value: ImageFormData[K]) => void;
}

const ImageSettings = ({ form, update }: Props) => {
  return (
    <section className="rounded-xl border border-white/[0.07] bg-[#151a20]">
      <div className="border-b border-white/[0.06] px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Settings2 size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-zinc-200">Image Settings</h2>

            <p className="mt-1 text-xs text-zinc-500">Advanced image options</p>
          </div>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <label className="mb-2 block text-xs font-medium text-zinc-400">Display Order</label>

          <input
            type="number"
            min={1}
            value={form.displayOrder}
            onChange={(event) => update("displayOrder", Number(event.target.value))}
            className="h-10 w-full rounded-lg border border-white/[0.08] bg-[#1a2027] px-3 text-xs text-zinc-200 outline-none focus:border-emerald-500/50"
          />

          <p className="mt-1.5 text-[10px] text-zinc-600">Lower numbers appear first</p>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.06] pt-5">
          <div>
            <p className="text-xs font-medium text-zinc-300">Allow Download</p>

            <p className="mt-1 text-[10px] text-zinc-500">Allow users to download this image</p>
          </div>

          <button
            type="button"
            onClick={() => update("allowDownload", !form.allowDownload)}
            className={`relative h-6 w-11 rounded-full transition ${
              form.allowDownload ? "bg-emerald-500" : "bg-zinc-700"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                form.allowDownload ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImageSettings;
