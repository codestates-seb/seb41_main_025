import axios from "axios";
import React, { useState } from "react";
import * as S from "./styled";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {AiFillCloseCircle} from "react-icons/ai"



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
        toast.success("비밀번호가 확인되었습니다")
        Navigate(`/members/${memberId}/modify`)
      })
      .catch((error) => {
        console.log(error);
        toast.error("비밀번호를 확인해주세요")
      });
    };

      // 회원 탈퇴
  // TODO: 정말 회원 탈퇴를 진행하시겠습니까? 알림창 띄우기
  const deleteMember = async () => {
    await axios({
      method: "DELETE",
      url: `http://whatu1.kro.kr:8080/members/${memberId}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((data) => {
        toast.success("회원탈퇴 되었습니다");
      })
      .catch((err) => {
        console.log("err");
        return;
      });
    localStorage.clear();
    // window.location.reload();
    Navigate(`/`);
  };

  return (
    <S.ContainerDiv>
    <S.Container>
      <S.CloseBtn className="close" >
        <AiFillCloseCircle size="30" color="#4BA6B2" onClick={closeModal}/>
      </S.CloseBtn>
      <S.InputItem>
        <p>탈퇴를 원하시면 확인 버튼을 눌러주세요</p>
        {/* <S.MyInput
          id="password"
          placeholder="비밀번호를 입력해주세요"
          type="password"
          // pwd={pwd}
        /> */}
      </S.InputItem>
      {/* <S.CloseBtn className="submit" onClick={onSubmit} >
        확인
      </S.CloseBtn> */}
      <S.CloseBtn className="submit" onClick={deleteMember} >
        확인
      </S.CloseBtn>
    </S.Container>
    </S.ContainerDiv>
  );
};

export default ModalBasic;
