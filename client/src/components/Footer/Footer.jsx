import { Link } from "react-router-dom";
import * as S from "./styled";

const Footer = () => {
  return (
    <S.FooterWrap>
      <S.FooterContainer>

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
        <S.Creaters>
          <div className="frontend">
            <span className="title">FRONTEND</span>
            <ul className="title">
              <li><span>강성심</span></li>
              <li><span>이영우</span></li>
              <li><span>장한나</span></li>
            </ul>
          </div>
          <div className="backend">
            <span className="title">BACKEND</span>
            <ul className="title">
              <li><span>강신찬</span></li>
              <li><span>김희진</span></li>
              <li><span>박금비</span></li>
            </ul>
          </div>
        </S.Creaters>
      </S.FooterContainer>
    </S.FooterWrap>
  )
}

export default Footer;