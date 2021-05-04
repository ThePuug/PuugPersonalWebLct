import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

const Event = ({data}) => {
  const { markdownRemark: post } = data
  return (
    <div className="blog-post-container">
      <Helmet title={`Event - ${post.frontmatter.title}`} />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`query EventByPath($path: String!) {
  markdownRemark(frontmatter: { slug: { eq: $path } }) {
    html
    frontmatter {
      slug
      title
    }
  }
}`

export default Event
