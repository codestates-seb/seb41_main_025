import React, { useState } from "react";
import * as S from "./styled";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const Login = async (e) => {
    const jsonData = JSON.stringify(info);
    // e.preventDefault();

    if (info.email === "" || info.password === "") {
      toast.error("이메일이나 패스워드를 확인하세요");
      return;
    }
    await axios
      .post("http://whatu1.kro.kr:8080/members/login", jsonData)
      .then((res) => {
        localStorage.setItem("accessToken", res.headers.authorization);
        localStorage.setItem("refreshToken", res.headers.refreshtoken);
        localStorage.setItem("isLogin", true);
        localStorage.setItem("memberId", res.data.memberId);
        // console.log(res.headers.authorization);
        //* 헤더에 바로 authoriztion 넣으면 로컬 스토리지에 저장할 필요 없어짐
        // axios.defaults.headers.common[
        //   "Authorization"
        // ] = `${res.headers.authorization}`;
        setInterval(onSilentRefresh, 1200000);
        if (res.status === 200) {
          toast.success("로그인이 완료되었습니다!");
          navigate("/");
        }
      })
      // .then(onLoginSuccess)
      .catch((err) => {
        toast.error("입력하신 정보를 다시 확인해주세요!");
        console.log(err);
      });
  };

  const onSilentRefresh = () => {
    axios
      .post("http://whatu1.kro.kr:8080/members/reissue", {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken:localStorage.getItem("refreshToken")
      })
      .then((res) => {
        console.log(res);
        // axios.defaults.headers.common[
        //   "Authorization"
        // ] = `${res.headers.authorization}`;
        localStorage.setItem("accessToken", res.headers.authorization);
        localStorage.setItem("refreshToken", res.headers.refreshtoken);
        setTimeout(onSilentRefresh,1200000);
        // .then(onLoginSuccess)
      })
      .catch((err) => {
        toast.error("다시 로그인해주세요!");
        console.log(err);
      });
  };

  // const JWT_EXPIRY_TIME = 1800000;

  // const onLoginSuccess = () => {
  //   // const { accessToken } = res;

  //   // // accessToken 설정
  //   // axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  //   // accessToken 만료하기 1분 전에 로그인 연장
  //   setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
  // };

  //   enter 키 눌러도 login 함수 실행
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      Login();
    }
  };

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
              onChange={(e) =>
                setInfo({
                  ...info,
                  email: e.target.value,
                })
              }
            />
            <S.Enter
              type="password"
              placeholder="Enter password"
              onChange={(e) =>
                setInfo({
                  ...info,
                  password: e.target.value,
                })
              }
              onKeyPress={handleKeypress}
            />
          </S.EnterContent>
          <S.WhiteLoginbutton onClick={Login}>Login</S.WhiteLoginbutton>
        </S.ContentForm>
      </S.Window>
    </S.Main>
  );
};

export default Login;
