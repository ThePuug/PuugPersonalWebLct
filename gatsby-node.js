require("dotenv").config()
const Discord = require("discord.js")
const path = require('path')
const { createFilePath, createRemoteFileNode } = require("gatsby-source-filesystem")

exports.onCreateNode = async ({ node, actions, store, cache, getNode, createNodeId }) => {
  const { createNode, createNodeField } = actions

  if (node.internal.type !== "Mdx") return
  const path = createFilePath({ node, getNode, basePath: `content` })
  createNodeField({
    node,
    name: `path`,
    value: path,
  })

  if(!node.frontmatter.organizers) return
  const client = new Discord.Client({intents: [
    Discord.GatewayIntentBits.Guilds, 
    Discord.GatewayIntentBits.GuildMembers
  ]})
  await client.login(process.env.DISCORD_TOKEN)
  const guild = await client.guilds.fetch('271705234252759040')

  const usernames = node.frontmatter.organizers
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

exports.createPages = async ({graphql, actions}) => {
  const { createPage } = actions
  const template = path.resolve('./src/layout/event.js')
  const { data: { events }} = await graphql(`query {
      events: allMdx(filter: { fields: { path: { regex: "/^\/events/" }}}) {
        nodes {
          id
          fields {
            path
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)
  events.nodes.forEach(event => {
    createPage({
      path: event.fields.path,
      component: `${template}?__contentFilePath=${event.internal.contentFilePath}`,
      context: {
        id: event.id
      }
    })
  })
}
