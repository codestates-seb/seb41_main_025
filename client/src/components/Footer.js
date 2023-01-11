import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterWrap = styled.div`
  width: 100%;
  background: #167E6C;
`

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1440px;
  margin: 0 auto;
  color: #ffffff;

  .logo {
    width: 300px;
    height: 150px;
    margin: 20px 0px;

    img { width: 100% }
  }

  .copyright {
    span { font-size: 13px; }
  }
`

const Creaters = styled.div`
  display: flex;
  padding-top: 30px;
  padding-bottom: 50px;

  div { 
    display: flex;
    ul {
      display: flex;
    } 
  }

  span { margin-right: 20px; }
  .frontend { margin-right: 50px; }
  .title {
    margin-right: 30px;
  }
`

const Footer = () => {
  return (
    <FooterWrap>
      <FooterContainer>

        {/* logo */}
        <div className="logo">
          <Link to="/">
              <img src="/assets/footerLogo.svg" alt=""></img>
          </Link>
        </div>

        {/* copyright */}
        <div className="copyright">
          <span>Copyright Team What are you looking at?</span>
        </div>
        {/* creaters */}
        <Creaters>
          <div className="frontend">
            <span className="title">FRONTEND</span>
            <ul>
              <li><span>강성심</span></li>
              <li><span>이영우</span></li>
              <li><span>장한나</span></li>
            </ul>
          </div>
          <div className="backend">
            <span className="title">BACKEND</span>
            <ul>
              <li><span>강신찬</span></li>
              <li><span>김희진</span></li>
              <li><span>박금비</span></li>
            </ul>
          </div>
        </Creaters>
      </FooterContainer>
    </FooterWrap>
  )
}

export default Footer;