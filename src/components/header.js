// --- IMPORTS ---
import React from "react"
import Link from "next/link"

// --- COMPONENTS ---
const Brandmark = ({ className }) => (
  <span className={className}>
    <span className="br">[</span>
    Liar
    <span className="br">]</span>
  </span>
)

const SiteHeader = () => (
  <header className="lr-header">
    <Link href="/" className="lr-brand" aria-label="Liar home">
      <Brandmark className="lr-brand-mark" />

      <span className="lr-brand-divider" />

      <span className="lr-brand-sub">
        Liars, Cheats
        <br />
        &amp; Thieves
      </span>
    </Link>

    <nav className="lr-nav" aria-label="Main navigation">
      <Link href="/#events" className="lr-navlink">
        Events
      </Link>

      <Link href="/apply" className="lr-btn lr-btn-primary">
        Apply
      </Link>
    </nav>
  </header>
)

const SiteFooter = () => (
  <footer className="lr-footer">
    <div className="lr-footer-inner">
      <div className="lr-footer-brand">
        <Brandmark className="lr-footer-mark" />

        <span className="lr-footer-sub">
          Liars, Cheats &amp; Thieves
        </span>

        <span className="lr-footer-tag">
          An adventuring guild since 2005.
        </span>
      </div>
    </div>
  </footer>
)

const AppFrame = ({ children }) => (
  <div className="lr-shell">
    <SiteHeader />

    <main className="lr-main">
      {children}
    </main>

    <SiteFooter />
  </div>
)

// --- EXPORTS ---
export default AppFrame