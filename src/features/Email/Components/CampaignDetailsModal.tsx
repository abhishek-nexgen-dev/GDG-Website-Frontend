import { X, Mail, CheckCircle2, Eye, MousePointerClick, Users } from "lucide-react";
import type { EmailCampaignItem } from "../data/emails.data";

interface CampaignDetailsModalProps {
  campaign: EmailCampaignItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const CampaignDetailsModal = ({ campaign, isOpen, onClose }: CampaignDetailsModalProps) => {
  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 transition-opacity" onClick={onClose} />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#232830] bg-[#161a1f] p-6 shadow-2xl">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[#232830] bg-[#121519] text-white/40 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#143321] text-[#22c55e] border border-[#1c472d]">
            <Mail size={20} />
          </div>
          <div className="min-w-0 flex-1 pr-6">
            <span className="rounded-md border border-[#2b323d] bg-[#121519] px-2 py-0.5 text-[10px] font-semibold text-[#4ade80]">
              {campaign.audience}
            </span>
            <h3 className="mt-1 text-lg font-bold text-white leading-tight">{campaign.title}</h3>
            <p className="mt-0.5 text-xs text-white/50">{campaign.subject}</p>
          </div>
        </div>

        {/* 4 Metrics Funnel */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-white/40">
              <Users size={12} />
              <span>Total Target</span>
            </div>
            <h4 className="mt-1 text-lg font-bold text-white">
              {campaign.recipientCount.toLocaleString()}
            </h4>
          </div>

          <div className="rounded-xl border border-[#1e5433] bg-[#153e25]/30 p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#4ade80]">
              <CheckCircle2 size={12} />
              <span>Delivered</span>
            </div>
            <h4 className="mt-1 text-lg font-bold text-[#4ade80]">{campaign.deliveryRate}</h4>
          </div>

          <div className="rounded-xl border border-[#3b1f59] bg-[#28163d]/30 p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#c084fc]">
              <Eye size={12} />
              <span>Opened</span>
            </div>
            <h4 className="mt-1 text-lg font-bold text-[#c084fc]">{campaign.openRate}</h4>
          </div>

          <div className="rounded-xl border border-[#4e3216] bg-[#382410]/30 p-3 text-center">
            <div className="flex items-center justify-center gap-1 text-[11px] text-[#fbbf24]">
              <MousePointerClick size={12} />
              <span>Click-Through</span>
            </div>
            <h4 className="mt-1 text-lg font-bold text-[#fbbf24]">{campaign.clickRate}</h4>
          </div>
        </div>

        {/* Campaign Info Cards */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3">
            <span className="text-[10px] text-white/40">Sent By</span>
            <p className="mt-0.5 font-semibold text-white">{campaign.senderName}</p>
            <p className="text-[11px] text-white/40">{campaign.senderEmail}</p>
          </div>

          <div className="rounded-xl border border-[#232830] bg-[#121519] p-3">
            <span className="text-[10px] text-white/40">Date Dispatched</span>
            <p className="mt-0.5 font-semibold text-white">
              {campaign.sentDate || campaign.scheduledDate || "Draft"}
            </p>
            <p className="text-[11px] text-white/40">Status: {campaign.status}</p>
          </div>
        </div>

        {/* Tags */}
        {campaign.tags && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {campaign.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-[#2b323d] bg-[#121519] px-2 py-0.5 text-xs text-white/60"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Action Footer */}
        <div className="mt-5 flex items-center justify-end border-t border-[#232830] pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#232830] bg-[#121519] px-4 py-2 text-xs font-medium text-white/70 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetailsModal;
