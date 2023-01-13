import styled from "styled-components";
import { Whitebutton, Enter, Window } from "../Login/styled";

export const WindowDiv = styled(Window)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* margin: auto; */
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
    font-size: 20px;
    margin-right: 50px;
  }
`;
export const SignUpButton = styled(Whitebutton)``;

