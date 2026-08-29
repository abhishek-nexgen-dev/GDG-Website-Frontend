import {
  ArrowLeft,
  Check,
  CircleHelp,
  Eye,
  Image as ImageIcon,
  Link,
  Lock,
  MapPin,
  Plus,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

import type { AlbumFormData } from "../types/Album.type";
import Label from "../../../Components/Label";
import Input from "../../../Components/Input";
import Select from "../../../Components/Select";
import uploadImage from "../../../utils/uploadImage";

const DEFAULT_COVER =
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80";

const initialForm: AlbumFormData = {
  title: "",
  eventId: "",
  shortDescription: "",
  coverImage: null,
  coverPreview: "",
  visibility: "public",
  category: "",
  tags: [],
  tagInput: "",
  location: "",
  highlights: "",
  viewPermission: "anyone",
  photoPermission: "members",
};

const events = [
  { id: "jharkhand-tech-summit-2026", title: "Jharkhand Tech Summit 2026 - Day 1" },
  { id: "devfest-ranchi-2026", title: "DevFest Ranchi 2026" },
  { id: "calcutta-hacks-2026", title: "Calcutta Hacks 2026" },
];

const categories = [
  "Hackathon",
  "Conference",
  "Workshop",
  "Meetup",
  "DevFest",
  "Community",
  "Competition",
];

function Section({
  number,
  title,
  description,
  icon,
  children,
}: {
  number?: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#191a1f]">
      <div className="flex items-center gap-3 border-b border-white/[0.05] px-3 py-3 sm:px-4">
        <div className="shrink-0 text-emerald-400">{icon}</div>
        <div className="min-w-0">
          <h2 className="text-xs font-semibold text-zinc-100 sm:text-sm">
            {number && `${number}. `}
            {title}
          </h2>
          <p className="mt-0.5 text-[10px] text-zinc-500 sm:text-xs">{description}</p>
        </div>
      </div>
      <div className="p-3 sm:p-4">{children}</div>
    </section>
  );
}

export default function CreateAlbumPage() {
  const [form, setForm] = useState<AlbumFormData>(initialForm);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const update = <K extends keyof AlbumFormData>(key: K, value: AlbumFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCoverChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;
      const a = await uploadImage(file);
      const preview = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, coverImage: file, coverPreview: preview }));
    } catch (error) {
      console.log("Error--->", error);
    }
  };

  const removeCover = () => {
    setForm((prev) => ({ ...prev, coverImage: null, coverPreview: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addTag = () => {
    const tag = form.tagInput.trim();
    if (!tag) return;
    if (form.tags.includes(tag)) {
      update("tagInput", "");
      return;
    }
    update("tags", [...form.tags, tag]);
    update("tagInput", "");
  };

  const removeTag = (tag: string) => {
    update(
      "tags",
      form.tags.filter((item) => item !== tag),
    );
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && !form.tagInput && form.tags.length) {
      removeTag(form.tags[form.tags.length - 1]);
    }
  };

  const saveDraft = () => console.log("Album draft:", form);
  const createAlbum = () => console.log("Create album:", form);

  const eventName =
    events.find((event) => event.id === form.eventId)?.title ?? "Album Title Will Appear Here";

  const previewImage = form.coverPreview || DEFAULT_COVER;

  return (
    <div className="min-h-screen text-white">
      <header className="">
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:px-6">
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px]">
              <span className="text-zinc-500">Albums</span>
              <span className="text-zinc-700">›</span>
              <span className="truncate text-emerald-400">Create New Album</span>
            </div>
            <h1 className="text-base font-semibold tracking-tight sm:text-lg">Create New Album</h1>
            <p className="mt-0.5 text-[10px] text-zinc-500 sm:text-xs">
              Create a new album to organize and showcase event memories.
            </p>
          </div>
          <button
            type="button"
            className="flex shrink-0 items-center gap-1.5 rounded-md border border-white/[0.08] px-3 py-2 text-[10px] text-zinc-400 transition hover:bg-white/[0.04] sm:px-4 sm:text-xs"
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Back to Albums</span>
            <span className="sm:hidden">Back</span>
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1500px] px-3 py-3 sm:px-5 sm:py-4 lg:px-6">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-[minmax(0,1.15fr)_minmax(350px,0.85fr)] 2xl:grid-cols-2">
          <div className="space-y-3">
            <Section
              number="1"
              title="Basic Information"
              description="Add essential details about your album"
              icon={<ImageIcon size={15} />}
            >
              <div className="space-y-3">
                <div>
                  <Label required>Album Title</Label>
                  <Input
                    value={form.title}
                    onChange={(value) => update("title", value)}
                    placeholder="e.g. Jharkhand Tech Summit 2026 - Day 1"
                    maxLength={100}
                  />
                  <div className="mt-1 text-right text-[10px] text-zinc-600">
                    {form.title.length}/100
                  </div>
                </div>
                <div>
                  <Label required>Event</Label>
                  <Select value={form.eventId} onChange={(value) => update("eventId", value)}>
                    <option value="">Select an event</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.title}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label>Short Description</Label>
                  <textarea
                    value={form.shortDescription}
                    onChange={(e) => update("shortDescription", e.target.value)}
                    maxLength={200}
                    placeholder="A brief description about this album..."
                    className="h-20 w-full resize-none rounded-md border border-white/[0.07] bg-[#202126] p-3 text-xs text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/10 sm:text-sm"
                  />
                  <div className="mt-1 text-right text-[10px] text-zinc-600">
                    {form.shortDescription.length}/200
                  </div>
                </div>
              </div>
            </Section>

            <Section
              number="2"
              title="Album Cover"
              description="Add a cover image for your album"
              icon={<ImageIcon size={15} />}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
              {form.coverPreview ? (
                <div className="relative overflow-hidden rounded-lg border border-emerald-500/30">
                  <img
                    src={form.coverPreview}
                    alt="Album cover preview"
                    className="aspect-video w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex flex-wrap justify-between gap-2 bg-black/70 p-2.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-2 text-[10px] text-white hover:bg-white/20"
                    >
                      <Upload size={12} /> Change Cover
                    </button>
                    <button
                      type="button"
                      onClick={removeCover}
                      className="flex items-center gap-1.5 rounded-md bg-red-500/20 px-3 py-2 text-[10px] text-red-300"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex min-h-44 w-full flex-col items-center justify-center rounded-lg border border-dashed border-emerald-500/30 bg-[#151a18] px-4 text-center transition hover:border-emerald-400/60 hover:bg-[#17201c] sm:min-h-48"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <Upload size={18} />
                  </div>
                  <p className="text-xs font-medium text-zinc-300 sm:text-sm">Upload cover image</p>
                  <p className="mt-1 text-[10px] text-zinc-600 sm:text-xs">
                    Drag and drop an image here, or click to browse
                  </p>
                  <p className="mt-1 text-[9px] text-zinc-700 sm:text-[10px]">
                    Recommended: 16:9, JPG/PNG, max 5MB
                  </p>
                </button>
              )}
            </Section>

            <Section
              number="3"
              title="Album Settings"
              description="Configure visibility and other settings"
              icon={<ShieldCheck size={15} />}
            >
              <div className="space-y-4">
                <div>
                  <Label required>Visibility</Label>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => update("visibility", "public")}
                      className={`rounded-lg border p-3 text-left transition ${form.visibility === "public" ? "border-emerald-500/40 bg-emerald-500/10" : "border-white/[0.06] bg-[#202126] hover:bg-[#24252a]"}`}
                    >
                      <div className="flex items-center gap-2">
                        <Eye
                          size={14}
                          className={
                            form.visibility === "public" ? "text-emerald-400" : "text-zinc-500"
                          }
                        />
                        <span className="text-xs text-zinc-300">Public</span>
                      </div>
                      <p className="mt-1 text-[10px] text-zinc-600">Anyone can view</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => update("visibility", "private")}
                      className={`rounded-lg border p-3 text-left transition ${form.visibility === "private" ? "border-emerald-500/40 bg-emerald-500/10" : "border-white/[0.06] bg-[#202126] hover:bg-[#24252a]"}`}
                    >
                      <div className="flex items-center gap-2">
                        <Lock
                          size={14}
                          className={
                            form.visibility === "private" ? "text-emerald-400" : "text-zinc-500"
                          }
                        />
                        <span className="text-xs text-zinc-300">Private</span>
                      </div>
                      <p className="mt-1 text-[10px] text-zinc-600">Only members</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => update("visibility", "unlisted")}
                      className={`rounded-lg border p-3 text-left transition ${form.visibility === "unlisted" ? "border-emerald-500/40 bg-emerald-500/10" : "border-white/[0.06] bg-[#202126] hover:bg-[#24252a]"}`}
                    >
                      <div className="flex items-center gap-2">
                        <Link
                          size={14}
                          className={
                            form.visibility === "unlisted" ? "text-emerald-400" : "text-zinc-500"
                          }
                        />
                        <span className="text-xs text-zinc-300">Unlisted</span>
                      </div>
                      <p className="mt-1 text-[10px] text-zinc-600">Only with link</p>
                    </button>
                  </div>
                </div>
                <div>
                  <Label>Album Category</Label>
                  <Select value={form.category} onChange={(value) => update("category", value)}>
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label>Tags</Label>
                  <div className="min-h-9 rounded-md border border-white/[0.07] bg-[#202126] px-2 py-1.5">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {form.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-400"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-red-400"
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                      <input
                        value={form.tagInput}
                        onChange={(e) => update("tagInput", e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder={
                          form.tags.length ? "Add another..." : "Add tags and press Enter"
                        }
                        className="min-w-[140px] flex-1 bg-transparent px-1 py-1 text-xs text-zinc-300 outline-none placeholder:text-zinc-600"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Location (Optional)</Label>
                  <div className="relative">
                    <MapPin
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                    />
                    <input
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      placeholder="e.g. BIT Mesra, Ranchi"
                      className="h-9 w-full rounded-md border border-white/[0.07] bg-[#202126] pl-9 pr-3 text-xs text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-emerald-500/50 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </Section>

            <Section
              number="4"
              title="Additional Information"
              description="Add more details about this album"
              icon={<CircleHelp size={15} />}
            >
              <div>
                <Label>Highlights (Optional)</Label>
                <textarea
                  value={form.highlights}
                  onChange={(e) => update("highlights", e.target.value)}
                  maxLength={300}
                  placeholder="Share key moments or highlights of this album..."
                  className="h-24 w-full resize-none rounded-md border border-white/[0.07] bg-[#202126] p-3 text-xs text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-emerald-500/50 sm:text-sm"
                />
                <div className="mt-1 text-right text-[10px] text-zinc-600">
                  {form.highlights.length}/300
                </div>
              </div>
            </Section>
          </div>

          <div className="space-y-3 xl:sticky xl:top-3 xl:self-start">
            <Section
              title="Album Preview"
              description="This is how your album will appear"
              icon={<Eye size={15} />}
            >
              <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#202126]">
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Album preview"
                    className="aspect-video w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute right-2 top-2 flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-[10px] font-medium text-zinc-800 shadow-lg"
                  >
                    <ImageIcon size={11} />
                    <span className="hidden sm:inline">Change Cover</span>
                  </button>
                </div>
                <div className="p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    <span className="rounded bg-emerald-500/10 px-2 py-1 text-[9px] font-semibold uppercase text-emerald-400">
                      Event Name
                    </span>
                    {form.visibility === "public" && (
                      <span className="rounded bg-blue-500/10 px-2 py-1 text-[9px] text-blue-400">
                        Public
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-white sm:text-lg">
                    {form.title || "Album Title Will Appear Here"}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-500 sm:text-sm">
                    {form.shortDescription ||
                      "Short description of the album will appear here and give users an idea about the content."}
                  </p>
                  <div className="mt-4 border-t border-white/[0.06] pt-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <ImageIcon size={11} /> 123 Photos
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Lock size={11} />
                        {form.visibility === "public" ? "Public Album" : "Private Album"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg bg-[#191a1e] p-3">
                    <p className="text-[9px] uppercase tracking-wide text-zinc-600">Event</p>
                    <p className="mt-1 text-xs text-zinc-300 sm:text-sm">{eventName}</p>
                    {form.location && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-zinc-600 sm:text-xs">
                        <MapPin size={11} /> {form.location}
                      </p>
                    )}
                  </div>
                  {form.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {form.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="rounded bg-white/[0.05] px-2 py-1 text-[9px] text-zinc-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Section>
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 z-20 border-t border-white/[0.06] bg-[#121316]/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-3 px-3 py-2.5 sm:px-5 lg:px-6">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10">
              <Check size={11} className="text-emerald-400" />
            </span>
            <span className="text-[10px] text-zinc-500 sm:text-xs">
              All changes are saved as draft
            </span>
          </div>
          <div className="ml-auto flex w-full justify-end gap-2 sm:w-auto">
            <button
              type="button"
              onClick={saveDraft}
              className="rounded-md border border-white/[0.07] px-3 py-2 text-[10px] text-zinc-400 transition hover:bg-white/[0.04] sm:px-4 sm:text-xs"
            >
              Save Draft
            </button>
            <button
              type="button"
              onClick={createAlbum}
              className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-2 text-[10px] font-medium text-white transition hover:bg-emerald-500 sm:px-4 sm:text-xs"
            >
              <Plus size={13} /> Create Album
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
