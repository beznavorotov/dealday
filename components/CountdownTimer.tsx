"use client";

import { useSyncExternalStore } from "react";
import {
  formatCountdown,
  getEndOfDealDayMs,
} from "@/lib/utils/deal";

interface CountdownTimerProps {
  nearestEndDate: string | null;
}

function subscribe(onStoreChange: () => void) {
  const interval = setInterval(onStoreChange, 1000);
  return () => clearInterval(interval);
}

function getServerSnapshot() {
  return 0;
}

export default function CountdownTimer({ nearestEndDate }: CountdownTimerProps) {
  const now = useSyncExternalStore(subscribe, () => Date.now(), getServerSnapshot);

  if (!nearestEndDate) {
    return (
      <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1.5 text-xs text-zinc-600">
        Акції очікуються
      </span>
    );
  }

  const diff = getEndOfDealDayMs(nearestEndDate) - now;

  if (diff <= 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-zinc-100 px-3 py-1.5 text-xs text-zinc-600">
        Акції очікуються
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1.5 text-xs text-orange-600">
      Найближча акція завершується через&nbsp;
      <strong className="font-mono text-orange-700">
        {formatCountdown(diff)}
      </strong>
    </span>
  );
}
