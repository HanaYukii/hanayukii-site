"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export default function FeedbackForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setErrorMsg("");

    const formData = new FormData(form);
    const payload = {
      message: formData.get("message"),
      name: formData.get("name"),
      replyEmail: formData.get("replyEmail"),
      website: formData.get("website"), // honeypot
    };

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "送出失敗，晚點再試一次。");
        setStatus("error");
        return;
      }

      setStatus("ok");
      form.reset();
    } catch {
      setErrorMsg("連線失敗，晚點再試一次。");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-sm">
        <p className="font-medium text-primary">收到了，謝謝。</p>
        <p className="mt-1 text-text-muted">
          想再留一條？{" "}
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-primary hover:underline"
          >
            再寫一次
          </button>
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-surface/40 px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden but valid for bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <label className="block">
        <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
          訊息
        </span>
        <textarea
          name="message"
          required
          rows={6}
          className={`${inputClass} resize-y leading-relaxed`}
          placeholder="想說什麼都可以"
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
            名字 (選填)
          </span>
          <input type="text" name="name" className={inputClass} />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.15em] text-text-muted">
            Email (想回覆才需要)
          </span>
          <input type="email" name="replyEmail" className={inputClass} />
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? "送出中..." : "送出"}
        </button>
        {status === "error" && (
          <span className="text-sm text-rose">{errorMsg}</span>
        )}
      </div>
    </form>
  );
}
