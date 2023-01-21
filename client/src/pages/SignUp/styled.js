import styled from "styled-components";
import { WhiteLoginbutton, Enter, Window } from "../Login/styled";

export const WindowDiv = styled(Window)`
  display: flex;
  /* justify-content: flex-start; */
  align-items: center;
  /* margin: auto; */
  @media only screen and (max-width: ${"300px"}) {
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

  @media only screen and (max-width: ${"300px"}) {
    font-size: 0px;
  }
`;
export const SignupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px 0px 0px  230px;
  background-color: white;
  border-radius: 30px;
  color: #054d40;
  font-size: 17px;
  border: 0;
  text-decoration: none;
  cursor: pointer;

  @media only screen and (max-width: ${"300px"}) {
    margin-left: 10px;
  }
`;
export const EnterContent = styled.form`
  display: grid;
  justify-items: center;
  width: 380px;
  margin-top: 50px;
  @media only screen and (max-width: ${"300px"}) {
    margin-left: 30px;
    display: grid;
    justify-content: center;
    width: 80px;
  }
`;

export const Enters = styled(Enter)`
  width: 350px;
  @media only screen and (max-width: ${"300px"}) {
    width: 250px;
  }
`;
