import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid2X2,
  Loader2,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import clsx from "clsx";

import useFetchEventWithFilter from "../hook/useFetchEventWithFilter";
import { SearchableDropdown } from "../../../Components/SearchableDropdown";

import type { Filters, PublicEvent, RegistrationFilter } from "../type/Event.type";
import { EVENT_CONSTANT } from "../Constant/Event.Constant";
import EventCard from "../Components/EventCard";
import GDGLoader from "../../../Components/GDGLoader";

export const EventStatus = {
  REGISTRATION_OPEN: "REGISTRATION_OPEN",
  REGISTRATION_CLOSED: "REGISTRATION_CLOSED",
  LIVE: "LIVE",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];

const COMMON_TAGS = [
  "AI",
  "Machine Learning",
  "Web Development",
  "Cloud",
  "Cybersecurity",
  "Data Science",
  "Open Source",
  "DevOps",
  "Startup",
  "Leadership",
  "Design",
  "Marketing",
  "Finance",
  "Community",
  "Hackathon",
  "Workshop",
  "Networking",
] as const;

const EVENTS_PER_PAGE = 6;

const INITIAL_FILTERS: Filters = {
  search: "",
  category: "",
  status: "all",
  selectedTags: [],
};

const STATUS_OPTIONS: {
  label: string;
  value: RegistrationFilter;
}[] = [
  {
    label: "All Events",
    value: "all",
  },
  {
    label: "Registration Open",
    value: EventStatus.REGISTRATION_OPEN,
  },
  {
    label: "Registration Closed",
    value: EventStatus.REGISTRATION_CLOSED,
  },
  {
    label: "Live",
    value: EventStatus.LIVE,
  },
  {
    label: "Completed",
    value: EventStatus.COMPLETED,
  },
  {
    label: "Cancelled",
    value: EventStatus.CANCELLED,
  },
];

const getPaginationRange = (currentPage: number, totalPages: number): (number | string)[] => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis-right", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "ellipsis-left",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis-left",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-right",
    totalPages,
  ];
};

