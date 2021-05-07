import React from "react"
import styled from "styled-components"

const Section = styled.div`
  max-width: 1199px;
  width: 100%;
  margin: 0 auto;
  padding: 0 16px 16px;
  @media (min-width: 992px) {
    padding: 0 50px 50px;
  }
`

const Component = ({children}) => {
  return (
    <Section>
      {children}
    </Section>
  )
}

export default Component