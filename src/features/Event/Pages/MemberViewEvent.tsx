import { useEffect, useMemo, useState, type ChangeEvent, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  Globe,
  Image as ImageIcon,
  Link2,
  MapPin,
  Pencil,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  Users,
  Video,
  X,
} from "lucide-react";

import Section from "../../../Components/Section";
import Input from "../../../Components/Input";
import DropDown from "../../../Components/DropDown";
import { Button } from "../../../Components/Button";

import uploadImage from "../../../utils/uploadImage";
import uploadVideo from "../../../utils/uploadVideo";

import usefetchEventDetaill from "../hook/usefetchEventDetaill";
import useUpdateEvent from "../hook/useUpdateEvent";

import {
  formatDate,
  formatDateRange,
  formatStatus,
  formatTime,
  getEventEndDate,
  getEventStartDate,
} from "../utils/Event.utils";

import type { EventResponse, EventTimelineItem } from "../type/Event.type";

type Venue = {
  mode: string;
  venueName: string;
  address: string;
  city: string;
  state: string;
  country: string;
};

type EventForm = {
  title: string;
  shortDescription: string;
  descriptionMarkdown: string;
  category: string;
  visibility: string;
  status: string;
  redirectUrl: string;
  coverImageUrl: string;
  introVideoUrl: string;
  registrationStartAt: string;
  registrationEndAt: string;
  tags: string[];
  venue: Venue;
  timeline: EventTimelineItem[];
  rules: string[];
  requirements: string[];
};

const categoryOptions = [
  { label: "Hackathon", value: "Hackathon" },
  { label: "Conference", value: "Conference" },
  { label: "Workshop", value: "Workshop" },
  { label: "Meetup", value: "Meetup" },
  { label: "Competition", value: "Competition" },
  { label: "Seminar", value: "Seminar" },
  { label: "Other", value: "Other" },
];

const visibilityOptions = [
  { label: "Public", value: "PUBLIC" },
  { label: "Private", value: "PRIVATE" },
  { label: "Unlisted", value: "UNLISTED" },
];

const statusOptions = [
  { label: "Draft", value: "DRAFT" },
  { label: "Registration Open", value: "REGISTRATION_OPEN" },
  { label: "Registration Closed", value: "REGISTRATION_CLOSED" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
];

const modeOptions = [
  { label: "Offline", value: "OFFLINE" },
  { label: "Online", value: "ONLINE" },
  { label: "Hybrid", value: "HYBRID" },
];

const toDateTimeLocal = (value?: string) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60 * 1000).toISOString().slice(0, 16);
};

const toISOString = (value?: string) => {
  if (!value) return undefined;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return undefined;

  return date.toISOString();
};

const getUploadUrl = (result: unknown) => {
  if (typeof result === "string") return result;

  if (!result || typeof result !== "object") return "";

  const data = result as Record<string, unknown>;

  if (typeof data.secure_url === "string") return data.secure_url;
  if (typeof data.url === "string") return data.url;

  if (data.data && typeof data.data === "object") {
    const nestedData = data.data as Record<string, unknown>;

    if (typeof nestedData.secure_url === "string") {
      return nestedData.secure_url;
    }

    if (typeof nestedData.url === "string") {
      return nestedData.url;
    }
  }

  return "";
};

const createForm = (event: EventResponse): EventForm => ({
  title: event.title || "",
  shortDescription: event.shortDescription || "",
  descriptionMarkdown: event.descriptionMarkdown || "",
  category: event.category || "",
  visibility: event.visibility || "PUBLIC",
  status: event.status || "DRAFT",
  redirectUrl: event.redirectUrl || "",
  coverImageUrl: event.coverImageUrl || "",
  introVideoUrl: event.introVideoUrl || "",
  registrationStartAt: toDateTimeLocal(event.registrationStartAt),
  registrationEndAt: toDateTimeLocal(event.registrationEndAt),
  tags: event.tags || [],
  venue: {
    mode: event.venue?.mode || "OFFLINE",
    venueName: event.venue?.venueName || "",
    address: event.venue?.address || "",
    city: event.venue?.city || "",
    state: event.venue?.state || "",
    country: event.venue?.country || "",
  },
  timeline: (event.timeline || []).map((item) => ({
    title: item.title || "",

    startAt: toDateTimeLocal(item.startAt),
    endAt: toDateTimeLocal(item.endAt),
  })),
  rules: event.rules || [],
  requirements: event.requirements || [],
});

