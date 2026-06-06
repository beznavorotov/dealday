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