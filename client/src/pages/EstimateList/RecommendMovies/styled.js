import styled from "styled-components";
import { MainContainer } from "../../Main/styled";

export const RecommendButton = styled.button`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 60px;
  margin-bottom: 20px;
  margin-left: 60px;
  background-color: #4BA6B2;
  border-radius: 15px;
  border: 0;
  color: white;
  font-size: 20px;
  :active {
    color: #4BA6B2;
    background-color: whitesmoke;
  }

  @media only screen and (max-width: ${"350px"}) {
    width: 200px;
  }
`;
export const RecommendDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin-bottom: 30px;
  @media only screen and (max-width: ${"350px"}) {
    width: 300px;
  }
`;

export const TitleDiv = styled.div`
  display: grid;
  align-content: flex-start;
  width: 500px;
  margin-bottom: 80px;
  /* .title {
    font-size: 0px;
    @media only screen and (max-width: ${"350px"}) {
      font-size: 10px;
    }
  } */
  @media only screen and (max-width: ${"350px"}) {
    width: 300px;
    margin-left: 190px;
  }
`;

export const ButtonDiv = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  font-size: 25px;
  color: black;
  border: none;

  .active {
    width: calc(100% / 4);
    border-bottom: 2px solid #000000;
    @media only screen and (max-width: ${"350px"}) {
      width: 200px;
      margin: auto;
      font-size: 17px;
    }
  }
  @media only screen and (max-width: ${"350px"}) {
    width: 300px;
    margin-left: 110px;
    font-size: 15px;
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 1120px;
  height: 100%;
  margin-top: 20px;
  background: #bcede4;
  padding-bottom: 30px;

  .inputDiv {
    width: 80%;
  }
  .recommendInput {
    width: 70%;
    height: 100px;
    background-color: #4ba6b2;
    color: #ffffff;
    border: none;
    &:active {
      border: none;
    }

    ::placeholder {
      padding-left: 30px;
      color: #ffffff;
    }
  }
`;
export const CommentItem = styled.div`
  width: 1000px;
  margin: 0 auto;
  margin-bottom: 10px;
  @media only screen and (max-width: ${"700px"}) {
    width: 100vh;
  }
  @media only screen and (max-width: ${"350px"}) {
    width: 50px;
    margin-left: 50%;
  }
`;
export const Title = styled(MainContainer)`
  width: 500px;
  height: 100%;
  margin: 100px 100px 0 100px;
  .title {
    font-size: 20px;
    text-decoration: underline #4BA6B2;
    text-decoration-thickness: 4px;
    text-underline-offset: 20px;

    @media only screen and (max-width: ${"700px"}) {
      font-size: 25px;
    }
    @media only screen and (max-width: ${"350px"}) {
      font-size: 15px;
    }
  }
  @media only screen and (max-width: ${"350px"}) {
    width: 300px;
    margin: 80px 0 0 -170px;
  }
`;
