import React from "react"
import Layout from "./src/templates/default"
const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
export default wrapPageElement