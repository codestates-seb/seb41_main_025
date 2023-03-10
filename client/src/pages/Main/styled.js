import styled from "styled-components";

export const MainWarp = styled.div`
  padding: 60px 60px;
  width: 100%;
  @media only screen and (max-width: ${'700px'}) {
    /* background-color: beige; */
  }
  @media only screen and (max-width: ${'350px'}) {
    width: 350px;
    padding: 10px;
  } 
`

export const MainContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 60px;
  @media only screen and (max-width: ${'700px'}) {
    /* background-color: beige; */
  } 
`
