import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";
import Swal from "sweetalert2";
import PermissionChecker from "../../Permission/Components/PermissionChecker";
import PermissionDenied from "../../Permission/Components/PermissionDenied";
import {
  AlertCircle,
  ArrowLeft,
  Clock3,
  Code2,
  Edit3,
  Eye,
  FileText,
  Globe,
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
// GDG Ranchi Community Data & Templates (gdg.community.dev/gdg-ranchi)
// ============================================================

const GDG_RANCHI_COMMUNITY_URL = "https://gdg.community.dev/gdg-ranchi/";
const GDG_RANCHI_COMMUDLE_URL = "https://www.commudle.com/communities/google-developer-group-ranchi";
const GDG_RANCHI_OFFICIAL_EMAIL = "gdgranchi@gmail.com";

interface GDGTemplate {
  id: string;
  name: string;
  badge: string;
  subject: string;
  content: string;
}

const GDG_RANCHI_TEMPLATES: GDGTemplate[] = [
  {
    id: "overview",
    name: "GDG Ranchi Chapter Welcome",
    badge: "Official",
    subject: "🚀 Welcome to Google Developer Group (GDG) Ranchi!",
    content: `# Welcome to Google Developer Group Ranchi! 🚀

Hello Developer,

We are thrilled to welcome you to **Google Developer Group (GDG) Ranchi** — the official local community of developers and technology enthusiasts in Ranchi, Jharkhand, dedicated to learning and building with Google developer technologies!

Join our official community platform to stay updated on all upcoming events and announcements:
👉 **[Visit GDG Ranchi on Community Dev](${GDG_RANCHI_COMMUNITY_URL})**

---

![GDG Ranchi DevFest & Community](https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80)

## 🌟 About Google Developer Group Ranchi

GDG Ranchi is a community-run meetup for developers, students, and tech professionals interested in Google's developer technologies. Our mission is to foster technical learning and bring together the tech community across Jharkhand to create a thriving developer ecosystem through:

- **TechTalks & Keynotes** with industry leaders and Google Developer Experts (GDEs)
- **Hands-on Workshops** covering Generative AI, Cloud, Android, Flutter, and Web
- **Hackathons & Sprints** including RanchiHacks and Code for Communities
- **DevFest Ranchi**, our premier annual technology festival

---

## 🚀 Featured Tech Stacks & Focus Areas

\`\`\`typescript
// Connect with GDG Ranchi Tech Communities
interface GDGChapter {
  name: string;
  location: string;
  platform: string;
  focusAreas: string[];
  isFreeToJoin: boolean;
}

const gdgRanchi: GDGChapter = {
  name: "Google Developer Group Ranchi",
  location: "Ranchi, Jharkhand, India",
  platform: "${GDG_RANCHI_COMMUNITY_URL}",
  focusAreas: [
    "Generative AI & Gemini API",
    "Google Cloud Platform & DevOps",
    "Android & Kotlin Multiplatform",
    "Flutter & Cross-Platform",
    "Open Source & Web Ecosystem",
  ],
  isFreeToJoin: true,
};

console.log(\`Empowering developers in \${gdgRanchi.location}!\`);
\`\`\`

> 💡 **Community Note:** All GDG Ranchi meetups and workshops are free of charge. Membership is open to all passionate developers, students, and technologists.

---

<a href="${GDG_RANCHI_COMMUNITY_URL}" style="background-color:#22c55e;color:#000000;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;font-family:sans-serif;letter-spacing:0.5px;">Join Chapter & RSVP on GDG Platform →</a>

---

### Official Community Links
- **GDG Community Dev Portal:** [${GDG_RANCHI_COMMUNITY_URL}](${GDG_RANCHI_COMMUNITY_URL})
- **Commudle Hub:** [${GDG_RANCHI_COMMUDLE_URL}](${GDG_RANCHI_COMMUDLE_URL})
- **Official Inquiries:** [${GDG_RANCHI_OFFICIAL_EMAIL}](mailto:${GDG_RANCHI_OFFICIAL_EMAIL})
- **Socials:** Follow us on LinkedIn, X, and YouTube for live streams and recaps.

Warm regards,  
**Vikas Shukla, Tushar Raj, Rishav Sinha & The GDG Ranchi Core Team**  
*Google Developer Group Ranchi, Jharkhand, India*`,
  },
  {
    id: "devfest",
    name: "DevFest Ranchi Announcement",
    badge: "Flagship",
    subject: "🎉 DevFest Ranchi 2025/2026: Passes Now Open! Reserve Your Seat",
    content: `# 🎉 DevFest Ranchi: The Biggest Developer Festival in Jharkhand!

Hello Builders & Innovators,

The wait is over! **DevFest Ranchi** is back with an extraordinary lineup of keynotes, workshops, and networking opportunities.

📅 **Date:** Saturday, October 11, 2025  
📍 **Location:** Ranchi, Jharkhand  
🎟️ **Registration:** [RSVP on gdg.community.dev](${GDG_RANCHI_COMMUNITY_URL})

---

![DevFest Ranchi Auditorium](https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80)

## ⚡ What to Expect at DevFest Ranchi

1. **AI & Machine Learning Track:** Deep dives into Gemini, Gemma open models, and Vertex AI.
2. **Cloud & Infrastructure:** Kubernetes orchestration, modern microservices, and serverless architectures.
3. **Mobile & Web:** Android 15, Compose Multiplatform, Flutter 3, and modern high-performance web tooling.
4. **Community Showcase:** Project demos, startup pitches, and lightning talks from local developers.

> ⚠️ **Important:** Seats are strictly limited to ensure quality hands-on lab access. Please RSVP early to secure your badge.

---

<a href="${GDG_RANCHI_COMMUNITY_URL}" style="background-color:#22c55e;color:#000000;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;font-family:sans-serif;">Grab Your Free DevFest Pass →</a>

---

Best regards,  
**GDG Ranchi Organizing Committee**  
*Email: ${GDG_RANCHI_OFFICIAL_EMAIL}*`,
  },
  {
    id: "build-with-ai",
    name: "Build With AI Sprint",
    badge: "Workshop",
    subject: "🤖 Build With AI: Agentic Premier League & Hands-on Workshop with GDG Ranchi",
    content: `# 🤖 Build With AI: Agentic Premier League Workshop

Hey Developers,

Generative AI is transforming software engineering. Join us for a full-day, hands-on workshop: **Build With AI: Agentic Premier League**, hosted by **Google Developer Group Ranchi**!

🔗 **Event Page:** [${GDG_RANCHI_COMMUNITY_URL}](${GDG_RANCHI_COMMUNITY_URL})

---

![Hands-on Workshop](https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80)

## 🧠 Workshop Agenda

- **Session 1:** Getting Started with the Google GenAI SDK and Gemini 2.5 / Flash models.
- **Session 2:** Tool Calling, Grounding with Google Search, and Structured Outputs.
- **Session 3:** Building Autonomous Agent Workflows with Multi-Turn Memory.
- **Hands-on Lab:** Code your own AI Assistant live with GDE mentorship.

\`\`\`typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI();
const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: "How can GDG Ranchi developers build scalable AI apps?",
});
console.log(response.text);
\`\`\`

> 💡 **Prerequisites:** Bring your laptop with Node.js 18+ or Python 3.10+ installed. Free Google Cloud credits will be distributed to attendees!

---

<a href="${GDG_RANCHI_COMMUNITY_URL}" style="background-color:#22c55e;color:#000000;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;font-family:sans-serif;">Register for Build With AI →</a>

---

Warm regards,  
**GDG Ranchi AI & Cloud Core Team**`,
  },
];

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
    "\n\n![GDG Ranchi DevFest & Community](https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80)\n\n",

  code: `\n\n\`\`\`typescript\n// Google Developer Group Ranchi Community\nconst gdgRanchi = {\n  chapter: "GDG Ranchi",\n  portal: "${GDG_RANCHI_COMMUNITY_URL}",\n  topics: ["Generative AI", "Cloud", "Android", "Web", "Flutter"],\n  status: "Active & Free to Join",\n};\nconsole.log(\`Welcome to \${gdgRanchi.chapter}!\`);\n\`\`\`\n\n`,

  link: ` [GDG Ranchi Official Chapter](${GDG_RANCHI_COMMUNITY_URL}) `,

  button: `\n\n<a href="${GDG_RANCHI_COMMUNITY_URL}" style="background-color:#22c55e;color:#000000;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;font-family:sans-serif;">RSVP on GDG Community Platform →</a>\n\n`,

  callout: `\n\n> 💡 **GDG Ranchi Notice:** All chapter events, hackathons, and study jams are free and open to all tech enthusiasts. RSVP at ${GDG_RANCHI_COMMUNITY_URL}.\n\n`,

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
// Main Page
// ============================================================

const SendEmailPage = () => {
  const navigate = useNavigate();

  // Top level views: compose form or full email mockup preview
  const [activeTab, setActiveTab] = useState<Tab>("compose");

  // Inline editor view: edit markdown vs inline preview (just like EventDescription.tsx)
  const [isEditorEdit, setIsEditorEdit] = useState<boolean>(true);

  const [receiverEmail, setReceiverEmail] = useState("developer@gdgranchi.in");
  const [subject, setSubject] = useState(GDG_RANCHI_TEMPLATES[0].subject);
  const [senderName, setSenderName] = useState("GDG Ranchi Core Team");
  const [senderEmail, setSenderEmail] = useState(GDG_RANCHI_OFFICIAL_EMAIL);

  const [content, setContent] = useState<string>(GDG_RANCHI_TEMPLATES[0].content);

  const [sendType, setSendType] = useState<SendType>("now");
  const [scheduledDateTime, setScheduledDateTime] = useState("2026-10-11T10:00");
  const [isTestSent, setIsTestSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // ==========================================================
  // Handlers
  // ==========================================================

  const handleInsertElement = (type: InsertType) => {
    setContent((current) => current + INSERT_SNIPPETS[type]);
  };

  const handleApplyTemplate = (tpl: GDGTemplate) => {
    setSubject(tpl.subject);
    setContent(tpl.content);
    Swal.fire({
      icon: "info",
      title: "Template Loaded",
      text: `"${tpl.name}" content loaded from GDG Ranchi community data.`,
      background: "#161a1f",
      color: "#ffffff",
      confirmButtonColor: "#22c55e",
      timer: 1800,
      timerProgressBar: true,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!receiverEmail || !subject || !content.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Required Fields Missing",
        text: "Please provide a recipient email, subject, and message body.",
        background: "#161a1f",
        color: "#ffffff",
        confirmButtonColor: "#22c55e",
      });
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      Swal.fire({
        icon: "success",
        title: "Email Dispatched",
        text:
          sendType === "now"
            ? `Your email has been sent successfully to ${receiverEmail}.`
            : `Your email is scheduled to be delivered to ${receiverEmail} on ${scheduledDateTime}.`,
        background: "#161a1f",
        color: "#ffffff",
        confirmButtonColor: "#22c55e",
      });
    }, 1000);
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
    <PermissionChecker
      permissionName="email:send"
      permissionAction="create"
      fallback={<PermissionDenied />}
    >
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
              title="Back to emails"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Send Email</h1>
                <a
                  href={GDG_RANCHI_COMMUNITY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-[10px] font-medium text-green-400 hover:bg-green-500/20"
                  title="Visit GDG Ranchi Official Platform"
                >
                  <Globe size={11} />
                  <span>gdg.community.dev/gdg-ranchi</span>
                </a>
              </div>

              <p className="mt-0.5 text-xs text-white/45">
                Rich Markdown editor with live preview & GDG Ranchi community data
              </p>
            </div>
          </div>

          {/* Page Tabs */}
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
              Full Email Preview
            </button>
          </div>
        </header>

        {/* ======================================================
            GDG RANCHI PRESET TEMPLATES
        ====================================================== */}
        {activeTab === "compose" && (
          <div className="mb-5 rounded-2xl border border-[#232830] bg-[#121519] p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText size={15} className="text-green-400" />
                <span className="text-xs font-semibold text-white/90">
                  GDG Ranchi Official Content Templates
                </span>
                <span className="text-[10px] text-white/40">
                  (sourced from gdg.community.dev/gdg-ranchi)
                </span>
              </div>
              <span className="text-[11px] text-white/40">Click any preset to load</span>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {GDG_RANCHI_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => handleApplyTemplate(tpl)}
                  className="group flex flex-col items-start rounded-xl border border-[#242b35] bg-[#161a20] p-3 text-left transition hover:border-[#384353] hover:bg-[#1c222a]"
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-xs font-medium text-white/90 group-hover:text-green-400 transition-colors">
                      {tpl.name}
                    </span>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold text-white/60">
                      {tpl.badge}
                    </span>
                  </div>
                  <span className="mt-1 line-clamp-1 text-[10px] text-white/40">
                    {tpl.subject}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

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
                    placeholder="developer@gdgranchi.in"
                    className={INPUT_CLASS}
                  />
                </Field>

                <Field label="Subject Line" required>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                    placeholder="e.g. 🚀 Welcome to Google Developer Group (GDG) Ranchi!"
                    className={INPUT_CLASS}
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Sender Name">
                    <input
                      type="text"
                      value={senderName}
                      onChange={(event) => setSenderName(event.target.value)}
                      placeholder="GDG Ranchi Core Team"
                      className={INPUT_CLASS}
                    />
                  </Field>

                  <Field label="Sender Email Address">
                    <input
                      type="email"
                      value={senderEmail}
                      onChange={(event) => setSenderEmail(event.target.value)}
                      placeholder={GDG_RANCHI_OFFICIAL_EMAIL}
                      className={INPUT_CLASS}
                    />
                  </Field>
                </div>
              </div>
            </Section>

            {/* ==================================================
                EMAIL CONTENT (MONACO EDITOR & MARKDOWN PREVIEW)
            ================================================== */}

            <Section
              title="Email Content"
              description="Write using Monaco text editor with live Markdown preview (just like Create Event Description)"
              icon={<Edit3 size={14} />}
            >
              <div className="space-y-4">
                {/* Quick Insert Toolbar */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-white/70">Insert Elements</span>
                    <span className="text-[10px] text-white/30">
                      Markdown supported • Monaco Editor
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 rounded-xl border border-[#232830] bg-[#121519] p-2">
                    <InsertButton
                      type="image"
                      label="Banner Image"
                      icon={<ImageIcon size={13} />}
                      className="text-[#4ade80] hover:border-[#22c55e]"
                      onClick={handleInsertElement}
                    />

                    <InsertButton
                      type="code"
                      label="Code Block"
                      icon={<Code2 size={13} />}
                      className="text-[#60a5fa] hover:border-[#3b82f6]"
                      onClick={handleInsertElement}
                    />

                    <InsertButton
                      type="link"
                      label="GDG Portal Link"
                      icon={<Link2 size={13} />}
                      className="text-[#facc15] hover:border-[#eab308]"
                      onClick={handleInsertElement}
                    />

                    <InsertButton
                      type="button"
                      label="RSVP CTA Button"
                      icon={<SquareCode size={13} />}
                      className="text-[#c084fc] hover:border-[#a855f7]"
                      onClick={handleInsertElement}
                    />

                    <InsertButton
                      type="callout"
                      label="Callout Box"
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

                {/* Monaco Editor / Markdown Preview Container (exact pattern as EventDescription.tsx) */}
                <Field label="Content Body" required>
                  <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#121519] shadow-inner">
                    {/* Header with Edit & Preview tabs like EventDescription */}
                    <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#161a1f] px-3 py-1.5">
                      <div className="flex items-center gap-2 text-[11px] text-white/50">
                        <span>Markdown Editor</span>
                        <span className="text-white/20">•</span>
                        <span>{content.length} characters</span>
                      </div>

                      <div className="flex overflow-hidden rounded-lg border border-[#2b323d] bg-[#121519]">
                        <button
                          type="button"
                          className={`px-3 py-1.5 text-xs font-medium transition-colors border-r border-[#2b323d] ${
                            isEditorEdit
                              ? "bg-[#2563EB] text-white border-[#2563EB]"
                              : "bg-[#1F2124] text-[#F8F9FA] hover:text-white"
                          }`}
                          onClick={() => setIsEditorEdit(true)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                            !isEditorEdit
                              ? "bg-[#2563EB] text-white"
                              : "text-[#9CA3AF] hover:text-white"
                          }`}
                          onClick={() => setIsEditorEdit(false)}
                        >
                          Preview
                        </button>
                      </div>
                    </div>

                    {/* Editor/Preview Content */}
                    {isEditorEdit ? (
                      <div className="py-1">
                        <MonacoEditor
                          language="markdown"
                          theme="vs-dark"
                          className="py-1.5 min-h-[380px]"
                          height="380px"
                          value={content}
                          onChange={(value) => setContent(value || "")}
                          width="100%"
                          options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            lineNumbers: "off",
                            wordWrap: "on",
                            scrollBeyondLastLine: false,
                            padding: { top: 12, bottom: 12 },
                          }}
                        />
                      </div>
                    ) : (
                      <div className="min-h-[380px] max-h-[500px] overflow-y-auto p-5 bg-[#121519]">
                        <MarkdownPreview
                          content={content}
                          textColor="text-gray-300"
                          backgroundColor="bg-transparent"
                          headingColor="text-gray-100"
                          strongColor="text-gray-100"
                          linkColor="text-green-400"
                          linkUnderlineColor="decoration-green-400"
                          blockquoteBgColor="bg-gray-800/80"
                          blockquoteBorderColor="border-green-500"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-2 flex justify-between text-[10px] text-white/30">
                    <span>
                      Supports standard Markdown, GitHub Flavored Markdown (GFM), HTML tables, and
                      syntax highlighted code.
                    </span>
                    <span>
                      Toggle <strong>Preview</strong> above to inspect formatting.
                    </span>
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
                    disabled:opacity-50 disabled:cursor-not-allowed
                    sm:flex-none
                  "
                  disabled={isSending}
                >
                  <Sparkles size={14} />

                  {isSending ? "Sending..." : sendType === "now" ? "Send Email" : "Schedule Email"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* ======================================================
             FULL EMAIL CLIENT MOCKUP PREVIEW
          ====================================================== */

          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-[#2b323d] bg-white shadow-2xl">
              {/* Email Meta */}

              <div className="border-b border-gray-200 bg-gray-50 px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-2 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                  <span>
                    From:{" "}
                    <strong className="text-gray-800">
                      {senderName} &lt;{senderEmail}&gt;
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
                <div className="mb-7 flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <img src="/GDG_Logo.svg" alt="GDG Ranchi" className="h-7 w-auto" />
                    <span className="text-base font-bold text-gray-950">GDG Ranchi</span>
                  </div>
                  <a
                    href={GDG_RANCHI_COMMUNITY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-green-600 hover:text-green-700"
                  >
                    gdg.community.dev/gdg-ranchi ↗
                  </a>
                </div>

                <MarkdownPreview content={content} />

                <div className="mt-8 border-t border-gray-100 pt-4 text-[11px] leading-5 text-gray-400">
                  You are receiving this email because you are a registered member of Google
                  Developer Group (GDG) Ranchi. Visit{" "}
                  <a
                    href={GDG_RANCHI_COMMUNITY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline"
                  >
                    gdg.community.dev/gdg-ranchi
                  </a>{" "}
                  to manage your community membership and notifications.
                </div>
              </div>
            </div>

            {/* Preview Footer */}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-white/40">
                <AlertCircle size={14} />
                <span>Live recipient mailbox preview</span>
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
                Edit Email in Monaco Editor
              </button>
            </div>
          </div>
        )}
      </div>
    </PermissionChecker>
  );
};

export default SendEmailPage;

