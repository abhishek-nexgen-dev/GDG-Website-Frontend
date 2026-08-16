import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CalendarPlus, Sparkles } from "lucide-react";
import type { EventCategory, EventMode, EventStatus, EventVisibility } from "../data/events.data";

const CreateEvent = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<EventCategory>("Workshop");
  const [tagsInput, setTagsInput] = useState("Workshop, Web Dev, Beginner");
  const [date, setDate] = useState("25 Aug 2026");
  const [time, setTime] = useState("10:00 AM - 2:00 PM");
  const [venue, setVenue] = useState("GDG Ranchi Office");
  const [location, setLocation] = useState("GDG Ranchi Office, Ranchi");
  const [mode, setMode] = useState<EventMode>("Offline");
  const [status, setStatus] = useState<EventStatus>("UPCOMING");
  const [visibility, setVisibility] = useState<EventVisibility>("Public");
  const [maxRegistrations, setMaxRegistrations] = useState(100);
  const [description, setDescription] = useState("");
  const [speakersInput, setSpeakersInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    navigate("/member/events");
  };

  return (
    <div className="min-h-full w-full py-5 px-4 sm:px-6 lg:px-8 text-white max-w-4xl">
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/member/events")}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#232830] bg-[#161a1f] text-white/60 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Create New Event</h1>
          <p className="text-xs text-white/40">Publish a new event to the GDG community</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#232830] bg-[#161a1f] p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Event Title <span className="text-[#22c55e]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Jharkhand Tech Summit 2026"
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2.5 text-xs text-white focus:border-[#22c55e] focus:outline-none"
              >
                <option value="Hackathon" className="bg-[#161a1f] text-white">
                  Hackathon
                </option>
                <option value="Workshop" className="bg-[#161a1f] text-white">
                  Workshop
                </option>
                <option value="Meetup" className="bg-[#161a1f] text-white">
                  Meetup
                </option>
                <option value="Talk" className="bg-[#161a1f] text-white">
                  Talk
                </option>
                <option value="Bootcamp" className="bg-[#161a1f] text-white">
                  Bootcamp
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Mode</label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as EventMode)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2.5 text-xs text-white focus:border-[#22c55e] focus:outline-none"
              >
                <option value="Offline" className="bg-[#161a1f] text-white">
                  Offline
                </option>
                <option value="Online" className="bg-[#161a1f] text-white">
                  Online
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EventStatus)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2.5 text-xs text-white focus:border-[#22c55e] focus:outline-none"
              >
                <option value="UPCOMING" className="bg-[#161a1f] text-white">
                  Upcoming
                </option>
                <option value="ONGOING" className="bg-[#161a1f] text-white">
                  Ongoing
                </option>
                <option value="COMPLETED" className="bg-[#161a1f] text-white">
                  Completed
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 15 - 16 Jul 2026"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Time</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 11:00 AM - 6:30 PM"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Venue</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. BIT Mesra Main Auditorium"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. BIT Mesra, Ranchi"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. Hackathon, AI, AgriTech"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Max Registrations
              </label>
              <input
                type="number"
                value={maxRegistrations}
                onChange={(e) => setMaxRegistrations(Number(e.target.value))}
                placeholder="300"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">
              Speakers (comma separated)
            </label>
            <input
              type="text"
              value={speakersInput}
              onChange={(e) => setSpeakersInput(e.target.value)}
              placeholder="e.g. Tushar Raj, Vikas Shukla"
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/60 mb-1.5">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed overview of event schedule, speakers, and benefits..."
              className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-[#232830] pt-5">
            <button
              type="button"
              onClick={() => navigate("/member/events")}
              className="rounded-xl border border-[#232830] bg-[#121519] px-5 py-2.5 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
            >
              <Sparkles size={15} />
              <span>Create Event</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
