import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDir = path.join(process.cwd(), "content")
const eventsDir = path.join(contentDir, "events")

const readMdx = (filePath) => {
  return matter(fs.readFileSync(filePath, "utf8"))
}

const toSummary = (slug, data, content) => {
  return {
    slug,
    hasHeadings: /^#{1,6}\s/m.test(content),
    frontmatter: {
      title: data.title,
      description: data.description,
      date: String(data.date),
      repeat: {
        frequency: data.repeat.frequency,
        interval: data.repeat.interval,
        byWeekDays: data.repeat.byWeekDays,
      },
      image: "/content-images/" + path.basename(data.image),
    },
  }
}

export function getEventSlugs() {
  return fs.readdirSync(eventsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export function getAllEvents() {
  return getEventSlugs().map((slug) => {
    const { data, content } = readMdx(path.join(eventsDir, slug + ".mdx"))
    return toSummary(slug, data, content)
  })
}

export function getEvent(slug) {
  const { data, content } = readMdx(path.join(eventsDir, slug + ".mdx"))
  const manifestPath = path.join(process.cwd(), "public", "organizers", "manifest.json")
  const manifest = fs.existsSync(manifestPath)
    ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
    : {}
  const organizers = (data.organizers || []).map((username) => ({
    username,
    avatarSrc: manifest[username] || null,
  }))
  return {
    ...toSummary(slug, data, content),
    body: content,
    organizers,
  }
}

export function getPageMdx(name) {
  const { content } = readMdx(path.join(contentDir, name + ".mdx"))
  return content
}
