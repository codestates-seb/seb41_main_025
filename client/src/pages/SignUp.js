import styled from 'styled-components'
import { Main, Window, Enter, EnterContent, Whitebutton, ContentForm} from './Login';

const Hello = styled.div`
    display: flex;
    text-align: left;
    margin: auto;
`
const HelloAnnouncement = styled.span`
    margin-top: 60px;
    margin-right: 90px;
    font-size: 30px;
`


const SignUp = () => {

    const handleEnter = (e) =>{
        console.log(e.target.value);
    }

    return (
        <Main>
            <Window>
                <Hello>
                    <HelloAnnouncement>반갑습니다 !<br/><br/>오른쪽 칸에 정보 입력 후 <br/>Sign up 버튼을 눌러주세요</HelloAnnouncement>
                </Hello>
                <ContentForm>
                    <span className='LoginFont'>Sign Up</span>
                    <EnterContent>
                        <Enter
                        type="text"
                        placeholder="이름을 입력해 주세요"
                        onChange={handleEnter}
                        style={{marginBottom:"50px"}}
                        />
                        <Enter
                        type="text"
                        placeholder="닉네임을 입력해 주세요"
                        onChange={handleEnter}
                        style={{marginBottom:"50px"}}
                        />
                        <Enter
                        type="text"
                        placeholder="이메일을 입력해 주세요"
                        onChange={handleEnter}
                        style={{marginBottom:"50px"}}
                        />
                        <Enter
                        type="text"
                        placeholder="비밀번호를 입력해 주세요"
                        onChange={handleEnter}
                        style={{marginBottom:"50px"}}
                        />
                        <Whitebutton to = '/' className='EnterButton' style={{"marginBottom" : "30px"}}>Sign Up</Whitebutton>
                    </EnterContent>
                </ContentForm>
            </Window>

        </Main>
    )
}

export default SignUp;