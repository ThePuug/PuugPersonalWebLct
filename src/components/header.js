// --- IMPORTS ---
import React from "react"
import Link from "next/link"

// --- COMPONENTS ---
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
      <Link href="/apply" className="lr-btn lr-btn-primary">Apply</Link>
    </nav>
  </header>
)

// --- EXPORTS ---
export default AppFrame
