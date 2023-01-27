import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 60px 0px;
  height: 100vh;
  @media only screen and (max-width: ${"350px"}) {
    display: grid;
    height: 100vh;
    width: 100%;
  }
`;

export const Window = styled.div`
  display: flex;
  width: 983px;
  min-height: 700px;
  border-radius: 20px;
  background-color: #58bfad;
  opacity: 0.90;
  @media only screen and (max-width: ${"350px"}) {
    width: 250px;
    height: 800px;
    display: grid;
    margin-top: 20px;
  }
`;

export const Front = styled.div`
    display: grid;
`

export const LogoFont = styled.div`
    display: flex;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    @media only screen and (max-width: ${"350px"}) {
      font-size: 13px;
      display: grid;
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: flex-end;
    width: 450px;
    margin: 150px 0 20px 40px;
    @media only screen and (max-width: ${'350px'}) {
        width: 200px;
        margin: 10px 0 20px 20px;
    }
    .greenLogo {
      height: 260px;
      width: 260px;
      @media only screen and (max-width: ${'350px'}) {
        width: 150px;
        height: 150px;
    }
    }

    .character {
      height: 130px;
      width: 130px;
      margin: 0 0px 80px -10px;
      @media only screen and (max-width: ${"350px"}) {
        width: 100px;
        height: 80px;
        margin: 0 0px 20px -10px;
      }
    }
`;

export const ContentForm = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  font-size: 50px;
  font-weight: 600;
  color: white;
  .EnterButton {
    margin-left: 300px;
    margin-bottom: 30px;
    @media only screen and (max-width: ${"350px"}) {
      margin-left: 180px;
    }
  }
  .LoginFont {
    margin-left: 30%;
    @media only screen and (max-width: ${"350px"}) {
      margin-bottom: 0 0 30px 0 ;
      font-size: 40px;
      width: 150px;
    }
  }
  @media only screen and (max-width: ${"350px"}) {
    width: 300px;
    margin-top: 80px;
  }
`;

export const Whitebutton = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin-left: 30px;
  background-color: white;
  border-radius: 30px;
  color: #054d40;
  font-size: 17px;
  border: 0;
  text-decoration: none;
  @media only screen and (max-width: ${"350px"}) {
    margin-left: 110px;
    width: 80px;
    height: 40px;
    font-size: 13px;
  }
`;

export const WhiteLoginbutton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin-left: 280px;
  background-color: white;
  border-radius: 30px;
  color: #054d40;
  font-size: 17px;
  border: 0;
  text-decoration: none;
  @media only screen and (max-width: ${"350px"}) {
    margin-left: 180px;
    width: 80px;
    height: 40px;
    font-size: 13px;
  }
`;

export const EnterContent = styled.form`
  display: grid;
  width: 380px;
  margin-top: 50px;
  @media only screen and (max-width: ${"350px"}) {
    margin: 0;
    display: grid;
    justify-content: center;
  }
`;

export const Enter = styled.input`
    margin-bottom: 70px;
    background-color: #58BFAD;
    border: 0;
    border-bottom: 2px solid #054D40;
    font-size: 20px;
    &::placeholder {
      color: #f9f9f9;
    }
  @media only screen and (max-width: ${"350px"}) {
    font-size: 15px;
    margin-right: 50px;
    width: 200px;
  }  
`
