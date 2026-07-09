"use client";

import { useEffect, useState } from "react";

export default function TimeWidget() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  return (
    <div className="flex min-w-0 flex-col gap-1 h-full">
      <p className="text-2xl font-mono font-bold">
        {now.toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </p>
      <p className="text-sm text-muted-foreground font-mono">
        {now.toLocaleDateString("en-PH", { weekday: "long", year: "numeric", month: "short", day: "numeric" })}
      </p>
    </div>
  );
}
