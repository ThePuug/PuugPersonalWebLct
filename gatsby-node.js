exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  if(page.path.startsWith("/events/")) {
    deletePage(page)
    createPage({
      ...page,
      component: require.resolve('./src/templates/default.js'),
      context: {
        ...page.context,
        slug: page.path.substring(1).replace(/\/$/, '')
      },
    })
  }
}