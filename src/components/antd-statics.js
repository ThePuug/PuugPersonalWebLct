'use client'

// Top-level re-exports of antd static subcomponents for use in server modules.
// Property access on client references (e.g. Typography.Title) returns undefined
// in the RSC layer under Turbopack, so the access must happen inside a client module.
import { Collapse, Layout, Typography } from "antd"

export const Content = Layout.Content
export const Panel = Collapse.Panel
export const Link = Typography.Link
export const Paragraph = Typography.Paragraph
export const Title = Typography.Title
