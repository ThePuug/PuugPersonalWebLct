import React from "react"
import styled from "styled-components"
import { Section } from "../components/custom"
import { Link } from "gatsby"
import { Col, Layout, Row, Space, Typography } from "antd"
import { StaticImage } from "gatsby-plugin-image"
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
    .ant-row-space-around {
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

const Template = ({ children }) => {
  return (
    <CoverLayout>
      <StyledHeader>
        <HeaderSection transparent>
          <Row align="space-between" justify="middle" gutter={[16,0]}>
            <Col xs={24} sm={24} md={16}>
              <Link to="/">
                <StaticImage src="../images/logo.png" alt="Liars, Cheats, and Thieves" placeholder="blurred" />
              </Link>
            </Col>
            <HeaderLinks xs={24} sm={24} md={8}>
              <Row align="space-around" gutter={16}>
                <Col>
                  <a href="https://discord.gg/rvENckg">
                    <Space direction="horizontal">
                      <StaticImage src="../images/discord-brands.svg" alt="discord" width={36} />
                      <Text>Join us on Discord</Text>
                    </Space>
                  </a>
                </Col>
                <Col>
                  <Link to="/apply">
                    <Space direction="horizontal">
                      <StaticImage src="../images/envelope-square-solid.svg" alt="discord" width={36} />
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

export default Template;
