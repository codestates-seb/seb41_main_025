import * as S from './styled'
// import { ReactComponent as GreenLogo } from "../assets/GreenLogo.svg"

const Login = () => {
    // const [id, setId] = useState('');

    const handleEnter = (e) =>{
        console.log(e.target.value);
    }

    return (
        <S.Main>
            <S.Window>
                <S.Front>
                    <S.Logo>
                        <img src ='/assets/GreenLogo.png' className='greenLogo' alt="" />
                        <img src ='/assets/Character.png' className='character' alt="" />
                        {/* <GreenLogo/> */}
                    </S.Logo>
                    <S.LogoFont>
                        <span className='signUpFont'>아직 뭘 봐유 회원이 아니시라고요??</span>
                        <S.Whitebutton to = '/signUp'>Sign Up</S.Whitebutton>
                    </S.LogoFont>
                </S.Front>
                <S.ContentForm>
                  <span className='LoginFont'>LOGIN</span> 
                  <S.EnterContent>
                    <S.Enter
                    type="text"
                    placeholder="Enter email"
                    onChange={handleEnter}
                    />
                    <S.Enter
                    type="password"
                    placeholder="Enter password"
                    onChange={handleEnter}
                    />
                  </S.EnterContent>
                  <S.Whitebutton to = '/' className='EnterButton'>Login</S.Whitebutton>
                  {/* login에 성공하면 반갑습니다 00님 ! 비슷하게 alart 창 혹은 모달창 띄우기 */}
                </S.ContentForm>
            </S.Window>
        </S.Main>

    )
};

export default Login;