const FieldLabel = ({ children }: { children: ReactNode }) => {
  return (
    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/45">
      {children}
    </p>
  );
};

const StatCard = ({ value, label, icon }: { value: number; label: string; icon: ReactNode }) => {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.07] p-5 sm:border-r sm:last:border-r-0 lg:p-5">
      <div>
        <p className="text-xl font-semibold text-white">{value}</p>
        <p className="mt-1 text-xs text-white/45">{label}</p>
      </div>

      <div className="text-white/35">{icon}</div>
    </div>
  );
};

const ViewSingleEventPage = () => {
  const { Slug = "" } = useParams<{ Slug: string }>();

  const { data, isLoading, isError } = usefetchEventDetaill(Slug);

  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent();

  const event = useMemo(() => {
    if (!data) return undefined;

    const response = data as {
      data?: EventResponse;
    };

    return response.data || (data as EventResponse);
  }, [data]);

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState<EventForm | null>(null);
  const [newTag, setNewTag] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  useEffect(() => {
    if (event) {
      setForm(createForm(event));
    }
  }, [event]);

  const eventStart = useMemo(() => {
    if (!event) return undefined;
    return getEventStartDate(event);
  }, [event]);

  const eventEnd = useMemo(() => {
    if (!event) return undefined;
    return getEventEndDate(event);
  }, [event]);

  const eventDate = formatDateRange(eventStart, eventEnd);

  const updateForm = <K extends keyof EventForm>(key: K, value: EventForm[K]) => {
    setForm((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        [key]: value,
      };
    });
  };

  const updateVenue = <K extends keyof Venue>(key: K, value: Venue[K]) => {
    setForm((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        venue: {
          ...previous.venue,
          [key]: value,
        },
      };
    });
  };

  const updateTimeline = (index: number, key: keyof EventTimelineItem, value: string) => {
    setForm((previous) => {
      if (!previous) return previous;

      const timeline = [...previous.timeline];

      timeline[index] = {
        ...timeline[index],
        [key]: value,
      };

      return {
        ...previous,
        timeline,
      };
    });
  };

  const addTimeline = () => {
    setForm((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        timeline: [
          ...previous.timeline,
          {
            title: "",
            description: "",
            startAt: "",
            endAt: "",
          },
        ],
      };
    });
  };

  const removeTimeline = (index: number) => {
    setForm((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        timeline: previous.timeline.filter((_, itemIndex) => itemIndex !== index),
      };
    });
  };

  const updateListItem = (key: "rules" | "requirements", index: number, value: string) => {
    setForm((previous) => {
      if (!previous) return previous;

      const items = [...previous[key]];
      items[index] = value;

      return {
        ...previous,
        [key]: items,
      };
    });
  };

  const addListItem = (key: "rules" | "requirements") => {
    setForm((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        [key]: [...previous[key], ""],
      };
    });
  };

  const removeListItem = (key: "rules" | "requirements", index: number) => {
    setForm((previous) => {
      if (!previous) return previous;

      return {
        ...previous,
        [key]: previous[key].filter((_, itemIndex) => itemIndex !== index),
      };
    });
  };

  const addTag = () => {
    if (!form) return;

    const tag = newTag.trim();

    if (!tag) return;

    const alreadyExists = form.tags.some((item) => item.toLowerCase() === tag.toLowerCase());

    if (alreadyExists) {
      setNewTag("");
      return;
    }

    updateForm("tags", [...form.tags, tag]);
    setNewTag("");
  };

  const removeTag = (tag: string) => {
    if (!form) return;

    updateForm(
      "tags",
      form.tags.filter((item) => item !== tag),
    );
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setIsUploadingImage(true);

      const result = await uploadImage(file);
      const url = getUploadUrl(result);

      if (url) {
        updateForm("coverImageUrl", url);
      }
    } catch {
      return;
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleVideoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setIsUploadingVideo(true);

      const result = await uploadVideo(file);
      const url = getUploadUrl(result);

      if (url) {
        updateForm("introVideoUrl", url);
      }
    } catch {
      return;
    } finally {
      setIsUploadingVideo(false);
      e.target.value = "";
    }
  };

  const handleCancel = () => {
    if (event) {
      setForm(createForm(event));
    }

    setNewTag("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!form || !Slug) return;

    const payload: Record<string, unknown> = {
      title: form.title.trim(),
      shortDescription: form.shortDescription.trim(),
      descriptionMarkdown: form.descriptionMarkdown,
      category: form.category,
      visibility: form.visibility,
      status: form.status,
      redirectUrl: form.redirectUrl.trim() || null,
      coverImageUrl: form.coverImageUrl || null,
      introVideoUrl: form.introVideoUrl || null,
      registrationStartAt: toISOString(form.registrationStartAt),
      registrationEndAt: toISOString(form.registrationEndAt),
      tags: form.tags.map((tag) => tag.trim()).filter(Boolean),
      venue: {
        mode: form.venue.mode,
        venueName: form.venue.venueName.trim(),
        address: form.venue.address.trim(),
        city: form.venue.city.trim(),
        state: form.venue.state.trim(),
        country: form.venue.country.trim(),
      },
      timeline: form.timeline
        .filter((item) => item.title.trim())
        .map((item) => ({
          ...(item.title ? { _id: item.title } : {}),
          title: item.title.trim(),
          startAt: toISOString(item.startAt),
          endAt: toISOString(item.endAt),
        })),
      rules: form.rules.map((item) => item.trim()).filter(Boolean),
      requirements: form.requirements.map((item) => item.trim()).filter(Boolean),
    };

    try {
      await updateEvent({
        Slug: Slug,
        payload,
      });

      setIsEditing(false);
    } catch {
      return;
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0d0f14] p-6">
        <div className="mx-auto max-w-[1500px] animate-pulse space-y-5">
          <div className="h-24 rounded-2xl bg-white/[0.04]" />
          <div className="h-[260px] rounded-2xl bg-white/[0.04]" />

          <div className="grid gap-5 xl:grid-cols-2">
            <div className="h-[600px] rounded-2xl bg-white/[0.04]" />
            <div className="h-[600px] rounded-2xl bg-white/[0.04]" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !event || !form) {
    return (
      <main className="flex min-h-screen items-center justify-center  p-6 text-white">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] px-8 py-10 text-center">
          <h2 className="text-lg font-semibold text-red-400">Failed to load event</h2>

          <p className="mt-2 text-sm text-white/40">
            Unable to fetch event details. Please try again.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0f14] pb-24 text-white">
      <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col justify-between gap-5 border-b border-white/[0.07] pb-6 lg:flex-row lg:items-center">
          <div>
            <Link
              to="/member/event"
              className="inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
            >
              <ArrowLeft size={15} />
              Back to Events
            </Link>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight">View Event</h1>

              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-400">
                {formatStatus(form.status)}
              </span>
            </div>

            <p className="mt-2 text-sm text-white/40">
              Manage event information, schedule, media and settings.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!isEditing && form.redirectUrl && (
              <a
                href={form.redirectUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
              >
                Event Website
                <ExternalLink size={15} />
              </a>
            )}

            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  size="md"
                  type="button"
                  onClick={handleCancel}
                  disabled={isUpdating}
                >
                  <X size={16} />
                  Cancel
                </Button>

                <Button size="md" type="button" onClick={handleSave} disabled={isUpdating}>
                  <Save size={16} />
                  {isUpdating ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button size="md" type="button" onClick={() => setIsEditing(true)}>
                <Pencil size={16} />
                Edit Event
              </Button>
            )}
          </div>
        </header>

        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#15181f] shadow-2xl shadow-black/20">
          <div className="grid gap-6 p-5 lg:grid-cols-[290px_minmax(0,1fr)_420px] lg:p-6">
            <div className="relative min-h-[220px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0f1116]">
              {form.coverImageUrl ? (
                <img
                  src={form.coverImageUrl}
                  alt={form.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[220px] items-center justify-center">
                  <ImageIcon size={42} className="text-white/15" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {isEditing && (
                <label className="absolute bottom-4 left-4 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/15 bg-black/50 px-4 py-2.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/70">
                  <Upload size={14} />
                  {isUploadingImage ? "Uploading..." : "Change Image"}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isUploadingImage}
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>

            <div className="flex min-w-0 flex-col justify-center">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-emerald-500/[0.1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                  {formatStatus(form.status)}
                </span>

                <span className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/45">
                  {form.category}
                </span>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white xl:text-4xl">
                {form.title || "Untitled Event"}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">
                {form.shortDescription || "No event description available."}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-white/55">
                <span className="flex items-center gap-2">
                  <CalendarDays size={15} className="text-emerald-400" />
                  {eventDate}
                </span>

                <span className="flex items-center gap-2">
                  <Clock3 size={15} className="text-amber-400" />
                  {formatTime(eventStart)} – {formatTime(eventEnd)}
                </span>

                <span className="flex items-center gap-2">
                  <MapPin size={15} className="text-red-400" />
                  {form.venue.city || "Location TBA"}
                </span>

                <span className="flex items-center gap-2">
                  <Globe size={15} className="text-blue-400" />
                  {formatStatus(form.venue.mode)}
                </span>
              </div>

              {form.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {form.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] text-white/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="grid overflow-hidden rounded-xl border border-white/[0.08] sm:grid-cols-2">
              <StatCard
                value={event.mentors?.length || 0}
                label="Mentors"
                icon={<Users size={18} />}
              />

              <StatCard
                value={event.judges?.length || 0}
                label="Judges"
                icon={<ShieldCheck size={18} />}
              />

              <StatCard
                value={event.partners?.length || 0}
                label="Partners"
                icon={<CheckCircle2 size={18} />}
              />

              <StatCard
                value={event.sponsors?.length || 0}
                label="Sponsors"
                icon={<Users size={18} />}
              />

              <StatCard
                value={event.tickets?.length || 0}
                label="Ticket Types"
                icon={<Users size={18} />}
              />

              <StatCard
                value={form.timeline.length}
                label="Timeline"
                icon={<CalendarDays size={18} />}
              />
            </div>
          </div>
        </section>

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1.05fr]">
          <div className="space-y-5">
            <Section
              title="Event Description"
              icon={<FileText size={17} className="text-emerald-400" />}
            >
              <div className="grid gap-5 lg:grid-cols-2">
                <div>
                  <FieldLabel>Event Title</FieldLabel>

                  {isEditing ? (
                    <Input
                      value={form.title}
                      label=""
                      placeholder="Enter event title"
                      onChange={(value) => updateForm("title", value)}
                    />
                  ) : (
                    <p className="text-sm text-white/80">{form.title}</p>
                  )}
                </div>

                <div>
                  <FieldLabel>Category</FieldLabel>

                  {isEditing ? (
                    <DropDown
                      label=""
                      value={form.category}
                      options={categoryOptions}
                      onChange={(value) => updateForm("category", value)}
                    />
                  ) : (
                    <p className="text-sm text-white/80">{form.category}</p>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <FieldLabel>Short Description</FieldLabel>

                {isEditing ? (
                  <Input
                    value={form.shortDescription}
                    label=""
                    placeholder="Write a short event description"
                    onChange={(value) => updateForm("shortDescription", value)}
                  />
                ) : (
                  <p className="text-sm leading-6 text-white/60">
                    {form.shortDescription || "No short description provided."}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <FieldLabel>Full Description</FieldLabel>

                {isEditing ? (
                  <textarea
                    value={form.descriptionMarkdown}
                    onChange={(e) => updateForm("descriptionMarkdown", e.target.value)}
                    placeholder="Write the complete event description"
                    className="min-h-[220px] w-full resize-y rounded-xl border border-white/10 bg-[#111111]/80 px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-[#4285F4]"
                  />
                ) : (
                  <div className="min-h-[160px] whitespace-pre-wrap rounded-xl border border-white/[0.06] bg-black/[0.08] p-4 text-sm leading-7 text-white/60">
                    {form.descriptionMarkdown || "No detailed description provided."}
                  </div>
                )}
              </div>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <FieldLabel>Event Tags</FieldLabel>

                  <span className="text-[11px] text-white/30">{form.tags.length} tags</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/[0.08] px-3 py-2 text-xs text-blue-400"
                    >
                      {tag}

                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="transition hover:text-red-400"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </span>
                  ))}

                  {isEditing && (
                    <div className="flex items-center gap-2">
                      <input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                        placeholder="Add tag"
                        className="h-9 w-28 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-xs text-white outline-none placeholder:text-white/25 focus:border-blue-500/50"
                      />

                      <button
                        type="button"
                        onClick={addTag}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/60 transition hover:border-blue-500/40 hover:text-blue-400"
                      >
                        <Plus size={15} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Section>

            <Section
              title="Event Details"
              icon={<CalendarDays size={17} className="text-emerald-400" />}
            >
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <FieldLabel>Registration Start</FieldLabel>

                  {isEditing ? (
                    <input
                      type="datetime-local"
                      value={form.registrationStartAt}
                      onChange={(e) => updateForm("registrationStartAt", e.target.value)}
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#111111] px-4 text-sm text-white outline-none focus:border-[#4285F4]"
                    />
                  ) : (
                    <p className="text-sm text-white/70">{formatDate(event.registrationStartAt)}</p>
                  )}
                </div>

                <div>
                  <FieldLabel>Registration End</FieldLabel>

                  {isEditing ? (
                    <input
                      type="datetime-local"
                      value={form.registrationEndAt}
                      onChange={(e) => updateForm("registrationEndAt", e.target.value)}
                      className="h-12 w-full rounded-xl border border-white/10 bg-[#111111] px-4 text-sm text-white outline-none focus:border-[#4285F4]"
                    />
                  ) : (
                    <p className="text-sm text-white/70">{formatDate(event.registrationEndAt)}</p>
                  )}
                </div>

                <div>
                  <FieldLabel>Visibility</FieldLabel>

                  {isEditing ? (
                    <DropDown
                      value={form.visibility}
                      options={visibilityOptions}
                      onChange={(value) => updateForm("visibility", value)}
                    />
                  ) : (
                    <p className="text-sm text-white/70">{formatStatus(form.visibility)}</p>
                  )}
                </div>

                <div>
                  <FieldLabel>Status</FieldLabel>

                  {isEditing ? (
                    <DropDown
                      value={form.status}
                      options={statusOptions}
                      onChange={(value) => updateForm("status", value)}
                    />
                  ) : (
                    <p className="text-sm text-white/70">{formatStatus(form.status)}</p>
                  )}
                </div>

                <div>
                  <FieldLabel>Venue Name</FieldLabel>

                  {isEditing ? (
                    <Input
                      value={form.venue.venueName}
                      label=""
                      placeholder="Enter venue name"
                      onChange={(value) => updateVenue("venueName", value)}
                    />
                  ) : (
                    <p className="text-sm text-white/70">
                      {form.venue.venueName || "Not specified"}
                    </p>
                  )}
                </div>

                <div>
                  <FieldLabel>Event Mode</FieldLabel>

                  {isEditing ? (
                    <DropDown
                      value={form.venue.mode}
                      options={modeOptions}
                      onChange={(value) => updateVenue("mode", value)}
                    />
                  ) : (
                    <p className="text-sm text-white/70">{formatStatus(form.venue.mode)}</p>
                  )}
                </div>

                <div>
                  <FieldLabel>Address</FieldLabel>

                  {isEditing ? (
                    <Input
                      value={form.venue.address}
                      label=""
                      placeholder="Enter address"
                      onChange={(value) => updateVenue("address", value)}
                    />
                  ) : (
                    <p className="text-sm text-white/70">{form.venue.address || "Not specified"}</p>
                  )}
                </div>

                <div>
                  <FieldLabel>City</FieldLabel>

                  {isEditing ? (
                    <Input
                      value={form.venue.city}
                      label=""
                      placeholder="Enter city"
                      onChange={(value) => updateVenue("city", value)}
                    />
                  ) : (
                    <p className="text-sm text-white/70">{form.venue.city || "Not specified"}</p>
                  )}
                </div>

                <div>
                  <FieldLabel>State</FieldLabel>

                  {isEditing ? (
                    <Input
                      value={form.venue.state}
                      label=""
                      placeholder="Enter state"
                      onChange={(value) => updateVenue("state", value)}
                    />
                  ) : (
                    <p className="text-sm text-white/70">{form.venue.state || "Not specified"}</p>
                  )}
                </div>

                <div>
                  <FieldLabel>Country</FieldLabel>

                  {isEditing ? (
                    <Input
                      value={form.venue.country}
                      label=""
                      placeholder="Enter country"
                      onChange={(value) => updateVenue("country", value)}
                    />
                  ) : (
                    <p className="text-sm text-white/70">{form.venue.country || "Not specified"}</p>
                  )}
                </div>
              </div>

              <div className="mt-7 grid gap-5 border-t border-white/[0.07] pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/30">Event ID</p>

                  <p className="mt-2 break-all text-sm text-white/60">{event._id}</p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/30">Last Updated</p>

                  <p className="mt-2 text-sm text-white/60">{formatDate(event.updatedAt)}</p>
                </div>
              </div>
            </Section>

            <Section
              title="Event Timeline"
              icon={<Clock3 size={17} className="text-emerald-400" />}
              action={
                isEditing ? (
                  <button
                    type="button"
                    onClick={addTimeline}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
                  >
                    <Plus size={15} />
                    Add Timeline
                  </button>
                ) : undefined
              }
            >
              <div className="space-y-3">
                {form.timeline.length === 0 && (
                  <div className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-white/30">
                    No timeline added
                  </div>
                )}

                {form.timeline.map((item, index) => (
                  <div
                    key={`timeline-${index}`}
                    className="rounded-xl border border-white/[0.07] bg-black/[0.1] p-4"
                  >
                    {isEditing ? (
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <input
                            value={item.title}
                            onChange={(e) => updateTimeline(index, "title", e.target.value)}
                            placeholder="Timeline title"
                            className="h-11 min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white outline-none focus:border-[#4285F4]"
                          />

                          <button
                            type="button"
                            onClick={() => removeTimeline(index)}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-500/15 bg-red-500/[0.04] text-red-400 transition hover:bg-red-500/[0.1]"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <input
                            type="datetime-local"
                            value={item.startAt}
                            onChange={(e) => updateTimeline(index, "startAt", e.target.value)}
                            className="h-10 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-xs text-white outline-none"
                          />

                          <input
                            type="datetime-local"
                            value={item.endAt}
                            onChange={(e) => updateTimeline(index, "endAt", e.target.value)}
                            className="h-10 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-xs text-white outline-none"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.6)]" />

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white/80">
                              {item.title}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-xs text-white/60">
                            {formatDate(item.startAt ? toISOString(item.startAt) : undefined)}
                          </p>

                          <p className="mt-1 text-[11px] text-white/35">
                            {formatTime(item.startAt ? toISOString(item.startAt) : undefined)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Media & Links" icon={<Link2 size={17} className="text-emerald-400" />}>
              <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
                <div>
                  <FieldLabel>Cover Image</FieldLabel>

                  <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-black/[0.12]">
                    <div className="aspect-video">
                      {form.coverImageUrl ? (
                        <img
                          src={form.coverImageUrl}
                          alt={form.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white/20">
                          <ImageIcon size={28} />
                        </div>
                      )}
                    </div>

                    {isEditing && (
                      <label className="flex cursor-pointer items-center justify-center gap-2 border-t border-white/[0.08] px-4 py-3 text-xs text-white/60 transition hover:bg-white/[0.03] hover:text-white">
                        <Upload size={14} />
                        {isUploadingImage ? "Uploading..." : "Upload Image"}

                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={isUploadingImage}
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <FieldLabel>Intro Video</FieldLabel>

                    {isEditing ? (
                      <div className="flex gap-2">
                        <div className="min-w-0 flex-1">
                          <Input
                            value={form.introVideoUrl}
                            label=""
                            placeholder="Video URL"
                            onChange={(value) => updateForm("introVideoUrl", value)}
                          />
                        </div>

                        <label className="flex h-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/10 px-4 text-white/60 transition hover:text-white">
                          <Video size={17} />

                          <input
                            type="file"
                            accept="video/*"
                            className="hidden"
                            disabled={isUploadingVideo}
                            onChange={handleVideoUpload}
                          />
                        </label>
                      </div>
                    ) : form.introVideoUrl ? (
                      <a
                        href={form.introVideoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-sm text-white/60 transition hover:text-white"
                      >
                        <span className="truncate">{form.introVideoUrl}</span>

                        <ExternalLink size={15} />
                      </a>
                    ) : (
                      <p className="text-sm text-white/35">No video added</p>
                    )}
                  </div>

                  <div>
                    <FieldLabel>Event Website</FieldLabel>

                    {isEditing ? (
                      <Input
                        value={form.redirectUrl}
                        label=""
                        placeholder="https://example.com"
                        onChange={(value) => updateForm("redirectUrl", value)}
                      />
                    ) : form.redirectUrl ? (
                      <a
                        href={form.redirectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-sm text-white/60 transition hover:text-white"
                      >
                        <span className="truncate">{form.redirectUrl}</span>

                        <ExternalLink size={15} />
                      </a>
                    ) : (
                      <p className="text-sm text-white/35">No website added</p>
                    )}
                  </div>

                  {isUploadingVideo && <p className="text-xs text-blue-400">Uploading video...</p>}
                </div>
              </div>
            </Section>
          </div>

          <div className="space-y-5">
            <Section
              title="Rules"
              icon={<ShieldCheck size={17} className="text-amber-400" />}
              action={
                isEditing ? (
                  <button
                    type="button"
                    onClick={() => addListItem("rules")}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
                  >
                    <Plus size={15} />
                    Add Rule
                  </button>
                ) : undefined
              }
            >
              <div className="space-y-2">
                {form.rules.length === 0 && (
                  <p className="py-4 text-center text-sm text-white/30">No rules added</p>
                )}

                {form.rules.map((rule, index) => (
                  <div key={`rule-${index}`} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-500/[0.12] text-xs font-semibold text-emerald-400">
                      {index + 1}
                    </span>

                    {isEditing ? (
                      <>
                        <input
                          value={rule}
                          onChange={(e) => updateListItem("rules", index, e.target.value)}
                          placeholder="Enter rule"
                          className="h-11 min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white outline-none focus:border-[#4285F4]"
                        />

                        <button
                          type="button"
                          onClick={() => removeListItem("rules", index)}
                          className="text-red-400/70 transition hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="min-w-0 flex-1 rounded-lg border border-white/[0.06] bg-black/[0.08] px-4 py-3 text-sm text-white/60">
                        {rule}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>

            <Section
              title="Requirements"
              icon={<FileText size={17} className="text-blue-400" />}
              action={
                isEditing ? (
                  <button
                    type="button"
                    onClick={() => addListItem("requirements")}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 transition hover:text-emerald-300"
                  >
                    <Plus size={15} />
                    Add Requirement
                  </button>
                ) : undefined
              }
            >
              <div className="space-y-2">
                {form.requirements.length === 0 && (
                  <p className="py-4 text-center text-sm text-white/30">No requirements added</p>
                )}

                {form.requirements.map((requirement, index) => (
                  <div key={`requirement-${index}`} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-blue-500/[0.12] text-xs font-semibold text-blue-400">
                      {index + 1}
                    </span>

                    {isEditing ? (
                      <>
                        <input
                          value={requirement}
                          onChange={(e) => updateListItem("requirements", index, e.target.value)}
                          placeholder="Enter requirement"
                          className="h-11 min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 text-sm text-white outline-none focus:border-[#4285F4]"
                        />

                        <button
                          type="button"
                          onClick={() => removeListItem("requirements", index)}
                          className="text-red-400/70 transition hover:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="min-w-0 flex-1 rounded-lg border border-white/[0.06] bg-black/[0.08] px-4 py-3 text-sm text-white/60">
                        {requirement}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>

        {isEditing && (
          <div className="sticky bottom-5 z-30 mt-6 flex justify-end">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#161920]/95 p-3 shadow-2xl backdrop-blur-xl">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                Cancel
              </Button>

              <Button size="sm" type="button" onClick={handleSave} disabled={isUpdating}>
                <Save size={15} />
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ViewSingleEventPage;
