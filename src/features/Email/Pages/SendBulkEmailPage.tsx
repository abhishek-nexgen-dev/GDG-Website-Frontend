import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Send, Sparkles, Users, Edit3, Eye, CheckCircle } from "lucide-react";
import { emailTemplates, type AudienceType } from "../data/emails.data";

const SendBulkEmailPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"compose" | "preview">("compose");
  const [audienceType, setAudienceType] = useState<AudienceType>("All Members");
  const [bulkEmailsText, setBulkEmailsText] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [senderName, setSenderName] = useState("GDG Ranchi Team");
  const [senderEmail, setSenderEmail] = useState("info@gdgranchi.in");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [content, setContent] = useState(
    `Hi {{name}},\n\nWe are excited to announce our upcoming community initiative with Google Developer Groups Ranchi.\n\nKey Highlights:\n- Hands-on technical workshops\n- Interactive Q&A with Google Developer Experts\n- Free developer swags and certifications\n\nReserve your ticket today!\n\nBest regards,\nGDG Ranchi Team`,
  );
  const [sendType, setSendType] = useState<"now" | "schedule">("now");
  const [scheduledDateTime, setScheduledDateTime] = useState("2026-08-20T10:00");
  const [isTestSent, setIsTestSent] = useState(false);

  const parsedBulkEmails = useMemo(() => {
    if (audienceType !== "Custom Bulk List") return [];
    return bulkEmailsText
      .split(/[\n,;]+/)
      .map((e) => e.trim())
      .filter((e) => e.includes("@") && e.includes("."));
  }, [audienceType, bulkEmailsText]);

  const recipientCount = useMemo(() => {
    switch (audienceType) {
      case "All Members":
        return 2850;
      case "Event Attendees":
        return 220;
      case "Hackathon Participants":
        return 450;
      case "Core Volunteers":
        return 32;
      case "Speakers & Mentors":
        return 18;
      case "Custom Bulk List":
      default:
        return parsedBulkEmails.length;
    }
  }, [audienceType, parsedBulkEmails]);

  const handleApplyTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const tpl = emailTemplates.find((t) => t.id === templateId);
    if (tpl) {
      setSubject(tpl.subject);
      setContent(tpl.content);
    }
  };

  const handleInsertTag = (tag: string) => {
    setContent((prev) => prev + " " + tag);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject) return;
    navigate("/member/emails");
  };

  return (
    <div className="min-h-full w-full py-5 px-4 sm:px-6 lg:px-8 text-white max-w-4xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/member/emails")}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#232830] bg-[#161a1f] text-white/60 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Send Bulk Email</h1>
            <p className="text-xs text-white/40">Broadcast announcements to developer community</p>
          </div>
        </div>

        <div className="flex rounded-xl border border-[#232830] bg-[#161a1f] p-1">
          <button
            type="button"
            onClick={() => setActiveTab("compose")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "compose"
                ? "bg-[#153e25] text-[#4ade80]"
                : "text-white/50 hover:text-white"
            }`}
          >
            <Edit3 size={13} />
            <span>Compose</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === "preview"
                ? "bg-[#153e25] text-[#4ade80]"
                : "text-white/50 hover:text-white"
            }`}
          >
            <Eye size={13} />
            <span>Preview</span>
          </button>
        </div>
      </div>

      {activeTab === "compose" ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Audience selection */}
          <div className="rounded-2xl border border-[#232830] bg-[#161a1f] p-5 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-medium text-white/70">
                1. Target Audience Group <span className="text-[#22c55e]">*</span>
              </label>
              <div className="flex items-center gap-1.5 text-xs text-[#4ade80]">
                <Users size={13} />
                <span>{recipientCount.toLocaleString()} Estimated Recipients</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {[
                "All Members",
                "Event Attendees",
                "Hackathon Participants",
                "Core Volunteers",
                "Speakers & Mentors",
                "Custom Bulk List",
              ].map((aud) => (
                <button
                  key={aud}
                  type="button"
                  onClick={() => setAudienceType(aud as AudienceType)}
                  className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs transition-colors ${
                    audienceType === aud
                      ? "border-[#1e5433] bg-[#153e25] text-[#4ade80]"
                      : "border-[#232830] bg-[#121519] text-white/70 hover:border-[#2f3540] hover:text-white"
                  }`}
                >
                  <span className="font-medium">{aud}</span>
                  {audienceType === aud && <CheckCircle size={14} />}
                </button>
              ))}
            </div>

            {audienceType === "Custom Bulk List" && (
              <div className="mt-4 space-y-2">
                <p className="text-[11px] text-white/50">
                  Paste email addresses below (comma or newline separated):
                </p>
                <textarea
                  rows={4}
                  value={bulkEmailsText}
                  onChange={(e) => setBulkEmailsText(e.target.value)}
                  placeholder="alex@tech.com, priya@university.ac.in, rahul@developer.io..."
                  className="w-full rounded-xl border border-[#232830] bg-[#121519] p-3 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Campaign details */}
          <div className="rounded-2xl border border-[#232830] bg-[#161a1f] p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/60">
              2. Campaign Content & Header
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">
                  Internal Campaign Name <span className="text-[#22c55e]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Jharkhand Tech Summit 2026 - Early Announcement"
                  className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">
                  Sender Info
                </label>
                <input
                  type="text"
                  value={`${senderName} <${senderEmail}>`}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2.5 text-xs text-white/80 focus:border-[#22c55e] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Subject Line <span className="text-[#22c55e]">*</span>
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. 🚀 Get Ready for Jharkhand Tech Summit 2026!"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            {/* Template options */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-white/60">Load from Templates:</span>
                <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                  <span>Tags:</span>
                  {["{{name}}", "{{event_name}}", "{{date}}", "{{venue}}", "{{ticket_id}}"].map(
                    (tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleInsertTag(tag)}
                        className="rounded-md border border-[#2b323d] bg-[#121519] px-1.5 py-0.5 text-[#60a5fa] hover:border-[#3b82f6]"
                      >
                        {tag}
                      </button>
                    ),
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {emailTemplates.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleApplyTemplate(tpl.id)}
                    className={`rounded-lg border px-3 py-1 text-xs transition-colors ${
                      selectedTemplateId === tpl.id
                        ? "border-[#1e5433] bg-[#153e25] text-[#4ade80]"
                        : "border-[#232830] bg-[#121519] text-white/60 hover:text-white"
                    }`}
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>

              <textarea
                rows={9}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] p-4 text-xs font-mono text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* Delivery & Schedule */}
          <div className="flex flex-col gap-3 rounded-2xl border border-[#232830] bg-[#161a1f] p-5 shadow-xl sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs font-medium text-white/80 cursor-pointer">
                <input
                  type="radio"
                  name="sendType"
                  checked={sendType === "now"}
                  onChange={() => setSendType("now")}
                  className="accent-[#22c55e]"
                />
                <span>Send Immediately</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-white/80 cursor-pointer">
                <input
                  type="radio"
                  name="sendType"
                  checked={sendType === "schedule"}
                  onChange={() => setSendType("schedule")}
                  className="accent-[#22c55e]"
                />
                <span>Schedule for Later</span>
              </label>
            </div>

            {sendType === "schedule" && (
              <input
                type="datetime-local"
                value={scheduledDateTime}
                onChange={(e) => setScheduledDateTime(e.target.value)}
                className="rounded-lg border border-[#232830] bg-[#121519] px-3.5 py-1.5 text-xs text-white focus:border-[#22c55e] focus:outline-none"
              />
            )}
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => {
                setIsTestSent(true);
                setTimeout(() => setIsTestSent(false), 3000);
              }}
              className="rounded-xl border border-[#232830] bg-[#161a1f] px-4 py-2.5 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
            >
              {isTestSent ? "✓ Test Sent to You" : "Send Test to Me"}
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/member/emails")}
                className="rounded-xl border border-[#232830] bg-[#161a1f] px-5 py-2.5 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-6 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
              >
                <Sparkles size={15} />
                <span>
                  {sendType === "now"
                    ? `Send to ${recipientCount.toLocaleString()} Recipients`
                    : "Schedule Campaign"}
                </span>
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* Preview Tab */
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-[#2b323d] bg-white text-black shadow-2xl">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  From:{" "}
                  <strong>
                    {senderName} &lt;{senderEmail}&gt;
                  </strong>
                </span>
                <span>
                  Audience:{" "}
                  <strong>
                    {audienceType} ({recipientCount} recipients)
                  </strong>
                </span>
              </div>
              <h2 className="mt-2 text-lg font-bold text-gray-900">
                {subject || "Your Subject Line Will Appear Here"}
              </h2>
            </div>

            <div className="p-8">
              <div className="mb-4 flex items-center gap-2">
                <img src="/GDG_Logo.svg" alt="GDG Ranchi" className="h-7 w-auto" />
                <span className="text-base font-bold text-gray-800">GDG Ranchi</span>
              </div>

              <div className="whitespace-pre-line text-sm leading-relaxed text-gray-800">
                {content
                  .replace(/{{name}}/g, "Aman Kumar")
                  .replace(/{{event_name}}/g, "Jharkhand Tech Summit 2026")
                  .replace(/{{date}}/g, "15 - 16 Jul 2026")
                  .replace(/{{venue}}/g, "BIT Mesra, Ranchi")
                  .replace(/{{ticket_id}}/g, "JTS-2026-9012")}
              </div>

              <div className="mt-8 border-t border-gray-100 pt-4 text-xs text-gray-400">
                You are receiving this email because you are a registered member of Google Developer
                Groups Ranchi.
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setActiveTab("compose")}
              className="flex items-center gap-1.5 rounded-xl bg-[#22c55e] px-4 py-2 text-xs font-semibold text-black hover:bg-[#16a34a]"
            >
              <Edit3 size={13} />
              <span>Return to Editor</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendBulkEmailPage;
