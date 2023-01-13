import React from "react";
import * as S from "./styled";
import dummy from "../Recommend/dummydata";
import { ModifyBtn } from "../Mypage";

const Modify = () => {
  const filteredDummy = dummy.filter((item) => item.id === "1");
  console.log(filteredDummy);
  // const [id, onChangeId, setId] = useInput("");

  return (
    <S.MypageDiv>
      {filteredDummy.map((item) => {
        return (
          <S.UserInfoHeader key={item.id}>
            <div className="userImage">
              <img
                src={item.memberPicture}
                className="memberPicture"
                alt="사용자 이미지"
                width={"300px"}
              ></img>
            </div>
            <div className="userInfo">
              <div className="userName">{item.name}</div>
              <S.ModifyBtn type="submit" value="저장">
                회원 정보 수정
              </S.ModifyBtn>
            </div>
          </S.UserInfoHeader>
        );
      })}
      <form>
        <S.FormDiv>
          <S.InputItem>
            <S.InputLabel htmlFor="profile">프로필</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="profile"
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
                // value={pwd}
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
      </form>

      <S.DeleteBtn type="submit" value="저장">
        회원탈퇴
      </S.DeleteBtn>
    </S.MypageDiv>
  );
};

export default Modify;
