import React from "react"
import { graphql, Link } from "gatsby"
import { Card, Col, Row } from "antd"

const Page = ({ data }) => {
  const { edges: events } = data.allMarkdownRemark
  return (
    <Row>
      {events.filter(post => post.node.frontmatter.title.length > 0)
        .map(({ node: post }) => {
          return (
            <Col key={post.id}>
              <Card>
                <h1>
                  <Link to={post.frontmatter.slug}>{post.frontmatter.title}</Link>
                </h1>
                <p>{post.excerpt}</p>
              </Card>
            </Col>
          )
        })}
    </Row>
  )
}

export const pageQuery = graphql`query {
  allMarkdownRemark {
    edges {
      node {
        excerpt(pruneLength: 250)
        id
        frontmatter {
          title
          slug
        }
      }
    }
  }
}`

export default Page