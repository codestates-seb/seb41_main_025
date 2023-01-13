import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, NavLink } from "react-router-dom";
// import { ReactComponent as GreenLogo } from "../assets/GreenLogo.svg"
import store from '../Redux/store'
import { addToken, addUser, logIn} from '../Redux/action';
import { ImInfo } from "react-icons/im";

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 60px 0px;
  height: 100vh;
  @media only screen and (max-width: ${"600px"}) {
    display: grid;
  }
`;

export const Window = styled.div`
  display: flex;
  width: 983px;
  height: 637px;
  border-radius: 20px;
  background-color: #58bfad;
  opacity: 0.75;
  @media only screen and (max-width: ${"600px"}) {
    width: 300px;
    height: 700px;
    display: grid;
    margin-top: 20px;
  }
`;

const Front = styled.div`
  display: grid;
`;

const LogoFont = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  .signUpFont {
    margin-top: 18px;
    color: white;
    font-size: 20px;
    font-weight: 600;
    @media only screen and (max-width: ${"600px"}) {
      font-size: 15px;
      margin: 10px;
    }
  }
  @media only screen and (max-width: ${"600px"}) {
    display: grid;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: flex-end;
  width: 450px;
  margin: 150px 0 20px 40px;
  @media only screen and (max-width: ${"600px"}) {
    width: 200px;
    margin: 10px 0 20px 40px;
  }
  .greenLogo {
    height: 290px;
    width: 290px;
    @media only screen and (max-width: ${"600px"}) {
      width: 150px;
      height: 120px;
    }
  }
  .character {
    height: 130px;
    width: 130px;
    margin: 0 0px 80px -15px;
    @media only screen and (max-width: ${"600px"}) {
      width: 100px;
      height: 80px;
      margin: 0 0px 20px 0px;
    }
  }
`;

export const ContentForm = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  font-size: 50px;
  font-weight: 600;
  color: white;
  .EnterButton {
    margin-left: 300px;
    margin-bottom: 30px;
    @media only screen and (max-width: ${"600px"}) {
      margin-left: 180px;
    }
  }
  .LoginFont {
    margin-left: 30%;
    @media only screen and (max-width: ${"600px"}) {
      margin-bottom: 30px;
      margin-top: 0;
    }
  }
  @media only screen and (max-width: ${"600px"}) {
    width: 300px;

    margin-top: 80px;
  }
`;

export const Whitebutton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin-left: 30px;
  background-color: white;
  border-radius: 30px;
  color: #054d40;
  font-size: 17px;
  border: 0;
  text-decoration: none;
  @media only screen and (max-width: ${"600px"}) {
    margin-left: 160px;
  }
`;
export const EnterContent = styled.form`
  display: grid;
  width: 380px;
  margin-top: 90px;
  @media only screen and (max-width: ${"600px"}) {
    margin: 0;
    display: grid;
    justify-content: center;
  }
`;

export const Enter = styled.input`
  margin-bottom: 70px;
  background-color: #58bfad;
  border: 0;
  border-bottom: 2px solid #054d40;
  font-size: 20px;
`;
const Login = () => {
    const [info, setInfo]= useState({
      email:'',
      password:''
    });

  const navigate = useNavigate();
  
    const Login = (e) => {
        const jsonData = {
         method : "POST",
         body : JSON.stringify(info),
         headers: {
           "Content-Type": 'application/json',
           // "Authorization": localStorage.getItem("accessToken"),
           // "Refresh": localStorage.getItem("refreshToken")
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
   };
  
    const handleInputPw = (e) => {
     
    };
  
    const handleEnter = (e) => {
      console.log(e.target.value);
    };

  return (
    <Main>
      <Window>
        <Front>
          <Logo>
            <img src="/assets/GreenLogo.png" className="greenLogo" alt="" />
            <img src="/assets/Character.png" className="character" alt="" />
            {/* <GreenLogo/> */}
          </Logo>
          <LogoFont>
            <span className="signUpFont">
              아직 뭘 봐유 회원이 아니시라고요??
            </span>
            <Whitebutton to="/signUp">Sign Up</Whitebutton>
          </LogoFont>
        </Front>
        <ContentForm>
          <span className="LoginFont">LOGIN</span>
          <EnterContent>
            <Enter
              type="text"
              placeholder="Enter email"
              value={info.email}
              onChange={e => setInfo({
                   ...info,
                   email : e.target.value
                  })}
            />
            <Enter
              type="password"
              placeholder="Enter password"
              onChange={e => setInfo({
                ...info,
                password : e.target.value
               })}
            />
          </EnterContent>
          <Whitebutton onClick={Login} className="EnterButton">
            Login
          </Whitebutton>
          {/* login에 성공하면 반갑습니다 00님 ! 비슷하게 alart 창 혹은 모달창 띄우기 */}
        </ContentForm>
      </Window>
    </Main>
  );
};

export default Login;
