import React from "react"
import Link from "next/link"
import DiscordIcon from "@/components/discord-icon"

const DISCORD_URL = "https://discord.gg/TefAuR4m5c"

const steps = [
  {
    title: <>Fill out the <Link href="/apply#apply-form">application</Link></>,
    desc: "A few quick questions about you and your play style — takes a couple of minutes.",
  },
  {
    title: "Join the Discord",
    desc: "Hop in and say hello — it's where the guild really lives, and how we'll reach you.",
  },
  {
    title: "Come to orientation",
    desc: "Sundays at 12:30 PM EDT — meet everyone and get settled in.",
  },
]

const JoinSection = () => (
  <section id="join" className="lr-join">
    <div className="lr-join-card">
      <div className="lr-join-glow" />
      <div className="lr-join-grid">
        <div>
          <span className="lr-eyebrow">Ready when you are</span>
          <h2 className="lr-join-title">Become part of the guild</h2>
          <p className="lr-join-lead">
            We recruit for character, not hours played — women, LGBTQ+ folks, people with disabilities, and players of every background are genuinely welcome. Three steps and you&apos;re in.
          </p>
          <div className="lr-join-actions">
            <Link href="/apply#apply-form" className="lr-btn lr-btn-lg lr-btn-primary">Apply to join →</Link>
            <a href={DISCORD_URL} target="_blank" rel="noopener" className="lr-btn lr-btn-lg lr-btn-ghost">
              <DiscordIcon size={19} /> Open our Discord
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

export default JoinSection
