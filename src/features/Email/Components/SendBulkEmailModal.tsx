import { useState, useMemo } from "react";
import {
  X,
  Send,
  Sparkles,
  Users,
  Eye,
  Edit3,
  CheckCircle,
} from "lucide-react";
import {
  emailTemplates,
  type EmailCampaignItem,
  type AudienceType,
} from "../data/emails.data";

interface SendBulkEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendCampaign: (campaign: Omit<EmailCampaignItem, "id">) => void;
}

const SendBulkEmailModal = ({ isOpen, onClose, onSendCampaign }: SendBulkEmailModalProps) => {
  const [activeTab, setActiveTab] = useState<"compose" | "preview">("compose");
  const [audienceType, setAudienceType] = useState<AudienceType>("All Members");
  const [bulkEmailsText, setBulkEmailsText] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [previewText, setPreviewText] = useState("");
  const [senderName, setSenderName] = useState("GDG Ranchi Team");
  const [senderEmail, setSenderEmail] = useState("info@gdgranchi.in");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [content, setContent] = useState(
    `Hi {{name}},\n\nWe are excited to announce our upcoming community initiative with Google Developer Groups Ranchi.\n\nKey Highlights:\n- Hands-on technical workshops\n- Interactive Q&A with Google Developer Experts\n- Free developer swags and certifications\n\nReserve your ticket today!\n\nBest regards,\nGDG Ranchi Team`,
  );
  const [sendType, setSendType] = useState<"now" | "schedule">("now");
  const [scheduledDateTime, setScheduledDateTime] = useState("2026-08-20T10:00");
  const [isTestSent, setIsTestSent] = useState(false);

  // Calculate recipients
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

  if (!isOpen) return null;

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

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !subject) return;

    onSendCampaign({
      title,
      subject,
      previewText: previewText || subject,
      audience: audienceType,
      recipientCount: recipientCount || 1,
      deliveredCount: sendType === "now" ? recipientCount || 1 : 0,
      deliveryRate: sendType === "now" ? "99.4%" : "0%",
      openedCount: 0,
      openRate: "0%",
      clickedCount: 0,
      clickRate: "0%",
      bouncedCount: 0,
      status: sendType === "now" ? "Sent" : "Scheduled",
      sentDate:
        sendType === "now"
          ? new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : undefined,
      scheduledDate:
        sendType === "schedule"
          ? new Date(scheduledDateTime).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : undefined,
      senderName,
      senderEmail,
      content,
      tags: ["Bulk Broadcast", audienceType],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 transition-opacity" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#232830] bg-[#161a1f] p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#232830] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#143321] text-[#22c55e] border border-[#1c472d]">
              <Send size={18} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Broadcast Bulk Email</h3>
              <p className="text-xs text-white/40">
                Send personalized bulk campaigns to community members
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#232830] bg-[#121519] text-white/40 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Mode Toggle (Compose / Preview) */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex rounded-xl border border-[#232830] bg-[#121519] p-1">
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
              <span>Compose Campaign</span>
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
              <span>Live Email Preview</span>
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-[#232830] bg-[#121519] px-3 py-1.5 text-xs">
            <Users size={14} className="text-[#22c55e]" />
            <span className="text-white/60">Estimated Audience:</span>
            <strong className="text-[#4ade80]">{recipientCount.toLocaleString()} Recipients</strong>
          </div>
        </div>

        {activeTab === "compose" ? (
          <form onSubmit={handleSend} className="mt-5 space-y-4">
            {/* Step 1: Audience selection */}
            <div className="rounded-xl border border-[#232830] bg-[#121519] p-4">
              <label className="block text-xs font-medium text-white/60 mb-2">
                1. Select Target Audience or Bulk List <span className="text-[#22c55e]">*</span>
              </label>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
                    className={`flex items-center justify-between rounded-xl border p-2.5 text-left text-xs transition-colors ${
                      audienceType === aud
                        ? "border-[#1e5433] bg-[#153e25] text-[#4ade80]"
                        : "border-[#232830] bg-[#161a1f] text-white/70 hover:border-[#2f3540] hover:text-white"
                    }`}
                  >
                    <span>{aud}</span>
                    {audienceType === aud && <CheckCircle size={13} />}
                  </button>
                ))}
              </div>

              {/* If Custom Bulk List is selected */}
              {audienceType === "Custom Bulk List" && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-white/50">
                    <span>Paste emails (comma or line separated) or upload CSV:</span>
                    <span className="font-semibold text-[#4ade80]">
                      {parsedBulkEmails.length} valid emails detected
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={bulkEmailsText}
                    onChange={(e) => setBulkEmailsText(e.target.value)}
                    placeholder="john@example.com, sara@college.edu, rahul@startup.io..."
                    className="w-full rounded-xl border border-[#232830] bg-[#161a1f] p-3 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Step 2: Campaign Subject & Metadata */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">
                  Campaign Title (Internal) <span className="text-[#22c55e]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Jharkhand Tech Summit 2026 - Registration Open"
                  className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5">
                  Sender Identity
                </label>
                <input
                  type="text"
                  value={`${senderName} <${senderEmail}>`}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white/80 focus:border-[#22c55e] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5">
                Email Subject Line <span className="text-[#22c55e]">*</span>
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. 🚀 Registrations Now Open for Jharkhand Tech Summit 2026!"
                className="w-full rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            {/* Template Selector */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-white/60">
                  Quick Load Template:
                </label>
                <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                  <span>Dynamic tags:</span>
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

              <div className="flex flex-wrap gap-2 mb-2">
                {emailTemplates.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleApplyTemplate(tpl.id)}
                    className={`rounded-lg border px-2.5 py-1 text-xs transition-colors ${
                      selectedTemplateId === tpl.id
                        ? "border-[#1e5433] bg-[#153e25] text-[#4ade80]"
                        : "border-[#232830] bg-[#121519] text-white/60 hover:text-white"
                    }`}
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>

              {/* Body Textarea */}
              <textarea
                rows={7}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-xl border border-[#232830] bg-[#121519] p-3 text-xs font-mono text-white placeholder-white/30 focus:border-[#22c55e] focus:outline-none"
              />
            </div>

            {/* Scheduling & Send Options */}
            <div className="flex flex-col gap-3 rounded-xl border border-[#232830] bg-[#121519] p-3.5 sm:flex-row sm:items-center sm:justify-between">
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
                  className="rounded-lg border border-[#232830] bg-[#161a1f] px-3 py-1 text-xs text-white focus:border-[#22c55e] focus:outline-none"
                />
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between border-t border-[#232830] pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsTestSent(true);
                  setTimeout(() => setIsTestSent(false), 3000);
                }}
                className="rounded-xl border border-[#232830] bg-[#121519] px-3.5 py-2 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
              >
                {isTestSent ? "✓ Test Sent to You" : "Send Test to Me"}
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-5 py-2 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
                >
                  <Send size={14} />
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
          /* Live Email Preview */
          <div className="mt-5 space-y-4">
            <div className="overflow-hidden rounded-2xl border border-[#2b323d] bg-white text-black shadow-lg">
              {/* Fake Email Client Header */}
              <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>From: <strong>{senderName} &lt;{senderEmail}&gt;</strong></span>
                  <span>To: <strong>recipient@example.com</strong></span>
                </div>
                <h2 className="mt-2 text-base font-bold text-gray-900">
                  {subject || "Your Subject Line Will Appear Here"}
                </h2>
              </div>

              {/* Fake Email Body */}
              <div className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <img src="/GDG_Logo.svg" alt="GDG Ranchi" className="h-6 w-auto" />
                  <span className="text-sm font-bold text-gray-800">GDG Ranchi</span>
                </div>

                <div className="whitespace-pre-line text-sm leading-relaxed text-gray-800">
                  {content
                    .replace(/{{name}}/g, "Rahul Kumar")
                    .replace(/{{event_name}}/g, "Jharkhand Tech Summit 2026")
                    .replace(/{{date}}/g, "15 - 16 Jul 2026")
                    .replace(/{{venue}}/g, "BIT Mesra, Ranchi")
                    .replace(/{{ticket_id}}/g, "JTS-2026-8942")}
                </div>

                <div className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-400">
                  You are receiving this email because you are a registered member of Google Developer Groups Ranchi.
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
    </div>
  );
};

export default SendBulkEmailModal;
