import React, { useState, useEffect} from "react";
import * as S from "./styled";
import ModalBasic from "../ModalBasic/ModalBasic";
import { useNavigate } from "react-router-dom";
import { useCustomQuery } from "../../../components/util/useCustomQuery";
import Loading from "../../../components/Loading/Loading";

const Mypage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const memberId = localStorage.getItem("memberId");
  const navigate = useNavigate();
  // 모달창 노출 여부 state
  const { data, isLoading, error } = useCustomQuery(`/members/${memberId}`, [
    "members",
    memberId,
  ]);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  const navigatModify = () => {
    navigate(`/members/${memberId}/modify`)
  };



  if (isLoading) return <Loading />;
  const info = data.data;

  return (
    <S.Wrapper>
      <S.MypageDiv>
        <S.UserInfoHeader>
          <S.UserImage>
            <img
              src={info.memberPicture}
              className="memberPicture"
              alt="사용자 이미지"
              width={"200px"}
              height={"200px"}
            ></img>
          </S.UserImage>
          <S.UserInfo>
            <S.UserName>{info.name}</S.UserName>
            <S.ModifyBtn type="submit" value="저장" onClick={navigatModify} >
              회원 정보 수정
            </S.ModifyBtn>
          </S.UserInfo>
        </S.UserInfoHeader>
        <S.FormDiv>
          <S.InputItem>
            <S.InputLabel htmlFor="name">이름</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="name"
                value={info.name}
                placeholder="수정할 이름을 입력해주세요"
                readOnly
              />
            </S.InputDiv>
          </S.InputItem>
          <S.InputItem>
            <S.InputLabel htmlFor="nickName">닉네임</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="nickName"
                value={info.nickName}
                placeholder="수정할 닉네임을 적어주세요"
                readOnly
              />
            </S.InputDiv>
          </S.InputItem>
          <S.InputItem>
            <S.InputLabel htmlFor="user_pwd">이메일</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="user_pwd"
                value={info.email}
                placeholder="수정할 이메일을 입력해주세요"
                readOnly
              />
            </S.InputDiv>
          </S.InputItem>
        </S.FormDiv>
        <S.DeleteBtn type="submit" value="저장" onClick={showModal}>
          회원탈퇴
        </S.DeleteBtn>
        {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
      </S.MypageDiv>
    </S.Wrapper>
  );
};

export default Mypage;