const Events = () => {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(filters.search.trim());
    }, 350);

    return () => window.clearTimeout(timer);
  }, [filters.search]);

  useEffect(() => {
    if (!filterOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFilterOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [filterOpen]);

  const updateFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((previous) => ({
      ...previous,
      [key]: value,
    }));

    setCurrentPage(1);
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setFilters((previous) => ({
      ...previous,
      selectedTags: previous.selectedTags.includes(tag)
        ? previous.selectedTags.filter((item) => item !== tag)
        : [...previous.selectedTags, tag],
    }));

    setCurrentPage(1);
  }, []);

  const clearTags = useCallback(() => {
    setFilters((previous) => ({
      ...previous,
      selectedTags: [],
    }));

    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setDebouncedSearch("");
    setCurrentPage(1);
  }, []);

  const apiFilters = useMemo(
    () => ({
      page: currentPage,
      limit: EVENTS_PER_PAGE,
      search: debouncedSearch || undefined,
      category: filters.category || undefined,
      status: filters.status === "all" ? undefined : filters.status,
      tags: filters.selectedTags.length > 0 ? filters.selectedTags.join(",") : undefined,
    }),
    [currentPage, debouncedSearch, filters.category, filters.status, filters.selectedTags],
  );

  const { data, isPending, isLoading, isFetching, isError, error, refetch } =
    useFetchEventWithFilter(apiFilters);

  const events = data?.events ?? [];
  const pagination = data?.pagination;

  const totalEvents = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 1;
  const hasNextPage = pagination?.hasNextPage ?? false;
  const hasPreviousPage = pagination?.hasPreviousPage ?? false;

  const paginationRange = useMemo(
    () => getPaginationRange(currentPage, totalPages),
    [currentPage, totalPages],
  );

  const startResult = totalEvents === 0 ? 0 : (currentPage - 1) * EVENTS_PER_PAGE + 1;

  const endResult = totalEvents === 0 ? 0 : Math.min(currentPage * EVENTS_PER_PAGE, totalEvents);

  const activeFilterCount =
    (filters.category ? 1 : 0) + (filters.status !== "all" ? 1 : 0) + filters.selectedTags.length;

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages || page === currentPage) {
        return;
      }

      setCurrentPage(page);

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    },
    [currentPage, totalPages],
  );

  if (isPending && isLoading) {
    return (
      <GDGLoader />
    );
  }

  if (isError && !data) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-5 text-white">
        <Background />

        <div className="relative w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#080808] p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/[0.05]">
            <RefreshCw size={20} className="text-red-400" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-white">Unable to load events</h2>

          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Something went wrong while fetching the events. Please try again.
          </p>

          {error?.message && <p className="mt-3 text-xs text-zinc-700">{error.message}</p>}

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-xs font-semibold text-black transition hover:bg-lime-300"
          >
            <RefreshCw size={14} />
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Background />

      <section className="relative border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/[0.05] px-4 py-2">
              <Sparkles size={13} className="text-lime-400" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-lime-300">
                Discover Experiences
              </span>
            </div>

            <h1 className="mt-7 text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
              Find your next
              <span className="block bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent">
                great experience.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
              Explore conferences, workshops, meetups and community experiences designed to help you
              learn, connect and build.
            </p>

            <div className="group relative mx-auto mt-10 max-w-2xl">
              <div className="absolute -inset-1 rounded-2xl bg-lime-400/[0.025] opacity-0 blur-xl transition group-focus-within:opacity-100" />

              <div className="relative flex h-14 items-center rounded-2xl border border-white/[0.1] bg-[#080808] px-4 transition focus-within:border-lime-400/30">
                <Search
                  size={18}
                  className="shrink-0 text-zinc-500 transition group-focus-within:text-lime-400"
                />

                <input
                  type="search"
                  value={filters.search}
                  onChange={(event) => updateFilter("search", event.target.value)}
                  placeholder="Search events, technologies or topics..."
                  className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-600"
                />

                {filters.search && (
                  <button
                    type="button"
                    onClick={() => updateFilter("search", "")}
                    aria-label="Clear search"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-7 flex justify-center">
              <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                <Zap size={13} className="text-lime-400" />

                <span>
                  {totalEvents} curated {totalEvents === 1 ? "experience" : "experiences"} waiting
                  for you
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {STATUS_OPTIONS.map((option) => (
            <StatusButton
              key={option.value}
              label={option.label}
              active={filters.status === option.value}
              onClick={() => updateFilter("status", option.value)}
            />
          ))}
        </div>

        <div ref={resultsRef} className="scroll-mt-8" />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025]">
              <Grid2X2 size={17} className="text-lime-400" />
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">Explore Events</h2>

              <p className="mt-1 text-xs text-zinc-600">
                {totalEvents === 0
                  ? "No events found"
                  : `Showing ${startResult}–${endResult} of ${totalEvents} events`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className="relative flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-[#080808] px-3.5 text-xs font-medium text-zinc-400 transition hover:border-white/[0.16] hover:text-white"
          >
            <SlidersHorizontal size={15} />

            <span>Filters</span>

            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-lime-400 px-1 text-[9px] font-bold text-black">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="relative">
          {isFetching && (
            <div className="pointer-events-none absolute right-0 top-5 z-20 flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/80 px-3 py-1.5 text-[10px] text-zinc-500 backdrop-blur-xl">
              <Loader2 size={11} className="animate-spin text-lime-400" />
              Updating...
            </div>
          )}

          {events.length > 0 ? (
            <section
              className={clsx("mt-8 transition-opacity duration-200", isFetching && "opacity-60")}
            >
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {events.map((event: PublicEvent) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  pages={paginationRange}
                  hasNextPage={hasNextPage}
                  hasPreviousPage={hasPreviousPage}
                  onChange={handlePageChange}
                />
              )}
            </section>
          ) : (
            <EmptyState onClear={clearFilters} />
          )}
        </div>
      </main>

      {filterOpen && (
        <FilterDrawer
          filters={filters}
          onClose={() => setFilterOpen(false)}
          onClear={clearFilters}
          onClearTags={clearTags}
          onCategoryChange={(value) => updateFilter("category", value)}
          onToggleTag={toggleTag}
        />
      )}
    </div>
  );
};

const Background = memo(() => (
  <>
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />

    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-1/2 top-[-280px] h-[650px] w-[900px] -translate-x-1/2 rounded-full bg-lime-400/[0.055] blur-[180px]" />

      <div className="absolute left-[5%] top-[35%] h-[250px] w-[250px] rounded-full bg-emerald-500/[0.025] blur-[140px]" />

      <div className="absolute right-[5%] top-[20%] h-[300px] w-[300px] rounded-full bg-lime-300/[0.02] blur-[150px]" />
    </div>
  </>
));

Background.displayName = "Background";

const StatusButton = memo(
  ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "relative shrink-0 overflow-hidden rounded-xl border px-4 py-2.5 text-xs font-medium transition-all duration-300",
        active
          ? "border-lime-400/30 bg-lime-400/[0.09] text-lime-300"
          : "border-white/[0.08] bg-[#080808] text-zinc-500 hover:border-white/[0.16] hover:text-zinc-300",
      )}
    >
      {active && <span className="absolute inset-x-4 bottom-0 h-px bg-lime-400" />}

      {label}
    </button>
  ),
);

StatusButton.displayName = "StatusButton";

