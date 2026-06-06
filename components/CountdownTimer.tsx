"use client";

import { useEffect, useState } from "react";

function getTimeLeft() {
  const now = new Date();
  const endOfDay = new Date();

  endOfDay.setHours(23, 59, 59, 999);

  const diff = endOfDay.getTime() - now.getTime();

  if (diff <= 0) return "00:00:00";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export default function CountdownTimer() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1.5 text-xs text-orange-600">
        до кінця дня&nbsp;
        <strong className="font-mono text-orange-700">--:--:--</strong>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1.5 text-xs text-orange-600">
      до кінця дня&nbsp;
      <strong className="font-mono text-orange-700">{timeLeft}</strong>
    </span>
  );
}