'use client'

import React from "react"
import Section from "./section"
import { Typography } from "antd"

const Component = ({ children }) => {
  return <Section>
    <Typography>
      {children}
    </Typography>
  </Section>
}

export default Component
