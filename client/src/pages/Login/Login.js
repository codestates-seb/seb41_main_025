import React, { useEffect, useState } from "react";
import * as S from "./styled";
import axios from "axios";
// import { ReactComponent as GreenLogo } from "../assets/GreenLogo.svg"

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const loginEmail = (e) => {
    setEmail(e.target.value);
    console.log(e.target.value);
  };
  const loginPwd = (e) => {
    setPwd(e.target.value);
    console.log(e.target.value);
  };

  //   const [isLogin, setIsLogin] = useState(() =>
  //     JSON.parse(window.localStorage.getItem("isLogin"))
  //   );
  //   const [memberId, setMemberId] = useState(null);


  //   const requestLogin = () => {
  //     axios({
  //       method: "POST",
  //       url: "http://whatu1.kro.kr:8080/members/login",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // credentials: "include",
  //         // Authorization: `Bearer ${access_token}`,
  //       },
  //       data: {
  //         email: email,
  //         password: pwd,
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         console.log(res.headers);
  //         console.log(res.headers.authorization);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  // const onSubmit = (e) => {
  //     e.preventDefault();
  //     requestLogin();
  // }

  return (
    <S.Main>
      <S.Window>
        <S.Front>
          <S.Logo>
            <img src="/assets/GreenLogo.png" className="greenLogo" alt="" />
            <img src="/assets/Character.png" className="character" alt="" />
            {/* <GreenLogo/> */}
          </S.Logo>
          <S.LogoFont>
            <span className="signUpFont">
              아직 뭘 봐유 회원이 아니시라고요??
            </span>
            <S.Whitebutton to="/signUp">Sign Up</S.Whitebutton>
          </S.LogoFont>
        </S.Front>
        <S.ContentForm>
          <span className="LoginFont">LOGIN</span>
          <S.EnterContent>
            <S.Enter
              type="text"
              placeholder="Enter email"
              onChange={loginEmail}
              value={email}
            />
            <S.Enter
              type="password"
              placeholder="Enter password"
              onChange={loginPwd}
              value={pwd}
            />
          </S.EnterContent>
          <S.Whitebutton to="/"  className="EnterButton">
            Login
          </S.Whitebutton>
          {/* login에 성공하면 반갑습니다 00님 ! 비슷하게 alart 창 혹은 모달창 띄우기 */}
        </S.ContentForm>
      </S.Window>
    </S.Main>
  );
};

export default Login;
