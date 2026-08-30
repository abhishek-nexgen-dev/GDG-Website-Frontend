import { Eye } from "lucide-react";
import type { SelectedImageFile } from "../types/image.type";

interface Props {
  selectedFile: SelectedImageFile | null;
}

const ImagePreview = ({ selectedFile }: Props) => {
  return (
    <section className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#151a20]">
      <div className="border-b border-white/[0.06] px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
            <Eye size={18} />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-zinc-200">Image Preview</h2>

            <p className="mt-1 text-xs text-zinc-500">See how your image will appear</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="aspect-video overflow-hidden rounded-lg bg-[#101419]">
          {selectedFile ? (
            <img
              src={selectedFile.previewUrl}
              alt={selectedFile.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-zinc-600">
              Image preview will appear here
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="mt-4 divide-y divide-white/[0.06] rounded-lg border border-white/[0.06]">
            <InfoRow label="File Name" value={selectedFile.name} />

            <InfoRow label="File Size" value={selectedFile.size} />

            <InfoRow label="Dimensions" value={selectedFile.dimensions ?? "Loading..."} />

            <InfoRow label="Format" value={selectedFile.format} />
          </div>
        )}
      </div>
    </section>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-[11px] text-zinc-500">{label}</span>

      <span className="text-[11px] font-medium text-zinc-300">{value}</span>
    </div>
  );
};

export default ImagePreview;
