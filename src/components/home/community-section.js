import React from "react"
import { MdxBody } from "@/lib/mdx"
import { Accordion, Panel } from "@/components/home/accordion"

const communityComponents = { Collapse: Accordion, Panel }

const CommunitySection = ({ source }) => (
  <section id="community" className="lr-community">
    <div className="lr-community-head">
      <h2 className="lr-section-title">More than a guild tag</h2>
      <p>At our core, we prioritize genuine human interaction above all else. The pillars below show how we put mutual respect, patience, and community into practice every day:</p>
    </div>
    <MdxBody source={source} components={communityComponents} />
  </section>
)

export default CommunitySection
