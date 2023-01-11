import styled from 'styled-components'
import { ButtonForm } from '../components/item/Button'

 
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

const ResultFont = styled.div`
    font-size: 40px;
    margin: 120px 0 0 250px;
    .result{
        font-size: 20px;
    }
`

const SearchNull = () => {

    return (
        <>
        <ResultFont>
            검색 결과
            <span className='result'>
                <br/>0 개 입니다
            {/* TODO: console.log로 length가 0개 나오는지 확인하기 */}
            </span> 
        
        </ResultFont>
        <Main>
            <Window>
                <Font>
                    아쉽지만 '00000000'에 대한 결과가 없습니다 😢 <br/><br/> 다른 검색어를 입력해주세요 !
                    {/* 아쉽지만 '{value}'에 대한 결과가 없습니다 😢 <br/><br/> 다른 검색어를 입력해주세요 ! */}
                </Font>
                <img src ='/assets/Character.png' className='character' alt="" />
            </Window>
            <ButtonForm to='/alltimechat'>실시간 채팅</ButtonForm>
        </Main>
        </>
    )
};

export default SearchNull;