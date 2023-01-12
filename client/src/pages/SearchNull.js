import styled from 'styled-components'
import { ButtonForm } from '../components/item/Button'

const SerachWrap = styled.div`
    width: 100%;
    padding-top: 60px;
`
const SearchConatiner = styled.div`
    width: 1440px;
    height: calc(100vh - 378px);
    margin: 0 auto;
    padding: 60px;
    
    a { margin: 0 auto; }
`

const Result = styled.div`

`

const Main = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    margin: 4% 5% 5% 5%;
    padding-bottom: 50px;
`

const Window = styled.div`
    display: flex;
    justify-content: space-between;
    text-align: center;
    width: 700px;
    height: 400px;
    border-radius: 20px;
    font-size: 20px;
    font-weight: 800;
    color: white;
    background-color : #58BFAD;
    opacity:0.75;
    .character {
        width: 230px;
        height: 230px;
        margin-top: 150px;
        margin-right: 20px;
    }
`

const Font = styled.span`
    margin: auto;
`

const SearchNull = () => {

    return (
        <SerachWrap>
            <SearchConatiner>

                {/* 검색 결과 갯수 */}
                <Result>
                    <h1>검색 결과</h1>
                    <span>0 개 입니다. {/* TODO : console.log 로 length 가 0개 나오는지 확인하기 */}</span>
                </Result>

                {/* 검색 결과 X */}
                <Main>
                    <Window>
                        <Font>
                            아쉽지만 '00000000'에 대한 결과가 없습니다 😢 <br/><br/> 다른 검색어를 입력해주세요 !
                            {/* 아쉽지만 '{value}'에 대한 결과가 없습니다 😢 <br/><br/> 다른 검색어를 입력해주세요 ! */}
                        </Font>
                        <img src ='/assets/Character.png' className='character' alt="" />
                    </Window>
                </Main>

                <ButtonForm to='/alltimechat'>실시간 채팅</ButtonForm>
            </SearchConatiner>
        </SerachWrap>
    )
};

export default SearchNull;