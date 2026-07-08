import React from "react"
import Link from "next/link"
import DiscordIcon from "./discord-icon"

const DISCORD_URL = "https://discord.gg/TefAuR4m5c"

const Brandmark = ({ className }) => (
  <span className={className}>
    <span className="br">[</span>Liar<span className="br">]</span>
  </span>
)

const SiteHeader = () => (
  <header className="lr-header">
    <Link href="/" className="lr-brand">
      <Brandmark className="lr-brand-mark" />
      <span className="lr-brand-divider" />
      <span className="lr-brand-sub">Liars, Cheats<br />&amp; Thieves</span>
    </Link>
    <nav className="lr-nav">
      <Link href="/#events" className="lr-navlink">Events</Link>
      <Link href="/#community" className="lr-navlink">Community</Link>
      <a href={DISCORD_URL} target="_blank" rel="noopener" className="lr-btn lr-btn-ghost">
        <DiscordIcon size={17} /> Discord
      </a>
      <Link href="/apply" className="lr-btn lr-btn-primary">Apply</Link>
    </nav>
  </header>
)

const SiteFooter = () => (
  <footer className="lr-footer">
    <div className="lr-footer-inner">
      <div className="lr-footer-brand">
        <Brandmark className="lr-footer-mark" />
        <span className="lr-footer-sub">Liars, Cheats &amp; Thieves</span>
        <span className="lr-footer-tag">Community-focused since the days of Guild Wars 1 · NA servers</span>
      </div>
      <a href={DISCORD_URL} target="_blank" rel="noopener" className="lr-btn lr-btn-ghost">
        <DiscordIcon size={18} /> discord.gg/TefAuR4m5c
      </a>
    </div>
  </footer>
)

const AppFrame = ({ children }) => (
  <div className="lr-shell">
    <SiteHeader />
    <main className="lr-main">{children}</main>
    <SiteFooter />
  </div>
)

export default AppFrame
