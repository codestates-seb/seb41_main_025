import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import SearchNull from "./pages/SearchNull/SearchNull";
import SearchResult from "./pages/SearchResult/SearchResult";
import AllTimeChat from "./pages/AllTimeChat/AllTimeChat/AllTimeChat";
import FavoriteMovie from "./pages/FavoriteMovie/FavoriteMovie";
import Choose from "./pages/Choose/Choose";
import Mypage from "./pages/Mypage/Mypage/Mypage";
import RecommendMovies from "./pages/RecommendMovies/RecommendMovies";
import Detail from "./pages/Detail/Detail/Detail";

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
  return (
    <Home>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/searchFalse" element={<SearchNull />} />
          <Route path="/searchResult" element={<SearchResult />} />
          <Route path="/alltimechat" element={<AllTimeChat />} />
          <Route path="/favorite" element={<FavoriteMovie />} />
          <Route path="/choose" element={<Choose />} />
          <Route exact path="/members/:memberId" element={<Mypage />} />
          <Route path="/recommend" element={<RecommendMovies />} />
          <Route path="/contents/:contentId" element={<Detail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Home>
  );
}

export default App;
