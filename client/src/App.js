import "./App.css";
import { Header } from "./components/Header";
import Footer from "./components/footer/Footer";
import Main from "./pages/Main/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SearchNull from "./pages/SearchNull";
import AllTimeChat from "./pages/AllTimeChat/AllTimeChat";
import FavoriteMovie from "./pages/FavoriteMovie";
import Choose from "./pages/Choose";
import Mypage from "./pages/Mypage/Mypage"
import RecommendMovies from "./pages/RecommendMovies";
import Detail from "./pages/Detail/Detail";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchResult from "./pages/SerachResult";


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
  width:100%;
  height: 100%;
`

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
          <Route path='/mypage' element={<Mypage/>}/>
          <Route path="/recommend" element={<RecommendMovies />}/>
          <Route path="/contents/:contentId" element={<Detail />}/>
        </Routes>
        <Footer />
      </BrowserRouter>

    </Home>
  );
}

export default App;