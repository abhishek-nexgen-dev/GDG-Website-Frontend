import { useState } from "react";
import {
  CalendarDays,
  Clock3,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  MapPin,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  Users,
  Video,
  Zap,
} from "lucide-react";

import type { EventFormData, EventRequirement, EventRule, TimelineItem } from "../type/Event.type";
import Label from "../../../Components/Label";
import Input from "../../../Components/Input";
import Select from "../../../Components/Select";
import Section from "../../../Components/Section";

const initialData: EventFormData = {
  title: "",
  shortDescription: "",
  category: "",
  visibility: "",
  status: "Registration Open",

  description: "",

  coverImageUrl: "",
  introVideoUrl: "",
  redirectUrl: "",

  registrationStart: "",
  registrationEnd: "",

  venueMode: "Offline",
  venueName: "",
  address: "",
  city: "Ranchi",
  state: "Jharkhand",
  country: "India",
  latitude: "",
  longitude: "",

  timeline: [
    {
      id: crypto.randomUUID(),
      title: "Registration Closed",
      start: "2026-07-14T23:59",
      end: "2026-07-14T23:59",
      color: "emerald",
    },
    {
      id: crypto.randomUUID(),
      title: "Team Formation",
      start: "2026-07-15T08:00",
      end: "2026-07-15T09:00",
      color: "cyan",
    },
    {
      id: crypto.randomUUID(),
      title: "Opening Ceremony",
      start: "2026-07-15T09:30",
      end: "2026-07-15T10:30",
      color: "purple",
    },
    {
      id: crypto.randomUUID(),
      title: "Hackathon Starts (LIVE)",
      start: "2026-07-15T11:00",
      end: "2026-07-16T11:00",
      color: "blue",
    },
  ],

  rules: [
    {
      id: crypto.randomUUID(),
      text: "Each team must have 2 to 4 members.",
    },
    {
      id: crypto.randomUUID(),
      text: "Participants must carry a valid college ID.",
    },
    {
      id: crypto.randomUUID(),
      text: "All code must be written during the event.",
    },
  ],

  requirements: [
    {
      id: crypto.randomUUID(),
      text: "Laptop with 8GB+ RAM",
    },
    {
      id: crypto.randomUUID(),
      text: "Valid ID Card",
    },
    {
      id: crypto.randomUUID(),
      text: "Git/GitHub account",
    },
  ],
};

