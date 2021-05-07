import React from "react"
import styled from "styled-components"

const Section = styled.div`
  max-width: 1199px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px 16px;
  background-color:#fffc;
  @media (min-width: 992px) {
    padding: 0 50px 50px;
  }
  border-radius:.33rem
`

const TransparentSection = styled(Section)`
  background:none;
`

const Component = (props) => {
  return <>
    {props.transparent &&
      <TransparentSection {...props}>
        {props.children}
      </TransparentSection>
    }
    {!props.transparent &&
      <Section {...props}>
        {props.children}
      </Section>
    }
  </>  
}

export default Component