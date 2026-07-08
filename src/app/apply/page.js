import ApplyForm from "@/components/apply-form"
import { getAllEvents, getPageMdx } from "@/lib/events"
import { parseApplyContent } from "@/lib/apply-content"

export const metadata = { title: "Apply · Liars, Cheats, and Thieves" }

export default function Page() {
  const orientation = getAllEvents().find((e) => e.slug === "guild-orientation")?.frontmatter ?? null
  return <ApplyForm content={parseApplyContent(getPageMdx("apply"))} orientation={orientation} />
}
