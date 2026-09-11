import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Eye,
  FileText,
  Image as ImageIcon,
  Link,
  Lock,
  Plus,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Input from "../../../Components/Input";
import Label from "../../../Components/Label";
import Section from "../../../Components/Section";
import { SearchableDropdown } from "../../../Components/SearchableDropdown";
import api from "../../../utils/axios.utils";
import uploadImage from "../../../utils/uploadImage";
import useCreateAlbum from "../hooks/CreateAlbumForm.hook";
import useCreateAlbumMutation from "../hooks/useCreateAlbumMutation";
import Swal from "sweetalert2";

type CoverMode = "upload" | "url";
type AlbumStatus = "draft" | "published";
// type Visibility = "public" | "private";

interface EventItem {
  title?: string;
}

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80";

function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-1.5 text-xs text-red-400">{message}</p>;
}

const EMPTY_ARRAY: string[] = [];

export default function CreateAlbumPage() {
  const form = useCreateAlbum();
  const { mutateAsync, isPending } = useCreateAlbumMutation();

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  const [coverMode, setCoverMode] = useState<CoverMode>("upload");
  const [tagInput, setTagInput] = useState("");
  const [localPreview, setLocalPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const [eventOptions, setEventOptions] = useState<string[]>([]);
  const [isEventsLoading, setIsEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState("");

  const title = watch("title") ?? "";
  const eventName = watch("EventName") ?? "";
  const albumImageUrl = watch("albumImageUrl") ?? "";
  const description = watch("description") ?? "";
  const tags = watch("tags") ?? EMPTY_ARRAY;
  const visibility = watch("visibility") ?? "public";
  const status = watch("status") ?? "draft";

  const normalizedEventOptions = useMemo(
    () => [...new Set(eventOptions)].filter(Boolean).sort((a, b) => a.localeCompare(b)),
    [eventOptions],
  );

  const previewImage = useMemo(
    () => localPreview || albumImageUrl || DEFAULT_COVER,
    [localPreview, albumImageUrl],
  );

  const isLoading = isPending || isUploading;

  const revokePreviewUrl = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const fetchEvents = async () => {
      try {
        setIsEventsLoading(true);
        setEventsError("");

        const response = await api.get("/api/v1/findAllEventName", {
          signal: controller.signal,
        });

        const events = Array.isArray(response.data?.data) ? response.data.data : [];

        const names = events
          .map((event: EventItem) => event?.title?.trim())
          .filter((name: unknown): name is string => typeof name === "string" && name.length > 0);

        setEventOptions(names);
      } catch (error: any) {
        if (
          controller.signal.aborted ||
          error?.name === "CanceledError" ||
          error?.code === "ERR_CANCELED"
        ) {
          return;
        }

        setEventOptions([]);
        setEventsError("Unable to load events. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setIsEventsLoading(false);
        }
      }
    };

    fetchEvents();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    return () => {
      revokePreviewUrl();
    };
  }, [revokePreviewUrl]);

  const updateField = useCallback(
    (field: string, value: unknown) => {
      setValue(field as never, value as never, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  const handleCoverModeChange = useCallback(
    (mode: CoverMode) => {
      setCoverMode(mode);

      if (mode === "url") {
        revokePreviewUrl();
        setLocalPreview("");
      }
    },
    [revokePreviewUrl],
  );

  const handleCoverChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        event.target.value = "";
        return;
      }

      try {
        setIsUploading(true);

        revokePreviewUrl();

        const previewUrl = URL.createObjectURL(file);

        previewUrlRef.current = previewUrl;
        setLocalPreview(previewUrl);

        const image = await uploadImage(file);

        if (!image?.secure_url) {
          throw new Error("Image upload failed");
        }

        revokePreviewUrl();
        setLocalPreview("");

        setValue("albumImageUrl", image.secure_url, {
          shouldValidate: true,
          shouldDirty: true,
        });
      } catch (error) {
        console.error("Image upload failed:", error);

        revokePreviewUrl();
        setLocalPreview("");

        setValue("albumImageUrl", "", {
          shouldValidate: true,
          shouldDirty: true,
        });
      } finally {
        setIsUploading(false);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [revokePreviewUrl, setValue],
  );

  const handleImageUrlChange = useCallback(
    (value: string) => {
      setValue("albumImageUrl", value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    },
    [setValue],
  );

  const removeCover = useCallback(() => {
    revokePreviewUrl();
    setLocalPreview("");

    setValue("albumImageUrl", "", {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [revokePreviewUrl, setValue]);

  const addTag = useCallback(() => {
    const tag = tagInput.trim().toLowerCase();

    if (!tag || tags.includes(tag)) {
      setTagInput("");
      return;
    }

    setValue("tags", [...tags, tag], {
      shouldValidate: true,
      shouldDirty: true,
    });

    setTagInput("");
  }, [setValue, tagInput, tags]);

  const removeTag = useCallback(
    (tag: string) => {
      setValue(
        "tags",
        tags.filter((item: string) => item !== tag),
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    },
    [setValue, tags],
  );

  const handleTagKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" || event.key === ",") {
        event.preventDefault();
        addTag();
      }

      if (event.key === "Backspace" && !tagInput && tags.length > 0) {
        removeTag(tags[tags.length - 1]);
      }
    },
    [addTag, removeTag, tagInput, tags],
  );

  const resetFormState = useCallback(() => {
    revokePreviewUrl();
    reset();

    setTagInput("");
    setLocalPreview("");
    setCoverMode("upload");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [reset, revokePreviewUrl]);

  const onSubmit = useCallback(
    async (data: any, albumStatus: AlbumStatus) => {
      try {
        const payload = {
          ...data,
          status: albumStatus,
        };

        console.log("Creating album:", payload);

        await mutateAsync(payload);

        Swal.fire({
          icon: "success",
          title: "Album Created",
          text: "Your album has been successfully created!",
          theme: "dark",
        });

        resetFormState();
      } catch (error: any) {
        console.error("Failed to create album:", error);
        Swal.fire({
          icon: "error",
          title: "Creation Failed",
          text: error.message,
          theme: "dark",
        });
      }
    },
    [mutateAsync, resetFormState],
  );

  const onInvalid = useCallback((formErrors: unknown) => {
    console.error("Album form validation failed:", formErrors);
  }, []);

  const handleCreate = useCallback(
    (albumStatus: AlbumStatus) => {
      handleSubmit((data) => onSubmit(data, albumStatus), onInvalid)();
    },
    [handleSubmit, onInvalid, onSubmit],
  );

  const handleBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#121316] text-white">
      <header className="border-b border-white/[0.05]">
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-xs">
              <span className="text-zinc-500">Albums</span>
              <span className="text-zinc-700">/</span>
              <span className="truncate text-emerald-400">Create New Album</span>
            </div>

            <h1 className="text-lg font-semibold tracking-tight">Create New Album</h1>

            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
              Organize and showcase your event memories in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={handleBack}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-xs text-zinc-400 transition hover:bg-white/[0.04]"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Back to Albums</span>
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6">
        <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="min-w-0 space-y-5">
            <Section
              title="Basic Information"
              description="Enter the core details for this album"
              icon={<ImageIcon size={16} />}
            >
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <Label required>Album Title</Label>

                    <span className="text-xs text-zinc-600">{title.length}/100</span>
                  </div>

                  <Input
                    value={title}
                    onChange={(value) => updateField("title", value)}
                    placeholder="e.g. RanchiHacks 2026"
                    maxLength={100}
                  />

                  <ErrorMessage message={errors.title?.message} />
                </div>

                <div>
                  <Label required>Event Name</Label>

                  <SearchableDropdown
                    options={normalizedEventOptions}
                    value={eventName}
                    onChange={(value) => updateField("EventName", value)}
                    placeholder={isEventsLoading ? "Loading events..." : "Select an event"}
                    error={eventsError || errors.EventName?.message}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <Label required>Description</Label>

                    <span className="text-xs text-zinc-600">{description.length}/500</span>
                  </div>

                  <textarea
                    value={description}
                    onChange={(event) => updateField("description", event.target.value)}
                    placeholder="Describe your album and event memories..."
                    maxLength={500}
                    className="h-32 w-full resize-none rounded-lg border border-white/[0.07] bg-[#202126] px-3 py-3 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/10"
                  />

                  <ErrorMessage message={errors.description?.message} />
                </div>
              </div>
            </Section>

            <Section
              title="Album Cover"
              description="Upload an image or use an external image URL"
              icon={<ImageIcon size={16} />}
            >
              <div className="mb-5 grid grid-cols-2 gap-2 rounded-lg bg-[#202126] p-1">
                <button
                  type="button"
                  onClick={() => handleCoverModeChange("upload")}
                  className={`flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-xs font-medium transition ${
                    coverMode === "upload"
                      ? "bg-emerald-500 text-black shadow"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Upload size={14} />
                  Upload Image
                </button>

                <button
                  type="button"
                  onClick={() => handleCoverModeChange("url")}
                  className={`flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-xs font-medium transition ${
                    coverMode === "url"
                      ? "bg-emerald-500 text-black shadow"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Link size={14} />
                  Image URL
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleCoverChange}
                className="hidden"
              />

              {coverMode === "upload" ? (
                localPreview || albumImageUrl ? (
                  <div className="relative overflow-hidden rounded-xl border border-emerald-500/30">
                    <img
                      src={localPreview || albumImageUrl}
                      alt="Album cover preview"
                      className="aspect-video w-full object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-black/70 p-3 backdrop-blur-sm">
                      <button
                        type="button"
                        disabled={isUploading}
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs text-white transition hover:bg-white/20 disabled:opacity-50"
                      >
                        <Upload size={13} />
                        Change
                      </button>

                      <button
                        type="button"
                        disabled={isUploading}
                        onClick={removeCover}
                        className="flex items-center gap-2 rounded-lg bg-red-500/20 px-3 py-2 text-xs text-red-300 transition hover:bg-red-500/30 disabled:opacity-50"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                    </div>

                    {isUploading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="rounded-lg bg-black/70 px-4 py-2 text-sm text-white">
                          Uploading image...
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex min-h-56 w-full flex-col items-center justify-center rounded-xl border border-dashed border-emerald-500/30 bg-[#151a18] px-5 text-center transition hover:border-emerald-400/60 hover:bg-[#17201c] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                      <Upload size={20} />
                    </div>

                    <p className="text-sm font-medium text-zinc-300">Upload cover image</p>

                    <p className="mt-1 text-xs text-zinc-600">Click to browse from your device</p>

                    <p className="mt-2 text-[11px] text-zinc-700">JPG, PNG or WEBP recommended</p>
                  </button>
                )
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label required>Image URL</Label>

                    <Input
                      value={albumImageUrl}
                      onChange={handleImageUrlChange}
                      placeholder="https://example.com/album-cover.jpg"
                    />

                    <p className="mt-2 text-xs text-zinc-600">
                      Paste a direct link to your album cover image.
                    </p>
                  </div>

                  {albumImageUrl && (
                    <div className="overflow-hidden rounded-xl border border-white/[0.07]">
                      <img
                        src={albumImageUrl}
                        alt="Album cover URL preview"
                        className="aspect-video w-full object-cover"
                      />
                    </div>
                  )}
                </div>
              )}

              <ErrorMessage message={errors.albumImageUrl?.message} />
            </Section>

            <Section
              title="Album Settings"
              description="Configure visibility and organize your album"
              icon={<ShieldCheck size={16} />}
            >
              <div className="space-y-6">
                <div>
                  <Label required>Visibility</Label>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => updateField("visibility", "public")}
                      className={`rounded-xl border p-4 text-left transition ${
                        visibility === "public"
                          ? "border-emerald-500/50 bg-emerald-500/10"
                          : "border-white/[0.07] bg-[#202126] hover:border-white/[0.12]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Eye
                          size={16}
                          className={visibility === "public" ? "text-emerald-400" : "text-zinc-500"}
                        />

                        <span className="text-sm font-medium text-zinc-200">Public</span>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                        Anyone can discover and view this album.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateField("visibility", "private")}
                      className={`rounded-xl border p-4 text-left transition ${
                        visibility === "private"
                          ? "border-emerald-500/50 bg-emerald-500/10"
                          : "border-white/[0.07] bg-[#202126] hover:border-white/[0.12]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Lock
                          size={16}
                          className={
                            visibility === "private" ? "text-emerald-400" : "text-zinc-500"
                          }
                        />

                        <span className="text-sm font-medium text-zinc-200">Private</span>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                        Only authorized members can access this album.
                      </p>
                    </button>
                  </div>
                </div>

                <div>
                  <Label required>Status</Label>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => updateField("status", "draft")}
                      className={`rounded-xl border p-4 text-left transition ${
                        status === "draft"
                          ? "border-amber-500/50 bg-amber-500/10"
                          : "border-white/[0.07] bg-[#202126] hover:border-white/[0.12]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText
                          size={16}
                          className={status === "draft" ? "text-amber-400" : "text-zinc-500"}
                        />

                        <span className="text-sm font-medium text-zinc-200">Draft</span>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                        Save and continue editing later.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateField("status", "published")}
                      className={`rounded-xl border p-4 text-left transition ${
                        status === "published"
                          ? "border-emerald-500/50 bg-emerald-500/10"
                          : "border-white/[0.07] bg-[#202126] hover:border-white/[0.12]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2
                          size={16}
                          className={status === "published" ? "text-emerald-400" : "text-zinc-500"}
                        />

                        <span className="text-sm font-medium text-zinc-200">Published</span>
                      </div>

                      <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                        Make the album available to users.
                      </p>
                    </button>
                  </div>
                </div>

                <div>
                  <Label>Tags</Label>

                  <div className="min-h-11 rounded-lg border border-white/[0.07] bg-[#202126] p-2 transition focus-within:border-emerald-500/50">
                    <div className="flex flex-wrap items-center gap-2">
                      {tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="flex max-w-full items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400"
                        >
                          <span className="max-w-[180px] truncate">{tag}</span>

                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="shrink-0 transition hover:text-red-400"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}

                      <input
                        value={tagInput}
                        onChange={(event) => setTagInput(event.target.value)}
                        onKeyDown={handleTagKeyDown}
                        onBlur={addTag}
                        placeholder={
                          tags.length ? "Add another tag..." : "Type a tag and press Enter"
                        }
                        className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-sm text-zinc-300 outline-none placeholder:text-zinc-600"
                      />

                      <ErrorMessage message={errors.tags?.message} />
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-zinc-600">Press Enter or comma to add a tag.</p>
                </div>
              </div>
            </Section>
          </div>

          <aside className="min-w-0 xl:sticky xl:top-5 xl:self-start">
            <Section
              title="Live Preview"
              description="Preview how your album will appear"
              icon={<Eye size={16} />}
            >
              <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#202126]">
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Album preview"
                    className="aspect-video w-full object-cover"
                  />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <span className="rounded-md bg-emerald-500 px-2 py-1 text-[10px] font-semibold uppercase text-black">
                      {visibility}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                    {eventName || "Event Name"}
                  </p>

                  <h3 className="mt-2 break-words text-xl font-semibold text-white">
                    {title || "Album Title"}
                  </h3>

                  <p className="mt-3 break-words text-sm leading-6 text-zinc-500">
                    {description ||
                      "Your album description will appear here when you start adding details."}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-2">
                      <ImageIcon size={14} />0 Photos
                    </span>

                    <span className="capitalize">{visibility}</span>
                  </div>

                  {tags.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="max-w-full truncate rounded-md bg-white/[0.05] px-2 py-1 text-xs text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Section>
          </aside>
        </div>
      </main>

      <footer className="sticky bottom-0 z-30 border-t border-white/[0.07] bg-[#121316]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10">
              <Check size={13} className="text-emerald-400" />
            </span>

            <span className="text-xs text-zinc-500">
              Fill in the album details and choose how to save it.
            </span>
          </div>

          <div className="flex w-full gap-3 sm:ml-auto sm:w-auto">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleCreate("draft")}
              className="flex-1 rounded-lg border border-white/[0.08] px-4 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              Save Draft
            </button>

            <button
              type="button"
              disabled={isLoading}
              onClick={() => handleCreate("published")}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              <Plus size={16} />

              {isUploading ? "Uploading..." : isPending ? "Creating..." : "Create Album"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
