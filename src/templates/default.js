import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { Section, MdxSection } from "../components/custom"
import { Col, Layout, PageHeader, Row, Tag, Typography } from "antd"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RRule } from "rrule"
import { DateTime } from "luxon"
const { Content } = Layout
const { Paragraph } = Typography

const StyledHeader = styled(PageHeader)`
  background-color:#fffc;
  height:100%;
`

const Component = (props) => {
  const { data: { mdx } } = props
  const after = DateTime.fromISO(DateTime.now().toString()).startOf('day')
  const before = after.plus({ weeks: 2 })
  const start = DateTime.fromISO(mdx.frontmatter.date)
  const dates = new RRule({
    freq: RRule.WEEKLY,
    interval: mdx.frontmatter.repeat.interval,
    byweekday: mdx.frontmatter.repeat.byWeekDays.map((e) => {
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

  return <Content>
    <Section transparent>
      <Row justify="stretch">
        <Col flex="1 1">
          <StyledHeader
            title={mdx.frontmatter.title}
            tags={[dates.map((dt, i) => <Tag color="geekblue" key={"date-"+i}>{dt.toFormat("d MMM")}</Tag>)]}
            extra={<h3>Starting at {dates[0].toFormat("hh:mm a ZZZZ")}</h3>}>
            <Paragraph>{mdx.frontmatter.description}</Paragraph>
          </StyledHeader>
        </Col>
        <Col flex="1 1">
          <GatsbyImage image={getImage(mdx.frontmatter.image)} alt="feature" style={{height:"100%"}} />
        </Col>
      </Row>
    </Section>
    <MdxSection {...props}>
      {mdx.body}
    </MdxSection>
  </Content>
}

export const pageQuery = graphql`query($slug: String!){
  mdx(slug: { eq: $slug }) {
    body
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
`

export default Component