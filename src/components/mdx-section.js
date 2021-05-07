import React from "react"
import { Section } from "./custom"
import { Typography } from "antd"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { shortcodes } from "./default"

const Component = ({ children }) => {
  return <Section>
    <Typography>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>
          {children}
        </MDXRenderer>
      </MDXProvider>
    </Typography>
  </Section>
}

export default Component