const Pagination = memo(
  ({
    currentPage,
    totalPages,
    pages,
    hasNextPage,
    hasPreviousPage,
    onChange,
  }: {
    currentPage: number;
    totalPages: number;
    pages: (number | string)[];
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onChange: (page: number) => void;
  }) => (
    <nav
      className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/[0.07] pt-7 sm:flex-row"
      aria-label="Event pagination"
    >
      <p className="text-xs text-zinc-600">
        Page <span className="font-medium text-zinc-300">{currentPage}</span> of {totalPages}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={!hasPreviousPage}
          onClick={() => onChange(currentPage - 1)}
          aria-label="Previous page"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-500 transition hover:border-white/[0.15] hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((page, index) =>
          typeof page === "string" ? (
            <span
              key={`${page}-${index}`}
              className="flex h-9 w-6 items-center justify-center text-xs text-zinc-600"
            >
              •••
            </span>
          ) : (
            <button
              key={page}
              type="button"
              onClick={() => onChange(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={clsx(
                "flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-medium transition",
                currentPage === page
                  ? "bg-lime-400 text-black"
                  : "border border-white/[0.08] text-zinc-500 hover:border-white/[0.15] hover:text-white",
              )}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={!hasNextPage}
          onClick={() => onChange(currentPage + 1)}
          aria-label="Next page"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-500 transition hover:border-white/[0.15] hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  ),
);

Pagination.displayName = "Pagination";

const FilterDrawer = memo(
  ({
    filters,
    onClose,
    onClear,
    onClearTags,
    onCategoryChange,
    onToggleTag,
  }: {
    filters: Filters;
    onClose: () => void;
    onClear: () => void;
    onClearTags: () => void;
    onCategoryChange: (value: string) => void;
    onToggleTag: (tag: string) => void;
  }) => (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <aside className="absolute bottom-0 left-0 right-0 max-h-[90vh] overflow-hidden rounded-t-3xl border-t border-white/[0.1] bg-[#090909] shadow-2xl sm:bottom-auto sm:left-auto sm:right-6 sm:top-1/2 sm:w-[430px] sm:-translate-y-1/2 sm:rounded-2xl sm:border">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-lime-400" />

              <h3 className="text-sm font-semibold text-white">Filter Events</h3>
            </div>

            <p className="mt-1 text-xs text-zinc-600">Refine your discovery</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-zinc-500 transition hover:bg-white/[0.05] hover:text-white"
          >
            <X size={17} />
          </button>
        </div>

        <div className="max-h-[60vh] space-y-7 overflow-y-auto p-6">
          <SearchableDropdown
            label="Category"
            options={EVENT_CONSTANT}
            value={filters.category}
            onChange={onCategoryChange}
            placeholder="Search category..."
          />

          <div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-medium text-zinc-300">Popular Topics</h4>

                <p className="mt-1 text-[11px] text-zinc-600">Select one or more topics</p>
              </div>

              {filters.selectedTags.length > 0 && (
                <button
                  type="button"
                  onClick={onClearTags}
                  className="text-[11px] font-medium text-lime-400 transition hover:text-lime-300"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {COMMON_TAGS.map((tag) => {
                const selected = filters.selectedTags.includes(tag);

                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => onToggleTag(tag)}
                    className={clsx(
                      "inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[11px] font-medium transition-all",
                      selected
                        ? "border-lime-400/30 bg-lime-400/[0.1] text-lime-300"
                        : "border-white/[0.08] bg-white/[0.02] text-zinc-500 hover:border-white/[0.15] hover:text-zinc-300",
                    )}
                  >
                    {selected && <Check size={11} />}
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t border-white/[0.07] p-5">
          <button
            type="button"
            onClick={onClear}
            className="h-11 rounded-xl border border-white/[0.08] px-4 text-xs font-medium text-zinc-500 transition hover:text-white"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white text-xs font-semibold text-black transition hover:bg-lime-300"
          >
            Show Events
            <ArrowRight size={14} />
          </button>
        </div>
      </aside>
    </div>
  ),
);

FilterDrawer.displayName = "FilterDrawer";

const EmptyState = memo(({ onClear }: { onClear: () => void }) => (
  <div className="mt-8 flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.1] bg-white/[0.01] px-5 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.025]">
      <Search size={22} className="text-zinc-600" />
    </div>

    <h3 className="mt-6 text-base font-semibold text-white">No events found</h3>

    <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-600">
      We couldn't find any events matching your current search and filters.
    </p>

    <button
      type="button"
      onClick={onClear}
      className="mt-6 rounded-xl border border-white/[0.1] px-4 py-2.5 text-xs font-medium text-zinc-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
    >
      Clear all filters
    </button>
  </div>
));

EmptyState.displayName = "EmptyState";

export default Events;
