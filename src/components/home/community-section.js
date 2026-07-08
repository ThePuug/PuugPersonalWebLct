import React from "react"
import { MdxBody } from "@/lib/mdx"
import { Accordion, Panel } from "@/components/home/accordion"

const communityComponents = { Collapse: Accordion, Panel }

const CommunitySection = ({ source }) => (
  <section id="community" className="lr-community">
    <div className="lr-community-head">
      <span className="lr-eyebrow">Who we are</span>
      <h2 className="lr-section-title">More than a guild tag</h2>
      <p>Our core focus is human interaction. Everything below is how that actually works day to day.</p>
    </div>
    <MdxBody source={source} components={communityComponents} />
  </section>
)

export default CommunitySection
