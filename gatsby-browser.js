import React from "react"
import Template from "./src/components/template"

export const wrapPageElement = ({ element, props }) => (
  <Template {...props}>{element}</Template>
)