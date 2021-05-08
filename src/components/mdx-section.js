import React from "react"
import Section from "./section"
import { Collapse, Typography } from "antd"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

const { Panel } = Collapse
const { Link, Paragraph, Title } = Typography

const shortcodes = { Collapse, Link, Panel, Paragraph, Title }

const Component = (props) => {
  return <Section {...props}>
    <Typography>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>
          {props.children}
        </MDXRenderer>
      </MDXProvider>
    </Typography>
  </Section>
}

export { shortcodes }
export default Component
