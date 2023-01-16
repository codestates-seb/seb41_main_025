import React from "react";
import * as S from "./styled";

const ModalBasic = ({ setModalOpen }) => {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <S.Container>
      <S.CloseBtn className="close" onClick={closeModal}>
        X
      </S.CloseBtn>
      <S.InputItem>
        <S.MyInput
          id="password"
          placeholder="비밀번호를 입력해주세요"
        />
      </S.InputItem>
      {/* <p>비밀번호를 입력해주세요</p> */}
    </S.Container>
  );
};

export default ModalBasic;
