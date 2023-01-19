import * as S from "./styled";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { ImSearch } from "react-icons/im";

const Header = (props) => {
  let isLogin = localStorage.getItem("isLogin");
  const [isModal, setIsModalOpen] = useState(false);

  const outSection = useRef();
  // FIXME : 마이페이지를 두 번 누르면 닫히지 않는 현상
  useEffect(() => {
    document.addEventListener("mousedown", clickModalOutside);

    return () => {
      document.removeEventListener("mousedown", clickModalOutside);
    };
  });

  const clickModalOutside = (event) => {
    if (isLogin && isModal && !outSection.current.contains(event.target)) {
      setIsModalOpen(!isModal);
    }
  };

  // 검색기능 구현
  const Navigate = useNavigate();
  const [searchMovie, setSearchMovie] = useState("");

  const onChange = (e) => {
      setSearchMovie(e.currentTarget.value);
  }
  const onKeyPressEnter = (e) => {
      if(e.key === "Enter") sendSerachResult();
  }
  const sendSerachResult = () => {
      props.getSearchResult(searchMovie);
      Navigate('/searchResult')
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
            value={searchMovie}
            onChange={onChange}
            onKeyPress={onKeyPressEnter}
            >
            </input>
            <S.SearchIcon
            onClick={sendSerachResult}
            >
                <ImSearch className="searchIcon" size="30" />
            </S.SearchIcon>
        </S.SearchBar>

        {/* sign Up / sign In */}
        {isLogin ? (
          <S.Sign ref={outSection}>
            {/* ref 위치 확인하기 */}
            <li>
              <button
                className="modal"
                onClick={() => setIsModalOpen(!isModal)}
              >
                마이페이지
              </button>
            </li>
            {isModal === true ? (
              <li className="flexEnd" onClick={clickModalOutside}>
                <Modal />
              </li>
            ) : null}
          </S.Sign>
        ) : (
          <S.Sign>
            <li className="signIn">
              <Link to="/login">로그인</Link>
            </li>
            <li className="signUp">
              <Link to="/signup">회원가입</Link>
            </li>
          </S.Sign>
        )}
      </S.HeaderContainer>
    </S.HeaderWrap>
  );
};

const Modal = () => {
  const memberId = localStorage.getItem("memberId");
  console.log(memberId);

  const LogoutHandle = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <S.ModalContainer>
      <S.NevFont to={`/members/${memberId}`}>나의 정보</S.NevFont>
      <S.NevFont to="/recommend">내가 누른 추천 & 비 추천</S.NevFont>
      <S.NevFont to="/choose">찜한 영화</S.NevFont>
      <S.NevFont to="/favorite">내 인생작품 3가지</S.NevFont>
      <S.LogoutButton onClick={LogoutHandle}>Log out</S.LogoutButton>
    </S.ModalContainer>
  );
};

export { Header, Modal };
