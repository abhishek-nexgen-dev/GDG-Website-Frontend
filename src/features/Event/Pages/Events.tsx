import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,

} from "react";
import {

  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Grid2X2,
  Search,
  SlidersHorizontal,
  Sparkles,
  Tag,
  X,
  Zap,
} from "lucide-react";
import clsx from "clsx";

export interface PublicEvent {
  _id: string;
  Slug: string;
  title: string;
  shortDescription: string;
  redirectUrl: string;
  tags: string[];
  coverImageUrl: string;
  registrationStartAt: string;
  registrationEndAt: string;
}

type RegistrationStatus = "all" | "upcoming" | "open" | "closed";
type SortOption = "date" | "latest" | "alphabetical";

interface Filters {
  search: string;
  status: RegistrationStatus;
  selectedTags: string[];
  sortBy: SortOption;
}

const EVENTS_PER_PAGE = 6;

const events: PublicEvent[] = [
  {
    _id: "6a55bc39c4a80708f25f391b",
    Slug: "ai-summit-ranchi-2027-ede24567",
    title: "AI Summit Ranchi 2027",
    shortDescription:
      "A two-day AI conference featuring Generative AI, LLMs, Cloud AI, workshops, keynote sessions, and startup showcases.",
    redirectUrl: "https://aisummitranchi.dev",
    tags: [
      "AI",
      "LLM",
      "Machine Learning",
      "Cloud",
      "Google Cloud",
      "Gemini",
      "GenAI",
      "Conference",
      "Workshop",
      "Networking",
    ],
    coverImageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=90",
    registrationStartAt: "2027-10-01T09:00:00.000Z",
    registrationEndAt: "2027-11-10T23:59:59.000Z",
  },
  {
    _id: "6a55bc39c4a80708f25f392a",
    Slug: "devfest-ranchi-2027-ae923f",
    title: "DevFest Ranchi 2027",
    shortDescription:
      "A community-driven technology conference bringing developers together for learning, networking, and innovation.",
    redirectUrl: "https://devfest.gdgranchi.org",
    tags: [
      "Technology",
      "Web",
      "Android",
      "Cloud",
      "Firebase",
      "AI",
      "Community",
    ],
    coverImageUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=90",
    registrationStartAt: "2027-09-15T09:00:00.000Z",
    registrationEndAt: "2027-10-20T23:59:59.000Z",
  },
  {
    _id: "6a55bc39c4a80708f25f392b",
    Slug: "build-with-gemini-workshop-2027",
    title: "Build with Gemini",
    shortDescription:
      "An intensive hands-on workshop focused on building real-world applications using Gemini and modern Generative AI.",
    redirectUrl: "https://gdgranchi.org/events/gemini-workshop",
    tags: [
      "Gemini",
      "AI",
      "GenAI",
      "Workshop",
      "Google Cloud",
    ],
    coverImageUrl:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=90",
    registrationStartAt: "2027-08-10T09:00:00.000Z",
    registrationEndAt: "2027-08-25T23:59:59.000Z",
  },
  {
    _id: "6a55bc39c4a80708f25f392c",
    Slug: "cloud-native-ranchi-meetup-2027",
    title: "Cloud Native Ranchi Meetup",
    shortDescription:
      "Connect with cloud-native enthusiasts and learn about Kubernetes, containers, DevOps, and scalable infrastructure.",
    redirectUrl: "https://gdgranchi.org/events/cloud-native",
    tags: [
      "Cloud",
      "Kubernetes",
      "Docker",
      "DevOps",
      "CNCF",
    ],
    coverImageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=90",
    registrationStartAt: "2027-07-05T09:00:00.000Z",
    registrationEndAt: "2027-07-18T23:59:59.000Z",
  },
  {
    _id: "6a55bc39c4a80708f25f392d",
    Slug: "open-source-contribution-day-2027",
    title: "Open Source Contribution Day",
    shortDescription:
      "A collaborative event where developers learn Git, GitHub workflows, and contribute to open-source projects.",
    redirectUrl: "https://gdgranchi.org/events/open-source",
    tags: [
      "Open Source",
      "GitHub",
      "Git",
      "Community",
      "Workshop",
    ],
    coverImageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=90",
    registrationStartAt: "2027-06-01T09:00:00.000Z",
    registrationEndAt: "2027-06-15T23:59:59.000Z",
  },
  {
    _id: "6a55bc39c4a80708f25f392e",
    Slug: "women-techmakers-ranchi-2027",
    title: "Women Techmakers Ranchi",
    shortDescription:
      "A celebration of technology, innovation, leadership, and diversity featuring inspiring talks and workshops.",
    redirectUrl: "https://gdgranchi.org/events/wtm",
    tags: [
      "Women Techmakers",
      "Leadership",
      "Technology",
      "Community",
      "Networking",
    ],
    coverImageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=90",
    registrationStartAt: "2027-05-10T09:00:00.000Z",
    registrationEndAt: "2027-05-28T23:59:59.000Z",
  },
  {
    _id: "6a55bc39c4a80708f25f392f",
    Slug: "web-development-bootcamp-2027",
    title: "Modern Web Development Bootcamp",
    shortDescription:
      "Learn modern frontend development, React architecture, APIs, performance optimization and production workflows.",
    redirectUrl: "https://gdgranchi.org/events/web",
    tags: [
      "Web",
      "React",
      "JavaScript",
      "Frontend",
      "Workshop",
    ],
    coverImageUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=90",
    registrationStartAt: "2027-04-12T09:00:00.000Z",
    registrationEndAt: "2027-04-30T23:59:59.000Z",
  },
  {
    _id: "6a55bc39c4a80708f25f3930",
    Slug: "android-community-day-2027",
    title: "Android Community Day",
    shortDescription:
      "Explore modern Android development, Jetpack Compose, Kotlin, Firebase and the latest Google ecosystem tools.",
    redirectUrl: "https://gdgranchi.org/events/android",
    tags: [
      "Android",
      "Kotlin",
      "Firebase",
      "Mobile",
      "Google",
    ],
    coverImageUrl:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1200&q=90",
    registrationStartAt: "2027-03-08T09:00:00.000Z",
    registrationEndAt: "2027-03-20T23:59:59.000Z",
  },
  {
    _id: "6a55bc39c4a80708f25f3931",
    Slug: "startup-connect-ranchi-2027",
    title: "Startup Connect Ranchi",
    shortDescription:
      "A networking experience for founders, developers, designers and aspiring entrepreneurs building the future.",
    redirectUrl: "https://gdgranchi.org/events/startup-connect",
    tags: [
      "Startup",
      "Networking",
      "Business",
      "Innovation",
      "Community",
    ],
    coverImageUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=90",
    registrationStartAt: "2027-02-14T09:00:00.000Z",
    registrationEndAt: "2027-02-28T23:59:59.000Z",
  },
];


