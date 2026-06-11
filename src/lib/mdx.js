import { evaluate } from "@mdx-js/mdx"
import * as runtime from "react/jsx-runtime"
import { shortcodes } from "@/components/mdx-shortcodes"

export async function MdxBody({ source }) {
  if (!source || !source.trim()) return null
  const { default: MDXContent } = await evaluate(source, { ...runtime })
  return <MDXContent components={shortcodes} />
}
