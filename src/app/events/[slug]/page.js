import React from "react"
import EventArticle from "@/components/event/event-article"
import { getEvent, getEventSlugs } from "@/lib/events"

export const dynamicParams = false

export function generateStaticParams() {
  return getEventSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const event = getEvent(slug)
  return { title: `${event.frontmatter.title} · Liars, Cheats, and Thieves` }
}

const Page = async ({ params }) => {
  const { slug } = await params
  const event = getEvent(slug)
  return <EventArticle event={event} />
}

export default Page
