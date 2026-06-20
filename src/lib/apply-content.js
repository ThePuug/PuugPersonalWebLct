// Parse content/apply.mdx into the structured pieces the redesigned Apply page
// renders as cards + tags, so apply.mdx remains the single content source.
// The hero shows the title and the form header/success panel carry the
// Voice-Comms / After-Submitting intent, so only Mission + Activities are
// surfaced here.
export function parseApplyContent(md) {
  const text = (md || "").replace(/<Title[\s\S]*?<\/Title>/gi, "").trim()

  const sections = {}
  for (const part of text.split(/^##\s+/m)) {
    const nl = part.indexOf("\n")
    if (nl === -1) continue
    const heading = part.slice(0, nl).trim().toUpperCase()
    const body = part.slice(nl + 1).trim()
    if (heading) sections[heading] = body
  }

  const paragraphs = (s) =>
    (s || "").split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean)
  const listItems = (s) =>
    (s || "").split("\n").map((l) => l.replace(/^[-*]\s+/, "").trim()).filter(Boolean)

  const mission = paragraphs(sections["MISSION STATEMENT"])
  return {
    lead: mission[0] || "",
    cards: mission.slice(1),
    activities: listItems(sections["ACTIVITIES"]),
  }
}
