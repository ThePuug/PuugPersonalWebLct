'use client'

import '@ant-design/v5-patch-for-react-19'
import React from "react"
import { ConfigProvider, theme } from "antd"

// antd runs dark with the guild's gold accent so the few remaining antd
// surfaces (the community accordion) match the Ember theme.
export default function ThemeProvider({ children }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#d4af37",
          colorBgBase: "#14110c",
          colorText: "#f3eede",
          colorTextSecondary: "#b9ae94",
          fontFamily: "var(--font-manrope), system-ui, sans-serif",
          borderRadius: 14,
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
