import React, { useState } from "react"
import styled from "styled-components"
import tzdata from "tzdata"
import axios from "axios"
import { MdxSection, Section } from "../components/custom"
import { graphql } from "gatsby"
import { Button, Card, Checkbox, Drawer, Form, Input, Layout, message, Radio, Result, Select, Typography } from "antd"
import { AudioTwoTone, DoubleLeftOutlined, DoubleRightOutlined, IdcardTwoTone, InteractionTwoTone, QuestionCircleTwoTone, SkinTwoTone, SmileTwoTone } from '@ant-design/icons';
import { DateTime } from "luxon"

const { zones } = tzdata
const { TextArea } = Input
const { Option } = Select
const { Text, Title } = Typography
const { Content } = Layout

const UnfoldIcon = styled(DoubleRightOutlined)`
  position: fixed;
  bottom: .25em;
  left: 0;
  display: block;
  font-size: 4rem;
  padding-left:.25em;
  color:white;
  background-color:#1890ff;
  border-left:none;
  border-radius:0 .33em .33em 0;
  box-shadow:1px 1px 7px #000;
`

const StyledCard = styled(Card)`
  background-color:#fffc;
  max-width: 600px;
  margin: 0 auto;
  ol {
    padding-left:1em;
  }
`

const StyledSelect = styled(Select)`
  width:50%;
`

const StyledDrawer = styled(Drawer)`
  .ant-drawer-content {
    background:none;
  }
`

const FoldButton = styled(Button)`
  float: right;
  margin-top:1em;
`

const Page = ({ data }) => {
  const [visible, setVisible] = useState(false)
  const [detailQuestion, setDetailQuestion] = useState(null)
  const [viewed, setViewed] = useState(false)
  const [formAction, setFormAction] = useState({ action: "Apply now!", disabled: false })
  const dto = DateTime.local()
  const timezoneOptions = Object.entries(zones)
    .filter(([tz, v]) => Array.isArray(v) && DateTime.local().setZone(tz).isValid)
    .map(([tz, _]) => {
      const dt = dto.setZone(tz)
      return [tz, dt.zoneName.replace(/_/g, ' '), dt.toFormat('Z'), dt.isInDST]
    })
    .map(([tz, zone, offset, dst]) => <Option key={tz} value={`[UTC${offset}] ${zone}${dst ? " (DST)" : ""}`}>{zone}</Option>)

  const onFinish = (values) => {
    setFormAction({ action: "Please wait...", disabled: true })
    axios.post('/api/apply', values)
      .then((res) => {
        setFormAction({ action: "sent", disabled: true })
      }).catch((ex) => {
        message.error("Something went wrong, please try again.")
        setFormAction({ action: "Send", disabled: false })
      })
  }

  const firstFocus = (e) => {
    if (!viewed) {
      setViewed(true)
      setVisible(true)
    }
  }

  const unfold = () => { 
    setViewed(true)
    setVisible(true)
  }

  return (<>
    <StyledDrawer title="You can close this window at any time" visible={visible} placement="left" theme="light" width="90%"
      onClose={() => setVisible(false)}
      drawerStyle={{background:"none"}}
      contentWrapperStyle={{ maxWidth: 1199, backgroundColor:"#fffc" }}
      headerStyle={{backgroundColor:"#fffc"}}>
        <MdxSection>{data.mdx.body}</MdxSection>
        <FoldButton type="primary" icon={<DoubleLeftOutlined />} onClick={() => setVisible(false)}>Return to application form</FoldButton>
    </StyledDrawer>
    <Content>
      <Section transparent>
        <StyledCard title="Join us!">
          {formAction.action !== "sent" &&
            <Form colon={false} onFinish={onFinish} onFinishFailed={() => { }} labelCol={{ span: 8 }} onFocus={firstFocus}>
              <Form.Item required={false} name="PreferredName" label="Preferred Name" rules={[
                { required: true, message: "This field is required." }]
              }>
                <Input size="large" placeholder="What should others call you by" maxLength={50} prefix={<SkinTwoTone />} />
              </Form.Item>
              <Form.Item required={false} name="PreferredPronouns" label="Preferred Pronouns" rules={[
                { required: true, message: "This fields is required." }
              ]}>
                <Input size="large" placeholder="He / She / Sie / They" maxLength={15} prefix={<InteractionTwoTone />} />
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
              <Button block type="primary" htmlType="submit" disabled={formAction.disabled}>{formAction.action}</Button>
            </Form>
          }
          {formAction.action === "sent" &&
            <Result icon={<SmileTwoTone />} title="Application submitted!" subTitle="There's a couple steps left">
              <ol>
                <li><Checkbox checked disabled key={1}><Text delete>Submit your application</Text></Checkbox></li>
                <li><Checkbox disabled key={2}><Text strong>Get connected to our <a href="https://discord.gg/rvENckg">Discord server</a></Text></Checkbox></li>
                <li><Checkbox disabled key={3}><Text>Attend the next Guild Orientation, Sundays at 12:30 PM</Text></Checkbox></li>
              </ol>
            </Result>
          }
        </StyledCard>
      </Section>
    </Content>
    {!visible && <UnfoldIcon onClick={unfold} />}
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