import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";import {
  AlertCircle,
  ArrowLeft,
  Clock3,
  Code2,
  Edit3,
  Eye,
  Image as ImageIcon,
  Link2,
  Mail,
  Minus,
  Quote,
  Send,
  Sparkles,
  SquareCode,
  Zap,
} from "lucide-react";

import Section from "../../../Components/Section";
import MarkdownPreview from "../../../Components/MarkdownPreview";

// ============================================================
// Types
// ============================================================

type Tab = "compose" | "preview";
type SendType = "now" | "schedule";

type InsertType = "image" | "code" | "link" | "button" | "callout" | "divider";

// ============================================================
// Constants
// ============================================================

const INPUT_CLASS = `
  w-full rounded-xl
  border border-[#232830]
  bg-[#121519]
  px-4 py-2.5
  text-xs text-white
  placeholder-white/30
  outline-none transition
  focus:border-[#22c55e]
`;

const TOOL_BUTTON_CLASS = `
  inline-flex items-center gap-1.5
  rounded-lg border border-[#2b323d]
  bg-[#161a1f]
  px-3 py-1.5
  text-[11px] font-medium
  transition
  hover:bg-[#1c2229]
`;

const INSERT_SNIPPETS: Record<InsertType, string> = {
  image:
    "\n\n![Banner Image](https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800)\n\n",

  code: '\n\n```javascript\nconsole.log("Hello GDG Ranchi!");\n```\n\n',

  link: " [Visit GDG Ranchi](https://gdgranchi.in) ",

  button:
    '\n\n<a href="https://gdgranchi.in" style="background-color:#22c55e;color:#000000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;font-family:sans-serif;">Register Now</a>\n\n',

  callout: "\n\n> 💡 **Important:** Please bring your registration badge to the venue.\n\n",

  divider: "\n\n---\n\n",
};

// ============================================================
// Reusable Field
// ============================================================

