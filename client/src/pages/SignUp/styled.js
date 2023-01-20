import styled from "styled-components";
import { Whitebutton, Enter, Window } from "../Login/styled";

export const WindowDiv = styled(Window)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* margin: auto; */
  @media only screen and (max-width: ${"600px"}) {
    flex-direction: column;
  }
`;

export const Hello = styled.div`
  display: flex;
  text-align: left;
  /* margin: 0auto; */
`;
export const HelloAnnouncement = styled.span`
  /* margin-top: 60px; */
  /* margin-right: 90px; */
  font-size: 30px;

  @media only screen and (max-width: ${"600px"}) {
    font-size: 0px;
  }
`;
export const SignUpButton = styled.button`
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
  cursor: pointer;
  @media only screen and (max-width: ${"600px"}) {
    margin-left: 160px;
  }
`;
export const EnterContent = styled.form`
  display: grid;
  width: 380px;
  margin-top: 50px;
  @media only screen and (max-width: ${"600px"}) {
    margin-left: 30px;
    display: grid;
    justify-content: center;
    width: 80px;
  }
`;
