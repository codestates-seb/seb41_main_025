import axios from "axios";
import React, {useEffect, useState} from "react";
import * as S from "./styled";


const ModalBasic = ({ setModalOpen }) => {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const [info, setInfo] = useState([]);

  const token = localStorage.getItem("accessToken");
  console.log(token);

  useEffect(() => {
    axios
      .post(`http://whatu1.kro.kr:8080/members/prevModify`, 
      {
        
      },
      
      {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setInfo(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const 


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
      <S.CloseBtn className="submit" onClick={closeModal}>
        확인
      </S.CloseBtn>
    </S.Container>
  );
};

export default ModalBasic;
