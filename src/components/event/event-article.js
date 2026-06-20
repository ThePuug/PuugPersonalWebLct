import React from "react"
import Link from "next/link"
import Image from "next/image"
import DiscordIcon from "@/components/discord-icon"
import { MdxBody } from "@/lib/mdx"
import { extractToc } from "@/lib/toc"
import { eventComponents } from "@/components/event/mdx-components"
import { EventDates, EventWhen } from "@/components/event/event-schedule"

const DISCORD_URL = "https://discord.gg/TefAuR4m5c"
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

const BackIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const ledByNames = (organizers) =>
  organizers.map((o) => `@${o.username}`).join(" & ")

const EventArticle = ({ event }) => {
  const { frontmatter, organizers, body } = event
  const toc = extractToc(body)
  const withAvatars = organizers.filter((o) => o.avatarSrc)
  const kicker = frontmatter.repeat.frequency === "week" ? "Weekly Event" : "Event"
  const day = frontmatter.repeat.byWeekDays?.length === 1 ? cap(frontmatter.repeat.byWeekDays[0]) : "there"

  return (
    <>
      {/* Hero */}
      <section className="lr-ev-hero">
        <div className="lr-hero-bg">
          <Image src={frontmatter.image} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="lr-ev-hero-fade" />
        <div className="lr-ev-hero-inner">
          <Link href="/#events" className="lr-ev-back"><BackIcon /> All events</Link>
          <span className="lr-ev-kicker">{kicker}</span>
          <h1 className="lr-ev-title">{frontmatter.title}</h1>
          <p className="lr-ev-lead">{frontmatter.description}</p>
          <EventDates frontmatter={frontmatter} />
        </div>
      </section>

      {/* Quick facts */}
      <div className="lr-ev-facts-wrap">
        <div className="lr-ev-facts">
          <div>
            <div className="lr-ev-fact-label">When</div>
            <div className="lr-ev-fact-value"><EventWhen frontmatter={frontmatter} /></div>
          </div>
          {organizers.length > 0 && (
            <div>
              <div className="lr-ev-fact-label">Led by</div>
              <div className="lr-ev-fact-value">
                {withAvatars.length > 0 && (
                  <div className="lr-avatars">
                    {withAvatars.map((o) => (
                      <Image key={o.username} src={o.avatarSrc} alt={o.username} width={26} height={26} className="lr-avatar" />
                    ))}
                  </div>
                )}
                <span>{ledByNames(organizers)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <section className="lr-ev-body">
        <div className="lr-ev-layout">
          {toc.length > 0 && (
            <aside className="lr-toc">
              <div className="lr-toc-label">On this page</div>
              <nav className="lr-toc-links">
                {toc.map((h) => <a href={`#${h.id}`} key={h.id}>{h.text}</a>)}
              </nav>
            </aside>
          )}
          <article className="lr-ev-article">
            <div className="lr-prose">
              <MdxBody source={body} components={eventComponents} />
            </div>
            <div className="lr-ev-cta">
              <div>
                <div className="lr-ev-cta-title">See you {day}?</div>
                <div className="lr-ev-cta-sub">Hop into Discord and join the squad.</div>
              </div>
              <a href={DISCORD_URL} target="_blank" rel="noopener" className="lr-btn lr-btn-lg lr-btn-primary" style={{ flex: "none" }}>
                <DiscordIcon size={18} /> Join on Discord
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

export default EventArticle
