import React from "react"
import Section from "./section"
import { Collapse, Typography } from "antd"
import { MDXProvider } from "@mdx-js/react"

const { Panel } = Collapse
const { Link, Paragraph, Title } = Typography

const shortcodes = { Collapse, Link, Panel, Paragraph, Title }

const Component = ({ children }) => {
  return <Section>
    <Typography>
      <MDXProvider components={shortcodes}>
        {children}
      </MDXProvider>
    </Typography>
  </Section>
}

export { shortcodes }
export default Component
