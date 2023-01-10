import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
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
    margin-left: 0px;
    background-color: white;
    border: 0;
    font-weight: bold;
    font-size : 16px;
    font-weight: 500;
}
`

const ModalWindow = styled.div`
    width: 300px;
    height: 350px;
    margin: 50px 30px 10px 120px;
    background-color: aliceblue;
    border-radius: 20px;
    display: grid;
`

const NevFont = styled(NavLink)`
    margin: 30px;
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
                        onClick={()=> setModal(!modal)}>
                            {
                                modal === true ?  <Modal>마이페이지</Modal>: "마이페이지"
                            }
                        </button>
                        {/* FIXME : 누르면 마이페이지 글씨가 없어지는 현상 */}

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
        <ModalWindow>
            <NevFont to = "/mypage">나의 정보</NevFont>
            <NevFont to = "/login">내가 누른 추천 & 비 추천</NevFont>
            <NevFont to = "/choose">찜한 영화</NevFont>
            <NevFont to = "/favorite">내 인생작품 3가지</NevFont>
            <h5>Log out</h5>
        </ModalWindow>
    )
}

export {Header, Modal} ;