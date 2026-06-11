"use client"

import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Image from "next/image"
import { Avatar, Col, Row, Space, Tag, Tooltip, Typography } from "antd"
import { RRule } from "rrule"
import { DateTime } from "luxon"

const { Paragraph } = Typography

const StyledHeader = styled.div`
  background-color:#fffc;
  height:100%;
  padding:16px 24px;
`

const EventHeader = ({ frontmatter, organizers }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  let dates = []
  if (mounted) {
    const after = DateTime.fromISO(DateTime.now().toString()).startOf('day')
    const before = after.plus({ weeks: 2 })
    const start = DateTime.fromISO(frontmatter.date)
    dates = new RRule({
      freq: RRule.WEEKLY,
      interval: frontmatter.repeat.interval,
      byweekday: frontmatter.repeat.byWeekDays.map((e) => {
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
    }).between(after.toJSDate(), before.toJSDate(), true)
      .map((dt) => DateTime.fromISO(DateTime.fromJSDate(dt).toString().substr(0, 19), { zone: 'America/New_York' }))
  }

  return <StyledHeader>
    <Row justify="space-between" align="middle" wrap>
      <Col>
        <Space align="center" wrap>
          <Typography.Title level={3} style={{ marginBottom: 0 }}>{frontmatter.title}</Typography.Title>
          {dates.map((dt, i) => <Tag color="geekblue" key={"date-" + i}>{dt.toFormat("d MMM")}</Tag>)}
        </Space>
      </Col>
      {dates.length > 0 &&
        <Col>
          <h3>Starting at {dates[0].toFormat("hh:mm a ZZZZ")}</h3>
        </Col>}
    </Row>
    <Paragraph>{frontmatter.description}</Paragraph>
    <Avatar.Group size="large">
      {organizers && organizers.filter((organizer) => organizer.avatarSrc).map((organizer, i) =>
        <Avatar key={"avatar-" + i}
          icon={<Tooltip title={organizer.username} color="geekblue"><Image src={organizer.avatarSrc} alt="organizer" width={40} height={40} /></Tooltip>}
        />
      )}
    </Avatar.Group>
  </StyledHeader>
}

export default EventHeader
