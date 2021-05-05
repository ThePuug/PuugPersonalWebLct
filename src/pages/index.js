import React, { useState } from "react"
import { graphql } from "gatsby"
import { Card, Col, Pagination, Row, Space, Typography } from "antd"
import {} from "@ant-design/icons"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { RRule } from "rrule"
import { DateTime } from "luxon"
import useWindowSize from "../components/useWindowSize"
const { Link, Paragraph, Title } = Typography

const Page = ({ data }) => {
  const windowSize = useWindowSize()
  const events = data.allMarkdownRemark.edges
      .flatMap(({ node: event }) => {
        const after = DateTime.fromISO(DateTime.now().toString()).startOf('day')
        const before = after.plus({weeks: 2})
        const start = DateTime.fromISO(event.frontmatter.date)
        const rule = new RRule({
          freq: RRule.WEEKLY,
          interval: event.frontmatter.repeat.interval,
          byweekday: event.frontmatter.repeat.byWeekDays.map((e) => {
            switch(e) {
              case 'monday': return RRule.MO
              case 'tuesday': return RRule.TU
              case 'wednesday': return RRule.WE
              case 'thursday': return RRule.TH
              case 'friday': return RRule.FR
              case 'saturday': return RRule.SA
              case 'sunday': return RRule.SU
              default: throw new Error("day not recognised")
            }
          }),
          dtstart: start.toJSDate(),
          until: before.toJSDate()
        })
        return rule.between(after.toJSDate(), before.toJSDate(), true)
          .map((dt) => {
            const date = DateTime.fromISO(DateTime.fromJSDate(dt).toString().substr(0,19), { zone: 'America/New_York' })
            return { ...event, frontmatter: { ...event.frontmatter, 
              date: date,
              dateDescription: rule.toText().substring(0,rule.toText().indexOf(' until')),
              timeDescription: 'starting at ' +  date.toFormat('h:mma ZZZZ')}}})
      }).sort((a,b) => { return a.frontmatter.date - b.frontmatter.date })
  const [eventPage,setEventPage] = useState(1)
  const pageSize = (windowSize.width >= 992 ? 6 : windowSize.width >= 576 ? 4 : 2)
  const currentEvents = events.slice( (eventPage-1)*pageSize, eventPage*pageSize)
  const renderEvents = currentEvents.map((event, i) => (
      <Col xs={24} sm={12} lg={8} xl={8} key={"event-"+i}>
        <Link href={event.frontmatter.slug}>
          <Card>
            <GatsbyImage image={getImage(event.frontmatter.image)} alt={event.frontmatter.title} />
            <Title level={4}>
              {event.frontmatter.title}
            </Title>
            <Title level={5}>
              {event.frontmatter.dateDescription}<br />{event.frontmatter.timeDescription}
            </Title>
            <Paragraph>{event.frontmatter.description}</Paragraph>
          </Card>
        </Link>
      </Col>
    )
  )

  return (
    <>
      <Space direction="vertical">
        <Row gutter={16} className="events card-deck">
          { renderEvents }
        </Row>
        <Row wrap={false} align="center">
          <Pagination current={eventPage} total={events.length} pageSize={pageSize} onChange={(pg) => {setEventPage(pg)}} />
        </Row>
      </Space>
    </>
  )
}

export const pageQuery = graphql`query {
  allMarkdownRemark {
    edges {
      node {
        id
        frontmatter {
          slug
          title
          description
          date
          repeat {
            frequency
            interval
            byWeekDays
          }
          image {
            childImageSharp {
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
    }
  }
}`

export default Page