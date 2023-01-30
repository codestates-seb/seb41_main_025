import styled from "styled-components";
import { Enter, Window } from "../Login/styled";

export const WindowDiv = styled(Window)`
  display: flex;
  /* justify-content: flex-start; */
  align-items: center;
  /* margin: auto; */
  @media only screen and (max-width: ${"350px"}) {
    flex-direction: column;
  }
`;

export const Hello = styled.div`
  display: flex;
  text-align: left;
  /* margin: 0auto; */
`;

export const LoginFont = styled.div`
  display: flex;
  justify-content: center;
  @media only screen and (max-width: ${"350px"}) {
    font-size: 40px;
    margin-top: -90px;
  }
`;
export const HelloAnnouncement = styled.span`
  /* margin-top: 60px; */
  /* margin-right: 90px; */
  font-size: 30px;

  @media only screen and (max-width: ${"350px"}) {
    font-size: 0px;
  }
`;
export const SignupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px 0px 0px 230px;
  background-color: white;
  border-radius: 30px;
  color: #054d40;
  font-size: 17px;
  font-weight: 600;
  border: 0;
  text-decoration: none;
  cursor: pointer;

  @media only screen and (max-width: ${"350px"}) {
    margin-left: 10px;
    width: 80px;
    height: 40px;
  }
`;
export const EnterContent = styled.form`
  display: grid;
  justify-items: center;
  width: 380px;
  margin-top: 30px;
  @media only screen and (max-width: ${"350px"}) {
    margin-left: 30px;
    display: grid;
    justify-content: center;
    width: 80px;
    margin-top: 0;
  }
  .message {
    font-size: 15px;
  }
`;

export const Enters = styled(Enter)`
  width: 350px;
  color: #ffffff;
  :focus {
    outline: none;
  }
  @media only screen and (max-width: ${"350px"}) {
    width: 200px;
  }

`;
export const Logo = styled.div`
  display: flex;
  align-items: flex-end;
  width: 450px;
  margin: 150px 0px 40px 0px;
  @media only screen and (max-width: ${"350px"}) {
    width: 200px;
    margin: 90px 0 20px 0px;
  }
  .greenLogo {
    height: 230px;
    width: 260px;
    @media only screen and (max-width: ${"350px"}) {
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
