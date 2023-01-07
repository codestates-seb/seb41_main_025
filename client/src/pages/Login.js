import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
// import { ReactComponent as GreenLogo } from "../assets/GreenLogo.svg"
 
export const Main = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10%;
`

export const Window = styled.div`
    display: flex;
    width: 983px;
    height: 637px;
    border-radius: 20px;
    background-color : #58BFAD;
    opacity:0.75; 
`

const Front = styled.div`
    display: grid;
`

const LogoFont = styled.div`
    display: flex;
    justify-content: center;
    font-size: 20px;
    .signUpFont {
        margin-top: 18px;
        color: white;
        font-size: 20px;
        font-weight: 600;
    }
`

const Logo = styled.div`
    display: flex;
    align-items: flex-end;
    width: 450px;
    margin: 150px 0 20px 40px;
    .greenLogo {
        height: 290px;
        width: 290px;
    }
    .character {
        height: 130px;
        width: 130px;
        margin: 0 0px 80px -15px;
    }
`

export const ContentForm = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    width: 490px;
    margin-top: 60px;
    font-size: 50px;
    font-weight: 600;
    color: white;
    .EnterButton {
        margin-left: 300px;
        margin-bottom: 30px;
    }
    .LoginFont{
        margin-left: 30%;
    }
`

export const Whitebutton = styled(NavLink)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 50px;
    margin-left: 30px;
    background-color: white;
    border-radius: 30px;
    color : #054D40;
    font-size: 17px;
    border: 0;
    text-decoration: none;
`
export const EnterContent = styled.form`
    display: grid;
    width: 380px;
    margin-top: 90px;
`

export const Enter = styled.input`
    margin-bottom: 70px;
    background-color: #58BFAD;
    border: 0;
    border-bottom: 2px solid #054D40;
    font-size: 20px;
`
const Login = () => {
    // const [id, setId] = useState('');

    const handleEnter = (e) =>{
        console.log(e.target.value);
    }

    return (
        <Main>
            <Window>
                <Front>
                    <Logo>
                        <img src ='/assets/GreenLogo.png' className='greenLogo' alt="" />
                        <img src ='/assets/Character.png' className='character' alt="" />
                        {/* <GreenLogo/> */}
                    </Logo>
                    <LogoFont>
                        <span className='signUpFont'>아직 뭘 봐유 회원이 아니시라고요??</span>
                        <Whitebutton to = '/signUp'>Sign Up</Whitebutton>
                    </LogoFont>
                </Front>
                <ContentForm>
                  <span className='LoginFont'>LOGIN</span> 
                  <EnterContent>
                    <Enter
                    type="text"
                    placeholder="Enter email"
                    onChange={handleEnter}
                    />
                    <Enter
                    type="password"
                    placeholder="Enter password"
                    onChange={handleEnter}
                    />
                  </EnterContent>
                  <Whitebutton to = '/' className='EnterButton'>Login</Whitebutton>
                  {/* login에 성공하면 반갑습니다 00님 ! 비슷하게 alart 창 혹은 모달창 띄우기 */}
                </ContentForm>
            </Window>
        </Main>

    )
};

export default Login;