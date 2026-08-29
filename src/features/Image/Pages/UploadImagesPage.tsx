import { useEffect, useState } from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useNavigate } from "react-router";

import ImageUploadZone from "../Components/ImageUploadZone";
import ImageDetails from "../Components/ImageDetails";
import ImagePreview from "../Components/ImagePreview";
import ImageSettings from "../Components/ImageSettings";

import { initialImageFormData } from "../data/images.data";

import type { ImageFormData, SelectedImageFile } from "../types/image.type";

const UploadImagesPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<ImageFormData>(initialImageFormData);

  const [selectedFile, setSelectedFile] = useState<SelectedImageFile | null>(null);

  const [saving, setSaving] = useState(false);

  const update = <K extends keyof ImageFormData>(key: K, value: ImageFormData[K]) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const getImageDimensions = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const image = new Image();
      const url = URL.createObjectURL(file);

      image.onload = () => {
        resolve(`${image.naturalWidth} × ${image.naturalHeight}`);

        URL.revokeObjectURL(url);
      };

      image.src = url;
    });
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    const dimensions = await getImageDimensions(file);

    const format = file.type.replace("image/", "").toUpperCase();

    setSelectedFile({
      file,
      previewUrl,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      dimensions,
      format,
    });

    update("title", file.name.replace(/\.[^/.]+$/, ""));
  };

  const handleRemoveFile = () => {
    if (selectedFile) {
      URL.revokeObjectURL(selectedFile.previewUrl);
    }

    setSelectedFile(null);
  };

  const handleSaveDraft = async () => {
    setSaving(true);

    try {
      console.log("Draft:", form);
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    setSaving(true);

    try {
      console.log("Form:", form);
      console.log("File:", selectedFile.file);

      navigate("/member/images");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(selectedFile.previewUrl);
      }
    };
  }, [selectedFile]);

  return (
    <div className="min-h-screen  text-white">
      <div className="mx-auto max-w-[1500px] px-5 py-6 lg:px-7">
        <header className="mb-6">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[11px]">
                <span className="text-zinc-600">Images</span>

                <span className="text-zinc-700">›</span>

                <span className="text-emerald-400">Create New Image</span>
              </div>

              <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
                Create New Image
              </h1>

              <p className="mt-1 text-sm text-zinc-500">
                Upload and organize images to showcase event moments.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/member/images")}
              className="flex w-fit items-center gap-2 rounded-lg border border-white/[0.08] bg-[#14191f] px-4 py-2.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.04] hover:text-white"
            >
              <ArrowLeft size={15} />
              Back to Images
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 gap-4 xl:grid-cols-[1.65fr_1fr]">
          <div className="space-y-4">
            <section className="rounded-xl border border-white/[0.07] bg-[#151a20]">
              <div className="border-b border-white/[0.06] px-5 py-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Upload size={18} />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-zinc-200">1. Upload Image</h2>

                    <p className="mt-1 text-xs text-zinc-500">Choose an image file to upload</p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <ImageUploadZone
                  selectedFile={selectedFile}
                  onFileSelect={handleFileSelect}
                  onRemove={handleRemoveFile}
                />
              </div>
            </section>

            <ImageDetails form={form} update={update} />
          </div>

          <div className="sticky top-5 h-fit space-y-4 self-start">
            <ImagePreview selectedFile={selectedFile} />

            <ImageSettings form={form} update={update} />
          </div>
        </main>

        <footer className="sticky bottom-0 mt-4 flex flex-col justify-between gap-4 rounded-xl border border-white/[0.07] bg-[#14191f]/95 px-5 py-3 backdrop-blur sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <div className="h-2 w-2 rounded-full bg-emerald-400" />
            All changes are saved locally
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={handleSaveDraft}
              className="flex items-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2.5 text-xs font-medium text-zinc-400 transition hover:bg-white/[0.04] disabled:opacity-50"
            >
              <Save size={14} />
              Save Draft
            </button>

            <button
              type="button"
              disabled={saving || !selectedFile}
              onClick={handleUpload}
              className="flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Upload size={14} />

              {saving ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UploadImagesPage;
