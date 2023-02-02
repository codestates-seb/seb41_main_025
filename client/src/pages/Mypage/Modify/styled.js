import styled from "styled-components";
import { ModifyBtn } from "../Mypage/styled";

export const MypageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  margin-bottom: 30px;
  padding: 60px 60px 0px;
  @media only screen and (max-width: ${"350px"}) {
    width: 300px;
  }
  @media only screen and (max-width: ${"350px"}) {
    font-size: 15px;
  }
`;

export const UserInfoHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 60px;
  @media only screen and (max-width: ${"350px"}) {
    width: 300px;
    flex-direction: column;
  }

  .userImage {
    margin-right: 20px;
    @media only screen and (max-width: ${"350px"}) {
      width: 100px;
      height: 100px;
    }

    & > .memberPicture {
      border-radius: 30%;
      border: 1px solid #e5e5e5;
      @media only screen and (max-width: ${"350px"}) {
        width: 150px;
      }
    }
  }
  .userInfo {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    /* padding-left: 80px; */
  }
  .userName {
    padding-left: 50px;
    font-size: 30px;
  }
`;

export const FormDiv = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 1000px;
  align-items: end;
  /* margin-left: 120px; */
  @media only screen and (max-width: ${"350px"}) {
    width: 300px;
    padding: 0;
    margin-right: 100px;
    
  }
`;

export const InputItem = styled.div`
  display: flex;
  align-items: center;
`;

export const InputLabel = styled.div`
  padding-right: 30px;
`;
export const InputDiv = styled.div``;

export const MyInput = styled.input`
  display: flex;
  width: 360px;
  height: 50px;
  font-size: medium;
  border: none;
  border-bottom: 1px solid #999999;
  background-color: #f9f9f9;
  @media only screen and (max-width: ${"350px"}) {
    width: 100px;
  }
  :focus {
    outline: none;
    border-bottom: 2px solid #4ba6b2;
  }
`;

export const SaveBtn = styled(ModifyBtn)`
  width: 140px;
  margin-top: 50px;
`;

// export const Form = styled.form`
//   width: 350px;
// `;
