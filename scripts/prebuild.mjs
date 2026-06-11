import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Client, GatewayIntentBits } from 'discord.js'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const organizersDir = path.join(publicDir, 'organizers')
const manifestPath = path.join(organizersDir, 'manifest.json')

fs.mkdirSync(organizersDir, { recursive: true })
fs.cpSync(path.join(root, 'content', 'images'), path.join(publicDir, 'content-images'), { recursive: true })
fs.copyFileSync(path.join(root, 'src', 'images', 'icon.png'), path.join(publicDir, 'icon.png'))

const eventsDir = path.join(root, 'content', 'events')
const usernames = new Set()
fs.readdirSync(eventsDir).filter(file => file.endsWith('.mdx')).forEach(file => {
  const { data } = matter(fs.readFileSync(path.join(eventsDir, file), 'utf8'))
  ;(data.organizers || []).forEach(username => usernames.add(username))
})

if (!process.env.DISCORD_TOKEN) {
  console.warn('DISCORD_TOKEN not set; skipping organizer avatar fetch')
  if (!fs.existsSync(manifestPath)) fs.writeFileSync(manifestPath, JSON.stringify({}))
  process.exit(0)
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] })
let guild
try {
  await client.login(process.env.DISCORD_TOKEN)
  guild = await client.guilds.fetch('271705234252759040')
} catch (err) {
  console.error('Discord login/guild fetch failed:', err)
  process.exit(1)
}

const manifest = {}
for (const username of usernames) {
  try {
    const result = await guild.members.fetch({ query: username, limit: 1 })
    const first = result.get(result.keys().next().value)
    if (!first) throw new Error('no matching guild member')
    const url = first.user.displayAvatarURL({ extension: 'png', size: 128 })
    const response = await fetch(url)
    if (!response.ok) throw new Error(`avatar download failed (${response.status})`)
    const sanitized = username.replace(/[^a-z0-9_-]/gi, '_')
    fs.writeFileSync(path.join(organizersDir, `${sanitized}.png`), Buffer.from(await response.arrayBuffer()))
    manifest[username] = `/organizers/${sanitized}.png`
  } catch (err) {
    console.warn(`Skipping organizer ${username}:`, err.message)
  }
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
client.destroy()
process.exit(0)
