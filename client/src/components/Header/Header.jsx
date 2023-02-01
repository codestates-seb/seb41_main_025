import * as S from "./styled";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { ImSearch } from "react-icons/im";
import { toast } from "react-toastify";
import axios from "axios";

const Header = (props) => {
  let isLogin = localStorage.getItem("isLogin");
  const [isModal, setIsModalOpen] = useState(false);

  const outSection = useRef();

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
    setSearchMovie(e.target.value);
  };
  const onKeyPressEnter = (e) => {
    if (e.key === "Enter") {
      sendSerachResult();
      setSearchMovie("");
    }
  };
  const sendSerachResult = () => {
    if (searchMovie === "") {
      toast.info("검색어를 입력하세요");
    } 
    else{
    props.getSearchResult(searchMovie);
    Navigate("/searchResult");
    }
  };

  return (
    <S.HeaderWrap>
      <S.HeaderContainer>
        {/* logo */}
        <div className="logo">
          <Link to="/">
            <img src="/assets/logo.png" alt=""></img>
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
          ></input>
          <S.SearchIcon>
            <ImSearch
              className="searchIcon"
              size="30"
              style={{ padding: "4px" }}
              onClick={sendSerachResult}
            />
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

            <li className="signUp off">
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
  const navigate = useNavigate();

  const LogoutHandle = () => {

    axios
      .post(
        `http://whatu1.kro.kr:8080/members/logout`,
        {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken : localStorage.getItem("refreshToken")
        },
      )
      .then((res) => {
        console.log(res)
        toast.success("로그아웃이 완료되었습니다");
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
      });
  };

  // const LogoutHandle = () => {
  //   localStorage.clear();
  //   toast.success("로그아웃이 완료되었습니다!");
  //   navigate("/");
  // };

  return (
    <S.ModalContainer>
      <S.NevFont to={`/members/${memberId}`}>나의 정보</S.NevFont>
      <S.NevFont to="/recommend">내가 누른 추천 & 비추천</S.NevFont>
      <S.NevFont to="/choice">찜한 영화</S.NevFont>
      <S.NevFont to="/favorite">내 인생작품 3가지</S.NevFont>
      <S.LogoutButton onClick={LogoutHandle}>Log out</S.LogoutButton>
    </S.ModalContainer>
  );
};

export { Header, Modal };
