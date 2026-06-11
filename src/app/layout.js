import "./global.css"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { GoogleAnalytics } from "@next/third-parties/google"
import StyledComponentsRegistry from "@/components/styled-components-registry"
import AppFrame from "@/components/header"

export const metadata = { title: 'Liars, Cheats, and Thieves' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <StyledComponentsRegistry>
            <AppFrame>{children}</AppFrame>
          </StyledComponentsRegistry>
        </AntdRegistry>
        <GoogleAnalytics gaId="271244130" />
      </body>
    </html>
  )
}
