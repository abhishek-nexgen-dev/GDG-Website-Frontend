import api from "../../../utils/axios.utils";
import type { EventItem } from "../type/Event.type";
import type { ApiResponse, findAllEventResponse } from "../type/Event.type";

export const ALL = "All";
export const DEFAULT_PAGE_SIZE = 10;

export type EscapeCsvValueInput = unknown;

export const escapeCsvValue = (value: unknown): string => {
  const stringValue = String(value ?? "");

  return /[",\n\r]/.test(stringValue) ? `"${stringValue.replace(/"/g, '""')}"` : stringValue;
};

export const exportEventsToCSV = (events: EventItem[]): void => {
  if (!events.length) return;

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

  const rows = events.map((event) => [
    event.title,
    event.category,
    event.status,
    event.coverImageUrl,
    event.registrationStartAt,
    event.tags,

    event.venue,
    event.visibility,
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

export const normalizeSearch = (query: string): string => query.trim().toLowerCase();

export const hasActiveFilters = (
  searchQuery: string,
  selectedCategory: string,
  selectedStatus: string,
  selectedVisibility: string,
  hasCategoryChange: boolean,
  hasStatusChange: boolean,
  hasVisibilityChange: boolean,
): boolean => {
  return (
    Boolean(searchQuery.trim()) ||
    (hasCategoryChange && selectedCategory !== ALL) ||
    (hasStatusChange && selectedStatus !== ALL) ||
    (hasVisibilityChange && selectedVisibility !== ALL)
  );
};

export const computeTotalPages = (filteredEventsLength: number, pageSize: number): number =>
  Math.max(1, Math.ceil(filteredEventsLength / pageSize));

export const computeSafeCurrentPage = (currentPage: number, totalPages: number): number =>
  Math.min(currentPage, totalPages);

export const computePaginationRange = (
  safeCurrentPage: number,
  pageSize: number,
): { startIndex: number; endIndex: number } => {
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return { startIndex, endIndex };
};

export const computeStats = <T extends { status: string }>(events: T[]) => ({
  totalEvents: {
    value: events.length,
    trend: "Total events" as const,
  },
  upcomingEvents: {
    value: events.filter((event) => event.status === "UPCOMING").length,
    label: "Starting soon" as const,
  },
  ongoingEvents: {
    value: events.filter((event) => event.status === "ONGOING").length,
    label: "Live now" as const,
  },
  completedEvents: {
    value: events.filter((event) => event.status === "COMPLETED").length,
    label: "Completed" as const,
  },
  cancelledEvents: {
    value: events.filter((event) => event.status === "CANCELLED").length,
    label: "Cancelled" as const,
  },
});

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);

  // Check for invalid date
  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const fetchAllEvents = async (
  limit: number = 2,
  page: number = 1,
): Promise<findAllEventResponse[]> => {
  try {
    const response = await api.get<ApiResponse>(`/api/v1/find/AllEvent`, {
      params: {
        Limit: limit,
        Page: page,
      },
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to fetch events");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
