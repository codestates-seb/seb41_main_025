import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";

const HeaderWrap = styled.div`
    position: fixed;
    width: 100%;
    height: 60px;
    color : #d0d0d0;
    border-bottom: 1px solid #d0d0d0;
    background: white;
    z-index: 10;
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
    position: relative;
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

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    width: 250px;
    height: 300px;
    top: calc(0% + 45px);
    background-color: aliceblue;
    border-radius: 20px 0px 20px 20px;

    z-index: 10;

    h5 {
        text-align: end;
        padding: 0px 20px; 
    }
`

const NevFont = styled(NavLink)`
    padding: 20px;
`

const Header = () => {

    const [isModal, setIsModalOpen] = useState(false)
    const outSection = useRef()
    // FIXME : 마이페이지를 두 번 누르면 닫히지 않는 현상
    useEffect(() => {
        document.addEventListener('mousedown', clickModalOutside);
    
        return () => {
          document.removeEventListener('mousedown', clickModalOutside);
        };
      });

    const clickModalOutside = event => {
        if(isModal && !outSection.current.contains(event.target)) 
        {
            setIsModalOpen(!isModal)
        }

    }


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
                            onClick={()=> setIsModalOpen(!isModal)}> 마이페이지 
                        </button>
                        {isModal === true ? (
                            <div
                                ref={outSection} 
                                onClick={clickModalOutside}>
                                <Modal/>
                            </div>) 
                            : null }
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
        <ModalContainer>
            <NevFont to = "/mypage">나의 정보</NevFont>
            <NevFont to = "/recommend">내가 누른 추천 & 비 추천</NevFont>
            <NevFont to = "/choose">찜한 영화</NevFont>
            <NevFont to = "/favorite">내 인생작품 3가지</NevFont>
            <h5>Log out</h5>
        </ModalContainer>
    )
}

export {Header, Modal} ;
