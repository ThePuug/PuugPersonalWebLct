import React from "react"
import { Content } from "@/components/antd-statics"
import { MdxSection } from "@/components/custom"
import EventsBrowser from "@/components/events-browser"
import { getAllEvents, getPageMdx } from "@/lib/events"
import { MdxBody } from "@/lib/mdx"

export default function Page() {
  const events = getAllEvents()
  const indexSource = getPageMdx('index')

  return (
    <Content>
      <EventsBrowser events={events} />
      <MdxSection>
        <MdxBody source={indexSource} />
      </MdxSection>
    </Content>
  )
}
