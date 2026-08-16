import { useState, useMemo } from "react";
import { Send, Download } from "lucide-react";
import {
  initialCampaignsList,
  initialEmailStats,
  type EmailCampaignItem,
} from "../data/emails.data";
import EmailStatsCards from "../Components/EmailStatsCards";
import EmailFilterBar from "../Components/EmailFilterBar";
import CampaignTable from "../Components/CampaignTable";
import EmailPagination from "../Components/EmailPagination";
import SendBulkEmailModal from "../Components/SendBulkEmailModal";
import CampaignDetailsModal from "../Components/CampaignDetailsModal";

const ManageEmailsPage = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaignItem[]>(initialCampaignsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals
  const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaignItem | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Filtered Campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((camp) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        camp.title.toLowerCase().includes(q) ||
        camp.subject.toLowerCase().includes(q) ||
        camp.senderName.toLowerCase().includes(q) ||
        (camp.tags && camp.tags.some((t) => t.toLowerCase().includes(q)));

      const matchesAudience = selectedAudience === "All" || camp.audience === selectedAudience;
      const matchesStatus = selectedStatus === "All" || camp.status === selectedStatus;

      return matchesSearch && matchesAudience && matchesStatus;
    });
  }, [campaigns, searchQuery, selectedAudience, selectedStatus]);

  // Paginated Campaigns
  const totalPages = Math.ceil(filteredCampaigns.length / pageSize) || 1;
  const paginatedCampaigns = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCampaigns.slice(start, start + pageSize);
  }, [filteredCampaigns, currentPage, pageSize]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedAudience("All");
    setSelectedStatus("All");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" || selectedAudience !== "All" || selectedStatus !== "All";

  // Handlers
  const handleSendCampaign = (newCampaignData: Omit<EmailCampaignItem, "id">) => {
    const newCamp: EmailCampaignItem = {
      ...newCampaignData,
      id: `cmp-${Date.now()}`,
    };
    setCampaigns((prev) => [newCamp, ...prev]);
  };

  const handleCloneCampaign = (camp: EmailCampaignItem) => {
    const cloned: EmailCampaignItem = {
      ...camp,
      id: `cmp-${Date.now()}`,
      title: `${camp.title} (Copy)`,
      status: "Draft",
      sentDate: undefined,
      scheduledDate: undefined,
    };
    setCampaigns((prev) => [cloned, ...prev]);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      "Campaign Title",
      "Subject",
      "Audience",
      "Recipient Count",
      "Delivered",
      "Open Rate",
      "Click Rate",
      "Status",
      "Sender",
    ];

    const rows = filteredCampaigns.map((c) => [
      `"${c.title}"`,
      `"${c.subject}"`,
      `"${c.audience}"`,
      c.recipientCount,
      `"${c.deliveryRate}"`,
      `"${c.openRate}"`,
      `"${c.clickRate}"`,
      `"${c.status}"`,
      `"${c.senderName}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `gdg_ranchi_email_campaigns_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-full w-full py-5 px-4 sm:px-6 lg:px-8 text-white max-w-full">
      {/* Header Section */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Email Campaigns & Bulk Mailer
          </h1>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            Create, schedule, and broadcast bulk emails to community members and event attendees.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-xl border border-[#232830] bg-[#161a1f] px-4 py-2.5 text-xs font-semibold text-white/90 transition-colors hover:border-[#2f3540] hover:bg-[#1a1f26] hover:text-white"
          >
            <Download size={15} strokeWidth={2} />
            <span>Export Analytics</span>
          </button>

          <button
            type="button"
            onClick={() => setIsComposeModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
          >
            <Send size={15} strokeWidth={2.5} />
            <span>Send Bulk Email</span>
          </button>
        </div>
      </div>

      {/* 5 Stats Cards Grid */}
      <div className="mb-6">
        <EmailStatsCards stats={initialEmailStats} />
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-4">
        <EmailFilterBar
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          selectedAudience={selectedAudience}
          onAudienceChange={(aud) => {
            setSelectedAudience(aud);
            setCurrentPage(1);
          }}
          selectedStatus={selectedStatus}
          onStatusChange={(status) => {
            setSelectedStatus(status);
            setCurrentPage(1);
          }}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Campaigns Table */}
      <div className="mb-4">
        <CampaignTable
          campaigns={paginatedCampaigns}
          onViewCampaign={(camp) => {
            setSelectedCampaign(camp);
            setIsDetailsModalOpen(true);
          }}
          onCloneCampaign={handleCloneCampaign}
          onDeleteCampaign={handleDeleteCampaign}
        />
      </div>

      {/* Pagination */}
      <EmailPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCampaigns={filteredCampaigns.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => setPageSize(size)}
      />

      {/* Send Bulk Email Modal */}
      <SendBulkEmailModal
        isOpen={isComposeModalOpen}
        onClose={() => setIsComposeModalOpen(false)}
        onSendCampaign={handleSendCampaign}
      />

      {/* Campaign Details Modal */}
      <CampaignDetailsModal
        isOpen={isDetailsModalOpen}
        campaign={selectedCampaign}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedCampaign(null);
        }}
      />
    </div>
  );
};

export default ManageEmailsPage;
