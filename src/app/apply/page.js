import ApplyForm from "@/components/apply-form"
import { getPageMdx } from "@/lib/events"
import { MdxBody } from "@/lib/mdx"
import { shortcodes } from "@/components/mdx-shortcodes"

export const metadata = { title: "Apply · Liars, Cheats, and Thieves" }

// The hero already shows the page title, so suppress the in-content <Title>.
const applyComponents = { ...shortcodes, Title: () => null }

export default function Page() {
  return <ApplyForm mdx={<MdxBody source={getPageMdx("apply")} components={applyComponents} />} />
}
