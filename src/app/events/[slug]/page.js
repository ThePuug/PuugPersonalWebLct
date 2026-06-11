import React from "react"
import Image from "next/image"
import { Col, Row } from "antd"
import { Content } from "@/components/antd-statics"
import { Section, MdxSection } from "@/components/custom"
import EventHeader from "@/components/event-header"
import { MdxBody } from "@/lib/mdx"
import { getEvent, getEventSlugs } from "@/lib/events"

export const dynamicParams = false

export function generateStaticParams() {
  return getEventSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const event = getEvent(slug)
  return { title: event.frontmatter.title }
}

const Page = async ({ params }) => {
  const { slug } = await params
  const event = getEvent(slug)

  return <Content>
    <Section transparent>
      <Row>
        <Col flex="1 1">
          <EventHeader frontmatter={event.frontmatter} organizers={event.organizers} />
        </Col>
        <Col flex="1 1">
          <div style={{ position: 'relative', height: '100%', minHeight: 220 }}>
            <Image src={event.frontmatter.image} alt="feature" fill style={{ objectFit: 'cover' }} sizes="50vw" />
          </div>
        </Col>
      </Row>
    </Section>
    <MdxSection>
      <MdxBody source={event.body} />
    </MdxSection>
  </Content>
}

export default Page
