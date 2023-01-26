import styled from "styled-components";

export const RecommendDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  margin-bottom: 30px;
  `;

export const TitleDiv = styled.div`
  display: flex;
  align-content: flex-start;
  width: 1120px;
  margin: 80px;
  
  h1 {
    font-size: 32px;
    border-bottom: 2px solid #167e6c;
  }
`;

export const ButtonDiv = styled.div`
  width: 1120px;
  display: flex;
  justify-content: space-around;
  /* align-items: center; */
  list-style: none;
  /* height: 85px; */
  /* background-color: #167e6c; */
  font-size: 28px;
  text-align: center;
  color: black;
  border: none;
  border-bottom: 1px solid #898989;

  .active {
    width: calc(100% / 3);
    border-bottom: 2px solid #000000;
    text-align: center;
    border-bottom: 2px solid #167e6c;
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
    background-color: #58bfad;
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
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

export const Introduce = styled.div`
  margin-bottom: 50px;
`