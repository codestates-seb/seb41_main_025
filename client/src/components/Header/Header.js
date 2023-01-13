import * as S from "./styled";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { ImSearch } from "react-icons/im";

const Header = (props) => {

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
    // 검색기능 구현
    const [searchItem, setSearchItem] = useState("");

    const searchHandler = (e) => {
        setSearchItem(e.currentTarget.value);
        // props.refreshFunction(e.currentTarget.value);
        console.log(e.currentTarget.value);
    }

    const islogin = true;
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
                    <   ImSearch className="searchIcon" size="25"/>
                </S.SearchIcon>

                {/* sign Up / sign In */}
                {islogin ? (
                    <S.Sign>
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
                            ref={outSection} 
                            onClick={clickModalOutside}>
                                <Modal/>
                            </li>) 
                            : null }
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
    return(
        <S.ModalContainer>
            <S.NevFont to = "/mypage">나의 정보</S.NevFont>
            <S.NevFont to = "/recommend">내가 누른 추천 & 비 추천</S.NevFont>
            <S.NevFont to = "/choose">찜한 영화</S.NevFont>
            <S.NevFont to = "/favorite">내 인생작품 3가지</S.NevFont>
            <h5>Log out</h5>
        </S.ModalContainer>
    )
}

export {Header, Modal} ;
