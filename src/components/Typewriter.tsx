"use client";

import { useEffect, useState } from "react";

const words = [
  "Software Engineer",
  "Blog Writer",
  "CP Enthusiast",
];

export default function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const speed = deleting ? 40 : 80;

    if (!deleting && charIndex === current.length) {
      const timeout = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (deleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <span className="text-primary">
      {words[wordIndex].slice(0, charIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
}
