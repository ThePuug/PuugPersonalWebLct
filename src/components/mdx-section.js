import React from "react"
import Section from "./section"
import { Typography } from "antd"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { shortcodes } from "../templates/default"

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

export default Component
