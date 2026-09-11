import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
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

type TimelineFormItem = EventTimelineItem & {
  _id?: string;
  description?: string;
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
  timeline: TimelineFormItem[];
  rules: string[];
  requirements: string[];
};

type TabId = "overview" | "details" | "schedule" | "media" | "rules";

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
  {
    label: "Registration Open",
    value: "REGISTRATION_OPEN",
  },
  {
    label: "Registration Closed",
    value: "REGISTRATION_CLOSED",
  },
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

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset = date.getTimezoneOffset();

  return new Date(date.getTime() - offset * 60 * 1000).toISOString().slice(0, 16);
};

const toISOString = (value?: string) => {
  if (!value) return undefined;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
};

const getUploadUrl = (result: unknown) => {
  if (typeof result === "string") {
    return result;
  }

  if (!result || typeof result !== "object") {
    return "";
  }

  const data = result as Record<string, unknown>;

  if (typeof data.secure_url === "string") {
    return data.secure_url;
  }

  if (typeof data.url === "string") {
    return data.url;
  }

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
    ...(item.title ? { title: item.title } : {}),
    title: item.title || "",
    description: "description" in item ? String(item.description || "") : "",
    startAt: toDateTimeLocal(item.startAt),
    endAt: toDateTimeLocal(item.endAt),
  })),
  rules: event.rules || [],
  requirements: event.requirements || [],
});

const FieldLabel = ({ children, required }: { children: ReactNode; required?: boolean }) => (
  <div className="mb-2 flex items-center gap-1.5">
    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">{children}</p>

    {required && <span className="text-xs text-emerald-400">*</span>}
  </div>
);

const EmptyState = ({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => (
  <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] px-6 text-center">
    <div className="mb-4 text-white/20">{icon}</div>

    <p className="text-sm font-medium text-white/60">{title}</p>

    <p className="mt-1 max-w-sm text-xs leading-5 text-white/30">{description}</p>
  </div>
);

const StatCard = ({ value, label, icon }: { value: number; label: string; icon: ReactNode }) => (
  <div className="group relative overflow-hidden px-4 py-5 sm:px-5">
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />

    <div className="flex items-center justify-between">
      <div>
        <p className="text-2xl font-semibold tracking-tight text-white">{value}</p>

        <p className="mt-1 text-[11px] text-white/35">{label}</p>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-2.5 text-white/30 transition group-hover:border-emerald-500/20 group-hover:text-emerald-400">
        {icon}
      </div>
    </div>
  </div>
);

const SectionCard = ({
  title,
  description,
  icon,
  action,
  children,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
}) => (
  <section className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#14171d]">
    <div className="flex flex-col gap-4 border-b border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] text-emerald-400">
            {icon}
          </div>
        )}

        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>

          {description && <p className="mt-0.5 text-xs text-white/35">{description}</p>}
        </div>
      </div>

      {action}
    </div>

    <div className="p-5 sm:p-6">{children}</div>
  </section>
);

