import React from "react"
import Hero from "@/components/home/hero"
import EventsSection from "@/components/home/events-section"
import JoinSection from "@/components/home/join-section"
import CommunitySection from "@/components/home/community-section"
import { getAllEvents, getPageMdx } from "@/lib/events"

export default function Page() {
  const events = getAllEvents()
  const orientation = events.find((e) => e.slug === "guild-orientation")?.frontmatter ?? null
  const indexSource = getPageMdx("index")

  return (
    <>
      <Hero />
      <EventsSection events={events} />
      <JoinSection orientation={orientation} />
      <CommunitySection source={indexSource} />
    </>
  )
}