// GET /api/v1/events
// ?page=1
// &limit=6
// &search=AI
// &status=published
// &tags=AI,Cloud
// &sort=date


const initialFilters: Filters = {
  search: "",
  status: "all",
  selectedTags: [],
  sortBy: "date",
};

const statusConfig = {
  upcoming: {
    label: "Coming Soon",
    dot: "bg-blue-400",
    className:
      "border-blue-400/20 bg-blue-400/[0.08] text-blue-300",
  },
  open: {
    label: "Registration Open",
    dot: "bg-lime-400",
    className:
      "border-lime-400/20 bg-lime-400/[0.08] text-lime-300",
  },
  closed: {
    label: "Registration Closed",
    dot: "bg-zinc-500",
    className:
      "border-white/[0.08] bg-black/50 text-zinc-400",
  },
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const getEventStatus = (
  event: PublicEvent,
): Exclude<RegistrationStatus, "all"> => {
  const now = Date.now();
  const start = new Date(
    event.registrationStartAt,
  ).getTime();
  const end = new Date(
    event.registrationEndAt,
  ).getTime();

  if (now < start) return "upcoming";
  if (now > end) return "closed";

  return "open";
};

const getPaginationRange = (
  currentPage: number,
  totalPages: number,
) => {
  if (totalPages <= 7) {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1,
    );
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
  const [filters, setFilters] =
    useState<Filters>(initialFilters);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [filterOpen, setFilterOpen] =
    useState(false);

  const [sortOpen, setSortOpen] =
    useState(false);

  const resultsRef =
    useRef<HTMLDivElement>(null);

  const sortRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent,
    ) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(
          event.target as Node,
        )
      ) {
        setSortOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  useEffect(() => {
    if (!filterOpen) return;

    const handleEscape = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setFilterOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [filterOpen]);

  const updateFilter = useCallback(
    <K extends keyof Filters>(
      key: K,
      value: Filters[K],
    ) => {
      setFilters((previous) => ({
        ...previous,
        [key]: value,
      }));

      setCurrentPage(1);
    },
    [],
  );

  const toggleTag = useCallback(
    (tag: string) => {
      setFilters((previous) => {
        const exists =
          previous.selectedTags.includes(tag);

        return {
          ...previous,
          selectedTags: exists
            ? previous.selectedTags.filter(
                (item) => item !== tag,
              )
            : [
                ...previous.selectedTags,
                tag,
              ],
        };
      });

      setCurrentPage(1);
    },
    [],
  );

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);

      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    },
    [],
  );

  const allTags = useMemo(() => {
    const tags = new Set<string>();

    events.forEach((event) => {
      event.tags.forEach((tag) => {
        tags.add(tag);
      });
    });

    return Array.from(tags).sort(
      (a, b) => a.localeCompare(b),
    );
  }, []);

  const filteredEvents = useMemo(() => {
    const search =
      filters.search.trim().toLowerCase();

    const result = events.filter((event) => {
      const status =
        getEventStatus(event);

      const searchableContent = [
        event.title,
        event.shortDescription,
        ...event.tags,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search ||
        searchableContent.includes(search);

      const matchesStatus =
        filters.status === "all" ||
        status === filters.status;

      const matchesTags =
        filters.selectedTags.length === 0 ||
        filters.selectedTags.some((tag) =>
          event.tags.includes(tag),
        );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesTags
      );
    });

    return result.sort((a, b) => {
      if (
        filters.sortBy === "alphabetical"
      ) {
        return a.title.localeCompare(
          b.title,
        );
      }

      const firstDate =
        new Date(
          a.registrationStartAt,
        ).getTime();

      const secondDate =
        new Date(
          b.registrationStartAt,
        ).getTime();

      return filters.sortBy === "latest"
        ? secondDate - firstDate
        : firstDate - secondDate;
    });
  }, [filters]);

  const totalPages = useMemo(
    () =>
      Math.max(
        1,
        Math.ceil(
          filteredEvents.length /
            EVENTS_PER_PAGE,
        ),
      ),
    [filteredEvents.length],
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedEvents = useMemo(() => {
    const start =
      (currentPage - 1) * EVENTS_PER_PAGE;

    return filteredEvents.slice(
      start,
      start + EVENTS_PER_PAGE,
    );
  }, [currentPage, filteredEvents]);

  const paginationRange = useMemo(
    () =>
      getPaginationRange(
        currentPage,
        totalPages,
      ),
    [currentPage, totalPages],
  );

  const startResult =
    filteredEvents.length === 0
      ? 0
      : (currentPage - 1) *
          EVENTS_PER_PAGE +
        1;

  const endResult = Math.min(
    currentPage * EVENTS_PER_PAGE,
    filteredEvents.length,
  );

  const activeFilterCount =
    filters.selectedTags.length +
    (filters.status !== "all" ? 1 : 0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Background />

      <section className="relative border-b border-white/[0.07]">
        <div className="mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-8 sm:pb-20 sm:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/[0.05] px-4 py-2">
              <Sparkles
                size={13}
                className="text-lime-400"
              />

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
              Explore conferences, workshops,
              meetups and community experiences
              designed to help you learn, connect
              and build.
            </p>

            <div className="group relative mx-auto mt-10 max-w-2xl">
              <div className="absolute -inset-1 rounded-2xl bg-lime-400/[0.025] opacity-0 blur-xl transition group-focus-within:opacity-100" />

              <div className="relative flex h-14 items-center rounded-2xl border border-white/[0.1] bg-[#080808] px-4 transition focus-within:border-lime-400/30">
                <Search
                  size={18}
                  className="text-zinc-500 transition group-focus-within:text-lime-400"
                />

                <input
                  type="search"
                  value={filters.search}
                  onChange={(event) =>
                    updateFilter(
                      "search",
                      event.target.value,
                    )
                  }
                  placeholder="Search events, technologies or topics..."
                  className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-zinc-600"
                />

                {filters.search && (
                  <button
                    type="button"
                    onClick={() =>
                      updateFilter(
                        "search",
                        "",
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-600 transition hover:bg-white/[0.06] hover:text-white"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="mt-7 flex justify-center">
              <div className="flex items-center gap-2 text-[11px] text-zinc-600">
                <Zap
                  size={13}
                  className="text-lime-400"
                />

                <span>
                  {events.length}+ curated
                  experiences waiting for you
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          <StatusButton
            label="All Events"
            active={filters.status === "all"}
            onClick={() =>
              updateFilter("status", "all")
            }
          />

          <StatusButton
            label="Registration Open"
            active={filters.status === "open"}
            onClick={() =>
              updateFilter("status", "open")
            }
          />

          <StatusButton
            label="Coming Soon"
            active={
              filters.status === "upcoming"
            }
            onClick={() =>
              updateFilter(
                "status",
                "upcoming",
              )
            }
          />

          <StatusButton
            label="Closed"
            active={
              filters.status === "closed"
            }
            onClick={() =>
              updateFilter(
                "status",
                "closed",
              )
            }
          />
        </div>

        <div
          ref={resultsRef}
          className="scroll-mt-8"
        />

        <div className="mt-10 flex flex-wrap items-end justify-between gap-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025]">
              <Grid2X2
                size={17}
                className="text-lime-400"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">
                Explore Events
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                {filteredEvents.length === 0
                  ? "No events found"
                  : `Showing ${startResult}–${endResult} of ${filteredEvents.length} events`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setFilterOpen(true)
              }
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

            <SortDropdown
              sortRef={sortRef}
              open={sortOpen}
              value={filters.sortBy}
              onToggle={() =>
                setSortOpen(
                  (previous) => !previous,
                )
              }
              onChange={(value) => {
                updateFilter(
                  "sortBy",
                  value,
                );
                setSortOpen(false);
              }}
            />
          </div>
        </div>

        {paginatedEvents.length > 0 ? (
          <>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedEvents.map(
                (event, index) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    priority={
                      currentPage === 1 &&
                      index < 3
                    }
                  />
                ),
              )}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pages={paginationRange}
                onChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <EmptyState
            onClear={clearFilters}
          />
        )}
      </main>

      {filterOpen && (
        <FilterDrawer
          tags={allTags}
          filters={filters}
          onClose={() =>
            setFilterOpen(false)
          }
          onToggleTag={toggleTag}
          onClear={clearFilters}
        />
      )}
    </div>
  );
};

const Background = () => {
  return (
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
  );
};

const StatusButton = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
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
      {active && (
        <span className="absolute inset-x-4 bottom-0 h-px bg-lime-400" />
      )}

      {label}
    </button>
  );
};

