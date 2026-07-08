import * as React from "react"
import Link from "next/link"

export const metadata = { title: "Not found · Liars, Cheats, and Thieves" }

const NotFoundPage = () => (
  <div className="lr-notfound">
    <span className="lr-eyebrow">404</span>
    <h1>Page not found</h1>
    <p>
      Sorry{" "}
      <span role="img" aria-label="Pensive emoji">😔</span>{" "}
      we couldn&apos;t find what you were looking for.
    </p>
    <Link href="/" className="lr-btn lr-btn-lg lr-btn-primary">Go home →</Link>
  </div>
)

export default NotFoundPage
