import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"
import Mypage from "./pages/Mypage/Mypage"
import { createGlobalStyle } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";


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

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/searchFalse" element={<SearchNull />} />
          <Route path="/alltimechat" element={<AllTimeChat />} />
          <Route path="/favorite" element={<FavoriteMovie />} />
          <Route path="/choose" element={<Choose />} />
          <Route path='/mypage' element={<Mypage/>}/>
          <Route path="/recommend" element={<RecommendMovies />}/>
          <Route path='/contents/:contentI' element={<Detail />}/>
        </Routes>
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App;
