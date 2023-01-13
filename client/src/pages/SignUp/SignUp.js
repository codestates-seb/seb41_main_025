import React, { useState, useCallback } from "react";
import * as S from "./styled";
import {
  Main,
  // Window,
    Enter,
  EnterContent,
  Whitebutton,
  ContentForm,
} from "../Login/styled";

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
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false)
  
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

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await fetch
          .post("http://whatu1.kro.kr:8080/members", {
            name: name,
            nickname: nickname,
            email: email,
            password: pwd,
          })
          .then((res) => {
            console.log("response:", res);
            //     if (res.status === 200) {
            //       router.push("/sign_up/profile_start");
            //     }
          });
      } catch (err) {
        console.error(err);
      }
    },
    [name, nickname, email, pwd]
  );

  
 

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
  //   const [checkMail, setCheckMail] = useState(false);
  //   const [checkNickname, setCheckNickname] = useState(false);

  //   const onCheckEmail = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const res = await Api.post("user/register/email", {email});

  //       const { result } = res.data;

  //       if (!result) {
  //           setEmailMsg("이미 등록된 메일입니다. 다시 입력해주세요.");
  //           setCheckMail(false);
  //       } else {
  //         setEmailMsg("사용 가능한 메일입니다.😊");
  //         setCheckMail(true);
  //       }

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   const onCheckNickname = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const res = await Api.post("user/register/nickname", {nickname});

  //       const { result } = res.data;

  //       if (!result) {
  //           setNicknameMsg("이미 등록된 닉네임입니다. 다시 입력해주세요.");
  //           setCheckNickname(false);
  //      } else {
  //         setNicknameMsg("사용 가능한 닉네임입니다.😊");
  //         setCheckNickname(true);
  //       }

  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  //   const handleEnter = (e) => {
  //     console.log(e.target.value);
  //   };

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
              type="text"
              placeholder="비밀번호를 입력해 주세요"
              onChange={onChangePwd}
              style={{ margin: "20px 0px" }}
            />
            <span className="message" style={{ fontSize: "20px" }}>
              {pwdMsg}
            </span>
            <Enter
              type="text"
              placeholder="비밀번호를 확인해 주세요"
              onChange={onChangeConfirmPwd}
              style={{ margin: "20px 0px" }}
            />
            <span className="message" style={{ fontSize: "20px" }}>
              {confirmPwdMsg}
            </span>
            <Whitebutton
              to="/"
              className="EnterButton"
              onSubmit={onSubmit}
              style={{ marginBottom: "30px" }}
            >
              Sign Up
            </Whitebutton>
          </EnterContent>
        </ContentForm>
      </S.WindowDiv>
    </Main>
  );
};

export default SignUp;
