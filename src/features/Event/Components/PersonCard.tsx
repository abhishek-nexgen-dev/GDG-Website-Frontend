import { ExternalLink, Globe, Link2, MessageSquare, Briefcase, Video, Camera, Building2 } from "lucide-react";
import type { ApiSocialLinks } from "../../Member/v1/type/MemberDetails.type";

interface PersonProps {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  Bio?: string;
  role?: string;
  company?: string;
  socialLinks?: ApiSocialLinks;
}

const getSocialIcon = (key: string) => {
  const k = key.toLowerCase();
  if (k.includes("github")) return <ExternalLink size={14} strokeWidth={2.2} />;
  if (k.includes("linkedin")) return <Briefcase size={14} strokeWidth={2.2} />;
  if (k.includes("twitter") || k.includes("x.com")) return <MessageSquare size={14} strokeWidth={2.2} />;
  if (k.includes("youtube")) return <Video size={14} strokeWidth={2.2} />;
  if (k.includes("instagram")) return <Camera size={14} strokeWidth={2.2} />;
  if (k.includes("website") || k.includes("portfolio") || k.includes("medium")) return <Globe size={14} strokeWidth={2.2} />;
  return <Link2 size={14} strokeWidth={2.2} />;
};

const PersonCard = ({ firstName, lastName, imageUrl, Bio, role, company, socialLinks }: PersonProps) => {
  return (
    <div className="group relative flex flex-col w-[290px] sm:w-[320px] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d12] transition-all duration-500 hover:-translate-y-2 hover:border-white/25 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] hover:shadow-blue-500/10">
      {/* Top Image Container */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#15151c]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-black text-3xl font-bold text-white/40">
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </div>
        )}

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] via-[#0d0d12]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

        {/* Company / Role Badge on Top Right */}
        {company && (
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 backdrop-blur-md">
            <Building2 size={11} className="text-blue-400" />
            <span className="text-[11px] font-semibold text-white/90">{company}</span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6 -mt-6">
        {/* Role / Designation */}
        {role && (
          <div className="mb-1.5">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-400/20 px-2.5 py-0.5 rounded-full">
              {role}
            </span>
          </div>
        )}

        {/* Full Name */}
        <h4 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
          {firstName} {lastName}
        </h4>

        {/* Bio */}
        {Bio && (
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/50 line-clamp-3 flex-1">
            {Bio}
          </p>
        )}

        {/* Footer: Social Links */}
        {socialLinks && Object.values(socialLinks).some((url) => Boolean(url)) && (
          <div className="mt-4 pt-3.5 flex items-center gap-2 border-t border-white/10">
            {Object.entries(socialLinks).map(([key, url]) => {
              if (!url) return null;
              return (
                <a
                  key={key}
                  href={url as string}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/[0.05] border border-white/10 text-white/60 transition-all hover:bg-blue-500/20 hover:border-blue-400/40 hover:text-white hover:-translate-y-0.5"
                  title={key}
                >
                  {getSocialIcon(key)}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonCard;
