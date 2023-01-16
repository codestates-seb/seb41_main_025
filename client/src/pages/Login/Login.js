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
        e.preventDefault();
    
        if(info.email === '' || info.password === '') {
          alert("이메일이나 패스워드를 확인하세요");
          return
        }
    
        await axios
        .post("http://whatu1.kro.kr:8080/members/login", jsonData)
        .then((res) => {
          store.dispatch(addToken(
            {
              accessToken: res.headers.authorization, 
              refreshToken: res.headers.refresh
            }
          ));
          store.dispatch(logIn());
          store.dispatch(addUser(res.data));
          localStorage.setItem("accessToken", res.headers.authorization)
          console.log(res.headers)
          localStorage.setItem("refreshToken", res.headers.refresh)
          localStorage.setItem("isLogin", true)


        })
        .catch((err) => {
          console.log(err);
        })
      }
    
      const handleKeypress = e => {
        if (e.keyCode === 13) {
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
                <S.ContentForm onKeyUp={e => handleKeypress(e)}>
                  <span className='LoginFont'>LOGIN</span> 
                  <S.EnterContent>
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
