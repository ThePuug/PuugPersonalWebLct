import React from "react"
import { Link } from "gatsby"
import { Col, Layout, Row, Space } from "antd"
import { StaticImage } from "gatsby-plugin-image"
const { Content, Header } = Layout

const CustomLayout = ({children}) => {
  return <Layout>
    <Header>
      <div>
        <Row align="space-between" justify="middle" gutter={16}>
          <Col xs={24} sm={24} md={16}>
            <StaticImage src="../images/logo.png" alt="Liars, Cheats, and Thieves" placeholder="blurred" />
          </Col>
          <Col xs={24} sm={24} md={8} className="menu-container">
            <Row align="space-around" gutter={16}>
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
    </Header>
    <Content>{children}</Content>
  </Layout>
};

export default CustomLayout;
