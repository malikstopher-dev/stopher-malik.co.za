"use client";

import { useEffect, useState } from "react";

export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-ZA", {
        timeZone: "Africa/Johannesburg",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(new Date());

    const timeout = window.setTimeout(() => setTime(format()), 0);
    const interval = window.setInterval(() => setTime(format()), 30_000);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, []);

  return <span className="footer-clock">{time ? `${time} SAST` : "Johannesburg, ZA"}</span>;
}
