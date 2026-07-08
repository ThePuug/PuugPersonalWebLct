import React from "react"
import Link from "next/link"
import Image from "next/image"
import { DateTime } from "luxon"
import { EventCardPill } from "@/components/schedule"
import { highlightTags } from "@/lib/highlight"

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
)

const ledBy = (organizers) =>
  organizers
    .map((o) => <strong key={o.username}>@{o.username}</strong>)
    .reduce((acc, el, i) => (i === 0 ? [el] : [...acc, " & ", el]), [])

// Cards order by the event's Eastern start time-of-day (static); the visible
// time is localized to each viewer by EventCardPill.
const minuteOfDay = (frontmatter) => {
  const dt = DateTime.fromISO(frontmatter.date)
  return dt.hour * 60 + dt.minute
}

const EventCard = ({ event }) => {
  const { slug, hasHeadings, frontmatter, organizers } = event
  const withAvatars = organizers.filter((o) => o.avatarSrc)

  return (
    <article className="lr-event-card">
      <div className="lr-event-media">
        <Image src={frontmatter.image} alt={frontmatter.title} fill sizes="(max-width: 600px) 100vw, (max-width: 1180px) 50vw, 380px" style={{ objectFit: "cover" }} />
        <div className="lr-event-media-fade" />
        <span className="lr-event-pill"><EventCardPill frontmatter={frontmatter} /></span>
      </div>
      <div className="lr-event-body">
        <h3 className="lr-event-title">
          {hasHeadings ? (
            <Link href={`/events/${slug}`}>{frontmatter.title} <ArrowIcon /></Link>
          ) : (
            frontmatter.title
          )}
        </h3>
        <p className="lr-event-desc">
          {highlightTags(frontmatter.description)}
          {hasHeadings && <> <Link href={`/events/${slug}`}>Read the guide →</Link></>}
        </p>
        {withAvatars.length > 0 && (
          <div className="lr-event-led">
            <div className="lr-avatars">
              {withAvatars.map((o) => (
                <Image key={o.username} src={o.avatarSrc} alt={o.username} width={30} height={30} className="lr-avatar" />
              ))}
            </div>
            <span>Led by {ledBy(organizers)}</span>
          </div>
        )}
      </div>
    </article>
  )
}

const EventsSection = ({ events }) => {
  const ordered = [...events].sort((a, b) => minuteOfDay(a.frontmatter) - minuteOfDay(b.frontmatter))

  return (
    <section id="events" className="lr-section">
      <div className="lr-section-head">
        <div>
          <span className="lr-eyebrow">Every Sunday</span>
          <h2 className="lr-section-title">Weekly Events</h2>
        </div>
        <p className="lr-section-note">
          Events run because members step forward to lead them. Here&apos;s what&apos;s on the calendar this week — shown in your local time.
        </p>
      </div>
      <div className="lr-event-grid">
        {ordered.map((event) => <EventCard key={event.slug} event={event} />)}
      </div>
    </section>
  )
}

export default EventsSection
