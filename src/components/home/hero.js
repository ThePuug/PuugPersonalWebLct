// --- IMPORTS ---
import React from "react"
import Image from "next/image"
import Link from "next/link"
import background from "@/images/background.jpg"
import logo from "@/images/logo.png"

// --- DATA ---
const stats = [
  { num: "20+", label: "Years Active" },
  { num: "3", label: "Alliance Guilds" },
  { num: "3+", label: "Weekly events" },
  { num: "0", label: "Tolerance For Toxicity" },
]

// --- COMPONENTS ---
const Hero = () => (
  <section id="top" className="lr-hero">
    <div className="lr-hero-bg">
      <Image src={background} alt="" fill priority placeholder="blur" sizes="100vw" style={{ objectFit: "cover" }} />
    </div>
    <div className="lr-hero-fade" />
    <div className="lr-hero-inner">
      <span className="lr-hero-kicker">Guild Wars 2 · North America</span>
      <h1 className="lr-hero-h1">
        <Image src={logo} alt="Liars, Cheats and Thieves" className="lr-hero-logo" priority />
      </h1>
      <p className="lr-hero-lead">
        We’ve built a home away from home for gamers since the days of Guild Wars 1.
      </p>
      <p className="lr-hero-sub">
        Whether you're stepping into the game for the first time or tackling challenging content, there's a spot for you here.
      </p>
      <div className="lr-hero-cta">
        <Link href="/apply" className="lr-btn lr-btn-lg lr-btn-primary">How to apply →</Link>
      </div>
      <div className="lr-stats">
        {stats.map((s) => (
          <div className="lr-stat" key={s.label}>
            <div className="lr-stat-num">{s.num}</div>
            <div className="lr-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// --- EXPORTS ---
export default Hero
