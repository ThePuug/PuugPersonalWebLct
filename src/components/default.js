import React from "react"
import { Section } from "./custom"
import { Collapse, Layout, Typography } from "antd"
const { Content } = Layout
const { Panel } = Collapse
const { Link, Paragraph, Title } = Typography

const shortcodes = { Collapse, Link, Panel, Paragraph, Title }

const Component = ({children}) => {
  return (
    <Content>
      <Typography>
        <Section>
          {children}
        </Section>
      </Typography>
    </Content>
  )
}

export { shortcodes }
export default Component