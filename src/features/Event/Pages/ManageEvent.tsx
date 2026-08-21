import { useEffect, useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";

import { initialEventsList, type EventItem } from "../data/events.data";

import EventStatsCards from "../Components/EventStatsCards";
import EventFilterBar from "../Components/EventFilterBar";
import EventTable from "../Components/EventTable";
import EventPagination from "../Components/EventPagination";
import CreateEventModal from "../Components/CreateEventModal";
import EventDetailsModal from "../Components/EventDetailsModal";

const ALL = "All";
const DEFAULT_PAGE_SIZE = 10;

const escapeCsvValue = (value: unknown) => {
  const stringValue = String(value ?? "");

  return /[",\n\r]/.test(stringValue) ? `"${stringValue.replace(/"/g, '""')}"` : stringValue;
};

const ManageEvent = () => {
  /* -------------------------------------------------------------------------- */
  /* State                                                                      */
  /* -------------------------------------------------------------------------- */

  const [events, setEvents] = useState<EventItem[]>(initialEventsList);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [selectedStatus, setSelectedStatus] = useState(ALL);
  const [selectedVisibility, setSelectedVisibility] = useState(ALL);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  /* -------------------------------------------------------------------------- */
  /* Derived State                                                              */
  /* -------------------------------------------------------------------------- */

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        !normalizedSearch ||
        event.title.toLowerCase().includes(normalizedSearch) ||
        event.category.toLowerCase().includes(normalizedSearch) ||
        event.location.toLowerCase().includes(normalizedSearch) ||
        event.venue.toLowerCase().includes(normalizedSearch) ||
        event.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch));

      const matchesCategory = selectedCategory === ALL || event.category === selectedCategory;

      const matchesStatus = selectedStatus === ALL || event.status === selectedStatus;

      const matchesVisibility =
        selectedVisibility === ALL || event.visibility === selectedVisibility;

      return matchesSearch && matchesCategory && matchesStatus && matchesVisibility;
    });
  }, [events, normalizedSearch, selectedCategory, selectedStatus, selectedVisibility]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / pageSize));

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedEvents = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;

    return filteredEvents.slice(startIndex, startIndex + pageSize);
  }, [filteredEvents, safeCurrentPage, pageSize]);

  const selectedEvent = useMemo(
    () => (selectedEventId ? (events.find((event) => event.id === selectedEventId) ?? null) : null),
    [events, selectedEventId],
  );

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    selectedCategory !== ALL ||
    selectedStatus !== ALL ||
    selectedVisibility !== ALL;

  /* -------------------------------------------------------------------------- */
  /* Statistics                                                                 */
  /* -------------------------------------------------------------------------- */

  const computedStats = useMemo(() => {
    return {
      totalEvents: {
        value: events.length,
        trend: "Total events",
      },

      upcomingEvents: {
        value: events.filter((event) => event.status === "UPCOMING").length,
        label: "Starting soon",
      },

      ongoingEvents: {
        value: events.filter((event) => event.status === "ONGOING").length,
        label: "Live now",
      },

      completedEvents: {
        value: events.filter((event) => event.status === "COMPLETED").length,
        label: "Completed",
      },

      cancelledEvents: {
        value: events.filter((event) => event.status === "CANCELLED").length,
        label: "Cancelled",
      },
    };
  }, [events]);

  /* -------------------------------------------------------------------------- */
  /* Pagination Safety                                                          */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* -------------------------------------------------------------------------- */
  /* Filters                                                                    */
  /* -------------------------------------------------------------------------- */

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const handleVisibilityChange = (visibility: string) => {
    setSelectedVisibility(visibility);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory(ALL);
    setSelectedStatus(ALL);
    setSelectedVisibility(ALL);
    setCurrentPage(1);
  };

  /* -------------------------------------------------------------------------- */
  /* Event Actions                                                              */
  /* -------------------------------------------------------------------------- */

  const handleCreateEvent = (eventData: Omit<EventItem, "id" | "percentage">) => {
    const percentage =
      eventData.maxRegistrations > 0
        ? Math.round((eventData.registrations / eventData.maxRegistrations) * 100)
        : 0;

    const newEvent: EventItem = {
      ...eventData,
      id: crypto.randomUUID(),
      percentage,
    };

    setEvents((previous) => [newEvent, ...previous]);
    setCurrentPage(1);
    setIsCreateModalOpen(false);
  };

  const handleCancelEvent = (id: string) => {
    setEvents((previous) =>
      previous.map((event) =>
        event.id === id
          ? {
              ...event,
              status: "CANCELLED",
            }
          : event,
      ),
    );
  };

  /* -------------------------------------------------------------------------- */
  /* CSV Export                                                                 */
  /* -------------------------------------------------------------------------- */

  const handleExportCSV = () => {
    if (!filteredEvents.length) return;

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

    const rows = filteredEvents.map((event) => [
      event.title,
      event.category,
      event.status,
      event.mode,
      event.date,
      event.time,
      event.venue,
      event.location,
      event.registrations,
      event.maxRegistrations,
    ]);

    const csv = [headers, ...rows].map((row) => row.map(escapeCsvValue).join(",")).join("\r\n");

    const blob = new Blob([`\uFEFF${csv}`], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `gdg-ranchi-events-${new Date().toISOString().slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  /* -------------------------------------------------------------------------- */
  /* Event Details                                                              */
  /* -------------------------------------------------------------------------- */

  const handleViewEvent = (event: EventItem) => {
    setSelectedEventId(event.id);
  };

  const handleCloseDetails = () => {
    setSelectedEventId(null);
  };

  /* -------------------------------------------------------------------------- */
  /* Render                                                                     */
  /* -------------------------------------------------------------------------- */

  return (
    <main className="w-full min-w-0 px-4 py-5 text-white sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Manage Events</h1>

          <p className="mt-1 text-sm text-white/50">
            View, manage and organize all community events.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={!filteredEvents.length}
            className="
              inline-flex items-center gap-2 rounded-xl
              border border-white/10 bg-white/[0.03]
              px-4 py-2.5 text-sm font-medium text-white/80
              transition
              hover:border-white/15 hover:bg-white/[0.06]
              hover:text-white
              disabled:cursor-not-allowed disabled:opacity-40
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-emerald-500/50
            "
          >
            <Download size={16} />
            <span>Export</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="
              inline-flex items-center gap-2 rounded-xl
              bg-emerald-500 px-4 py-2.5
              text-sm font-semibold text-black
              transition
              hover:bg-emerald-400
              active:scale-[0.98]
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-emerald-500/50
            "
          >
            <Plus size={17} strokeWidth={2.5} />
            <span>Create Event</span>
          </button>
        </div>
      </header>

      {/* Stats */}
      <section className="mb-6">
        <EventStatsCards stats={computedStats} />
      </section>

      {/* Filters */}
      <section className="mb-4">
        <EventFilterBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          selectedVisibility={selectedVisibility}
          onVisibilityChange={handleVisibilityChange}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </section>

      {/* Table */}
      <section className="mb-4 min-w-0">
        <EventTable
          events={paginatedEvents}
          onViewEvent={handleViewEvent}
          onEditEvent={handleViewEvent}
          onDeleteEvent={handleCancelEvent}
        />
      </section>

      {/* Pagination */}
      <EventPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        totalEvents={filteredEvents.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1);
        }}
      />

      {/* Create Event */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateEvent={handleCreateEvent}
      />

      {/* Event Details */}
      <EventDetailsModal
        isOpen={Boolean(selectedEventId)}
        event={selectedEvent}
        onClose={handleCloseDetails}
      />
    </main>
  );
};

export default ManageEvent;
