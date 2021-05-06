import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { Col, Layout, Row, Space } from "antd"
import { StaticImage } from "gatsby-plugin-image"
const { Header } = Layout

const StyledLayout = styled(Layout)`
  width:100%
  display:block;
`

const StyledHeader = styled(Header)`
  height:auto;
  line-height:inherit;
  background-color:#fff8;
  max-width: 1199px;
  margin: 0 auto;
  padding: 0 16px;
  > * {
    max-width: 1199px;
    margin: 0 auto;
  }
  @media (min-width: 992px) {
    padding: 0 50px;
  }
  @media (min-width: 768px) {
    .ant-row-space-around {
      justify-content: flex-start;
    }
  }
`

const CustomLayout = ({ children }) => {
  return (
    <StyledLayout>
      <StyledHeader>
        <div>
          <Row align="space-between" justify="middle" gutter={16}>
            <Col xs={24} sm={24} md={16}>
              <Link to="/">
                <StaticImage src="../images/logo.png" alt="Liars, Cheats, and Thieves" placeholder="blurred" />
              </Link>
            </Col>
            <Col xs={24} sm={24} md={8} className="menu-container">
              <Row align="space-around" gutter={16} style={{ paddingTop: "1em" }}>
                <Col>
                  <Space direction="horizontal">
                    <StaticImage src="../images/discord-brands.svg" alt="discord" width={36} />
                    <a href="https://discord.gg/rvENckg">Join us on Discord</a>
                  </Space>
                </Col>
                <Col>
                  <Space direction="horizontal">
                    <StaticImage src="../images/envelope-square-solid.svg" alt="discord" width={36} />
                    <Link to="/apply">Apply Now</Link>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </StyledHeader>
      <Layout>{children}</Layout>
    </StyledLayout>
  )
};

export default CustomLayout;
