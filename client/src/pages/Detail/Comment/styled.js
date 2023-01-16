import styled from "styled-components";

export const DetailCommentList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DetailCommentItem = styled.div`
  width: 1220px;
  height: 100px;
  padding: 10px;
  background: #58bfad;
  margin-bottom: 10px;
  font-size: 13px;
  border-radius: 10px;
  @media only screen and (max-width: ${"600px"}) {
    width: 90%;
  }
  @media only screen and (max-width: ${"1200px"}) {
    width: 90%;
  }
  .userInfo {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    color: #ffffff;
    .name {
      padding-left: 10px;
    }
  }
  .content {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    color: #ffffff;
    font-size: 17px;
    border-radius: 30px;
  }
  .memberPicture {
    border-radius: 30px;
    width: 48px;
  }
`;

export const InputDiv = styled.div`
  display: flex;
  width: 80%;
  margin-top: 20px;
  .recommendInput {
    width: 100%;
    height: 100px;
    padding-left: 30px;
    background-color: #58bfad;
    color: #ffffff;
    font-size: 20px;
    border: none;
    border-radius: 10px;
    &:focus {
      outline: none;
    }
    ::placeholder {
      color: #ffffff;
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
  }
  .submit {
    width: 48px;
    height: 28px;
    color: #ffffff;
    background-color: #58bfad;
    border: none;
    border-radius: 10px;
  }
`;

export const InputButton = styled.button`
    width: 30px;
    height: 30px;
`

export const Buttons = styled.div`
    display: grid;
`
