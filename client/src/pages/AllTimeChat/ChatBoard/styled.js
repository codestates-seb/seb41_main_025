import styled from "styled-components";
import { InputDiv } from "../../Detail/Comment/styled";

export const ContentList = styled.div`
  width: 100%;
  height: auto;
  padding-top: 10px;
  @media only screen and (max-width: ${"350px"}) {
    width: 300px;
  }
`;

export const ContentItem = styled.div`
  padding: 20px;
  @media only screen and (max-width: ${"350px"}) {
    font-size: 5px;
  }
  .userInfo {
    text-align: left;
    padding-bottom: 10px;
    @media only screen and (max-width: ${"350px"}) {
      font-size: 7px;
    }
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 356px;
    min-height: 50px;
    padding: 15px;
    color: #ffffff;
    background: #4ba6b2;
    border-radius: 30px;
    @media only screen and (max-width: ${"350px"}) {
      font-size: 5px;
      width: 100px;
    }
  }
  .memberPicture {
    border-radius: 30px;
    width: 48px;
    height: 48px;
    @media only screen and (max-width: ${"350px"}) {
      width: 30px;
      height: 30px;
    }
  }
`;
export const ContentItemMe = styled.div`
  padding: 20px;
  text-align: right;
  .userInfo {
    text-align: right;
    padding-bottom: 10px;
    @media only screen and (max-width: ${"350px"}) {
      font-size: 7px;
    }
  }
  .deleteChat {
    background-color: #ececec;
    border: none;
    color: #4ba6b2;
    font-size: medium;
    margin-right: 5px;
    cursor: pointer;
    @media only screen and (max-width: ${"350px"}) {
      font-size: 3px;
    }
  }
  .userInfText{
    padding: 0px 5px;
  }
  .content {
    margin-left: 64%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 356px;
    min-height: 50px;
    padding: 15px;
    color: #ffffff;
    background: #4ba6b2;
    border-radius: 30px;
    @media only screen and (max-width: ${"350px"}) {
      font-size: 5px;
      width: 100px;
    }
  }
  .memberPicture {
    border-radius: 30px;
    width: 48px;
    @media only screen and (max-width: ${"350px"}) {
      width: 30px;
      height: 30px;
    }
  }
`;

export const InputDivs = styled(InputDiv)`
  display: flex;
  justify-content: center;

  .recommendInput {
    width: 800px;
    font-size: 15px;
    border: none;
    &:focus {
      outline: none;
      border: none;
    }
    @media only screen and (max-width: ${"350px"}) {
      font-size: 10px;
      width: 200px;
      height: 60px;
    }
  }
`;

export const ButtonDiv = styled.button`
  width: 100px;
  border: none;
  background-color: #d9d9d9;
  border-radius: 10px;
  @media only screen and (max-width: ${"350px"}) {
    width: 60px;
  }
`;
