import { useState, useEffect } from "react";
import * as S from "./styled";
import axios from "axios";
import ModifyImage from "../ModifyImage/ModifyImage";

const Modify = () => {

  //todo: 인풋창 한번에 관리하기

  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  // const [input, setInput] = useState({
  //   password: "",
  //   name: "",
  //   nickName: "",
  //   memberPicture: "",
  // });

  const memberId = localStorage.getItem("memberId");
  const [info, setInfo] = useState([]);

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
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //todo: 사진 업로드 형태 수정
  //todo: input창의 값이 여러가지 일때 빈값이 아니고 기존의 값을 유지한채 변경되게
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `http://whatu1.kro.kr:8080/members/${memberId}`,
        {
          ...info,
          // password: pwd,
          name: name,
          // nickName: nickname,
          // memberPicture: memberPicture,
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const onChangeInput = (e) => {
  //   setInput(...e.target.value);
  //   console.log(e.target.value);
  // };

  const onChangeName = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
    console.log(e.target.value);
  };
  const onChangePwd = (e) => {
    setPwd(e.target.value);
    console.log(e.target.value);
  };

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
          {/* <input
            type="file"
            accept="image/*"
            // style={{ display: "none" }}
            // ref={inputRef}
            onChange={fileChangedHandler}
            // onChange={(e) => onSubmitImage(e)}
          /> */}
          <ModifyImage/>
       
        </div>
        <div className="userInfo">
          <div className="userName">{info.nickName}</div>
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
                id="name"
                defaultValue={info.name}
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
                defaultValue={info.nickName}
                onChange={onChangeNickname}
                placeholder="수정할 닉네임을 적어주세요"
              />
            </S.InputDiv>
          </S.InputItem>
          <S.InputItem>
            <S.InputLabel htmlFor="user_pwd">비밀번호</S.InputLabel>
            <S.InputDiv>
              <S.MyInput
                id="user_pwd"
                type="password"
                defaultvalue={pwd}
                onChange={onChangePwd}
                placeholder="수정할 비밀번호를 입력해주세요"
              />
            </S.InputDiv>
          </S.InputItem>
        </S.FormDiv>
        <S.SaveBtn type="submit" value="저장" onClick={onSubmit}>
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
