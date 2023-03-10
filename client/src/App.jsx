import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import SearchNull from "./pages/Search/SearchNull/SearchNull";
import SearchResult from "./pages/Search/SearchResult/SearchResult";
import AllTimeChat from "./pages/AllTimeChat/AllTimeChat/AllTimeChat";
import FavoriteMovie from "./pages/EstimateList/FavoriteMovie/FavoriteMovie";
import Choose from "./pages/EstimateList/Choose/Choose";
import Mypage from "./pages/Mypage/Mypage/Mypage";
import RecommendMovies from "./pages/EstimateList/RecommendMovies/RecommendMovies"
import Detail from "./pages/Detail/Detail/Detail";
import { useState } from "react";
import Toast from "./components/Toast/Toast"
import Modify from "./pages/Mypage/Modify/Modify";
import Error from "./components/Error/Error";

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    font-family: "Noto Sans KR";
  }
`;

const Home = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  const [searchResult, setSearchResult] = useState("");
  const location = useLocation();

  const getSearchResult = (result) => {
    setSearchResult(result);
  };

  return (
    <Home>
      <GlobalStyle />
      {/* <BrowserRouter> */}
        <Header getSearchResult={getSearchResult} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/searchFalse" element={<SearchNull />} />
          <Route
            path="/searchResult"
            element={<SearchResult searchResult={searchResult} />}
          />
          <Route path="/alltimechat" element={<AllTimeChat />} />
          <Route path="/favorite" element={<FavoriteMovie getSearchResult={getSearchResult}/>} />
          <Route path="/choice" element={<Choose />} />
          <Route exact path="/members/:memberId" element={<Mypage />} />
          <Route path="/recommend" element={<RecommendMovies />} />
          <Route path="/contents/:contentId" element={<Detail />} />
          <Route exact path="/members/:memberId/modify" element={<Modify />} />
          <Route path="/*" element={<Error/>}/>
        </Routes>
        {!['/signUp', '/login'].includes(location.pathname) && <Footer />}
        <Toast/>
      {/* </BrowserRouter> */}
      <Toast />
    </Home>
  );
}

export default App;
