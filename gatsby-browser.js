import React from "react"
import Template from "./src/layout/wrapper"
import "./src/global.css"

export const wrapPageElement = ({ element, props }) => (
  <Template {...props}>{element}</Template>
)