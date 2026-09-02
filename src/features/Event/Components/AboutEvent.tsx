import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";


import type { EventResponse } from "../type/Event.type";


interface AboutEventProps {
  event: EventResponse;
}

const AboutEvent = ({ event }: AboutEventProps) => {

  // console.log(shortDescription , descriptionMarkdown)

  return (
    <section
      className="w-[70%] py-2 sm:py-8 px-8 rounded-2xl border border-white/[0.08]
bg-gradient-to-br from-[#111315] via-[#0b0d0e] to-[#070808]"
    >
      {/* Header */}
      <div className="max-w-3xl">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles size={13} strokeWidth={1.8} className="text-[#34A853]" />

          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#34A853]">
            Discover the event
          </span>
        </div>

        <h2 className="text-2xl font-semibold tracking-[-0.025em] text-white sm:text-3xl">
          About the Event
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-[15px]">
          {event.shortDescription}
        </p>
      </div>

      {/* Subtle divider */}
      <div className="my-8 h-px w-full bg-white/[0.07]" />

      {/* Markdown */}
      <article
        className="
          max-w-4xl

          [&>h1]:text-2xl
          [&>h1]:font-semibold
          [&>h1]:tracking-tight
          [&>h1]:text-white

          [&>h2]:mt-10
          [&>h2]:text-lg
          [&>h2]:font-semibold
          [&>h2]:tracking-tight
          [&>h2]:text-white
          [&>h2:first-child]:mt-0

          [&>h3]:mt-8
          [&>h3]:text-base
          [&>h3]:font-semibold
          [&>h3]:text-white/80

          [&>p]:mt-4
          [&>p]:text-sm
          [&>p]:leading-7
          [&>p]:text-white/45

          [&>ul]:mt-5
          [&>ul]:space-y-3

          [&>ol]:mt-5
          [&>ol]:space-y-3

          [&>blockquote]:my-7
          [&>blockquote]:border-l
          [&>blockquote]:border-[#34A853]/40
          [&>blockquote]:pl-5
          [&>blockquote]:text-white/45

          [&>hr]:my-8
          [&>hr]:border-white/[0.07]
          [&>table]:w-full
        "
      >
        <ReactMarkdown
          
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <h1>{children}</h1>,

            h2: ({ children }) => <h2>{children}</h2>,

            h3: ({ children }) => <h3>{children}</h3>,

            p: ({ children }) => <p>{children}</p>,

            ul: ({ children }) => <ul>{children}</ul>,

            ol: ({ children }) => <ol>{children}</ol>,

            li: ({ children }) => (
              <li className="flex items-start gap-3 text-sm leading-6 text-white/45">
                <span className="mt-[7px] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#34A853]/10">
                  <Check size={9} strokeWidth={2.5} className="text-[#34A853]" />
                </span>

                <span>{children}</span>
              </li>
            ),

            strong: ({ children }) => (
              <strong className="font-semibold text-white/75">{children}</strong>
            ),

            em: ({ children }) => <em className="text-white/60">{children}</em>,

            blockquote: ({ children }) => <blockquote>{children}</blockquote>,

            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#4285F4] transition-colors hover:text-[#6ea2ff]"
              >
                {children}

                <ArrowUpRight size={12} strokeWidth={1.8} />
              </a>
            ),

            hr: () => <hr />,

            code: ({ children }) => (
              <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-xs text-[#34A853]">
                {children}
              </code>
            ),

            pre: ({ children }) => (
              <pre className="my-6 overflow-x-auto rounded-lg bg-white/[0.035] p-4 text-xs text-white/60">
                {children}
              </pre>
            ),

            table: ({ children }) => (
              <div className="my-6 overflow-x-auto">
                <table className="w-full min-w-[500px] text-left text-sm">{children}</table>
              </div>
            ),

            th: ({ children }) => (
              <th className="border-b border-white/[0.08] px-4 py-3 font-medium text-white/70">
                {children}
              </th>
            ),

            td: ({ children }) => (
              <td className="border-b border-white/[0.05] px-4 py-3 text-white/40">{children}</td>
            ),
          }}
        >
          {event.descriptionMarkdown}
        </ReactMarkdown>
      </article>
    </section>
  );
};

export default AboutEvent;
