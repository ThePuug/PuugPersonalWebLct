require("dotenv").config()
const Discord = require("discord.js")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  if (page.path.startsWith("/events/")) {
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

exports.onCreateNode = async ({ node, actions: { createNode, createNodeField }, store, cache, createNodeId, }) => {
  if (node.internal.type !== "Mdx" || !node.frontmatter.organizers) return
  const usernames = node.frontmatter.organizers

  const client = new Discord.Client()
  await client.login(process.env.DISCORD_TOKEN)

  const guild = await client.guilds.fetch('271705234252759040')
  const users = (await Promise.all(usernames.map(async username => {
    const result = await guild.members.fetch({ query: username, limit: 1 })
    const first = result.get(result.keys().next().value)
    if(first) return first.user
    return null
  }))).filter((user) => user)

  const organizers = await Promise.all(users.map(async (user,i) => await createRemoteFileNode({
      url: user.displayAvatarURL(),
      parentNodeId: node.id,
      store,
      cache,
      createNode,
      createNodeId
    })
  ))

  await createNodeField({
    node,
    name: "organizers",
    value: organizers
  })

  node.fields.organizers.forEach((organizer,i) => organizer.avatar___NODE = organizers[i].id)
}