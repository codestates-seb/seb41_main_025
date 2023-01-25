import React, { useState, useEffect, useRef } from "react";
import * as S from "./styled";
import ModalBasic from "../ModalBasic/ModalBasic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Mypage = (props) => {
  const [info, setInfo] = useState([]);
  const [pwd, setPwd] = useState([]);


  //todo: memberid 에 따라서 내 정보를 받아올 수 있도록 url 수정
  //* 비밀번호 확인 로직
  // todo: 이미지에 hover 했을 때 이미지 변경 되게 수정

  const memberId = localStorage.getItem("memberId");
  console.log(memberId);

  useEffect(() => {
    axios
      .get(`http://whatu1.kro.kr:8080/members/${memberId}`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          AutHorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setInfo(res.data.data);
        setPwd();
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
  const navigate = useNavigate();

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
    window.location.reload();
    navigate(`/`);
    window.location.reload();
  };

  return (
    <S.Wrapper>
      <S.MypageDiv>
        <S.UserInfoHeader>
          <S.UserImage>
            <img
              src={info.memberPicture}
              className="memberPicture"
              alt="사용자 이미지"
              width={"300px"}
            ></img>
          </S.UserImage>
          <S.UserInfo>
            <S.UserName>{info.name}</S.UserName>
            <S.ModifyBtn type="submit" value="저장" onClick={showModal}>
              회원 정보 수정
            </S.ModifyBtn>
            {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
          </S.UserInfo>
        </S.UserInfoHeader>

        {/* <S.FormStyle> */}
        <S.FormDiv>
          <S.InputItem>
            <S.InputLabel htmlFor="name">이름</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="user_pwd"
                value={info.name}
                placeholder="수정할 비밀번호를 입력해주세요"
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
            <S.InputLabel htmlFor="profile">프로필</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                // type="file"
                // style={{display:"none"}}
                id="profile"
                value={info.memberPicture}
                // value={id}

                placeholder="수정할 프로필을 적용해주세요"
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
        </S.FormDiv>
        {/* <S.SaveBtn type="submit"  value="저장">
          저장
        </S.SaveBtn> */}
        {/* </S.FormStyle> */}

        <S.DeleteBtn type="submit" value="저장" onClick={deleteMember}>
          회원탈퇴
        </S.DeleteBtn>
      </S.MypageDiv>
    </S.Wrapper>
  );
};

export default Mypage;
