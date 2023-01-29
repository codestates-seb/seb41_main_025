import styled from "styled-components";

export const DetailCommentList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (max-width: ${'350px'}) {
    height: 20px;
    } 
`;

export const DetailCommentItem = styled.div`
  width: 1200px;
  min-height: 100px;
  padding: 10px;
  background: #ECECEC;
  margin-bottom: 10px;
  font-size: 13px;
  border-radius: 10px;
  @media only screen and (max-width: ${"350px"}) {
    width: 90%;
    height: 60px;
  }
  @media only screen and (max-width: ${"700px"}) {
    width: 90%;
  }
  .userInfo {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: #000000;
    @media only screen and (max-width: ${'350px'}) {
    
  } 
    .name {
      padding-left: 20px;
      font-size: 17px;
      @media only screen and (max-width: ${'350px'}) {
      font-size: 7px;
  } 
    }
  }
  .content {
    display: flex;
    padding-top: 15px;
    border-top: 1px solid #D9D9D9;
    color: #000000;
    font-size: 17px;
    @media only screen and (max-width: ${'350px'}) {
    font-size: 5px;
    
  } 
  }
  .memberPicture {
    border-radius: 30px;
    width: 50px;
    height: 50px;
    @media only screen and (max-width: ${'350px'}) {
    width: 20px;
  } 
  }
`;

export const InputDiv = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 20px;
  margin-left: 10px;

  .recommendInput {
    width: 100%;
    height: 100px;
    padding-left: 30px;
    background-color: #F9f9f9;
    font-size: 17px;
    border: none;
    border: 2px solid #D9D9D9;
    border-radius: 10px;
    @media only screen and (max-width: ${'350px'}) {
      font-size: 10px;
      height: 60px;
      width: 300px;
    } 
    &:focus {
      outline: none;
      border: 2px solid #4BA6B2;
    }
    ::placeholder {
      color: #7e7e7e;
    }
  }
   .buttonDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 100px;
    background-color: #d9d9d9;
    border-radius: 10px;
    @media only screen and (max-width: ${'350px'}) {
      height: 60px;
    } 
  }
  .submit {
    width: 110px;
    height: 100px;
    color: #ffffff;
    background-color: #4BA6B2;
    border: none;
    border-radius: 10px;
    font-size: 17px;
    cursor: pointer;
    
    @media only screen and (max-width: ${'350px'}) {
      width: 40px;
      height: 20px;
      font-size: 10px;
    } 
  }
`;


