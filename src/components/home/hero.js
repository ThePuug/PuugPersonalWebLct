import React from "react"
import Image from "next/image"
import Link from "next/link"
import DiscordIcon from "@/components/discord-icon"
import background from "@/images/background.jpg"
import logo from "@/images/logo.png"

const DISCORD_URL = "https://discord.gg/TefAuR4m5c"

const stats = [
  { num: "20+ yrs", label: "Since GW1" },
  { num: "4", label: "Guild alliance" },
  { num: "3+", label: "Weekly events" },
  { num: "0", label: "Tolerance for toxicity" },
]

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
        A home away from home for gamers. We&apos;ve stuck together since the days of Guild Wars 1 — built on human connection, not just a tag to wear.
      </p>
      <p className="lr-hero-sub">
        Casual to hardcore, brand-new to veteran. If you&apos;re on a NA server and want people to play with, you&apos;ll fit right in.
      </p>
      <div className="lr-hero-cta">
        <a href={DISCORD_URL} target="_blank" rel="noopener" className="lr-btn lr-btn-lg lr-btn-primary">
          <DiscordIcon size={20} /> Join us on Discord
        </a>
        <Link href="/apply#apply-form" className="lr-btn lr-btn-lg lr-btn-ghost">How to apply →</Link>
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

export default Hero
