'use client'

import '@ant-design/v5-patch-for-react-19'
import React from "react"
import styled from "styled-components"
import { Section } from "./custom"
import Link from "next/link"
import Image from "next/image"
import { Col, Layout, Row, Space, Typography } from "antd"
import logo from "../images/logo.png"
import discordBrands from "../images/discord-brands.svg"
import envelopeSquareSolid from "../images/envelope-square-solid.svg"
const { Header } = Layout
const { Text } = Typography

const CoverLayout = styled(Layout)`
  width:100%;
  display:block;
  background:none;
`

const StyledHeader = styled(Header)`
  height:auto;
  line-height:inherit;
  background:none;
  padding:0;
  margin:0;
  @media (min-width: 768px) {
    .header-links {
      justify-content: flex-start;
    }
  }
`

const HeaderSection = styled(Section)`
  padding-bottom: 0px;
`

const HeaderLinks = styled(Col)`
  background-color:#fffc;
  padding-top:.6em;
  padding-bottom:.2em;
  vertical-align:middle;
  border-radius:.33rem;
  margin:.2em 0 1em;
  @media (min-width: 768px) {
    margin-bottom:.2em;
  }
`

const AppFrame = ({ children }) => {
  return (
    <CoverLayout>
      <StyledHeader>
        <HeaderSection transparent>
          <Row justify="space-between" align="middle" gutter={[16,0]}>
            <Col xs={24} sm={24} md={16}>
              <Link href="/">
                <Image src={logo} alt="Liars, Cheats, and Thieves" style={{maxWidth:'100%', height:'auto'}} priority />
              </Link>
            </Col>
            <HeaderLinks xs={24} sm={24} md={8}>
              <Row justify="space-around" gutter={16} className="header-links">
                <Col>
                  <a href="https://discord.gg/TefAuR4m5c">
                    <Space direction="horizontal">
                      <Image src={discordBrands} alt="discord" width={36} />
                      <Text>Join us on Discord</Text>
                    </Space>
                  </a>
                </Col>
                <Col>
                  <Link href="/apply">
                    <Space direction="horizontal">
                      <Image src={envelopeSquareSolid} alt="discord" width={36} />
                      <Text>Apply Now</Text>
                    </Space>
                  </Link>
                </Col>
              </Row>
            </HeaderLinks>
          </Row>
        </HeaderSection>
      </StyledHeader>
      <Layout style={{background:"none"}}>{children}</Layout>
    </CoverLayout>
  )
};

export default AppFrame;
