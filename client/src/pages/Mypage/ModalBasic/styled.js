import styled from "styled-components";

export const Container = styled.button`
  /* 모달창 크기 */
  width: 500px;
  height: 500px;
  //모달창 정중앙에 위치
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: #ffffff;
  box-shadow: 4px 9px 9px rgb(32 33 36 / 30%);
  border: none;
  border-radius: 8px;
  .boxing {
    display: flex;
    flex-direction: column;
    padding: 30px;
    height: 100%;
  }
`;

export const CloseBtn = styled.button`
  /* position: absolute; */
  width: 50px;
  height: 30px;
  font-size: medium;
  background-color: #167e6c;
  color:#ffffff;
  border: none;
  border-radius: 10px;
`;

export const InputItem = styled.div`
  display: flex;
  align-items: center;

  
  //인풋창 배치
  padding: 150px 30px;
`;

export const MyInput = styled.input`
  display: flex;

  width: 360px;
  height: 50px;
  padding-left: 40px;
  
  border: none;
  border-bottom: 1px solid #999999;
  :focus {
    outline: none;
    border-bottom: 2px solid #167e6c;
  }
`;
