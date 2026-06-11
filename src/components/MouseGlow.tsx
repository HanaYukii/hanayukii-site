"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const handler = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, color-mix(in srgb, var(--color-primary) 7%, transparent), transparent 40%)`;
      });
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handler);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
}
