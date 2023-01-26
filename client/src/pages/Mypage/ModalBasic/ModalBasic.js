import axios from "axios";
import React, { useState } from "react";
import * as S from "./styled";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ModalBasic = ({ setModalOpen }) => {
  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  const [pwd, setPwd] = useState("");
  const Navigate = useNavigate();
  const memberId = localStorage.getItem("memberId");

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://whatu1.kro.kr:8080/members/prevModify`, 
      {
        password: pwd
      },
      {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        }
      })
      .then((res) => {
        setPwd(res.data.data);  
        toast.success("비밀번호가 확인되었습니다")
        Navigate(`/members/${memberId}/modify`)
      })
      .catch((error) => {
        console.log(error);
        toast.error("비밀번호를 확인해주세요")
      });
    };

    const onChangePwd = (e) => {
      setPwd(e.target.value);
    }

  return (
    <S.Container>
      <S.CloseBtn className="close" onClick={closeModal}>
        X
      </S.CloseBtn>
      <S.InputItem>
        <S.MyInput
          id="password"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          pwd={pwd}
          onChange={onChangePwd}
        />
      </S.InputItem>
      <S.CloseBtn className="submit" onClick={onSubmit} >
        확인
      </S.CloseBtn>
    </S.Container>
  );
};

export default ModalBasic;