const ViewSingleEventPage = () => {
  const { Slug = "" } = useParams<{ Slug: string }>();

  const { data, isLoading, isError } = usefetchEventDetaill(Slug);

  const { mutateAsync: updateEvent, isPending: isUpdating } = useUpdateEvent();

  const [isEditing, setIsEditing] = useState(false);

  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const [form, setForm] = useState<EventForm | null>(null);

  const [initialForm, setInitialForm] = useState<EventForm | null>(null);

  const [newTag, setNewTag] = useState("");

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [isUploadingVideo, setIsUploadingVideo] = useState(false);

  const topRef = useRef<HTMLDivElement>(null);

  const [prevEventId, setPrevEventId] = useState<string | null>(null);

  const event = useMemo(() => {
    if (!data) {
      return undefined;
    }

    const response = data as {
      data?: EventResponse;
    };

    return response.data || (data as EventResponse);
  }, [data]);

  if (event && event._id !== prevEventId) {
    const nextForm = createForm(event);
    setForm(nextForm);
    setInitialForm(nextForm);
    setPrevEventId(event._id ?? null);
  }

  const eventStart = useMemo(() => (event ? getEventStartDate(event) : undefined), [event]);

  const eventEnd = useMemo(() => (event ? getEventEndDate(event) : undefined), [event]);

  const eventDate = useMemo(() => formatDateRange(eventStart, eventEnd), [eventStart, eventEnd]);

  const hasChanges = useMemo(() => {
    if (!form || !initialForm) {
      return false;
    }

    return JSON.stringify(form) !== JSON.stringify(initialForm);
  }, [form, initialForm]);

  const stats = useMemo(() => {
    if (!event || !form) {
      return [];
    }

    return [
      {
        value: event.mentors?.length || 0,
        label: "Mentors",
        icon: <Users size={17} />,
      },
      {
        value: event.judges?.length || 0,
        label: "Judges",
        icon: <ShieldCheck size={17} />,
      },
      {
        value: event.partners?.length || 0,
        label: "Partners",
        icon: <CheckCircle2 size={17} />,
      },
      {
        value: event.sponsors?.length || 0,
        label: "Sponsors",
        icon: <Users size={17} />,
      },
      {
        value: event.tickets?.length || 0,
        label: "Tickets",
        icon: <FileText size={17} />,
      },
      {
        value: form.timeline.length,
        label: "Schedule",
        icon: <CalendarDays size={17} />,
      },
    ];
  }, [event, form]);

  const tabs = useMemo(
    () => [
      {
        id: "overview" as TabId,
        label: "Overview",
        icon: <FileText size={16} />,
      },
      {
        id: "details" as TabId,
        label: "Details",
        icon: <MapPin size={16} />,
      },
      {
        id: "schedule" as TabId,
        label: "Schedule",
        icon: <Clock3 size={16} />,
      },
      {
        id: "media" as TabId,
        label: "Media",
        icon: <Video size={16} />,
      },
      {
        id: "rules" as TabId,
        label: "Rules",
        icon: <ShieldCheck size={16} />,
      },
    ],
    [],
  );

  const updateForm = useCallback(<K extends keyof EventForm>(key: K, value: EventForm[K]) => {
    setForm((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        [key]: value,
      };
    });
  }, []);

  const updateVenue = useCallback(<K extends keyof Venue>(key: K, value: Venue[K]) => {
    setForm((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        venue: {
          ...previous.venue,
          [key]: value,
        },
      };
    });
  }, []);

  const updateTimeline = useCallback(
    (index: number, key: keyof TimelineFormItem, value: string) => {
      setForm((previous) => {
        if (!previous) {
          return previous;
        }

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
    },
    [],
  );

  const addTimeline = useCallback(() => {
    setForm((previous) => {
      if (!previous) {
        return previous;
      }

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
  }, []);

  const removeTimeline = useCallback((index: number) => {
    setForm((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        timeline: previous.timeline.filter((_, itemIndex) => itemIndex !== index),
      };
    });
  }, []);

  const updateListItem = useCallback(
    (key: "rules" | "requirements", index: number, value: string) => {
      setForm((previous) => {
        if (!previous) {
          return previous;
        }

        const items = [...previous[key]];
        items[index] = value;

        return {
          ...previous,
          [key]: items,
        };
      });
    },
    [],
  );

  const addListItem = useCallback((key: "rules" | "requirements") => {
    setForm((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        [key]: [...previous[key], ""],
      };
    });
  }, []);

  const removeListItem = useCallback((key: "rules" | "requirements", index: number) => {
    setForm((previous) => {
      if (!previous) {
        return previous;
      }

      return {
        ...previous,
        [key]: previous[key].filter((_, itemIndex) => itemIndex !== index),
      };
    });
  }, []);

  const addTag = useCallback(() => {
    if (!form) {
      return;
    }

    const tag = newTag.trim();

    if (!tag) {
      return;
    }

    const exists = form.tags.some((item) => item.toLowerCase() === tag.toLowerCase());

    if (exists) {
      setNewTag("");
      return;
    }

    updateForm("tags", [...form.tags, tag]);

    setNewTag("");
  }, [form, newTag, updateForm]);

  const removeTag = useCallback(
    (tag: string) => {
      if (!form) {
        return;
      }

      updateForm(
        "tags",
        form.tags.filter((item) => item !== tag),
      );
    },
    [form, updateForm],
  );

  const handleImageUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      try {
        setIsUploadingImage(true);

        const result = await uploadImage(file);

        const url = getUploadUrl(result);

        if (url) {
          updateForm("coverImageUrl", url);
        }
      } finally {
        setIsUploadingImage(false);
        event.target.value = "";
      }
    },
    [updateForm],
  );

  const handleVideoUpload = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) {
        return;
      }

      try {
        setIsUploadingVideo(true);

        const result = await uploadVideo(file);

        const url = getUploadUrl(result);

        if (url) {
          updateForm("introVideoUrl", url);
        }
      } finally {
        setIsUploadingVideo(false);
        event.target.value = "";
      }
    },
    [updateForm],
  );

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleCancel = useCallback(() => {
    if (initialForm) {
      setForm(initialForm);
    }

    setNewTag("");
    setIsEditing(false);
  }, [initialForm]);

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);

    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

  const handleSave = useCallback(async () => {
    if (!form || !Slug) {
      return;
    }

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
          ...(item._id ? { _id: item._id } : {}),
          title: item.title.trim(),
          ...(item.description?.trim()
            ? {
                description: item.description.trim(),
              }
            : {}),
          startAt: toISOString(item.startAt),
          endAt: toISOString(item.endAt),
        })),
      rules: form.rules.map((item) => item.trim()).filter(Boolean),
      requirements: form.requirements.map((item) => item.trim()).filter(Boolean),
    };

    try {
      await updateEvent({
        Slug,
        payload,
      });

      const savedForm = {
        ...form,
      };

      setInitialForm(savedForm);
      setForm(savedForm);
      setIsEditing(false);
    } catch {
      return;
    }
  }, [Slug, form, updateEvent]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0b0d11] p-4 text-white sm:p-6">
        <div className="mx-auto max-w-[1500px] animate-pulse space-y-5">
          <div className="h-16 rounded-2xl bg-white/[0.04]" />

          <div className="h-[380px] rounded-3xl bg-white/[0.04]" />

          <div className="h-14 rounded-xl bg-white/[0.04]" />

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="h-[500px] rounded-2xl bg-white/[0.04]" />
            <div className="h-[500px] rounded-2xl bg-white/[0.04]" />
          </div>
        </div>
      </main>
    );
  }

  if (isError || !event || !form) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0d11] p-6 text-white">
        <div className="max-w-md rounded-3xl border border-red-500/15 bg-red-500/[0.03] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/[0.08] text-red-400">
            <X size={24} />
          </div>

          <h2 className="mt-5 text-lg font-semibold">Unable to load event</h2>

          <p className="mt-2 text-sm leading-6 text-white/40">
            Event details could not be loaded. Please try again.
          </p>

          <Link
            to="/member/event"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/[0.04]"
          >
            <ArrowLeft size={15} />
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  const renderOverview = () => (
    <div className="space-y-5">
      <SectionCard
        title="Event Overview"
        description="Core information visible to attendees"
        icon={<FileText size={17} />}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <div>
            <FieldLabel required>Event Title</FieldLabel>

            {isEditing ? (
              <Input
                value={form.title}
                label=""
                placeholder="Enter event title"
                onChange={(value) => updateForm("title", value)}
              />
            ) : (
              <p className="text-sm text-white/75">{form.title || "No title provided"}</p>
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
              <p className="text-sm text-white/75">{form.category || "Not specified"}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <FieldLabel>Short Description</FieldLabel>

          {isEditing ? (
            <Input
              value={form.shortDescription}
              label=""
              placeholder="A short summary of your event"
              onChange={(value) => updateForm("shortDescription", value)}
            />
          ) : (
            <p className="max-w-4xl text-sm leading-7 text-white/55">
              {form.shortDescription || "No short description provided."}
            </p>
          )}
        </div>

        <div className="mt-6">
          <FieldLabel>Full Description</FieldLabel>

          {isEditing ? (
            <textarea
              value={form.descriptionMarkdown}
              onChange={(event) => updateForm("descriptionMarkdown", event.target.value)}
              placeholder="Write the complete event description..."
              className="min-h-[260px] w-full resize-y rounded-xl border border-white/[0.08] bg-[#0f1116] px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/[0.04]"
            />
          ) : (
            <div className="min-h-[180px] whitespace-pre-wrap rounded-xl border border-white/[0.06] bg-black/[0.12] p-5 text-sm leading-7 text-white/55">
              {form.descriptionMarkdown || "No detailed description provided."}
            </div>
          )}
        </div>
      </SectionCard>

      <SectionCard
        title="Tags"
        description="Help attendees discover and understand the event"
        icon={<Link2 size={17} />}
      >
        <div className="flex flex-wrap gap-2">
          {form.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/15 bg-emerald-500/[0.06] px-3 py-2 text-xs text-emerald-300"
            >
              {tag}

              {isEditing && (
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="rounded text-emerald-300/60 transition hover:text-red-400"
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
                onChange={(event) => setNewTag(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add tag"
                className="h-9 w-32 rounded-lg border border-white/[0.08] bg-[#0f1116] px-3 text-xs text-white outline-none placeholder:text-white/25 focus:border-emerald-500/40"
              />

              <button
                type="button"
                onClick={addTag}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-white/50 transition hover:border-emerald-500/30 hover:text-emerald-400"
              >
                <Plus size={15} />
              </button>
            </div>
          )}
        </div>

        {form.tags.length === 0 && !isEditing && (
          <EmptyState
            icon={<Link2 size={26} />}
            title="No tags added"
            description="Tags help categorize and improve event discovery."
          />
        )}
      </SectionCard>
    </div>
  );

  const renderDetails = () => (
    <div className="space-y-5">
      <SectionCard
        title="Event Settings"
        description="Control event visibility and registration"
        icon={<Globe size={17} />}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel>Registration Start</FieldLabel>

            {isEditing ? (
              <input
                type="datetime-local"
                value={form.registrationStartAt}
                onChange={(event) => updateForm("registrationStartAt", event.target.value)}
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#0f1116] px-4 text-sm text-white outline-none focus:border-emerald-500/40"
              />
            ) : (
              <p className="text-sm text-white/65">{formatDate(event.registrationStartAt)}</p>
            )}
          </div>

          <div>
            <FieldLabel>Registration End</FieldLabel>

            {isEditing ? (
              <input
                type="datetime-local"
                value={form.registrationEndAt}
                onChange={(event) => updateForm("registrationEndAt", event.target.value)}
                className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#0f1116] px-4 text-sm text-white outline-none focus:border-emerald-500/40"
              />
            ) : (
              <p className="text-sm text-white/65">{formatDate(event.registrationEndAt)}</p>
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
              <p className="text-sm text-white/65">{formatStatus(form.visibility)}</p>
            )}
          </div>

          <div>
            <FieldLabel>Event Status</FieldLabel>

            {isEditing ? (
              <DropDown
                value={form.status}
                options={statusOptions}
                onChange={(value) => updateForm("status", value)}
              />
            ) : (
              <p className="text-sm text-white/65">{formatStatus(form.status)}</p>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Venue & Location"
        description="Where and how the event takes place"
        icon={<MapPin size={17} />}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <FieldLabel>Event Mode</FieldLabel>

            {isEditing ? (
              <DropDown
                value={form.venue.mode}
                options={modeOptions}
                onChange={(value) => updateVenue("mode", value)}
              />
            ) : (
              <p className="text-sm text-white/65">{formatStatus(form.venue.mode)}</p>
            )}
          </div>

          <div>
            <FieldLabel>Venue Name</FieldLabel>

            {isEditing ? (
              <Input
                value={form.venue.venueName}
                label=""
                placeholder="Venue name"
                onChange={(value) => updateVenue("venueName", value)}
              />
            ) : (
              <p className="text-sm text-white/65">{form.venue.venueName || "Not specified"}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <FieldLabel>Address</FieldLabel>

            {isEditing ? (
              <Input
                value={form.venue.address}
                label=""
                placeholder="Full address"
                onChange={(value) => updateVenue("address", value)}
              />
            ) : (
              <p className="text-sm text-white/65">{form.venue.address || "Not specified"}</p>
            )}
          </div>

          <div>
            <FieldLabel>City</FieldLabel>

            {isEditing ? (
              <Input
                value={form.venue.city}
                label=""
                placeholder="City"
                onChange={(value) => updateVenue("city", value)}
              />
            ) : (
              <p className="text-sm text-white/65">{form.venue.city || "Not specified"}</p>
            )}
          </div>

          <div>
            <FieldLabel>State</FieldLabel>

            {isEditing ? (
              <Input
                value={form.venue.state}
                label=""
                placeholder="State"
                onChange={(value) => updateVenue("state", value)}
              />
            ) : (
              <p className="text-sm text-white/65">{form.venue.state || "Not specified"}</p>
            )}
          </div>

          <div>
            <FieldLabel>Country</FieldLabel>

            {isEditing ? (
              <Input
                value={form.venue.country}
                label=""
                placeholder="Country"
                onChange={(value) => updateVenue("country", value)}
              />
            ) : (
              <p className="text-sm text-white/65">{form.venue.country || "Not specified"}</p>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-5 border-t border-white/[0.06] pt-6 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">
              Event ID
            </p>

            <p className="mt-2 break-all text-xs text-white/45">{event._id}</p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">
              Last Updated
            </p>

            <p className="mt-2 text-sm text-white/45">{formatDate(event.updatedAt)}</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );

  const renderSchedule = () => (
    <SectionCard
      title="Event Schedule"
      description="Plan and manage the event timeline"
      icon={<Clock3 size={17} />}
      action={
        isEditing ? (
          <button
            type="button"
            onClick={addTimeline}
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/[0.12]"
          >
            <Plus size={14} />
            Add Schedule
          </button>
        ) : undefined
      }
    >
      {form.timeline.length === 0 ? (
        <EmptyState
          icon={<CalendarDays size={30} />}
          title="No schedule created"
          description="Add timeline items to help attendees understand the event flow."
        />
      ) : (
        <div className="relative space-y-3 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-px before:bg-white/[0.06]">
          {form.timeline.map((item, index) => (
            <div key={item._id || `timeline-${index}`} className="relative pl-11">
              <span className="absolute left-3.5 top-6 z-10 h-3 w-3 rounded-full border-2 border-[#14171d] bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.35)]" />

              <div className="rounded-xl border border-white/[0.07] bg-[#0f1116] p-4 transition hover:border-white/[0.1]">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <input
                        value={item.title}
                        onChange={(event) => updateTimeline(index, "title", event.target.value)}
                        placeholder="Schedule title"
                        className="h-11 min-w-0 flex-1 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-emerald-500/40"
                      />

                      <button
                        type="button"
                        onClick={() => removeTimeline(index)}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-500/15 text-red-400/70 transition hover:bg-red-500/[0.08] hover:text-red-400"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <FieldLabel>Start Time</FieldLabel>

                        <input
                          type="datetime-local"
                          value={item.startAt}
                          onChange={(event) => updateTimeline(index, "startAt", event.target.value)}
                          className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 text-xs text-white outline-none focus:border-emerald-500/40"
                        />
                      </div>

                      <div>
                        <FieldLabel>End Time</FieldLabel>

                        <input
                          type="datetime-local"
                          value={item.endAt}
                          onChange={(event) => updateTimeline(index, "endAt", event.target.value)}
                          className="h-11 w-full rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 text-xs text-white outline-none focus:border-emerald-500/40"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-white/80">{item.title}</p>

                      {item.description && (
                        <p className="mt-1 text-xs text-white/35">{item.description}</p>
                      )}
                    </div>

                    <div className="shrink-0 text-left sm:text-right">
                      <p className="text-xs text-white/60">
                        {formatDate(item.startAt ? toISOString(item.startAt) : undefined)}
                      </p>

                      <p className="mt-1 text-[11px] text-emerald-400/70">
                        {formatTime(item.startAt ? toISOString(item.startAt) : undefined)}
                        {item.endAt && ` – ${formatTime(toISOString(item.endAt))}`}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );

  const renderMedia = () => (
    <div className="space-y-5">
      <SectionCard
        title="Cover Image"
        description="The primary visual identity of your event"
        icon={<ImageIcon size={17} />}
      >
        <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0f1116]">
            <div className="aspect-[16/10]">
              {form.coverImageUrl ? (
                <img
                  src={form.coverImageUrl}
                  alt={form.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageIcon size={34} className="text-white/15" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h4 className="text-sm font-medium text-white/75">Event Cover</h4>

            <p className="mt-2 max-w-md text-xs leading-6 text-white/35">
              Use a high-quality image that clearly represents your event. Wide landscape images
              work best.
            </p>

            {isEditing && (
              <label className="mt-5 inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.03] px-4 py-2.5 text-xs font-medium text-white/70 transition hover:border-emerald-500/30 hover:text-emerald-400">
                <Upload size={15} />

                {isUploadingImage ? "Uploading..." : "Upload New Image"}

                <input
                  type="file"
                  accept="image/*"
                  disabled={isUploadingImage}
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Video & External Links"
        description="Add supporting media and event destinations"
        icon={<Link2 size={17} />}
      >
        <div className="space-y-6">
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

                <label className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-white/[0.08] text-white/50 transition hover:border-emerald-500/30 hover:text-emerald-400">
                  <Video size={17} />

                  <input
                    type="file"
                    accept="video/*"
                    disabled={isUploadingVideo}
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : form.introVideoUrl ? (
              <a
                href={form.introVideoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-sm text-white/55 transition hover:border-white/[0.12] hover:text-white"
              >
                <span className="truncate">{form.introVideoUrl}</span>

                <ExternalLink size={15} />
              </a>
            ) : (
              <p className="text-sm text-white/30">No intro video added.</p>
            )}

            {isUploadingVideo && (
              <p className="mt-2 text-xs text-emerald-400">Uploading video...</p>
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
                className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-sm text-white/55 transition hover:border-white/[0.12] hover:text-white"
              >
                <span className="truncate">{form.redirectUrl}</span>

                <ExternalLink size={15} />
              </a>
            ) : (
              <p className="text-sm text-white/30">No website added.</p>
            )}
          </div>
        </div>
      </SectionCard>
    </div>
  );

  const renderEditableList = (
    title: string,
    description: string,
    type: "rules" | "requirements",
    icon: ReactNode,
  ) => {
    const items = form[type];

    return (
      <SectionCard
        title={title}
        description={description}
        icon={icon}
        action={
          isEditing ? (
            <button
              type="button"
              onClick={() => addListItem(type)}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2 text-xs font-medium text-emerald-400 transition hover:bg-emerald-500/[0.12]"
            >
              <Plus size={14} />
              Add Item
            </button>
          ) : undefined
        }
      >
        {items.length === 0 ? (
          <EmptyState
            icon={icon}
            title={`No ${title.toLowerCase()} added`}
            description={`Add ${title.toLowerCase()} to help attendees understand expectations.`}
          />
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div
                key={`${type}-${index}`}
                className="group flex items-start gap-3 rounded-xl border border-white/[0.06] bg-black/[0.1] p-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/[0.1] text-[11px] font-semibold text-emerald-400">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {isEditing ? (
                  <>
                    <input
                      value={item}
                      onChange={(event) => updateListItem(type, index, event.target.value)}
                      placeholder={`Enter ${title.slice(0, -1).toLowerCase()}`}
                      className="h-10 min-w-0 flex-1 bg-transparent px-1 text-sm text-white outline-none placeholder:text-white/20"
                    />

                    <button
                      type="button"
                      onClick={() => removeListItem(type, index)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-400/60 transition hover:bg-red-500/[0.08] hover:text-red-400"
                    >
                      <Trash2 size={15} />
                    </button>
                  </>
                ) : (
                  <p className="min-w-0 flex-1 pt-1 text-sm leading-6 text-white/55">{item}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    );
  };

  const renderRules = () => (
    <div className="grid gap-5 xl:grid-cols-2">
      {renderEditableList(
        "Rules",
        "Guidelines attendees should follow",
        "rules",
        <ShieldCheck size={17} />,
      )}

      {renderEditableList(
        "Requirements",
        "What participants need before joining",
        "requirements",
        <FileText size={17} />,
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0b0d11] pb-32 text-white">
      <div ref={topRef} className="mx-auto w-full max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-5">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/member/event"
              className="inline-flex items-center gap-2 text-xs text-white/40 transition hover:text-white"
            >
              <ArrowLeft size={15} />
              Back to Events
            </Link>

            {hasChanges && isEditing && (
              <span className="hidden items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.06] px-3 py-1.5 text-[10px] font-medium text-amber-400 sm:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Unsaved changes
              </span>
            )}
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {form.title || "Untitled Event"}
                </h1>

                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-emerald-400">
                  {formatStatus(form.status)}
                </span>
              </div>

              <p className="mt-2 text-sm text-white/40">
                Manage event information, schedule, media and attendee requirements.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {!isEditing && form.redirectUrl && (
                <a
                  href={form.redirectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-2.5 text-xs font-medium text-white/60 transition hover:bg-white/[0.04] hover:text-white"
                >
                  Website
                  <ExternalLink size={14} />
                </a>
              )}

              {!isEditing ? (
                <Button size="md" type="button" onClick={handleEdit}>
                  <Pencil size={16} />
                  Edit Event
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="md"
                    type="button"
                    onClick={handleCancel}
                    disabled={isUpdating}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="md"
                    type="button"
                    onClick={handleSave}
                    disabled={isUpdating || !hasChanges}
                  >
                    <Save size={16} />
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>

        <section className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#12151b]">
          <div className="relative grid gap-0 lg:grid-cols-[330px_minmax(0,1fr)]">
            <div className="relative min-h-[280px] overflow-hidden lg:min-h-full">
              {form.coverImageUrl ? (
                <img
                  src={form.coverImageUrl}
                  alt={form.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#0f1116]">
                  <ImageIcon size={44} className="text-white/15" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {isEditing && (
                <label className="absolute bottom-5 left-5 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 bg-black/50 px-4 py-2.5 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/70">
                  <Upload size={14} />

                  {isUploadingImage ? "Uploading..." : "Change Cover"}

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

            <div className="flex min-w-0 flex-col">
              <div className="flex-1 px-5 py-6 sm:px-7 sm:py-8">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-emerald-500/[0.1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                    {formatStatus(form.status)}
                  </span>

                  {form.category && (
                    <span className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40">
                      {form.category}
                    </span>
                  )}
                </div>

                <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                  {form.title || "Untitled Event"}
                </h2>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-white/45">
                  {form.shortDescription || "No event description available yet."}
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="flex items-start gap-3">
                    <CalendarDays size={16} className="mt-0.5 text-emerald-400" />

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-white/25">Date</p>

                      <p className="mt-1 text-xs text-white/65">{eventDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock3 size={16} className="mt-0.5 text-amber-400" />

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-white/25">Time</p>

                      <p className="mt-1 text-xs text-white/65">
                        {formatTime(eventStart)}
                        {eventEnd && ` – ${formatTime(eventEnd)}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="mt-0.5 text-red-400" />

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-white/25">Location</p>

                      <p className="mt-1 text-xs text-white/65">{form.venue.city || "TBA"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe size={16} className="mt-0.5 text-blue-400" />

                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-white/25">Mode</p>

                      <p className="mt-1 text-xs text-white/65">{formatStatus(form.venue.mode)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid border-t border-white/[0.06] sm:grid-cols-3 lg:grid-cols-6">
                {stats.map((stat) => (
                  <StatCard
                    key={stat.label}
                    value={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <nav className="sticky top-0 z-20 mt-5 border-y border-white/[0.06] bg-[#0b0d11]/95 py-2 backdrop-blur-xl">
          <div className="scrollbar-none flex min-w-max items-center gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-medium transition ${
                    isActive
                      ? "bg-emerald-500/[0.1] text-emerald-400"
                      : "text-white/40 hover:bg-white/[0.035] hover:text-white/70"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-6">
          {activeTab === "overview" && renderOverview()}

          {activeTab === "details" && renderDetails()}

          {activeTab === "schedule" && renderSchedule()}

          {activeTab === "media" && renderMedia()}

          {activeTab === "rules" && renderRules()}
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-[#111319]/95 px-4 py-3 backdrop-blur-xl">
          <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
            <div className="hidden min-w-0 sm:block">
              <p className="text-xs font-medium text-white/70">Editing Event</p>

              <p className="mt-0.5 text-[11px] text-white/30">
                {hasChanges ? "You have unsaved changes" : "All changes are saved"}
              </p>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={handleCancel}
                disabled={isUpdating}
              >
                <X size={15} />
                Cancel
              </Button>

              <Button
                size="sm"
                type="button"
                onClick={handleSave}
                disabled={isUpdating || !hasChanges}
              >
                <Save size={15} />

                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewSingleEventPage;
