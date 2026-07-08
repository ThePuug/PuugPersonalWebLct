import React from "react"
import { slugify } from "@/lib/toc"

const textOf = (children) => {
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(textOf).join("")
  if (children && typeof children === "object" && children.props) return textOf(children.props.children)
  return ""
}

const heading = (Tag) =>
  function Heading({ children, ...props }) {
    return <Tag id={slugify(textOf(children))} {...props}>{children}</Tag>
  }

// Markdown headings get ids matching the table of contents; everything else
// inherits the .lr-prose typography from global.css. Body headings are demoted
// one level so the hero <h1> stays the page's only top-level heading. The id is
// slugified from the text (not the tag), so the TOC anchors still resolve.
export const eventComponents = {
  h1: heading("h2"),
  h2: heading("h3"),
  h3: heading("h4"),
}
