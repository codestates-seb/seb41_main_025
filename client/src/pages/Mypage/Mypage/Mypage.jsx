import React, { useState, useEffect} from "react";
import * as S from "./styled";
import ModalBasic from "../ModalBasic/ModalBasic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCustomQuery } from "../../../components/util/useCustomQuery";

const Mypage = () => {
  // const [info, setInfo] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const memberId = localStorage.getItem("memberId");
  const navigate = useNavigate();
  // 모달창 노출 여부 state
  const { data, isLoading, error } = useCustomQuery(`/members/${memberId}`, [
    "members",
    memberId,
  ]);

  // useEffect(() => {
  //   axios
  //     .get(`http://whatu1.kro.kr:8080/members/${memberId}`, {
  //       headers: {
  //         "Content-Type": "application/json;charset=UTF-8",
  //         Accept: "application/json",
  //         AutHorization: localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       setInfo(res.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // 모달창 노출
  const showModal = () => {
    setModalOpen(true);
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
    window.location.reload();
    navigate(`/`);
    window.location.reload();
  };

  if (isLoading) return <></>;
  const info = data.data;
  // console.log(data.data);
  // console.log(info);
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
              height={"300px"}
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
        <S.FormDiv>
          <S.InputItem>
            <S.InputLabel htmlFor="name">이름</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="name"
                defaultValue={info.name}
                placeholder="수정할 이름을 입력해주세요"
                required
              />
            </S.InputDiv>
          </S.InputItem>
          <S.InputItem>
            <S.InputLabel htmlFor="nickName">닉네임</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="nickName"
                defaultValue={info.nickName}
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
                placeholder="수정할 이메일을 입력해주세요"
                required
              />
            </S.InputDiv>
          </S.InputItem>
        </S.FormDiv>
        <S.DeleteBtn type="submit" value="저장" onClick={deleteMember}>
          회원탈퇴
        </S.DeleteBtn>
      </S.MypageDiv>
    </S.Wrapper>
  );
};

export default Mypage;
