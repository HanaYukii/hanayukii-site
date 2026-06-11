"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  text,
  speed = 70,
  startDelay = 400,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (count >= text.length) {
      const t = setTimeout(() => setDone(true), 1800);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setCount((c) => c + 1),
      count === 0 ? startDelay : speed,
    );
    return () => clearTimeout(t);
  }, [count, text.length, speed, startDelay]);

  return (
    <span>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, count)}
        <span
          className={`transition-opacity duration-500 ${
            done ? "opacity-0" : "animate-pulse"
          }`}
        >
          |
        </span>
      </span>
    </span>
  );
}
