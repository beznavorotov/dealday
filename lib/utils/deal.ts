import { todayIsoDate } from "@/lib/utils/date";
import type { Store } from "@/types/store";

export function isStoreDealActive(store: Store, today = todayIsoDate()): boolean {
  if (!store.is_deal_active) return false;
  if (!store.product_url?.trim()) return false;
  if (!store.image_url?.trim()) return false;
  if (!store.deal_start_date || !store.deal_end_date) return false;

  return (
    today >= store.deal_start_date && today <= store.deal_end_date
  );
}

export function isDealExpired(store: Store, today = todayIsoDate()): boolean {
  if (!store.deal_end_date) return false;
  return today > store.deal_end_date;
}

export type DealVisualStatus = "active" | "expired" | "waiting";

export function getDealVisualStatus(
  store: Store,
  today = todayIsoDate()
): DealVisualStatus {
  if (isStoreDealActive(store, today)) return "active";
  if (isDealExpired(store, today)) return "expired";
  return "waiting";
}

export function getDealStatusLabel(status: DealVisualStatus): string {
  switch (status) {
    case "active":
      return "Активно";
    case "expired":
      return "Акція завершена";
    default:
      return "Очікується";
  }
}

export function getNearestActiveDealEndDate(
  stores: Store[],
  today = todayIsoDate()
): string | null {
  const endDates = stores
    .filter((store) => isStoreDealActive(store, today))
    .map((store) => store.deal_end_date!)
    .sort();

  return endDates[0] ?? null;
}

export function getEndOfDealDayMs(isoDate: string): number {
  return new Date(`${isoDate}T23:59:59.999`).getTime();
}

export function formatCountdown(diffMs: number): string {
  if (diffMs <= 0) return "00:00:00";

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}
