import { useRef } from "react";
import { CheckCircle2, ImagePlus, UploadCloud, X } from "lucide-react";
import type { SelectedImageFile } from "../types/image.type";

interface Props {
  selectedFile: SelectedImageFile | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

const ImageUploadZone = ({ selectedFile, onFileSelect, onRemove }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <div
        onClick={triggerFileInput}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
        className="group flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-indigo-500/30 bg-[#0f1115] px-6 py-8 transition hover:border-indigo-400/60 hover:bg-indigo-500/[0.03]"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleChange}
        />

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400 transition group-hover:scale-105">
          <UploadCloud size={25} />
        </div>

        <p className="mt-4 text-sm text-zinc-300">
          Drag and drop your image here, or{" "}
          <span className="font-medium text-indigo-400">click to browse</span>
        </p>

        <p className="mt-1 text-xs text-zinc-500">
          JPG, PNG, WebP · Max size: 10MB · Recommended: 16:9 ratio
        </p>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            triggerFileInput();
          }}
          className="mt-4 flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-medium text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
        >
          <ImagePlus size={14} />
          Browse Files
        </button>
      </div>

      {selectedFile && (
        <div className="mt-3 flex items-center justify-between rounded-lg border border-indigo-500/20 bg-[#13161c] px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={selectedFile.previewUrl}
              alt={selectedFile.name}
              className="h-10 w-14 rounded-md object-cover ring-1 ring-white/10"
            />

            <div>
              <p className="text-xs font-medium text-zinc-200">{selectedFile.name}</p>
              <p className="mt-1 text-[11px] text-zinc-500">{selectedFile.size}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <CheckCircle2 size={17} className="text-indigo-400" />

            <button
              type="button"
              onClick={onRemove}
              className="text-zinc-500 transition hover:text-red-400"
              aria-label="Remove image"
            >
              <X size={17} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadZone;
