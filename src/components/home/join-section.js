import React from "react"
import Link from "next/link"
import DiscordIcon from "@/components/discord-icon"
import { OrientationTime } from "@/components/schedule"

const DISCORD_URL = "https://discord.gg/TefAuR4m5c"

const JoinSection = ({ orientation }) => {
  const orientationWhen = orientation
    ? <OrientationTime frontmatter={orientation} />
    : "Sundays at 12:30 PM EDT (UTC-4)"

  const steps = [
    {
      title: <>Fill out the <Link href="/apply">application</Link></>,
      desc: "A few quick questions about you and your play style.",
    },
    {
      title: "Join the Discord",
      desc: "Confirm where we can reach you.",
    },
    {
      title: "Come to orientation",
      desc: <>{orientationWhen} — meet everyone and get settled in!</>,
    },
  ]

  return (
    <section id="join" className="lr-join">
      <div className="lr-join-card">
        <div className="lr-join-glow" />
        <div className="lr-join-grid">
          <div>
            <span className="lr-eyebrow">Join our legendary Guild</span>
            <h2 className="lr-join-title">Become part of our history</h2>
            <p className="lr-join-lead">
              We recruit for character, not hours played. Adventurers from all walks of life and background are genuinely welcome. Three steps and you&apos;re in.
            </p>
            <div className="lr-join-actions">
              <Link href="/apply" className="lr-btn lr-btn-lg lr-btn-primary">Apply to join →</Link>
              </a>
            </div>
          </div>
          <div className="lr-steps">
            {steps.map((s, i) => (
              <div className="lr-step" key={i}>
                <span className="lr-step-num">{i + 1}</span>
                <div>
                  <div className="lr-step-title">{s.title}</div>
                  <div className="lr-step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default JoinSection
