import { useState, useRef } from "react";
import * as S from "./styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Modify = () => {
  // const [memberPicture, setMemberPicture] = useState(null);
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

  const memberId = localStorage.getItem("memberId");
  const memberPicture = "https://i.ibb.co/P1TsnM3/2023-01-14-1-35-41.png";

  //todo: 사진 업로드 형태 수정
  //todo: patch 오류 수정 -> 값이 빌때

  const onModifiy = (e) => {
    e.preventDefault();
    axios
      .patch(
        `http://whatu1.kro.kr:8080/members/${memberId}`,
        {
          password: pwd,
          name: name,
          nickName: nickname,
          memberPicture: memberPicture,
        },

        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            AutHorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  }
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  }
  const onChangePwd = (e) => {
    setPwd(e.target.value);
  }

    // input으로 이미지 수정
 
    // const fileChangedHandler = (e) => {
    //   const files = e.target.files;
    //   console.log(files);
    //   setMemberPicture(files);
    // };
    // console.log(selectFile[0].name);
  
    // 이미지 클릭해서 수정
    const fileInput = useRef();
    const navigate = useNavigate();

  return (
    <S.MypageDiv>
      <S.UserInfoHeader>
        <div className="userImage">
          <img
            src={memberPicture}
            className="memberPicture"
            alt="사용자 이미지"
            width={"300px"}
            onClick={() => {
              fileInput.current.click();
            }}
            
          ></img>
        </div>
        <div className="userInfo">
          <div className="userName">{nickname}</div>
          {/* <S.ModifyBtn type="submit" value="저장">
            회원 정보 수정
          </S.ModifyBtn> */}
        </div>
      </S.UserInfoHeader>

      <form>
        <S.FormDiv>
        <S.InputItem>
            <S.InputLabel htmlFor="name">이름</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="user_pwd"
                defaultvalue={name}
                onChange={onChangeName}
                placeholder="수정할 이름를 입력해주세요"
              />
            </S.InputDiv>
          </S.InputItem>
          <S.InputItem>
            <S.InputLabel htmlFor="nickName">닉네임</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="nickName"
                defaultvalue={nickname}
                onChange={onChangeNickname}
                placeholder="수정할 닉네임을 적어주세요"
              />
            </S.InputDiv>
          </S.InputItem>
          <S.InputItem>
            <S.InputLabel htmlFor="profile">프로필</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="profile"
                type="file"
                defaultvalue={memberPicture}
                // onChange={onChangeId}
                placeholder="수정할 프로필을 적용해주세요"
                // onChange={fileChangedHandler}
              />
            </S.InputDiv>
          </S.InputItem>
          {/* <S.InputItem>
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
          </S.InputItem> */}
          <S.InputItem>
            <S.InputLabel htmlFor="user_pwd">비밀번호</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="user_pwd"
                defaultvalue={pwd}
                onChange={onChangePwd}
                placeholder="수정할 비밀번호를 입력해주세요"
    
              />
            </S.InputDiv>
          </S.InputItem>
        </S.FormDiv>
        <S.SaveBtn type="submit" value="저장" onclick={onModifiy}>
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
