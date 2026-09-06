export const formatDate = (value?: string) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

export const formatDateRange = (start?: string, end?: string) => {
  if (!start) return "—";

  const startDate = new Date(start);

  if (!end) {
    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(startDate);
  }

  const endDate = new Date(end);

  const sameMonth =
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getFullYear() === endDate.getFullYear();

  if (sameMonth) {
    const month = new Intl.DateTimeFormat("en-IN", {
      month: "short",
    }).format(startDate);

    return `${startDate.getDate()} – ${endDate.getDate()} ${month}, ${endDate.getFullYear()}`;
  }

  return `${formatDate(start)} – ${formatDate(end)}`;
};

export const formatTime = (value?: string) => {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
};

export const formatStatus = (value?: string) => {
  if (!value) return "—";

  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

// ============================================================
// EVENT DATE HELPERS
// ============================================================

interface EventTimeline {
  startAt?: string;
  endAt?: string;
}

interface EventDateData {
  registrationStartAt?: string;
  registrationEndAt?: string;
  timeline?: EventTimeline[];
}

export const getEventStartDate = (event?: EventDateData) => {
  if (!event) return undefined;

  const timeline = event.timeline;

  if (!timeline?.length) {
    return event.registrationStartAt;
  }

  return timeline[0]?.startAt;
};

export const getEventEndDate = (event?: EventDateData) => {
  if (!event) return undefined;

  const timeline = event.timeline;

  if (!timeline?.length) {
    return event.registrationEndAt;
  }

  return timeline[timeline.length - 1]?.endAt;
};
