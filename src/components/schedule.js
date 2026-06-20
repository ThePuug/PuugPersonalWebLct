"use client"

import React, { useEffect, useState } from "react"
import { DateTime } from "luxon"
import { eventOccurrences } from "@/lib/occurrences"

const CalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
  </svg>
)

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// Deterministic Eastern fallback derived from frontmatter only — identical on
// server and first client render, so it ships in the static HTML with no
// hydration mismatch. After mount we re-render in the viewer's local timezone.
const fallbackTime = (fm) => `${DateTime.fromISO(fm.date).toFormat("h:mm a")} ET`
const fallbackDayShort = (fm) => fm.repeat.byWeekDays[0].slice(0, 3).toUpperCase()
const fallbackDaysLong = (fm) => fm.repeat.byWeekDays.map((d) => `${cap(d)}s`).join(" & ")

const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

// Home card pill: "SUN · 12:30 PM ET" -> localized "SUN · 9:30 AM PDT".
export const EventCardPill = ({ frontmatter }) => {
  const mounted = useMounted()
  const occ = mounted ? eventOccurrences(frontmatter, 3) : []
  if (!occ.length) return <>{`${fallbackDayShort(frontmatter)} · ${fallbackTime(frontmatter)}`}</>
  const l = occ[0].toLocal()
  return <>{`${l.toFormat("ccc").toUpperCase()} · ${l.toFormat("h:mm a ZZZZ")}`}</>
}

// Event hero: a "Starts …" time pill (localized) plus upcoming calendar dates.
export const EventDates = ({ frontmatter }) => {
  const mounted = useMounted()
  const occ = mounted ? eventOccurrences(frontmatter, 3) : []
  const time = occ.length ? occ[0].toLocal().toFormat("h:mm a ZZZZ") : fallbackTime(frontmatter)
  return (
    <div className="lr-ev-pills">
      {occ.slice(0, 2).map((dt, i) => (
        <span className="lr-ev-pill accent" key={i}><CalIcon /> {dt.toLocal().toFormat("d MMM")}</span>
      ))}
      <span className="lr-ev-pill"><ClockIcon /> Starts {time}</span>
    </div>
  )
}

// "When" value for the quick-facts card, e.g. "Sundays · 1:00 PM EDT" (localized).
export const EventWhen = ({ frontmatter }) => {
  const mounted = useMounted()
  const occ = mounted ? eventOccurrences(frontmatter, 3) : []
  if (!occ.length) return <>{`${fallbackDaysLong(frontmatter)} · ${fallbackTime(frontmatter)}`}</>
  const l = occ[0].toLocal()
  return <>{`${l.toFormat("cccc")}s · ${l.toFormat("h:mm a ZZZZ")}`}</>
}

// Inline schedule for prose, e.g. "Sundays at 12:30 PM EDT" (localized).
export const OrientationTime = ({ frontmatter }) => {
  const mounted = useMounted()
  const occ = mounted ? eventOccurrences(frontmatter, 3) : []
  if (!occ.length) return <>{`${fallbackDaysLong(frontmatter)} at ${fallbackTime(frontmatter)}`}</>
  const l = occ[0].toLocal()
  return <>{`${l.toFormat("cccc")}s at ${l.toFormat("h:mm a ZZZZ")}`}</>
}
