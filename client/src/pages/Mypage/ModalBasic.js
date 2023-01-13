import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  /* top: 0; */
  /* left: 0; */
  right: 0;
  bottom: 0;
  backdrop-filter: blur(0.5px);
  background-color: rgba(255, 255, 255, 0.15);
`;

const ModalBlock = styled.div`
  position: absolute;
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

const Close = styled.button`
  /* position: absolute; */
  width: 50px;
  height: 30px;
  font-size: medium;
  background-color: #167e6c;
  color:#ffffff;
  border: none;
  border-radius: 10px;
`;

const InputItem = styled.div`
  display: flex;

  align-items: center;

  
  //인풋창 배치
  padding: 150px 30px;
`;

const MyInput = styled.input`
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

const SubmitBtn = styled(Close)`
  margin: 10px 0px 0px 370px;
`

const ModalBasic = ({ setModalOpen }) => {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 비밀번호 확인
  const [password, setPassword] = useState("");
  // 오류 메세지
  const [passwordMessage, setPasswordMessage] = useState("")

  // const  onChangePwd = useCallback((e) => {
  //   setPassword(e.target.value);
  //   console.log(e.target.value);
  // }, [])
  // const  onChangePwd = (e) => {
  //   setPassword(e.target.value);
  //   console.log(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("클릭함");
    if (password === "") {
      setPasswordMessage('비밀번호를 확인해주세요')
    } setPassword(password); //pasword 값
    //todo : 입력한 값을 확인해서 값이 존재하면 확인 되었습니다 / 아니면 비밀번호가 올바르지 않습니다
    // 비밀번호 찾기 로직과 비슷할듯..?
  }

  //todo: input에 입력한 pw를 저장된 데이터와 비교하여 pw 존재하는지 확인하고, 존재한다면 비밀번호 일치하는지 확인해서 결과값 전달
  return (
    <Container>
      <ModalBlock>
        <div className="boxing">
          <Close className="close" onClick={closeModal}>
            X
          </Close>
          {console.log(password)}
          <InputItem>
            <MyInput
              type="text"
              id="password"
              value={password}
              // onChange={onChangePwd}
              placeholder="비밀번호를 입력해주세요"
            />
          </InputItem>
          <SubmitBtn onClick={handleSubmit}>확인</SubmitBtn>
          {/* <p>비밀번호를 입력해주세요</p> */}
        </div>
      </ModalBlock>
    </Container>
  );
};

export default ModalBasic;