const Field = ({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) => (
  <div>
    <label className="mb-1.5 block text-xs font-medium text-white/70">
      {label}

      {required && <span className="ml-1 text-[#22c55e]">*</span>}
    </label>

    {children}
  </div>
);

// ============================================================
// Insert Button
// ============================================================

const InsertButton = ({
  type,
  label,
  icon,
  className = "",
  onClick,
}: {
  type: InsertType;
  label: string;
  icon: ReactNode;
  className?: string;
  onClick: (type: InsertType) => void;
}) => (
  <button
    type="button"
    onClick={() => onClick(type)}
    className={`${TOOL_BUTTON_CLASS} ${className}`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

// ============================================================
// Universal Markdown Preview
// ============================================================

// ============================================================
// Main Page
// ============================================================

const SendEmailPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>("compose");

  const [receiverEmail, setReceiverEmail] = useState("");
  const [subject, setSubject] = useState("");

  const [senderName, setSenderName] = useState("GDG Ranchi Team");

  const [senderEmail, setSenderEmail] = useState("info@gdgranchi.in");

  const [content, setContent] = useState(
    `Hi Aman,

We are excited to share some updates with you!

![GDG Event Banner](https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800)

### Key Highlights

- **Hands-on Technical Workshops**
- **Interactive Q&A** with Google Developer Experts
- Connect with the developer community

> 💡 **Note:** Make sure to join our official Discord server for real-time announcements.

\`\`\`javascript
const community = "GDG Ranchi";

console.log(\`Welcome to \${community}!\`);
\`\`\`

<a href="https://gdgranchi.in" style="background-color:#22c55e;color:#000000;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;display:inline-block;font-family:sans-serif;">Reserve Your Seat</a>

---

Best regards,

**GDG Ranchi Team**`,
  );

  const [sendType, setSendType] = useState<SendType>("now");

  const [scheduledDateTime, setScheduledDateTime] = useState("2026-08-20T10:00");

  const [isTestSent, setIsTestSent] = useState(false);

  // ==========================================================
  // Handlers
  // ==========================================================

  const handleInsertElement = (type: InsertType) => {
    setContent((current) => current + INSERT_SNIPPETS[type]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!receiverEmail || !subject || !content.trim()) {
      return;
    }

    navigate("/member/emails");
  };

  const handleTestEmail = () => {
    setIsTestSent(true);

    window.setTimeout(() => {
      setIsTestSent(false);
    }, 3000);
  };

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <div className="mx-auto min-h-full w-full max-w-5xl px-4 py-6 text-white sm:px-6 sm:py-8">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="mb-6 flex flex-col gap-4 border-b border-[#232830] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/member/emails")}
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              border border-[#232830]
              bg-[#161a1f]
              text-white/60
              transition
              hover:border-[#343b46]
              hover:bg-[#1b2027]
              hover:text-white
            "
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Send Email</h1>

            <p className="mt-0.5 text-xs text-white/45">Compose and preview a rich email</p>
          </div>
        </div>

        {/* Tabs */}

        <div className="flex w-full rounded-xl border border-[#232830] bg-[#161a1f] p-1 sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab("compose")}
            className={`
              flex flex-1 items-center
              justify-center gap-2
              rounded-lg px-4 py-2
              text-xs font-medium
              transition sm:flex-none
              ${
                activeTab === "compose"
                  ? "bg-[#153e25] text-[#4ade80]"
                  : "text-white/50 hover:text-white"
              }
            `}
          >
            <Edit3 size={14} />
            Compose
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`
              flex flex-1 items-center
              justify-center gap-2
              rounded-lg px-4 py-2
              text-xs font-medium
              transition sm:flex-none
              ${
                activeTab === "preview"
                  ? "bg-[#153e25] text-[#4ade80]"
                  : "text-white/50 hover:text-white"
              }
            `}
          >
            <Eye size={14} />
            Preview
          </button>
        </div>
      </header>

      {/* ======================================================
          COMPOSE
      ====================================================== */}

      {activeTab === "compose" ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* ==================================================
              BASIC INFORMATION
          ================================================== */}

          <Section
            title="Basic Information"
            description="Set the sender, recipient and subject"
            icon={<Zap size={14} />}
          >
            <div className="space-y-4">
              <Field label="Receiver Email Address" required>
                <input
                  type="email"
                  required
                  value={receiverEmail}
                  onChange={(event) => setReceiverEmail(event.target.value)}
                  placeholder="member@example.com"
                  className={INPUT_CLASS}
                />
              </Field>

              <Field label="Subject Line" required>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  placeholder="e.g. 🚀 Important Community Update"
                  className={INPUT_CLASS}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Sender Name">
                  <input
                    type="text"
                    value={senderName}
                    onChange={(event) => setSenderName(event.target.value)}
                    placeholder="GDG Ranchi Team"
                    className={INPUT_CLASS}
                  />
                </Field>

                <Field label="Sender Email Address">
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(event) => setSenderEmail(event.target.value)}
                    placeholder="info@gdgranchi.in"
                    className={INPUT_CLASS}
                  />
                </Field>
              </div>
            </div>
          </Section>

          {/* ==================================================
              EMAIL CONTENT
          ================================================== */}

          <Section
            title="Email Content"
            description="Write your message using Markdown"
            icon={<Edit3 size={14} />}
          >
            <div className="space-y-4">
              {/* Toolbar */}

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-white/70">Insert Elements</span>

                  <span className="text-[10px] text-white/30">Markdown supported</span>
                </div>

                <div className="flex flex-wrap gap-2 rounded-xl border border-[#232830] bg-[#121519] p-2">
                  <InsertButton
                    type="image"
                    label="Image"
                    icon={<ImageIcon size={13} />}
                    className="text-[#4ade80] hover:border-[#22c55e]"
                    onClick={handleInsertElement}
                  />

                  <InsertButton
                    type="code"
                    label="Code"
                    icon={<Code2 size={13} />}
                    className="text-[#60a5fa] hover:border-[#3b82f6]"
                    onClick={handleInsertElement}
                  />

                  <InsertButton
                    type="link"
                    label="Link"
                    icon={<Link2 size={13} />}
                    className="text-[#facc15] hover:border-[#eab308]"
                    onClick={handleInsertElement}
                  />

                  <InsertButton
                    type="button"
                    label="CTA"
                    icon={<SquareCode size={13} />}
                    className="text-[#c084fc] hover:border-[#a855f7]"
                    onClick={handleInsertElement}
                  />

                  <InsertButton
                    type="callout"
                    label="Callout"
                    icon={<Quote size={13} />}
                    className="text-[#fb923c] hover:border-[#f97316]"
                    onClick={handleInsertElement}
                  />

                  <InsertButton
                    type="divider"
                    label="Divider"
                    icon={<Minus size={13} />}
                    className="text-white/60 hover:border-white/30"
                    onClick={handleInsertElement}
                  />
                </div>
              </div>

              {/* Editor */}

              <Field label="Content Body" required>
                <textarea
                  name="content"
                  id="content"
                  rows={15}
                  required
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  placeholder="Write your email content..."
                  className="
                    w-full resize-y
                    rounded-xl
                    border border-[#232830]
                    bg-[#121519]
                    h-[35vh]
                    p-4
                    font-mono
                    text-xs
                    leading-6
                    text-white
                    placeholder-white/25
                    outline-none
                    transition
                    focus:border-[#22c55e]
                  "
                />

                <div className="mt-2 flex justify-between text-[10px] text-white/30">
                  <span>Supports Markdown, GFM, tables and code.</span>

                  <span>{content.length} chars</span>
                </div>
              </Field>
            </div>
          </Section>

          {/* ==================================================
              DELIVERY
          ================================================== */}

          <Section
            title="Delivery"
            description="Choose when you want to send this email"
            icon={<Send size={14} />}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-5">
                <label className="flex cursor-pointer items-center gap-2 text-xs text-white/75">
                  <input
                    type="radio"
                    name="sendType"
                    checked={sendType === "now"}
                    onChange={() => setSendType("now")}
                    className="accent-[#22c55e]"
                  />
                  <Send size={13} className="text-[#4ade80]" />
                  Send immediately
                </label>

                <label className="flex cursor-pointer items-center gap-2 text-xs text-white/75">
                  <input
                    type="radio"
                    name="sendType"
                    checked={sendType === "schedule"}
                    onChange={() => setSendType("schedule")}
                    className="accent-[#22c55e]"
                  />
                  <Clock3 size={13} className="text-[#60a5fa]" />
                  Schedule for later
                </label>
              </div>

              {sendType === "schedule" && (
                <input
                  type="datetime-local"
                  value={scheduledDateTime}
                  onChange={(event) => setScheduledDateTime(event.target.value)}
                  className="
                    rounded-xl
                    border border-[#232830]
                    bg-[#121519]
                    px-3.5 py-2
                    text-xs text-white
                    outline-none
                    focus:border-[#22c55e]
                  "
                />
              )}
            </div>
          </Section>

          {/* ==================================================
              ACTIONS
          ================================================== */}

          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={handleTestEmail}
              className="
                inline-flex items-center
                justify-center gap-2
                rounded-xl
                border border-[#232830]
                bg-[#161a1f]
                px-4 py-2.5
                text-xs font-medium
                text-white/70
                transition
                hover:border-[#343b46]
                hover:bg-[#1b2027]
                hover:text-white
              "
            >
              <Mail size={14} />

              {isTestSent ? "✓ Test Email Sent" : "Send Test Email"}
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => navigate("/member/emails")}
                className="
                  flex-1 rounded-xl
                  border border-[#232830]
                  bg-[#161a1f]
                  px-5 py-2.5
                  text-xs font-medium
                  text-white/60
                  transition
                  hover:bg-[#1b2027]
                  hover:text-white
                  sm:flex-none
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  flex flex-1 items-center
                  justify-center gap-2
                  rounded-xl
                  bg-[#22c55e]
                  px-6 py-2.5
                  text-xs font-semibold
                  text-black
                  shadow-lg
                  shadow-green-500/10
                  transition
                  hover:bg-[#16a34a]
                  sm:flex-none
                "
              >
                <Sparkles size={14} />

                {sendType === "now" ? "Send Email" : "Schedule Email"}
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* ======================================================
           PREVIEW
        ====================================================== */

        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-[#2b323d] bg-white shadow-2xl">
            {/* Email Meta */}

            <div className="border-b border-gray-200 bg-gray-50 px-5 py-4 sm:px-6">
              <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  From:{" "}
                  <strong className="text-gray-800">
                    {senderName} &lt;
                    {senderEmail}
                    &gt;
                  </strong>
                </span>

                <span>
                  To:{" "}
                  <strong className="text-gray-800">
                    {receiverEmail || "recipient@example.com"}
                  </strong>
                </span>
              </div>

              <h2 className="mt-3 text-lg font-bold text-gray-950">
                {subject || "Your Subject Line"}
              </h2>
            </div>

            {/* Email Body */}

            <div className="p-5 sm:p-8">
              <div className="mb-7 flex items-center gap-2.5">
                <img src="/GDG_Logo.svg" alt="GDG Ranchi" className="h-7 w-auto" />

                <span className="text-base font-bold text-gray-950">GDG Ranchi</span>
              </div>

              <MarkdownPreview content={content} />

              <div className="mt-8 border-t border-gray-100 pt-4 text-[11px] leading-5 text-gray-400">
                You are receiving this email because you are a registered member of Google Developer
                Groups Ranchi.
              </div>
            </div>
          </div>

          {/* Preview Footer */}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <AlertCircle size={14} />
              <span>Live email preview</span>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("compose")}
              className="
                inline-flex items-center
                justify-center gap-2
                rounded-xl
                bg-[#22c55e]
                px-5 py-2.5
                text-xs font-semibold
                text-black
                transition
                hover:bg-[#16a34a]
              "
            >
              <Edit3 size={14} />
              Edit Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendEmailPage;
