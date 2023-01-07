import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderWrap = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #d0d0d0;
`
const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1440px;
    height: 60px;
    margin: 0 auto;
    padding: 0px 60px;

    .logo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
        a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 120px;
            height: 60px;
            img { width: 100% };
        }
    }
`

export const SearchBar = styled.div`
    input {
        width: 512px;
        height: 40px;
        padding-left: 15px;
        border: 1px solid #e5e5e5;
        border-radius: 15px;
    }

    input:focus { outline: none; } /* outline 테두리 없애기 */
`

const Sign = styled.ul`
    display: flex;
    justify-content: flex-end;
    min-width: 150px;
    padding-left: 10px;

    a {
        font-weight: bold;
        font-size : 16px;
        
        color: #7E7E7E;
    }

    .signUp {
        margin-left: 24px;
    }
`

const Header = () => {
    const islogin = false;
    return (
        <HeaderWrap>
            <HeaderContainer>

                {/* logo */}
                <div className="logo">
                    <Link to="/">
                        <img src="/assets/logo.png" alt =""></img>
                    </Link>
                </div>

                {/* search */}
                <SearchBar>
                    <input type="text" placeholder="검색할 내용을 입력하세요."></input>
                </SearchBar>

                {/* sign Up / sign In */}
                {islogin ? (
                    <Sign>
                        <li className="signIn"><Link to='/'>마이페이지</Link></li>
                    </Sign>
                ) : (
                    <Sign>
                        <li className="signIn"><Link to='/login'>로그인</Link></li>
                        <li className="signUp"><Link to='/signup'>회원가입</Link></li>
                    </Sign>
                )}

            </HeaderContainer>
        </HeaderWrap>
    )
}

export default Header;