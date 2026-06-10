export function todayIsoDate(): string {
  return new Date().toISOString().split("T")[0];
}

const months = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];

export function formatDateUk(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year} р.`;
}

export function formatDealPeriod(start: string, end: string): string {
  if (start === end) {
    return `Діє: ${formatDateUk(start)}`;
  }

  const startDate = new Date(`${start}T00:00:00`);
  const endDate = new Date(`${end}T00:00:00`);
  const startPart = `${startDate.getDate()} ${months[startDate.getMonth()]}`;
  const endPart = `${endDate.getDate()} ${months[endDate.getMonth()]} ${endDate.getFullYear()} р.`;

  return `Діє: ${startPart} — ${endPart}`;
}