import ApplyForm from "@/components/apply-form"
import { getPageMdx } from "@/lib/events"
import { MdxBody } from "@/lib/mdx"

export default function Page() {
  return <ApplyForm mdx={<MdxBody source={getPageMdx('apply')} />} />
}
