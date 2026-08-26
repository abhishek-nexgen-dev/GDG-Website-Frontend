"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Plus, Loader2 } from "lucide-react";

import { type EventItem } from "../type/Event.type";

import EventStatsCards from "../Components/EventStatsCards";
import EventFilterBar from "../Components/EventFilterBar";
import EventTable from "../Components/EventTable";
import EventPagination from "../Components/EventPagination";

import {
  ALL,
  DEFAULT_PAGE_SIZE,
  exportEventsToCSV,
  normalizeSearch,
  hasActiveFilters,
  computeTotalPages,
  computeSafeCurrentPage,
  computePaginationRange,
  computeStats,
  fetchAllEvents,
} from "../utils/manage-event.utils";
import { Link } from "react-router";

const ManageEvent = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [selectedStatus, setSelectedStatus] = useState(ALL);
  const [selectedVisibility, setSelectedVisibility] = useState(ALL);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const apiData = await fetchAllEvents(DEFAULT_PAGE_SIZE, 1);

        setEvents(apiData);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const normalizedSearch = useMemo(() => normalizeSearch(searchQuery), [searchQuery]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        !normalizedSearch ||
        event.title.toLowerCase().includes(normalizedSearch) ||
        event.category.toLowerCase().includes(normalizedSearch) ||
        event.venue.address.toLowerCase().includes(normalizedSearch) ||
        event.venue.venueName.toLowerCase().includes(normalizedSearch) ||
        (event.tags && event.tags.some((tag) => tag.toLowerCase().includes(normalizedSearch)));

      const matchesCategory = selectedCategory === ALL || event.category === selectedCategory;
      const matchesStatus = selectedStatus === ALL || event.status === selectedStatus;
      const matchesVisibility =
        selectedVisibility === ALL || event.visibility === selectedVisibility;

      return matchesSearch && matchesCategory && matchesStatus && matchesVisibility;
    });
  }, [events, normalizedSearch, selectedCategory, selectedStatus, selectedVisibility]);

  const totalPages = useMemo(
    () => computeTotalPages(filteredEvents.length, pageSize),
    [filteredEvents.length, pageSize],
  );

  const safeCurrentPage = useMemo(
    () => computeSafeCurrentPage(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const paginatedEvents = useMemo(() => {
    const { startIndex, endIndex } = computePaginationRange(safeCurrentPage, pageSize);
    return filteredEvents.slice(startIndex, endIndex);
  }, [filteredEvents, safeCurrentPage, pageSize]);

  const hasActiveFiltersFlag = useMemo(
    () =>
      hasActiveFilters(
        searchQuery,
        selectedCategory,
        selectedStatus,
        selectedVisibility,
        true,
        true,
        true,
      ),
    [searchQuery, selectedCategory, selectedStatus, selectedVisibility],
  );

  const computedStats = useMemo(() => computeStats(events), [events]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

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

  const handleExportCSV = () => {
    exportEventsToCSV(filteredEvents);
  };

  if (isLoading) {
    return (
      <main className="w-full min-w-0 px-4 py-5 flex items-center justify-center min-h-[50vh] text-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-emerald-500" size={32} />
          <p className="text-white/70">Loading events...</p>
        </div>
      </main>
    );
  }

  if (error && events.length === 0) {
    return (
      <main className="w-full min-w-0 px-4 py-5 text-white">
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <p className="text-red-400 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emerald-500 text-black rounded-xl font-semibold hover:bg-emerald-400 transition"
          >
            Reload Page
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-w-0 px-4 py-5 text-white sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Manage Events</h1>
          <p className="mt-1 text-md text-white/50">
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
              px-4 py-2.5 text-md font-medium text-white/80
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

          <Link
            to="/member/events/create"

            className="
              inline-flex items-center gap-2 rounded-xl
              bg-emerald-500 px-4 py-2.5
              text-md font-semibold text-black
              transition
              hover:bg-emerald-400
              active:scale-[0.98]
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-emerald-500/50
            "
          >
            <Plus size={17} strokeWidth={2.5} />
            <span>Create Event</span>
          </Link>
        </div>
      </header>

      <section className="mb-6">
        <EventStatsCards stats={computedStats} />
      </section>

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
          hasActiveFilters={hasActiveFiltersFlag}
        />
      </section>

      <section className="mb-4 min-w-0">
        <EventTable events={paginatedEvents} />
      </section>

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
    </main>
  );
};

export default ManageEvent;
