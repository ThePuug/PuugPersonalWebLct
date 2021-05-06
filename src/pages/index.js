import React, { useState } from "react"
import useWindowSize from "../hooks/useWindowSize"
import styled from "styled-components"
import { graphql } from "gatsby"
import { Card, Col, Collapse, Pagination, Row, Space, Typography } from "antd"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import { RRule } from "rrule"
import { DateTime } from "luxon"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
const { Panel } = Collapse
const { Link, Paragraph, Title } = Typography

const shortcodes = { Collapse, Link, Panel }

const CardDeck = styled(Row)`
  row-gap: 16px !important;
  margin-left: -8px !important;
  margin-right: -8px !important;
  > .ant-col {
    padding-left: 8px !important;
    padding-right: 8px !important;
    display: flex;
    align-items: stretch;
  }
  .ant-card {
    border: none;
    background: none;
  }
  .ant-col > .ant-card,
  .ant-col > a {
    width: 100%;
    border: solid 1px #0004;
  }
  .ant-col > .ant-card {
    background-color: #fffa;
    box-shadow:1px 1px 3px #0004
  }
  .ant-col > a {
    box-shadow:1px 1px 6px #00f4;
  }
`

const Page = ({ data }) => {

  const windowSize = useWindowSize()
  const events = data.events.edges
    .flatMap(({ node: event }) => {
      const after = DateTime.fromISO(DateTime.now().toString()).startOf('day')
      const before = after.plus({ weeks: 2 })
      const start = DateTime.fromISO(event.frontmatter.date)
      const rule = new RRule({
        freq: RRule.WEEKLY,
        interval: event.frontmatter.repeat.interval,
        byweekday: event.frontmatter.repeat.byWeekDays.map((e) => {
          switch (e) {
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
          const date = DateTime.fromISO(DateTime.fromJSDate(dt).toString().substr(0, 19), { zone: 'America/New_York' })
          return {
            ...event, frontmatter: {
              ...event.frontmatter,
              date: date,
              dateDescription: rule.toText().substring(0, rule.toText().indexOf(' until')),
              timeDescription: 'starting at ' + date.toFormat('h:mma ZZZZ')
            }
          }
        })
    }).sort((a, b) => { return a.frontmatter.date - b.frontmatter.date })
  const [eventPage, setEventPage] = useState(1)
  const pageSize = (windowSize.width >= 992 ? 6 : windowSize.width >= 576 ? 4 : 2)
  const currentEvents = events.slice((eventPage - 1) * pageSize, eventPage * pageSize)

  return (
    <Space direction="vertical">
      <div className="section">
        <Space direction="vertical">
          <CardDeck gutter={16}>
            {currentEvents.map((event, i) => {
              const card = (<Card>
                <GatsbyImage image={getImage(event.frontmatter.image)} alt={event.frontmatter.title} style={{ height: "220px" }} />
                <Title level={4}>
                  {event.frontmatter.title}
                </Title>
                <Title level={5}>
                  {event.frontmatter.dateDescription}<br />{event.frontmatter.timeDescription}
                </Title>
                <Paragraph>{event.frontmatter.description}</Paragraph>
              </Card>)
              return <Col xs={24} sm={12} lg={8} xl={8} key={"event-" + i}>
                {event.tableOfContents.items && <Link href={event.slug}>{card}</Link>}
                {!event.tableOfContents.items && <>{card}</>}
              </Col>
            })}
          </CardDeck>
          <Row wrap={false} align="center">
            <Pagination current={eventPage} total={events.length} pageSize={pageSize} onChange={(pg) => { setEventPage(pg) }} />
          </Row>
        </Space>
      </div>
      <div>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>
            {data.mdx.body}
          </MDXRenderer>
        </MDXProvider>
      </div>
    </Space>
  )
}

export const pageQuery = graphql`query {
  events: allMdx(filter: { slug: { regex: "\/^events\/" }}) {
    edges {
      node {
        slug
        id
        tableOfContents
        frontmatter {
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
  mdx(slug: {eq: ""}) {
    id
    slug
    body
  }
}`

export default Page