const SortDropdown = ({
  sortRef,
  open,
  value,
  onToggle,
  onChange,
}: {
  sortRef: React.RefObject<HTMLDivElement | null>;
  open: boolean;
  value: SortOption;
  onToggle: () => void;
  onChange: (value: SortOption) => void;
}) => {
  const options: {
    label: string;
    value: SortOption;
  }[] = [
    {
      label: "Upcoming Date",
      value: "date",
    },
    {
      label: "Latest",
      value: "latest",
    },
    {
      label: "Alphabetical",
      value: "alphabetical",
    },
  ];

  return (
    <div
      ref={sortRef}
      className="relative"
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.08] bg-[#080808] px-3.5 text-xs font-medium text-zinc-400 transition hover:border-white/[0.16] hover:text-white"
      >
        <span className="hidden sm:inline">
          Sort
        </span>

        <ChevronDown
          size={15}
          className={clsx(
            "transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-xl border border-white/[0.1] bg-[#0b0b0b] p-1.5 shadow-2xl shadow-black">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                onChange(option.value)
              }
              className={clsx(
                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs transition",
                value === option.value
                  ? "bg-lime-400/[0.08] text-lime-300"
                  : "text-zinc-500 hover:bg-white/[0.04] hover:text-white",
              )}
            >
              {option.label}

              {value === option.value && (
                <Check size={14} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const EventCard = ({
  event,
  priority,
}: {
  event: PublicEvent;
  priority: boolean;
}) => {
  const status = getEventStatus(event);
  const config = statusConfig[status];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080808] transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_25px_70px_rgba(0,0,0,0.8)]">


  


      <div className="relative aspect-[16/10] overflow-hidden">

      
        <img
          src={event.coverImageUrl}
          alt={event.title}
          loading={priority ? "eager" : "lazy"}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

        <div className="absolute left-3 top-3">
          <span
            className={clsx(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[9px] font-semibold backdrop-blur-xl",
              config.className,
            )}
          >
            <span
              className={clsx(
                "h-1.5 w-1.5 rounded-full",
                config.dot,
              )}
            />

            {config.label}
          </span>
        </div>

        <a
          href={event.redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Explore ${event.title}`}
          className="absolute right-3 top-3 flex h-9 w-9 translate-y-[-8px] items-center justify-center rounded-xl border border-white/[0.12] bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-zinc-600">
          <Tag size={11} />

          <span className="truncate">
            {event.tags.slice(0, 3).join(" · ")}
          </span>
        </div>

        <h3 className="mt-3 line-clamp-1 text-base font-semibold tracking-tight text-zinc-100 transition group-hover:text-lime-300">
          {event.title}
        </h3>

        <p className="mt-2 line-clamp-3 text-xs leading-5 text-zinc-600">
          {event.shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-white/[0.06] pt-4">
          <div className="flex items-center gap-2">
            <CalendarDays
              size={13}
              className="text-lime-400/70"
            />

            <span className="text-[10px] text-zinc-500">
              {formatDate(
                event.registrationStartAt,
              )}
            </span>
          </div>

          <a
            href={event.redirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] font-medium text-zinc-600 transition hover:text-lime-400"
          >
            Details

            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </article>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  pages,
  onChange,
}: {
  currentPage: number;
  totalPages: number;
  pages: (number | string)[];
  onChange: (page: number) => void;
}) => {
  return (
    <nav
      className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/[0.07] pt-7 sm:flex-row"
      aria-label="Event pagination"
    >
      <p className="text-xs text-zinc-600">
        Page{" "}
        <span className="font-medium text-zinc-300">
          {currentPage}
        </span>{" "}
        of {totalPages}
      </p>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onChange(currentPage - 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-500 transition hover:border-white/[0.15] hover:text-white disabled:pointer-events-none disabled:opacity-30"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {pages.map((page, index) => {
          if (typeof page === "string") {
            return (
              <span
                key={`${page}-${index}`}
                className="flex h-9 w-6 items-center justify-center text-xs text-zinc-600"
              >
                •••
              </span>
            );
          }

          return (
            <button
              key={page}
              type="button"
              onClick={() =>
                onChange(page)
              }
              className={clsx(
                "flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-medium transition",
                currentPage === page
                  ? "bg-lime-400 text-black"
                  : "border border-white/[0.08] text-zinc-500 hover:border-white/[0.15] hover:text-white",
              )}
              aria-current={
                currentPage === page
                  ? "page"
                  : undefined
              }
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            onChange(currentPage + 1)
          }
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] text-zinc-500 transition hover:border-white/[0.15] hover:text-white disabled:pointer-events-none disabled:opacity-30"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
};

const FilterDrawer = ({
  tags,
  filters,
  onClose,
  onToggleTag,
  onClear,
}: {
  tags: string[];
  filters: Filters;
  onClose: () => void;
  onToggleTag: (tag: string) => void;
  onClear: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      <aside className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-white/[0.1] bg-[#090909] shadow-2xl sm:bottom-auto sm:left-auto sm:right-6 sm:top-1/2 sm:w-[420px] sm:-translate-y-1/2 sm:rounded-2xl sm:border">
        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <Filter
                size={16}
                className="text-lime-400"
              />

              <h3 className="text-sm font-semibold text-white">
                Filter Events
              </h3>
            </div>

            <p className="mt-1 text-xs text-zinc-600">
              Refine your discovery
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] text-zinc-500 transition hover:bg-white/[0.05] hover:text-white"
          >
            <X size={17} />
          </button>
        </div>

        <div className="max-h-[55vh] overflow-y-auto p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-medium text-zinc-300">
                Topics & Technologies
              </h4>

              <p className="mt-1 text-[11px] text-zinc-600">
                Select your interests
              </p>
            </div>

            {filters.selectedTags.length >
              0 && (
              <button
                type="button"
                onClick={onClear}
                className="text-[11px] font-medium text-lime-400 transition hover:text-lime-300"
              >
                Reset
              </button>
            )}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => {
              const selected =
                filters.selectedTags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    onToggleTag(tag)
                  }
                  className={clsx(
                    "rounded-xl border px-3 py-2 text-[11px] font-medium transition-all",
                    selected
                      ? "border-lime-400/30 bg-lime-400/[0.1] text-lime-300"
                      : "border-white/[0.08] bg-white/[0.02] text-zinc-500 hover:border-white/[0.15] hover:text-zinc-300",
                  )}
                >
                  {selected && (
                    <Check
                      size={11}
                      className="mr-1 inline"
                    />
                  )}

                  {tag}
                </button>
              );
            })}
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
  );
};

const EmptyState = ({
  onClear,
}: {
  onClear: () => void;
}) => {
  return (
    <div className="mt-8 flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/[0.1] bg-white/[0.01] px-5 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.025]">
        <Search
          size={22}
          className="text-zinc-600"
        />
      </div>

      <h3 className="mt-6 text-base font-semibold text-white">
        No events found
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-600">
        We couldn't find any events matching
        your current search and filters.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-xl border border-white/[0.1] px-4 py-2.5 text-xs font-medium text-zinc-400 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
      >
        Clear all filters
      </button>
    </div>
  );
};

export default Events;