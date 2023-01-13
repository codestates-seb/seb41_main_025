import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as S from './styled'
import { Main, Window, Enter, EnterContent, Whitebutton, ContentForm} from '../Login/styled';

const SignUp = () => {

    const [info, setInfo] = useState({
        email: '',
        password: '',
        name:'',
        nickName: '',
        confirmedPassword: '',
        memberPicture:''
      })
      const navigate = useNavigate();

    const onSignUpSubmitHandler = async () => {
        }
      //enter 눌렀을 때도 작동 되도록
      const handleKeypress = e => {
        if (e.keyCode === 13) {
          onSignUpSubmitHandler();
        }
      };

    return (
        <Main>
            <Window>
                <S.Hello>
                    <S.HelloAnnouncement>반갑습니다 !<br/><br/>오른쪽 칸에 정보 입력 후 <br/>Sign up 버튼을 눌러주세요</S.HelloAnnouncement>
                </S.Hello>
                <ContentForm onKeyUp={e => handleKeypress(e)}>
                    <span className='LoginFont'>Sign Up</span>
                    <EnterContent>
                        <Enter
                        type="text"
                        placeholder="이름을 입력해 주세요"
                        onChange={e => setInfo ({
                            ...info,
                            name : e.target.value
                        })}
                        style={{marginBottom:"50px"}}
                        />
                        <Enter
                        type="text"
                        placeholder="닉네임을 입력해 주세요"
                        onChange={e => setInfo ({
                            ...info,
                            nickName : e.target.value
                        })}
                        style={{marginBottom:"50px"}}
                        />
                        <Enter
                        type="text"
                        placeholder="이메일을 입력해 주세요"
                        onChange={e => setInfo ({
                            ...info,
                            email : e.target.value
                        })}
                        style={{marginBottom:"50px"}}
                        />
                        <Enter
                        type="text"
                        placeholder="비밀번호를 입력해 주세요"
                        onChange={e => setInfo ({
                            ...info,
                            password : e.target.value
                        })}
                        style={{marginBottom:"50px"}}
                        />
                        <Whitebutton className='EnterButton' style={{"marginBottom" : "30px"}}>Sign Up</Whitebutton>
                    </EnterContent>
                </ContentForm>
            </Window>

        </Main>
    )
}

export default SignUp;