import { useState, useMemo } from "react";
import { Plus, Download } from "lucide-react";
import {
  initialEventsList,
  type EventItem,
  type EventCategory,
  type EventStatus,
  type EventVisibility,
} from "../data/events.data";
import EventStatsCards from "../Components/EventStatsCards";
import EventFilterBar from "../Components/EventFilterBar";
import EventTable from "../Components/EventTable";
import EventPagination from "../Components/EventPagination";
import CreateEventModal from "../Components/CreateEventModal";
import EventDetailsModal from "../Components/EventDetailsModal";

const ManageEvent = () => {
  const [events, setEvents] = useState<EventItem[]>(initialEventsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedVisibility, setSelectedVisibility] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Dynamic filter
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        event.title.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q) ||
        event.tags.some((tag) => tag.toLowerCase().includes(q));

      const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
      const matchesStatus = selectedStatus === "All" || event.status === selectedStatus;
      const matchesVisibility =
        selectedVisibility === "All" || event.visibility === selectedVisibility;

      return matchesSearch && matchesCategory && matchesStatus && matchesVisibility;
    });
  }, [events, searchQuery, selectedCategory, selectedStatus, selectedVisibility]);

  // Paginated events
  const totalPages = Math.ceil(filteredEvents.length / pageSize) || 1;
  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEvents.slice(start, start + pageSize);
  }, [filteredEvents, currentPage, pageSize]);

  // Dynamic computed stats
  const computedStats = useMemo(() => {
    const total = events.length;
    const upcoming = events.filter((e) => e.status === "UPCOMING").length;
    const ongoing = events.filter((e) => e.status === "ONGOING").length;
    const completed = events.filter((e) => e.status === "COMPLETED").length;
    const cancelled = events.filter((e) => e.status === "CANCELLED").length;

    return {
      totalEvents: { value: total, trend: "▲ 6 this month" },
      upcomingEvents: { value: upcoming, label: "Starting soon" },
      ongoingEvents: { value: ongoing, label: "• Live now" },
      completedEvents: { value: completed, label: "This year" },
      cancelledEvents: { value: cancelled, label: "• This year" },
    };
  }, [events]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSelectedVisibility("All");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "All" ||
    selectedStatus !== "All" ||
    selectedVisibility !== "All";

  // Create Event Handler
  const handleCreateEvent = (newEventData: Omit<EventItem, "id" | "percentage">) => {
    const percentage =
      newEventData.maxRegistrations > 0
        ? Math.round((newEventData.registrations / newEventData.maxRegistrations) * 100)
        : 0;

    const newEvent: EventItem = {
      ...newEventData,
      id: `evt-${Date.now()}`,
      percentage,
    };

    setEvents((prev) => [newEvent, ...prev]);
  };

  // Delete / Cancel Event
  const handleDeleteEvent = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "CANCELLED" as EventStatus } : e)),
    );
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      "Title",
      "Category",
      "Status",
      "Mode",
      "Date",
      "Time",
      "Venue",
      "Location",
      "Registrations",
      "Max Registrations",
    ];

    const rows = filteredEvents.map((e) => [
      `"${e.title}"`,
      `"${e.category}"`,
      `"${e.status}"`,
      `"${e.mode}"`,
      `"${e.date}"`,
      `"${e.time}"`,
      `"${e.venue}"`,
      `"${e.location}"`,
      e.registrations,
      e.maxRegistrations,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gdg_ranchi_events_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-full w-full py-5 px-4 sm:px-6 lg:px-8 text-white max-w-full">
      {/* Header Section */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Manage Events</h1>
          <p className="mt-1 text-xs text-white/50 sm:text-sm">
            View, manage and organize all community events
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
            <span>Export Events</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-[#22c55e] px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-[#16a34a]"
          >
            <Plus size={16} strokeWidth={2.5} />
            <span>Create New Event</span>
          </button>
        </div>
      </div>

      {/* 5 Stats Cards Grid */}
      <div className="mb-6">
        <EventStatsCards stats={computedStats} />
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-4">
        <EventFilterBar
          searchQuery={searchQuery}
          onSearchChange={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            setCurrentPage(1);
          }}
          selectedStatus={selectedStatus}
          onStatusChange={(status) => {
            setSelectedStatus(status);
            setCurrentPage(1);
          }}
          selectedVisibility={selectedVisibility}
          onVisibilityChange={(vis) => {
            setSelectedVisibility(vis);
            setCurrentPage(1);
          }}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Events Table */}
      <div className="mb-4">
        <EventTable
          events={paginatedEvents}
          onViewEvent={(event) => {
            setSelectedEvent(event);
            setIsDetailsModalOpen(true);
          }}
          onEditEvent={(event) => {
            setSelectedEvent(event);
            setIsDetailsModalOpen(true);
          }}
          onDeleteEvent={handleDeleteEvent}
        />
      </div>

      {/* Pagination */}
      <EventPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalEvents={filteredEvents.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => setPageSize(size)}
      />

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        event={selectedEvent}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedEvent(null);
        }}
      />
    </div>
  );
};

export default ManageEvent;
