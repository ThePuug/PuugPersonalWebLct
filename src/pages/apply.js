import React from "react"
import { graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"

const shortcodes = {}

const Page = ({ data }) => {
  return <MDXProvider components={shortcodes}>
    <MDXRenderer>
      {data.mdx.body}
    </MDXRenderer>
  </MDXProvider>
}

export const pageQuery = graphql`query {
  mdx(slug: { eq: "apply" }) {
    id
    slug
    body
  }
}`

export default Page