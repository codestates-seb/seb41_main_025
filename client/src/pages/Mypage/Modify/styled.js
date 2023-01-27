import styled from "styled-components";
import { ModifyBtn } from "../Mypage/styled";

export const MypageDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  /* width: 1440px; */
  height: 655x;
  margin-bottom: 30px;
  padding: 60px 60px 0px;
  form {
    display: flex;
    width: 100%;
    height: 300px;
    padding: 60px 0px;
    align-items: center;
  }
`;

export const UserInfoHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 60px;
  .userImage {
    padding-left: 80px;
    width: 300px;
    height: 300px;

    & > .memberPicture {
      border-radius: 30%;
    }
  }
  .userInfo {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-left: 80px;
  }
  .userName {
    padding: 0px 0px 80px 30px;
    font-size: 30px;
  }
`;

export const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  align-items: end;
  padding-right: 100px;
  margin-right: 120px;
`;

export const InputItem = styled.div`
  display: flex;
  align-items: center;
  height: 200x;
`;

export const InputLabel = styled.div`
  padding-right: 30px;
`;
export const InputDiv = styled.div``;

export const MyInput = styled.input`
  display: flex;
  width: 360px;
  height: 50px;
  border: none;
  border-bottom: 1px solid #999999;
  :focus {
    outline: none;
    border-bottom: 2px solid #167e6c;
  }
`;

// const ModifyBtn = styled.button`
//   width: 240px;
//   height: 60px;
//   background-color: #167e6c;
//   color: white;
//   border: none;
//   border-radius: 15px;
//   font-size: 32px;
//   font-weight: 300;
// `;

export const SaveBtn = styled(ModifyBtn)`
  width: 140px;
`;

export const DeleteBtn = styled(ModifyBtn)`
  width: 150px;
  margin: 50px;
`;
