"use client";

import { useEffect, useState } from "react";

type Countdown = {
  complete: boolean;
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const TARGET_DATE = new Date("2026-03-22T00:00:00");

const getCountdown = (): Countdown => {
  const totalMs = TARGET_DATE.getTime() - Date.now();

  if (totalMs <= 0) {
    return {
      complete: true,
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
  const seconds = Math.floor((totalMs / 1000) % 60);

  return { complete: false, totalMs, days, hours, minutes, seconds };
};

const displayDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
}).format(TARGET_DATE);

const timeParts = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
] as const;

export default function Home() {
  const [countdown, setCountdown] = useState<Countdown>(getCountdown);
  const [shareLabel, setShareLabel] = useState("Copy share link");

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyLink = async () => {
    if (typeof window === "undefined") return;

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareLabel("Link copied");
    } catch {
      setShareLabel("Copy failed");
    }

    setTimeout(() => {
      setShareLabel("Copy share link");
    }, 2000);
  };

  return (
    <main className="bg-layers min-h-screen px-4 py-8 sm:px-8 sm:py-12">
      <section className="rise-in soft-card mx-auto flex w-full max-w-4xl flex-col gap-8 rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b05f40]">
            Shared Countdown
          </p>
          <h1 className="headline text-4xl leading-tight text-[#4b281f] sm:text-6xl">
            Erin + Evan
          </h1>
          <p className="max-w-2xl text-sm text-[#734438] sm:text-base">
            Counting down to {displayDate}. Keep this page open or share the link so both of you can see the same timer.
          </p>
        </div>

        {countdown.complete ? (
          <div className="pulse-soft rounded-3xl border border-[#d6a590] bg-[#fff3ea] px-6 py-8 text-center">
            <h2 className="headline text-4xl text-[#6a2b1e] sm:text-5xl">
              Reunion Day Is Here
            </h2>
            <p className="mt-2 text-sm text-[#7f4a3b] sm:text-base">
              March 22 has arrived. No more countdown needed.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {timeParts.map((part) => (
              <article
                key={part.key}
                className="number-tile rounded-2xl px-4 py-5 text-center sm:px-5 sm:py-7"
              >
                <p className="headline text-4xl text-[#4f2b1e] sm:text-5xl">
                  {String(countdown[part.key]).padStart(2, "0")}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#9c5d48]">
                  {part.label}
                </p>
              </article>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-[#dcb4a1] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#7b4e3d] sm:text-sm">
            Countdown target: March 22, 2026 at 12:00 AM (your local time)
          </p>
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex h-11 items-center justify-center rounded-full bg-[#d86f4a] px-5 text-sm font-semibold text-white transition hover:bg-[#c35e3c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d86f4a]"
          >
            {shareLabel}
          </button>
        </div>
      </section>
    </main>
  );
}
