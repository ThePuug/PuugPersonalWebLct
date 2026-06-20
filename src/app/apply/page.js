import ApplyForm from "@/components/apply-form"
import { getPageMdx } from "@/lib/events"
import { parseApplyContent } from "@/lib/apply-content"

export const metadata = { title: "Apply · Liars, Cheats, and Thieves" }

export default function Page() {
  return <ApplyForm content={parseApplyContent(getPageMdx("apply"))} />
}
