import { useState } from "react";
import {
  Mail,
  Users,
  Eye,
  BarChart2,
  MoreVertical,
  Trash2,
  Copy,
  Send,
  Clock,
  CheckCircle,
  FileEdit,
} from "lucide-react";
import type { EmailCampaignItem, CampaignStatus } from "../data/emails.data";

interface CampaignTableProps {
  campaigns: EmailCampaignItem[];
  onViewCampaign: (campaign: EmailCampaignItem) => void;
  onCloneCampaign: (campaign: EmailCampaignItem) => void;
  onDeleteCampaign?: (id: string) => void;
}

const CampaignTable = ({
  campaigns,
  onViewCampaign,
  onCloneCampaign,
  onDeleteCampaign,
}: CampaignTableProps) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const getStatusBadge = (status: CampaignStatus) => {
    switch (status) {
      case "Sent":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e5433] bg-[#153e25] px-2.5 py-1 text-xs font-medium text-[#4ade80]">
            <CheckCircle size={12} />
            <span>Sent</span>
          </span>
        );
      case "Scheduled":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#1d3d66] bg-[#152c4a] px-2.5 py-1 text-xs font-medium text-[#60a5fa]">
            <Clock size={12} />
            <span>Scheduled</span>
          </span>
        );
      case "Draft":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#4e3216] bg-[#382410] px-2.5 py-1 text-xs font-medium text-[#fbbf24]">
            <FileEdit size={12} />
            <span>Draft</span>
          </span>
        );
      case "Sending":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#442661] bg-[#2f1c42] px-2.5 py-1 text-xs font-medium text-[#c084fc]">
            <span className="h-2 w-2 rounded-full bg-[#a855f7] animate-ping" />
            <span>Sending...</span>
          </span>
        );
      case "Failed":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#521c1f] bg-[#381113] px-2.5 py-1 text-xs font-medium text-[#ef4444]">
            <span>Failed</span>
          </span>
        );
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#232830] bg-[#161a1f] w-full">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#232830] bg-[#121519] text-xs font-semibold uppercase tracking-wider text-white/50">
              <th className="py-4 pl-5 pr-3 font-medium text-white/60">CAMPAIGN</th>
              <th className="py-4 px-3 font-medium text-white/60">AUDIENCE</th>
              <th className="py-4 px-3 font-medium text-white/60">PERFORMANCE</th>
              <th className="py-4 px-3 font-medium text-white/60">STATUS</th>
              <th className="py-4 px-3 font-medium text-white/60">DATE & SENDER</th>
              <th className="py-4 px-4 text-right font-medium text-white/60">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#20252e]">
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-white/40">
                  No email campaigns found matching your search or filters.
                </td>
              </tr>
            ) : (
              campaigns.map((camp) => (
                <tr key={camp.id} className="group transition-colors hover:bg-[#1b2027]">
                  {/* Campaign Title & Subject */}
                  <td className="py-4 pl-5 pr-3">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#143321] text-[#22c55e] border border-[#1c472d]">
                        <Mail size={18} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-sm font-semibold text-white group-hover:text-white">
                          {camp.title}
                        </h4>
                        <p className="mt-0.5 truncate text-xs text-white/50 max-w-sm">
                          {camp.subject}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Audience & Recipients */}
                  <td className="py-4 px-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded-md border border-[#2b323d] bg-[#121519] px-2 py-0.5 text-[11px] font-medium text-white/80">
                          {camp.audience}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#4ade80]">
                        <Users size={12} className="text-white/40" />
                        <span>{camp.recipientCount.toLocaleString()} Recipients</span>
                      </div>
                    </div>
                  </td>

                  {/* Performance Metrics */}
                  <td className="py-4 px-3">
                    {camp.status === "Sent" ? (
                      <div className="min-w-[140px]">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-white/60">
                            Open: <strong className="text-white">{camp.openRate}</strong>
                          </span>
                          <span className="text-white/60">
                            CTR: <strong className="text-[#60a5fa]">{camp.clickRate}</strong>
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#121519]">
                          <div
                            className="h-full rounded-full bg-[#22c55e]"
                            style={{ width: camp.openRate || "0%" }}
                          />
                        </div>
                        <p className="mt-1 text-[10px] text-white/40">
                          {camp.deliveredCount.toLocaleString()} delivered ({camp.deliveryRate})
                        </p>
                      </div>
                    ) : camp.status === "Scheduled" ? (
                      <span className="text-xs text-[#60a5fa]">Awaiting broadcast</span>
                    ) : (
                      <span className="text-xs text-white/40">Not broadcasted</span>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-3">{getStatusBadge(camp.status)}</td>

                  {/* Date & Sender */}
                  <td className="py-4 px-3">
                    <div>
                      <p className="text-xs font-semibold text-white/90">
                        {camp.sentDate || camp.scheduledDate || "Saved as Draft"}
                      </p>
                      <p className="text-[11px] text-white/40">by {camp.senderName}</p>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="relative py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View / Preview */}
                      <button
                        type="button"
                        onClick={() => onViewCampaign(camp)}
                        title="Preview email"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                      >
                        <Eye size={14} />
                      </button>

                      {/* Clone */}
                      <button
                        type="button"
                        onClick={() => onCloneCampaign(camp)}
                        title="Duplicate campaign"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                      >
                        <Copy size={14} />
                      </button>

                      {/* Analytics */}
                      <button
                        type="button"
                        onClick={() => onViewCampaign(camp)}
                        title="View analytics"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                      >
                        <BarChart2 size={14} />
                      </button>

                      {/* Context action menu */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setActiveMenuId(activeMenuId === camp.id ? null : camp.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#262b33] bg-[#121519] text-white/50 transition-colors hover:border-[#3a424e] hover:bg-[#1b2027] hover:text-white"
                        >
                          <MoreVertical size={14} />
                        </button>

                        {activeMenuId === camp.id && (
                          <>
                            <div
                              className="fixed inset-0 z-20"
                              onClick={() => setActiveMenuId(null)}
                            />
                            <div className="absolute right-0 top-9 z-30 w-48 rounded-xl border border-[#2b323d] bg-[#1b2027] p-1.5 shadow-xl">
                              <button
                                type="button"
                                onClick={() => {
                                  onViewCampaign(camp);
                                  setActiveMenuId(null);
                                }}
                                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                              >
                                <Eye size={14} />
                                <span>Preview Email Body</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  onCloneCampaign(camp);
                                  setActiveMenuId(null);
                                }}
                                className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 transition hover:bg-[#232932] hover:text-white"
                              >
                                <Send size={14} />
                                <span>Resend Campaign</span>
                              </button>

                              {onDeleteCampaign && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    onDeleteCampaign(camp.id);
                                    setActiveMenuId(null);
                                  }}
                                  className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-xs text-[#f87171] transition hover:bg-[#38181a] hover:text-rose-300"
                                >
                                  <Trash2 size={14} />
                                  <span>Delete Campaign</span>
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignTable;
