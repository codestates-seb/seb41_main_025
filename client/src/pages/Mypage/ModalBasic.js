import React from "react";
import styled from "styled-components";

const Container = styled.button`
  /* 모달창 크기 */
  width: 500px;
  height: 500px;

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: gray;
  border: 1px solid black;
  border-radius: 8px;
`;

const CloseBtn = styled.button`
  /* position: absolute; */
  width: 50px;
  height: 30px;
  font-size: medium;
  background-color: #167e6c;
  border: none;
  border-radius: 10px;
`;

const InputItem = styled.div`
  /* display: flex;
  align-items: center;
  height: 200x; */
`;

const MyInput = styled.input`
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

const ModalBasic = ({ setModalOpen }) => {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    
    <Container>
    
      <CloseBtn className="close" onClick={closeModal}>
        X
      </CloseBtn>
      <InputItem>
        <MyInput
          id="password"
          placeholder="비밀번호를 입력해주세요"
        />
      </InputItem>
      {/* <p>비밀번호를 입력해주세요</p> */}
    </Container>
  );
};

export default ModalBasic;
