import React from "react"
import { MdxBody } from "@/lib/mdx"

const CommunitySection = ({ source }) => (
  <section id="community" className="lr-community">
    <div className="lr-community-head">
      <span className="lr-eyebrow">Who we are</span>
      <h2 className="lr-section-title">More than a guild tag</h2>
      <p>Our core focus is human interaction. Everything below is how that actually works day to day.</p>
    </div>
    <div className="lr-accordion">
      <MdxBody source={source} />
    </div>
  </section>
)

export default CommunitySection
