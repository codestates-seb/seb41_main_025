import React, { useState, useEffect } from "react";
import * as S from "./styled";
import ModalBasic from "../ModalBasic/ModalBasic";
import axios from "axios";
import { useParams } from "react-router-dom";

const Mypage = () => {
  const [info, setInfo] = useState([]);

  const { memberId } = useParams();
  console.log(memberId)

  // const request = {
  //   method : "get",
  //   headers : {"Content-Type" : "application/json"}
  // }

  // const userinfo = useFetch(`http://whatu1.kro.kr:8080/members/${memberId}`, request);
  // console.log(userinfo)

  // useEffect(() => {
  // axios
  //   .get(`http://whatu1.kro.kr:8080/members/${memberId}`,{
  //   })
  //   .then((res) => {
  //     setInfo(res.data)
  //     console.log(res.data);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const token = localStorage.getItem("accessToken");
  console.log(token);

  //todo: memberid 에 따라서 내 정보를 받아올 수 있도록 url 수정
  //* 비밀번호 확인 로직
  // todo: 이미지에 hover 했을 때 이미지 변경 되게 수정

  useEffect(() => {
    axios
      .get(`http://whatu1.kro.kr:8080/members/19`, {
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


  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
  };

  // const userinfo = [info]
  console.log(info);

  return (
    <S.MypageDiv>
      <S.UserInfoHeader>
        <div className="userImage">
          <img
            src={info.memberPicture}
            className="memberPicture"
            alt="사용자 이미지"
            width={"300px"}
          ></img>
        </div>
        <div className="userInfo">
          <div className="userName">{info.name}</div>
          <S.ModifyBtn type="submit" value="저장" onClick={showModal}>
            회원 정보 수정
          </S.ModifyBtn>
          {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
        </div>
      </S.UserInfoHeader>

      <S.FormStyle>
        <S.FormDiv>
          <S.InputItem>
            <S.InputLabel htmlFor="profile">프로필</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="profile"
                value={info.memberPicture}
                // value={id}
                // onChange={onChangeId}
                placeholder="수정할 프로필을 적용해주세요"
                required
              />
            </S.InputDiv>
          </S.InputItem>
          <S.InputItem>
            <S.InputLabel htmlFor="nickName">닉네임</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="nickName"
                value={info.nickName}
                // onChange={onChangePwd}
                placeholder="수정할 닉네임을 적어주세요"
                required
              />
            </S.InputDiv>
          </S.InputItem>
          <S.InputItem>
            <S.InputLabel htmlFor="user_pwd">이메일</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="user_pwd"
                value={info.email}
                // value={pwd}
                // onChange={onChangePwd}
                placeholder="수정할 이메일을 입력해주세요"
                required
              />
            </S.InputDiv>
          </S.InputItem>
          <S.InputItem>
            <S.InputLabel htmlFor="user_pwd">비밀번호</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="user_pwd"
                // value={pwd}
                // onChange={onChangePwd}
                placeholder="수정할 비밀번호를 입력해주세요"
                required
              />
            </S.InputDiv>
          </S.InputItem>
        </S.FormDiv>
        <S.SaveBtn type="submit" value="저장">
          저장
        </S.SaveBtn>
      </S.FormStyle>

      <S.DeleteBtn type="submit" value="저장">
        회원탈퇴
      </S.DeleteBtn>
    </S.MypageDiv>
  );
};

export default Mypage;