export default function CreateEvent() {
  const [form, setForm] = useState<EventFormData>(initialData);

  const update = <K extends keyof EventFormData>(key: K, value: EventFormData[K]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addTimeline = () => {
    const item: TimelineItem = {
      id: crypto.randomUUID(),
      title: "New Timeline",
      start: "",
      end: "",
      color: "blue",
    };

    update("timeline", [...form.timeline, item]);
  };

  const removeTimeline = (id: string) => {
    update(
      "timeline",
      form.timeline.filter((item) => item.id !== id),
    );
  };

  const updateTimeline = (id: string, key: keyof TimelineItem, value: string) => {
    update(
      "timeline",
      form.timeline.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    );
  };

  const addRule = () => {
    const rule: EventRule = {
      id: crypto.randomUUID(),
      text: "",
    };

    update("rules", [...form.rules, rule]);
  };

  const removeRule = (id: string) => {
    update(
      "rules",
      form.rules.filter((rule) => rule.id !== id),
    );
  };

  const updateRule = (id: string, text: string) => {
    update(
      "rules",
      form.rules.map((rule) => (rule.id === id ? { ...rule, text } : rule)),
    );
  };

  const addRequirement = () => {
    const requirement: EventRequirement = {
      id: crypto.randomUUID(),
      text: "",
    };

    update("requirements", [...form.requirements, requirement]);
  };

  const removeRequirement = (id: string) => {
    update(
      "requirements",
      form.requirements.filter((requirement) => requirement.id !== id),
    );
  };

  const updateRequirement = (id: string, text: string) => {
    update(
      "requirements",
      form.requirements.map((requirement) =>
        requirement.id === id ? { ...requirement, text } : requirement,
      ),
    );
  };

  const saveDraft = () => {
    console.log("Saving draft:", form);
  };

  const publishEvent = () => {
    console.log("Publishing event:", form);
  };

  return (
    <div className="min-h-screen  text-white py-[2.5vh]">
      {/* HEADER */}
      <header className="">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-3">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Create New Event</h1>

            <div className="mt-1 flex items-center gap-2 text-[10px]">
              <span className="text-zinc-500">Dashboard</span>
              <span className="text-zinc-700">›</span>
              <span className="text-zinc-500">Events</span>
              <span className="text-zinc-700">›</span>
              <span className="text-lime-400">Create New Event</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-md border border-white/[0.08] px-4 py-2 text-[10px] text-zinc-400 transition hover:bg-white/[0.04]">
              Cancel
            </button>

            <button
              onClick={saveDraft}
              className="flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-[10px] font-medium text-white transition hover:bg-emerald-500"
            >
              <Save size={12} />
              Save Draft
            </button>

            <button
              onClick={publishEvent}
              className="flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-[10px] font-medium text-white transition hover:bg-emerald-500"
            >
              <ExternalLink size={12} />
              Publish Event
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-[1500px] px-5 py-3">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          {/* LEFT COLUMN */}
          <div className="space-y-3">
            {/* BASIC INFORMATION */}
            <Section
              title="Basic Information"
              description="Add the basic details about your event"
              icon={<Zap size={14} />}
            >
              <div className="space-y-3">
                <div>
                  <Label required>Event Title</Label>
                  <Input
                    value={form.title}
                    onChange={(value) => update("title", value)}
                    placeholder="Enter event title"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <Label required>Short Description</Label>

                    <span className="text-[9px] text-zinc-600">
                      {form.shortDescription.length}/160
                    </span>
                  </div>

                  <textarea
                    value={form.shortDescription}
                    onChange={(e) => update("shortDescription", e.target.value)}
                    maxLength={160}
                    placeholder="A short description about your event"
                    className="h-12 w-full resize-none rounded-md border border-white/[0.06] bg-[#202126] p-3 text-[11px] text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-lime-500/50"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label required>Category</Label>

                    <Select value={form.category} onChange={(value) => update("category", value)}>
                      <option value="">Select category</option>
                      <option value="hackathon">Hackathon</option>
                      <option value="workshop">Workshop</option>
                      <option value="conference">Conference</option>
                      <option value="meetup">Meetup</option>
                    </Select>
                  </div>

                  <div>
                    <Label required>Visibility</Label>

                    <Select
                      value={form.visibility}
                      onChange={(value) => update("visibility", value)}
                    >
                      <option value="">Select visibility</option>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="unlisted">Unlisted</option>
                    </Select>
                  </div>

                  <div>
                    <Label required>Status</Label>

                    <Select value={form.status} onChange={(value) => update("status", value)}>
                      <option value="Registration Open">Registration Open</option>
                      <option value="Registration Closed">Registration Closed</option>
                      <option value="Draft">Draft</option>
                      <option value="Completed">Completed</option>
                    </Select>
                  </div>
                </div>
              </div>
            </Section>

            {/* DESCRIPTION */}
            <Section
              title="Event Description"
              description="Provide detailed information about your event"
              icon={<FileText size={14} />}
            >
              <div className="overflow-hidden rounded-md border border-white/[0.06]">
                <div className="flex h-8 items-center gap-3 border-b border-white/[0.06] bg-[#202126] px-3">
                  <button className="text-xs font-bold text-zinc-300">B</button>

                  <button className="text-xs italic text-zinc-400">I</button>

                  <button className="text-xs text-zinc-400">H</button>

                  <div className="h-4 w-px bg-white/[0.08]" />

                  <button className="text-xs text-zinc-400">☰</button>

                  <button className="text-xs text-zinc-400">☷</button>

                  <button className="text-xs text-zinc-400">“</button>

                  <button className="text-xs text-zinc-400">&lt;/&gt;</button>

                  <button className="text-xs text-zinc-400">
                    <LinkIcon size={12} />
                  </button>
                </div>

                <textarea
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Write your event description in Markdown..."
                  className="h-28 w-full resize-none bg-[#1b1c20] p-3 text-[11px] text-zinc-300 outline-none placeholder:text-zinc-600"
                />
              </div>
            </Section>

            {/* REGISTRATION */}
            <Section
              title="Registration Period"
              description="Set the registration start and end date & time"
              icon={<CalendarDays size={14} />}
            >
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label required>Registration Start</Label>

                  <Input
                    type="datetime-local"
                    value={form.registrationStart}
                    onChange={(value) => update("registrationStart", value)}
                  />
                </div>

                <div>
                  <Label required>Registration End</Label>

                  <Input
                    type="datetime-local"
                    value={form.registrationEnd}
                    onChange={(value) => update("registrationEnd", value)}
                  />
                </div>
              </div>
            </Section>

            {/* VENUE */}
            <Section
              title="Event Venue"
              description="Provide venue details or online meeting link"
              icon={<MapPin size={14} />}
            >
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Mode</Label>

                    <Select
                      value={form.venueMode}
                      onChange={(value) => update("venueMode", value as EventFormData["venueMode"])}
                    >
                      <option value="Offline">Offline</option>
                      <option value="Online">Online</option>
                    </Select>
                  </div>

                  <div>
                    <Label required>Venue Name</Label>

                    <Input
                      value={form.venueName}
                      onChange={(value) => update("venueName", value)}
                      placeholder="Enter venue name"
                    />
                  </div>
                </div>

                <div>
                  <Label required>Address</Label>

                  <Input
                    value={form.address}
                    onChange={(value) => update("address", value)}
                    placeholder="Enter full address"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label required>City</Label>

                    <Input value={form.city} onChange={(value) => update("city", value)} />
                  </div>

                  <div>
                    <Label required>State</Label>

                    <Input value={form.state} onChange={(value) => update("state", value)} />
                  </div>

                  <div>
                    <Label required>Country</Label>

                    <Input value={form.country} onChange={(value) => update("country", value)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label>Latitude</Label>

                    <Input
                      value={form.latitude}
                      onChange={(value) => update("latitude", value)}
                      placeholder="e.g. 23.4165"
                    />
                  </div>

                  <div>
                    <Label>Longitude</Label>

                    <Input
                      value={form.longitude}
                      onChange={(value) => update("longitude", value)}
                      placeholder="e.g. 85.4406"
                    />
                  </div>
                </div>
              </div>
            </Section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-3">
            {/* MEDIA */}
            <Section
              title="Media & Links"
              description="Add images, videos and important links"
              icon={<ImageIcon size={14} />}
            >
              <div className="grid grid-cols-[1fr_135px] gap-3">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label required>Cover Image URL</Label>

                      <Input
                        value={form.coverImageUrl}
                        onChange={(value) => update("coverImageUrl", value)}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    <button className="mt-5 flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.06] bg-[#202126] text-blue-400">
                      <ImageIcon size={14} />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label>Intro Video URL</Label>

                      <Input
                        value={form.introVideoUrl}
                        onChange={(value) => update("introVideoUrl", value)}
                        placeholder="https://youtube.com/embed/..."
                      />
                    </div>

                    <button className="mt-5 flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.06] bg-[#202126] text-red-400">
                      <Video size={14} />
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label>Redirect URL (Optional)</Label>

                      <Input
                        value={form.redirectUrl}
                        onChange={(value) => update("redirectUrl", value)}
                        placeholder="https://your-event-website.com"
                      />
                    </div>

                    <button className="mt-5 flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.06] bg-[#202126] text-blue-400">
                      <LinkIcon size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/[0.1] bg-gradient-to-br from-[#202126] to-[#17251d] text-center">
                  <Upload size={23} className="mb-2 text-zinc-400" />

                  <span className="text-[10px] text-zinc-400">Upload will be shown here</span>
                </div>
              </div>
            </Section>

            {/* TIMELINE */}
            <Section
              title="Event Timeline"
              description="Add important milestones and schedule"
              icon={<Clock3 size={14} />}
              action={
                <button
                  onClick={addTimeline}
                  className="flex items-center gap-1 text-[10px] font-medium text-lime-400"
                >
                  <Plus size={12} />
                  Add Timeline
                </button>
              }
            >
              <div className="space-y-2">
                {form.timeline.map((item, index) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[15px_1fr_160px_160px_24px] items-center gap-2"
                  >
                    <div className="relative flex h-full items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-lime-400" />

                      {index !== form.timeline.length - 1 && (
                        <div className="absolute left-1/2 top-[60%] h-[35px] w-px -translate-x-1/2 bg-white/[0.08]" />
                      )}
                    </div>

                    <Input
                      value={item.title}
                      onChange={(value) => updateTimeline(item.id, "title", value)}
                      placeholder="Timeline title"
                    />

                    <Input
                      type="datetime-local"
                      value={item.start}
                      onChange={(value) => updateTimeline(item.id, "start", value)}
                    />

                    <Input
                      type="datetime-local"
                      value={item.end}
                      onChange={(value) => updateTimeline(item.id, "end", value)}
                    />

                    <button
                      onClick={() => removeTimeline(item.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={addTimeline}
                className="mt-3 flex items-center gap-1 text-[10px] text-lime-400"
              >
                <Plus size={12} />
                Add More
              </button>
            </Section>

            {/* RULES */}
            <Section
              title="Rules"
              description="Add rules and guidelines for participants"
              icon={<ShieldCheck size={14} />}
              action={
                <button
                  onClick={addRule}
                  className="flex items-center gap-1 text-[10px] font-medium text-lime-400"
                >
                  <Plus size={12} />
                  Add Rule
                </button>
              }
            >
              <div className="space-y-2">
                {form.rules.map((rule, index) => (
                  <div key={rule.id} className="grid grid-cols-[20px_1fr_24px] items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-emerald-600/80 text-[9px] font-semibold">
                      {index + 1}
                    </div>

                    <Input
                      value={rule.text}
                      onChange={(value) => updateRule(rule.id, value)}
                      placeholder="Enter event rule"
                    />

                    <button
                      onClick={() => removeRule(rule.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </Section>

            {/* REQUIREMENTS */}
            <Section
              title="Requirements"
              description="List the requirements for participants"
              icon={<Users size={14} />}
              action={
                <button
                  onClick={addRequirement}
                  className="flex items-center gap-1 text-[10px] font-medium text-lime-400"
                >
                  <Plus size={12} />
                  Add Requirement
                </button>
              }
            >
              <div className="space-y-2">
                {form.requirements.map((requirement, index) => (
                  <div
                    key={requirement.id}
                    className="grid grid-cols-[20px_1fr_24px] items-center gap-2"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-blue-600/80 text-[9px] font-semibold">
                      {index + 1}
                    </div>

                    <Input
                      value={requirement.text}
                      onChange={(value) => updateRequirement(requirement.id, value)}
                      placeholder="Enter requirement"
                    />

                    <button
                      onClick={() => removeRequirement(requirement.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </main>
    </div>
  );
}
