import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownPreviewProps {
  content: string;
  textColor?: string;
  backgroundColor?: string;
  linkColor?: string;
  linkUnderlineColor?: string;
  headingColor?: string;
  strongColor?: string;
  emColor?: string;
  blockquoteBgColor?: string;
  blockquoteBorderColor?: string;
  codeBgColor?: string;
  codeTextColor?: string;
  tableBorderColor?: string;
  tableHeaderBgColor?: string;
  imageBorderColor?: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({
  content,
  textColor = "text-gray-700",
  backgroundColor = "bg-white",
  linkColor = "text-green-600",
  linkUnderlineColor = "decoration-green-300",
  headingColor = "text-gray-950",
  strongColor = "text-gray-950",
  emColor = "text-gray-600",
  blockquoteBgColor = "bg-green-50",
  blockquoteBorderColor = "border-green-500",
 
  tableBorderColor = "border-gray-200",
  tableHeaderBgColor = "bg-gray-50",

}) => {
  return (
    <article
      className={`
        ${backgroundColor}
        max-w-none break-words ${textColor}
        [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:${headingColor}
        [&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:${headingColor}
        [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:${headingColor}
        [&_h4]:mb-2 [&_h4]:mt-5 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:${headingColor}
        [&_h5]:mb-2 [&_h5]:mt-4 [&_h5]:font-semibold [&_h5]:${headingColor}
        [&_h6]:mb-2 [&_h6]:mt-4 [&_h6]:text-sm [&_h6]:font-semibold [&_h6]:${headingColor}
        [&_p]:mb-4 [&_p]:text-sm [&_p]:leading-7
        [&_ul]:mb-5 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:space-y-1.5
        [&_ol]:mb-5 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:space-y-1.5
        [&_li]:text-sm [&_li]:leading-6
        [&_a]:font-semibold [&_a]:${linkColor} [&_a]:underline [&_a]:${linkUnderlineColor} [&_a]:underline-offset-2 [&_a]:transition-colors [&_a:hover]:text-green-700
        [&_strong]:font-semibold [&_strong]:${strongColor}
        [&_em]:italic [&_em]:${emColor}
        [&_blockquote]:my-5 [&_blockquote]:rounded-r-xl [&_blockquote]:border-l-4 [&_blockquote]:${blockquoteBorderColor} [&_blockquote]:${blockquoteBgColor} [&_blockquote]:px-4 [&_blockquote]:py-3
        [&_hr]:my-7 [&_hr]:border-gray-200
        [&_img]:my-6 [&_img]:max-h-[420px] [&_img]:w-full [&_img]:rounded-2xl [&_img]:object-cover [&_img]:shadow-sm
        [&_del]:text-gray-400 [&_del]:line-through
        [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
        [&_th]:border [&_th]:${tableBorderColor} [&_th]:${tableHeaderBgColor} [&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-900
        [&_td]:border [&_td]:${tableBorderColor} [&_td]:px-4 [&_td]:py-3
      `}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          pre: ({ children }) => (
            <pre className="my-5 overflow-x-auto rounded-2xl border border-gray-800 bg-[#0d1117] p-4 shadow-inner">
              {children}
            </pre>
          ),

          code: ({ className, children }) => {
            const isBlock = Boolean(className);
            return (
              <code
                className={
                  isBlock
                    ? "font-mono text-xs leading-6 text-[#7ee787]"
                    : `rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-green-700`
                }
              >
                {children}
              </code>
            );
          },

          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt || "Email image"}
              loading="lazy"
              className="my-6 max-h-[420px] w-full rounded-2xl object-cover shadow-sm"
            />
          ),

          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),

          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-gray-200">
              <table>{children}</table>
            </div>
          ),

          input: ({ checked, ...props }) => (
            <input
              {...props}
              type="checkbox"
              checked={checked}
              disabled
              className="mr-2 accent-green-500"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownPreview;
