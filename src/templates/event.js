import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const Event = ({data}) => {
  const { markdownRemark: post } = data
  return (
    <div className="blog-post-container">
      <Helmet title={`Event - ${post.frontmatter.title}`} />
      <GatsbyImage image={getImage(post.frontmatter.image)} alt={post.frontmatter.title} />
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
}`

export default Event
