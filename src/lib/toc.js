export function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

// Build a table of contents from markdown headings. Prefers top-level (#)
// headings when there are at least two of them, otherwise falls back to ##.
export function extractToc(markdown) {
  if (!markdown) return []
  const h1 = []
  const h2 = []
  let inFence = false
  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    const match = /^(#{1,2})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!match) continue
    const level = match[1].length
    const text = match[2].trim()
    const entry = { level, text, id: slugify(text) }
    if (level === 1) h1.push(entry)
    else h2.push(entry)
  }
  return h1.length >= 2 ? h1 : h2.length ? h2 : h1
}
