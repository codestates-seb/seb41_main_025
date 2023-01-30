import styled from "styled-components";

export const FooterWrap = styled.div`
  width: 100%;
  /* border-top: 1px solid #d0d0d0; */
  background: #4BA6B2;
`

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  color: #ffffff;
  @media only screen and (max-width: ${'350px'}) {
    height: 200px;
    margin: 20px 0px 0 0;
    } 

  .logo {
    width: 300px;
    height: 150px;
    margin: 20px 0px;
    img { width: 100% }

    @media only screen and (max-width: ${'350px'}) {
      width: 100px;
      height: 150px;
      margin: 20px 0px 0 0;
    } 
  }

  .copyright {
    span { font-size: 13px; }
  }
`

export const Creaters = styled.div`
  display: flex;
  padding-top: 30px;
  padding-bottom: 50px; 
  div { 
    display: flex;
    ul {
      display: flex;
    } 
  }
  @media only screen and (max-width: ${'350px'}) {
    display: grid;
    padding-top: 10px;
    justify-items: center;
    font-size: 15px;
  }

  span { margin-right: 20px; }
  .title {
    margin-right: 30px;

    @media only screen and (max-width: ${'350px'}) {
      padding-top: 20px;
      font-size: 10px;
    } 
  }
`