import React, { useEffect, useState } from "react";
import * as S from "./styled";
import axios from "axios";
// import { ReactComponent as GreenLogo } from "../assets/GreenLogo.svg"
import { useNavigate, NavLink } from "react-router-dom";
// import { ReactComponent as GreenLogo } from "../assets/GreenLogo.svg"
import store from '../../Redux/store'
import { addToken, addUser, logIn} from '../../Redux/action';

const Login = () => {
    const [info, setInfo]= useState({
        email:'',
        password:''
      });
  
    const navigate = useNavigate();

    // const EnterButton = async(e) => {

    //     await fetch('http://whatu1.kro.kr:8080/members/login', {
    //     method : "POST",
    //     body : JSON.stringify(info),
    //     headers : {
    //         "Content-Type" : "text/plain"
    //     }
    //     })
    //     .then ((res) => {
    //     store.dispatch(addToken(
    //       {
    //         accessToken: res.headers.Authorization, 
    //         refreshToken: res.headers.Refresh
    //       }
    //     ));
    //     store.dispatch(logIn())
    //     store.dispatch(addUser(res.data))
    //     localStorage.setItem("accessToken", res.headers.Authorization)
    //     localStorage.setItem("refreshToken", res.headers.Refresh)
    //     console.log(res)
    //     localStorage.setItem("isLogin",true)
   
    //     console.log("로그인 성공")
    //     })
        
    //     .catch(err => {
    //     console.log(err)
    //     })
    // }
    const Login = async (e) => {
        const jsonData = JSON.stringify(info);
        // e.preventDefault();
    
        if(info.email === '' || info.password === '') {
          alert("이메일이나 패스워드를 확인하세요");
          return
        }
    
        await axios
        .post("http://whatu1.kro.kr:8080/members/login", jsonData)
        .then((res) => {
          // console.log(res.data.memberId);
          store.dispatch(addToken(
            {
              accessToken: res.headers.authorization
            }
          ));
          store.dispatch(logIn());
          store.dispatch(addUser(res.data));
          localStorage.setItem("accessToken", res.headers.authorization)
          navigate('/')
          localStorage.setItem("isLogin", true)
          localStorage.setItem("memberId", res.data.memberId)
          alert("로그인이 완료되었습니다!");
          window.location.reload();

        })
        .catch((err) => {
          console.log(err);
          alert("입력하신 정보를 다시 확인해주세요!");
          window.location.reload();
        })
      }
      
    //   enter 키 눌러도 login 함수 실행
      const handleKeypress = e => {
        if (e.key === "Enter") {
          Login();
        }
      };
    
    return (
        <S.Main>
            <S.Window>
                <S.Front>
                    <S.Logo>
                        <img src ='/assets/GreenLogo.png' className='greenLogo' alt="" />
                        <img src ='/assets/Character.png' className='character' alt="" />
                        {/* <GreenLogo/> */}
                    </S.Logo>
                    <S.LogoFont>
                        <span className='signUpFont'>아직 뭘 봐유 회원이 아니시라고요??</span>
                        <S.Whitebutton to = '/signUp'>Sign Up</S.Whitebutton>
                    </S.LogoFont>
                </S.Front>
                <S.ContentForm>
                  <span className='LoginFont'>LOGIN</span> 
                  <S.EnterContent >
                    <S.Enter
                    type="text"
                    placeholder="Enter email"
                    onChange={e => setInfo({
                        ...info,
                        email:e.target.value
                    })}
                    />
                    <S.Enter
                    type="password"
                    placeholder="Enter password"
                    onChange={e => setInfo({
                        ...info,
                        password:e.target.value
                    })}
                    onKeyPress={handleKeypress}
                    />
                  </S.EnterContent>
                  {/* <S.Whitebutton to = '/' onClick={EnterButton}>Login</S.Whitebutton> */}
                  <S.WhiteLoginbutton onClick={Login}>Login</S.WhiteLoginbutton>
                </S.ContentForm>
            </S.Window>
        </S.Main>

    )
};

export default Login;
