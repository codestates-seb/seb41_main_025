import * as S from './styled'
// import { ReactComponent as GreenLogo } from "../assets/GreenLogo.svg"
import React, { useState } from "react";
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
        const jsonData = {
       method : "POST",
       body : JSON.stringify(info),
        headers: {
         "Content-Type": 'application/json',
        }
        }
        fetch('http://whatu1.kro.kr:8080/members/login', jsonData)
        .then ((res) => {
        store.dispatch(addToken(
          {
            accessToken: res.headers.authorization, 
            refreshToken: res.headers.refresh
          }
        ));
        store.dispatch(logIn())
        store.dispatch(addUser(res.data))
        localStorage.setItem("accessToken", res.headers.authorization)
        localStorage.setItem("refreshToken", res.headers.refresh)
        localStorage.setItem("isLogin",true)
        localStorage.setItem("user", res.data.memberId)
        navigate("/")
        })
        .catch(err => {
        console.log(err)
        })

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
                  <S.Whitebutton to = '/' className='EnterButton'>Login</S.Whitebutton>
                  {/* login에 성공하면 반갑습니다 00님 ! 비슷하게 alart 창 혹은 모달창 띄우기 */}
                </S.ContentForm>
            </S.Window>
        </S.Main>

    )
};

export default Login;