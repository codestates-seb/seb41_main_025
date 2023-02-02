import styled from "styled-components";

export const ContainerDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.button`
  /* 모달창 크기 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  position: absolute;
  @media only screen and (max-width: ${"350px"}) {
    width: 300px;
    height: 300px;
  }
  .boxing {
    display: flex;
    flex-direction: column;
    padding: 30px;
    height: 100%;
  }
  .close {
    margin-left: 400px;
    background-color: #ffffff;
    color: black;
    font-size: 150%;
    @media only screen and (max-width: ${"350px"}) {
      margin-left: 230px;
    }
  }
`;

export const CloseBtn = styled.button`
  /* position: absolute; */
  width: 50px;
  height: 30px;
  font-size: medium;
  background-color: #4ba6b2;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  @media only screen and (max-width: ${"350px"}) {
  }
`;

export const InputItem = styled.div`
  display: flex;
  align-items: center;

  //인풋창 배치
  padding: 150px 30px;
  @media only screen and (max-width: ${"350px"}) {
    padding: 70px 30px;
  }
  p {
    font-size: 20px;
    @media only screen and (max-width: ${"350px"}) {
    font-size: 15px;
  }
  }
`;

export const MyInput = styled.input`
  display: flex;
  width: 360px;
  height: 50px;
  padding-left: 40px;
  border: none;
  border-bottom: 1px solid #999999;
  @media only screen and (max-width: ${"350px"}) {
    width: 270px;
  }
  :focus {
    outline: none;
    border-bottom: 2px solid #4ba6b2;
  }
`;
