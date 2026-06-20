import "./global.css"
import { Cinzel, Manrope } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import AppFrame from "@/components/header"

const cinzel = Cinzel({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-cinzel", display: "swap" })
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-manrope", display: "swap" })

export const metadata = {
  title: "Liars, Cheats, and Thieves",
  description: "A community-focused Guild Wars 2 guild on NA servers — together since the days of Guild Wars 1. Casual to hardcore, brand-new to veteran.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${manrope.variable}`}>
      <body>
        <AppFrame>{children}</AppFrame>
        <GoogleAnalytics gaId="G-59PBRENWD6" />
      </body>
    </html>
  )
}
