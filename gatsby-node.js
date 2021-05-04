const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const template = path.resolve(`src/templates/event.js`)
  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: template,
      context: {}
    })
  })
}