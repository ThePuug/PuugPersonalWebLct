import React, { useState } from "react"
import styled from "styled-components"
import Section from "../components/section"
import tzdata from "tzdata"
import { graphql } from "gatsby"
import { Button, Drawer, Form, Input, Layout, Radio, Select, Typography } from "antd"
import { AudioTwoTone, IdcardTwoTone, MenuUnfoldOutlined, MenuFoldOutlined, QuestionCircleTwoTone, SkinTwoTone } from '@ant-design/icons';
import { DateTime } from "luxon"

import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
const shortcodes = {}

const { zones } = tzdata
const { TextArea } = Input
const { Option } = Select
const { Title } = Typography
const { Content } = Layout

const FoldIcon = styled(MenuFoldOutlined)`
  color:#000d;
  font-size: 4rem;
`

const UnfoldIcon = styled(MenuUnfoldOutlined)`
  position: fixed;
  bottom: .25em;
  left: .25em;
  display: block;
  font-size: 4rem;
`

const StyledForm = styled(Form)`
  max-width: 600px;
  margin: 0 auto;
`

const StyledSelect = styled(Select)`
  width:50%;
`

const Page = ({ data }) => {
  const [visible, setVisible] = useState(true)
  const [detailQuestion, setDetailQuestion] = useState(null)
  const dto = DateTime.local()
  const timezoneOptions = Object.entries(zones)
    .filter(([tz, v]) => Array.isArray(v) && DateTime.local().setZone(tz).isValid)
    .map(([tz, _]) => {
      const dt = dto.setZone(tz)
      return [tz, dt.zoneName.replaceAll('_', ' '), dt.toFormat('Z'), dt.isInDST]
    })
    .map(([tz, zone, offset, dst]) => <Option key={tz} value={`[UTC${offset}] ${zone}${dst ? " (DST)" : ""}`}>{zone}</Option>)

  return (<>
    <Drawer visible={visible} placement="left" theme="light" onClose={() => setVisible(false)} closeIcon={<FoldIcon />} width="90%">
      <Typography>
        <MDXProvider components={shortcodes}>
          <MDXRenderer>
            {data.mdx.body}
          </MDXRenderer>
        </MDXProvider>
      </Typography>
    </Drawer>
    <Content>
      <Section>
        <Title level={1} style={{textAlign:"center"}}>Join us!</Title>
        <StyledForm colon={false} onFinish={() => { }} onFinishFailed={() => { }} labelCol={{ span: 8 }}>
          <Form.Item required={false} name="PreferredName" label="Preferred Name" rules={[
            { required: true, message: "This field is required." }]
          }>
            <Input size="large" placeholder="What should others call you by" maxLength={50} prefix={<SkinTwoTone />} />
          </Form.Item>
          <Form.Item required={false} name="Gw2AccountId" label="GW2 Account ID" rules={[
            { required: true, message: "This field is required." },
            { pattern: new RegExp("\\w+\\.\\d{4}"), message: "Required format is: AccountName.1234" }
          ]}>
            <Input size="large" placeholder="AccountName.1234" maxLength={50} prefix={<IdcardTwoTone />} />
          </Form.Item>
          <Form.Item required={false} name="DiscordId" label="Discord ID" rules={[
            { required: true, message: "This field is required." },
            { pattern: new RegExp("\\w#\\d{4}"), message: "Required format is: Username#1234" }
          ]}>
            <Input size="large" placeholder="Username#1234" maxLength={50} prefix={<AudioTwoTone />} />
          </Form.Item>
          <Form.Item required={false} name="AboutMe" label="Tell us about yourself" labelCol={{ span: 24 }} rules={[
            { required: true, message: "This field is required." }
          ]}>
            <TextArea placeholder="Gaming background / Play style" showCount={true} maxLength={470} rows={5} />
          </Form.Item>
          <Form.Item required={false} name="LookingFor" label="What are you looking for in a guild" labelCol={{ span: 24 }} rules={[
            { required: true, message: "This field is required." }
          ]}>
            <TextArea showCount={true} maxLength={470} rows={5} />
          </Form.Item>
          <Form.Item required={false} name="Timezone" label="Select your timezone" rules={[
            { required: true, message: "This field is required." }
          ]}>
            <StyledSelect showSearch placeholder="Start typing..." optionFilterProp="children"
              filterOption={(i, o) => o.children.toLowerCase().indexOf(i.toLowerCase()) >= 0}
              filterSort={(a, b) => a.children.toLowerCase().localeCompare(b.children.toLowerCase())}
            >
              {timezoneOptions}
            </StyledSelect>
          </Form.Item>
          <Form.Item required={false} name="ReferredFrom" label="How did you hear about us?" rules={[
            { required: true, message: "This field is required." }
          ]}>
            <Radio.Group size="small" optionType="button" onChange={(e) => {
              console.log(e.target.value)
              if (e.target.value === "In Game") setDetailQuestion("What were you doing?")
              if (e.target.value === "Search Engine") setDetailQuestion("Which search engine?")
              if (e.target.value === "Friend or Referral") setDetailQuestion("Which in-game character?")
              if (e.target.value === "Recruitment Post") setDetailQuestion("Where was it posted?")
              if (e.target.value === "Other") setDetailQuestion("Briefly, explain...")
            }}>
              <Radio.Button key="In Game" value="In Game">In Game</Radio.Button>
              <Radio.Button key="Search Engine" value="Search Engine">Search Engine</Radio.Button>
              <Radio.Button key="Friend or Referral" value="Friend or Referral">Friend or Referral</Radio.Button>
              <Radio.Button key="Recruitment Post" value="Recruitment Post">Recruitment Post</Radio.Button>
              <Radio.Button key="Other" value="Other">Other</Radio.Button>
            </Radio.Group>
          </Form.Item>
          {detailQuestion &&
            <Form.Item required={false} name="ReferralDetail" label={detailQuestion} rules={[
              { required: true, message: "This field is required." }
            ]}>
              <Input size="large" maxLength={50} prefix={<QuestionCircleTwoTone />} />
            </Form.Item>
          }
          <Button block type="primary" htmlType="submit">Apply now!</Button>
        </StyledForm>
      </Section>
    </Content>
    {!visible && <UnfoldIcon onClick={() => setVisible(true)} />}
  </>)
}

export const pageQuery = graphql`query {
  mdx(slug: { eq: "apply" }) {
    id
    slug
    body
  }
}`

export default Page