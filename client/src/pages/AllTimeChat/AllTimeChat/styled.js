import styled from "styled-components";

export const RecommendDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  margin-bottom: 30px;
  @media only screen and (max-width: ${'350px'}) {
   width: 300px;
  } 
  `;

export const TitleDiv = styled.div`
  display: flex;
  align-content: flex-start;
  width: 1120px;
  margin: 80px;
  @media only screen and (max-width: ${'350px'}) {
    width: 300px;
  } 
  
  h1 {
    font-size: 32px;
    /* border-bottom: 3px solid #4BA6B2; */
    @media only screen and (max-width: ${'350px'}) {
    font-size: 25px;
    margin: 20px;
  } 
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
  cursor: pointer;
  @media only screen and (max-width: ${'350px'}) {
    width: 300px;
    font-size: 20px;
  } 
  .none{
    width: calc(100% / 3);
  }

  .active {
    width: calc(100% / 3);
    border-bottom: 2px solid #000000;
    text-align: center;
    border-bottom: 2px solid #4BA6B2;
  }
`;

export const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 1120px;
  height: 100%;
  margin-top: 20px;
  background: #ececec;
  border-radius: 10px;
  padding-bottom: 30px;
  cursor: pointer;
  @media only screen and (max-width: ${'350px'}) {
    width: 300px;
  } 
`;

export const CommentItem = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

export const Introduce = styled.div`
  margin-bottom: 50px;
  @media only screen and (max-width: ${'350px'}) {
    font-size: 12px;
  } 
`