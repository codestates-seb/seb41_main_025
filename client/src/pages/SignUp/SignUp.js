import React, { useState, useCallback, useEffect } from "react";
import * as S from "./styled";
import {
  Main,
  // Window,
  Enter,
  EnterContent,
  // Whitebutton,
  ContentForm,
} from "../Login/styled";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // * 이름, 닉네임, 이메일, 비밀번호, 비밀번호 확인
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  // * 오류 메세지
  const [nameMsg, setNameMsg] = useState("");
  const [nickNameMsg, setNicknameMsg] = useState("");
  const [emailMsg, setEmailMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [confirmPwdMsg, setConfirmPwdMsg] = useState("");

  // * 유효성 검사
  const [isName, setIsName] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  //*  유효성 검사 함수
  const validateName = (name) => {
    return name.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,5}$/);
  };

  const validateNickname = (nickname) => {
    return nickname.toLowerCase().match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,8}$/);
  };

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      );
  };

  const validatePwd = (pwd) => {
    return pwd
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{10,25}$/);
  };

  const navigate = useNavigate();

  //* post 에러 잡기 위해서 기본 프로필 이미지 생성
  const memberPicture = "https://i.ibb.co/P1TsnM3/2023-01-14-1-35-41.png";

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("http://whatu1.kro.kr:8080/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name: name,
        nickName: nickname,
        email: email,
        password: pwd,
        memberPicture: memberPicture,
      }),
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 201) {
          alert("회원가입이 완료되었습니다!");
          navigate("/login");
        } else if (res.status === 304) {
          alert("회원가입을 진행해주세요!");
          window.location.reload();
        } else if (res.status === 409) {
          alert("다시 회원가입을 진행해주세요");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //네임
  const onChangeName = (e) => {
    const currentName = e.target.value;
    setName(currentName);
    console.log(currentName);

    if (!validateName(currentName)) {
      setNameMsg("2글자 이상 5글자 미만으로 입력해주세요.");
      setIsName(false);
    } else {
      setNameMsg("올바른 이름 형식입니다.");
      setIsName(true);
    }
  };

  //닉네임
  const onChangeNickname = useCallback((e) => {
    const currentNickname = e.target.value;
    setNickname(currentNickname);

    if (!validateNickname(currentNickname)) {
      setNicknameMsg("2글자 이상 9글자 미만으로 입력해주세요.");
      setIsNickname(false);
    } else {
      setNicknameMsg("올바른 닉네임 형식입니다.");
      setIsNickname(true);
    }
  }, []);

  //이메일
  const onChangeEmail = useCallback((e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    console.log(currentEmail);

    if (!validateEmail(currentEmail)) {
      setEmailMsg("이메일 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailMsg("올바른 이메일 형식입니다.");
      setIsEmail(true);
    }
  }, []);

  //비밀번호
  const onChangePwd = useCallback((e) => {
    const currentPwd = e.target.value;
    console.log(currentPwd);
    setPwd(currentPwd);
    if (!validatePwd(currentPwd)) {
      setPwdMsg("영문, 숫자, 특수기호 조합으로 10자리 이상 입력해주세요.");
      setIsPassword(false);
    } else {
      setPwdMsg("안전한 비밀번호입니다.");
      setIsPassword(true);
    }
  }, []);

  //비밀번호 확인
  const onChangeConfirmPwd = useCallback(
    (e) => {
      const currentConfirmPwd = e.target.value;
      setConfirmPwd(currentConfirmPwd);

      if (currentConfirmPwd !== pwd) {
        setConfirmPwdMsg("비밀번호가 일치하지 않습니다.");
        setIsPasswordConfirm(false);
      } else {
        setConfirmPwdMsg("올바른 비밀번호입니다.");
        setIsPasswordConfirm(true);
      }
    },
    [pwd]
  );

  //todo: 이메일, 닉네임 중복 확인

  return (
    <Main>
      <S.WindowDiv>
        <S.Hello>
          <S.HelloAnnouncement>
            반갑습니다 !<br />
            <br />
            오른쪽 칸에 정보 입력 후 <br />
            Sign Up 버튼을 눌러주세요
          </S.HelloAnnouncement>
        </S.Hello>
        <ContentForm>
          <span className="LoginFont">Sign Up</span>
          <EnterContent>
            <Enter
              type="text"
              placeholder="이름을 입력해 주세요"
              onChange={onChangeName}
              style={{ margin: "20px 0px" }}
            />
            <span className="message" style={{ fontSize: "20px" }}>
              {nameMsg}
            </span>
            <Enter
              type="text"
              placeholder="닉네임을 입력해 주세요"
              onChange={onChangeNickname}
              style={{ margin: "20px 0px" }}
            />
            <span className="message" style={{ fontSize: "20px" }}>
              {nickNameMsg}
            </span>
            <Enter
              type="text"
              placeholder="이메일을 입력해 주세요"
              onChange={onChangeEmail}
              style={{ margin: "20px 0px" }}
            />
            <span className="message" style={{ fontSize: "20px" }}>
              {emailMsg}
            </span>
            <Enter
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              onChange={onChangePwd}
              style={{ margin: "20px 0px" }}
            />
            <span className="message" style={{ fontSize: "20px" }}>
              {pwdMsg}
            </span>
            <Enter
              type="password"
              placeholder="비밀번호를 확인해 주세요"
              onChange={onChangeConfirmPwd}
              style={{ margin: "20px 0px" }}
            />
            <span className="message" style={{ fontSize: "20px" }}>
              {confirmPwdMsg}
            </span>
            <S.SignUpButton
              // to="/"
              className="EnterButton"
              onClick={onSubmit}
              style={{ marginBottom: "30px" }}
            >
              Sign Up
            </S.SignUpButton>
          </EnterContent>
        </ContentForm>
      </S.WindowDiv>
    </Main>
  );
};

export default SignUp;