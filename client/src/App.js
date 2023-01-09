import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./pages/Main/Main";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";


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
          <Main />
          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App;
