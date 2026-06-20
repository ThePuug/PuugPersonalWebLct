"use client"

import React, { useState } from "react"

// Marker component for MDX <Panel> elements. Never rendered directly — the
// Accordion reads each panel element's props (header, itemKey, children).
export const Panel = () => null

export function Accordion({ defaultActiveKey = null, children }) {
  const panels = React.Children.toArray(children).filter(
    (c) => React.isValidElement(c) && c.props && c.props.header != null
  )
  const [open, setOpen] = useState(defaultActiveKey)

  return (
    <div className="lr-acc">
      {panels.map((panel, i) => {
        const key = panel.props.itemKey ?? String(i)
        const isOpen = open === key
        return (
          <div className="lr-acc-item" key={key}>
            <button
              type="button"
              className="lr-acc-head"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : key)}
            >
              <span>{panel.props.header}</span>
              <span className={`lr-acc-chevron${isOpen ? " open" : ""}`} aria-hidden="true">▾</span>
            </button>
            <div className={`lr-acc-body${isOpen ? " open" : ""}`}>
              <div className="lr-acc-content">{panel.props.children}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
