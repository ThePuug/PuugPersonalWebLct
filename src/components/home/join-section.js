// --- IMPORTS ---
import React from "react"
import Link from "next/link"

// --- DATA ---
const steps = [
  {
    num: "01",
    title: "Submit Web Application",
    desc: "Fill out the application form on our site to tell us a little about yourself.",
  },
  {
    num: "02",
    title: "Start Discord Check-in",
    desc: "Head over to the #apply-here channel in our Discord and type ?apply to begin.",
  },
  {
    num: "03",
    title: "Attend Sunday Orientation",
    desc: "Show up for our weekly orientation on Discord, Sundays at 12:30 PM EST.",
  },
]

// --- COMPONENTS ---
const JoinSection = () => (
  <section id="apply" className="lr-join">
    <div className="lr-join-inner">
      <div className="lr-join-header">
        <span className="lr-kicker">THE APPLICATION</span>
        <h2 className="lr-h2">Ready to Join?</h2>
        <p className="lr-join-lead">
          Tell us a little about yourself below. Once submitted, you'll complete your check-in through our Discord server.
        </p>
        <div className="lr-join-actions">
          <Link href="/apply" className="lr-btn lr-btn-lg lr-btn-primary">
            Apply to join
          </Link>
        </div>
      </div>
      <div className="lr-steps">
        {steps.map((s) => (
          <div className="lr-step" key={s.title}>
            <div className="lr-step-num">{s.num}</div>
            <h3 className="lr-step-title">{s.title}</h3>
            <p className="lr-step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// --- EXPORTS ---
export default JoinSection
