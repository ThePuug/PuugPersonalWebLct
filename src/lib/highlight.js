import React from "react"

// Matches guild bracket tags ([Liar], [AoL]), @mentions, and #channel tags.
const TAG_RE = /(\[[A-Za-z0-9][^\]]*\]|[#@][A-Za-z][A-Za-z0-9_.-]*)/g

// Highlight inline tags in plain prose: guild tags + @mentions render bold,
// #channel tags render in accent. Operates on plain strings (not MDX bodies).
export function highlightTags(text) {
  if (!text) return text
  const out = []
  let last = 0
  let key = 0
  let match
  TAG_RE.lastIndex = 0
  while ((match = TAG_RE.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index))
    const token = match[0]
    if (token[0] === "#") out.push(<span key={key++} className="lr-tag-channel">{token}</span>)
    else out.push(<strong key={key++} className="lr-tag-guild">{token}</strong>)
    last = match.index + token.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}
