import * as S from "./styled";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { ImSearch } from "react-icons/im";

const Header = () => {
    let isLogin = localStorage.getItem("isLogin")
    const [isModal, setIsModalOpen] = useState(false)

    const outSection = useRef()
    useEffect(() => {
        document.addEventListener('mousedown', clickModalOutside);
    
        return () => {
            document.removeEventListener('mousedown', clickModalOutside);
        };
    });

    const clickModalOutside = event => {
        if(isLogin && isModal && !outSection.current.contains(event.target)) 
        { setIsModalOpen(!isModal) }

    }
    // 검색기능 구현
    const [searchItem, setSearchItem] = useState("");

    const searchHandler = (e) => {
        setSearchItem(e.currentTarget.value);
        console.log(e.currentTarget.value);
    }

    return (
        <S.HeaderWrap>
            <S.HeaderContainer>
            {/* logo */}
                <div className="logo">
                    <Link to="/">
                        <img src="/assets/logo.png" alt =""></img>
                    </Link>
                </div>

                {/* search */}
                <S.SearchBar>
                    <input 
                    type="text" 
                    placeholder="검색할 내용을 입력하세요."
                    value={searchItem}
                    onChange={searchHandler}
                    >
                    </input>
                </S.SearchBar>
                <S.SearchIcon>
                    <ImSearch className="searchIcon" size="25"/>
                </S.SearchIcon>

                {/* sign Up / sign In */}
                {isLogin ? (
                    <S.Sign ref={outSection}>
                        {/* ref 위치 확인하기 */}
                        <li>
                            <button 
                            className="modal"
                            onClick={()=> setIsModalOpen(!isModal)}> 
                                마이페이지 
                            </button>
                        </li>
                        {isModal === true ? (
                            <li
                            className="flexEnd"
                            onClick={clickModalOutside}>
                            <Modal/>
                            </li>
                            ) : null }
                    </S.Sign>
                ) : (
                    <S.Sign>
                        <li className="signIn"><Link to='/login'>로그인</Link></li>
                        <li className="signUp"><Link to='/signup'>회원가입</Link></li>
                    </S.Sign>
                )}
            </S.HeaderContainer>
        </S.HeaderWrap>
    )
}

const Modal = () => {
    // logout
    // TODO: 일정 시간이 지나면 로그아웃 될 수 있도록 구현하기
    const LogoutHandle = () => {
        localStorage.clear();
        window.location.reload()
    }

    return(
        <S.ModalContainer>
            <S.NevFont to = "/mypage">나의 정보</S.NevFont>
            <S.NevFont to = "/recommend">내가 누른 추천 & 비 추천</S.NevFont>
            <S.NevFont to = "/choose">찜한 영화</S.NevFont>
            <S.NevFont to = "/favorite">내 인생작품 3가지</S.NevFont>
            <S.LogoutButton onClick={LogoutHandle}>Log out</S.LogoutButton>
        </S.ModalContainer>
    )
}

export {Header, Modal} ;
