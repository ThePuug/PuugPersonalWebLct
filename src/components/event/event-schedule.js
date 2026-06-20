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
// Day + time come from frontmatter and are DST-agnostic ("ET"), so they render
// identically on server and client — no hydration gate, present in static HTML.
const startTime = (fm) => DateTime.fromISO(fm.date).toFormat("h:mm a")
const daysLabel = (fm) => fm.repeat.byWeekDays.map((d) => `${cap(d)}s`).join(" & ")

const useMounted = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}

// Hero: a static "Starts … ET" pill plus the upcoming calendar dates, which are
// now-relative so they fill in client-side after mount.
export const EventDates = ({ frontmatter }) => {
  const mounted = useMounted()
  const occ = mounted ? eventOccurrences(frontmatter, 3) : []
  return (
    <div className="lr-ev-pills">
      {occ.slice(0, 2).map((dt, i) => (
        <span className="lr-ev-pill accent" key={i}><CalIcon /> {dt.toFormat("d MMM")}</span>
      ))}
      <span className="lr-ev-pill"><ClockIcon /> Starts {startTime(frontmatter)} ET</span>
    </div>
  )
}

// "When" value for the quick-facts card, e.g. "Sundays · 1:00 PM ET" — fully static.
export const EventWhen = ({ frontmatter }) => (
  <>{`${daysLabel(frontmatter)} · ${startTime(frontmatter)} ET`}</>
)
