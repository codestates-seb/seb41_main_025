import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const HeaderWrap = styled.div`
    width: 100%;
    height: 60px;
    color : #d0d0d0;
    border-bottom: 1px solid #d0d0d0;
    /* position: fixed; */
`
const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1440px;
    height: 60px;
    margin: 0 auto;

    .logo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
        a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            height: 60px;
            img { width: 100% };
        }
    }
`

export const SearchBar = styled.div`
    input {
        width: 512px;
        height: 40px;
        padding-left: 15px;
        border: 1px solid #e5e5e5;
        border-radius: 15px;
    }

    input:focus { outline: none; } /* outline 테두리 없애기 */
`

const Sign = styled.ul`
    display: flex;
    justify-content: flex-end;
    min-width: 150px;
    padding-left: 10px;

    a {
        font-weight: bold;
        font-size : 16px;
        
        color: #7E7E7E;
    }

    .signUp {
        margin-left: 24px;
    }
    .modal {
    width: 90px;
    height: 30px;
    margin-left: 70px;
    background-color: white;
    border: 0;
    font-weight: bold;
    font-size : 16px;
    font-weight: 500;
}
`

const Modalwindow = styled.div`
    width: 400px;
    height: 400px;
    margin: 50px;
    background-color: aliceblue;
    border-radius: 20px;
`

const Header = () => {

    const [modal, setModal] = useState(false)

    const islogin = true;
    return (
        <HeaderWrap>
            <HeaderContainer>

                {/* logo */}
                <div className="logo">
                    <Link to="/">
                        <img src="/assets/logo.png" alt =""></img>
                    </Link>
                </div>

                {/* search */}
                <SearchBar>
                    <input type="text" placeholder="검색할 내용을 입력하세요."></input>
                </SearchBar>

                {/* sign Up / sign In */}
                {islogin ? (
                    <Sign>
                        <button 
                        className="modal"
                        onClick={ 
                           ()=> setModal(!modal)
                        }>
                            {
                                modal === true ?  <Modal /> : "마이페이지"  //기계역할
                            }
                        </button>

                    </Sign>
                ) : (
                    <Sign>
                        <li className="signIn"><Link to='/login'>로그인</Link></li>
                        <li className="signUp"><Link to='/signup'>회원가입</Link></li>
                    </Sign>
                )}

            </HeaderContainer>
        </HeaderWrap>
    )
}

const Modal = () => {


    return(
        <Modalwindow>
          <h4>제목</h4>
          <p>날짜</p>
          <p>상세내용</p>
        </Modalwindow>
      )

}

export {Header, Modal} ;