import React from "react"
import { Section } from "./custom"
import { Collapse, Layout, Typography } from "antd"
import { MDXProvider } from "@mdx-js/react"
const { Content } = Layout
const { Panel } = Collapse
const { Link, Paragraph, Title } = Typography

const shortcodes = { Collapse, Link, Panel, Paragraph, Title }

const Component = ({ children }) => {
  return (
    <Content>
      <Section>
        <Typography>
          <MDXProvider components={shortcodes}>
            {children}
          </MDXProvider>
        </Typography>
      </Section>
    </Content>
  )
}

export { shortcodes }
export default Component