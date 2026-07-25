// --- IMPORTS ---
import React from "react"
import Link from "next/link"

// --- DATA ---
const steps = [
  {
    num: "01",
    title: "Submit Web Application",
    desc: "Fill out the application form to tell us a little about yourself.",
  },
  {
    num: "02",
    title: "Start Discord Check-in",
    desc: (
      <>
        Head over to the #apply-here channel in our Discord and type{" "}
        <span style={{ whiteSpace: "nowrap" }}>?apply</span> to begin.
      </>
    ),
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
      <div className="lr-join-header" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "3rem" }}>
        <h2 className="lr-h2">Ready to Join?</h2>
        <p className="lr-join-lead">
          Becoming a member is simple! Just follow these three easy steps to complete your check-in and get started!
        </p>
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
      <div className="lr-join-actions" style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "3rem" }}>
        <Link href="/apply" className="lr-btn lr-btn-lg lr-btn-primary">
          Apply to join
        </Link>
      </div>
    </div>
  </section>
)

// --- EXPORTS ---
export default JoinSection
