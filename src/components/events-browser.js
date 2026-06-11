"use client"

import React, { useState, useEffect } from "react"
import useWindowSize from "@/hooks/useWindowSize"
import styled from "styled-components"
import { Section } from "@/components/custom"
import Link from "next/link"
import Image from "next/image"
import { Avatar, Card, Col, Pagination, Row, Space, Typography } from "antd"
import { ReadOutlined } from "@ant-design/icons"
import { RRule } from "rrule"
import { DateTime } from "luxon"

const { Text } = Typography
const { Meta } = Card

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
    display:flex;
    flex-direction:column;
    flex-wrap:nowrap;
    justify-content:flex-start;
    align-items:stretch;
    .ant-card-body {
      flex-grow:1;
    }
    .ant-card-meta-description {
      color:#000d;
    }
  }
  .ant-col > .ant-card,
  .ant-col > a {
    width: 100%;
    background-color: #fffc;
    box-shadow:1px 1px 6px #000;
  }
`

const ReadMore = styled(ReadOutlined)`
  font-size:1.5em;
  color:#000d;
`

const DateTag = styled.div`
  position:absolute;
  top:0;
  left:0;
  background-color:#fffc;
  padding:1em;
  display:flex;
  flex-direction:column;
  align-items:center;
  .ant-avatar {
    color:#fffc;
    background-color:#000d;
  }
`

const computeOccurrences = (events) => events
  .flatMap((event) => {
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
            dateDescription: `${rule.toText().substring(0, rule.toText().indexOf(' until'))}, ${date.toFormat('h:mma ZZZZ')}`
          }
        }
      })
  }).sort((a, b) => { return a.frontmatter.date - b.frontmatter.date })

const EventsBrowser = ({ events }) => {

  const windowSize = useWindowSize()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const occurrences = mounted ? computeOccurrences(events) : []
  const [eventPage, setEventPage] = useState(1)
  const pageSize = (windowSize.width >= 992 ? 6 : windowSize.width >= 576 ? 4 : 2)
  const currentEvents = occurrences.slice((eventPage - 1) * pageSize, eventPage * pageSize)

  return (
    <Section transparent>
      <Space direction="vertical">
        <CardDeck gutter={16}>
          {currentEvents.map((event, i) => {
            const actions = []
            if (event.hasHeadings) actions.push(<Link href={`/events/${event.slug}`}><Space direction="horizontal"><ReadMore /><Text strong>Read more...</Text></Space></Link>)
            return <Col xs={24} sm={12} lg={8} xl={8} key={"event-" + i}>
              <Card
                cover={<div style={{ position: 'relative', height: 220, overflow: 'hidden' }}><Image src={event.frontmatter.image} alt={event.frontmatter.title} fill sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 33vw" style={{ objectFit: 'cover' }} /></div>}
                actions={actions}
              >
                <Meta
                  title={event.frontmatter.title}
                  description={event.frontmatter.description}
                />
                <DateTag>
                  <Avatar>{event.frontmatter.date.toFormat("d")}</Avatar>
                  <Text strong>{event.frontmatter.date.toFormat("MMM")}</Text>
                  <Text strong>{event.frontmatter.date.toFormat("h:mm a ZZZZ")}</Text>
                </DateTag>
              </Card>
            </Col>
          })}
        </CardDeck>
        <Row wrap={false} justify="center">
          <Pagination current={eventPage} total={occurrences.length} pageSize={pageSize} onChange={(pg) => { setEventPage(pg) }} />
        </Row>
      </Space>
    </Section>
  )
}

export default EventsBrowser
