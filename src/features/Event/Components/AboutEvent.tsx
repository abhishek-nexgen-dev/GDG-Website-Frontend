import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowUpRight, Check, Sparkles } from "lucide-react";

import type { EventResponse } from "../type/Event.type";

interface AboutEventProps {
  event: EventResponse;
}

const AboutEvent = ({ event }: AboutEventProps) => {
  return (
    <section className="w-full py-4 sm:py-8 px-4 sm:px-8 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#111315] via-[#0b0d0e] to-[#070808]">
      {/* Header */}
      <div className="max-w-3xl mx-auto sm:mx-0">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles size={13} strokeWidth={1.8} className="text-[#34A853]" />

          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#34A853]">
            Discover the event
          </span>
        </div>

        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-[1.875rem] sm:leading-tight">
          About the Event
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45 sm:text-[15px]">
          {event.shortDescription}
        </p>
      </div>

      {/* Subtle divider */}
      <div className="my-8 h-px w-full bg-white/[0.07]" />

      {/* Markdown Content */}
      <article className="max-w-4xl mx-auto px-1 sm:px-0">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-semibold tracking-tight text-white mt-0 sm:mt-8">
                {children}
              </h1>
            ),

            h2: ({ children }) => (
              <h2 className="mt-8 text-lg font-semibold tracking-tight text-white sm:mt-10">
                {children}
              </h2>
            ),

            h3: ({ children }) => (
              <h3 className="mt-6 text-base font-semibold text-white/80 sm:mt-8">{children}</h3>
            ),

            p: ({ children }) => (
              <p className="mt-4 text-sm leading-7 text-white/45 sm:text-[15px]">{children}</p>
            ),

            ul: ({ children }) => <ul className="mt-5 space-y-3">{children}</ul>,

            ol: ({ children }) => <ol className="mt-5 space-y-3">{children}</ol>,

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

            blockquote: ({ children }) => (
              <blockquote className="my-6 sm:my-7 border-l-4 border-[#34A853]/40 pl-4 text-white/45 italic">
                {children}
              </blockquote>
            ),

            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#4285F4] transition-colors hover:text-[#6ea2ff] text-sm"
              >
                {children}
                <ArrowUpRight size={12} strokeWidth={1.8} />
              </a>
            ),

            hr: () => <hr className="my-8 border-white/[0.07]" />,

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
              <div className="my-6 overflow-x-auto rounded-lg border border-white/[0.08]">
                <table className="w-full min-w-[500px] text-left text-sm">{children}</table>
              </div>
            ),

            th: ({ children }) => (
              <th className="border-b border-white/[0.08] px-3 sm:px-4 py-3 font-medium text-white/70 text-xs sm:text-sm">
                {children}
              </th>
            ),

            td: ({ children }) => (
              <td className="border-b border-white/[0.05] px-3 sm:px-4 py-3 text-white/40 text-xs sm:text-sm">
                {children}
              </td>
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
