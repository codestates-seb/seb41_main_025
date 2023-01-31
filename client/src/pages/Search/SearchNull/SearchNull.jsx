import * as S from './styled'
import { ButtonForm } from '../../../components/item/Button/styled'

const SearchNull = () => {

    const isLogin = localStorage.getItem("isLogin")

    return (
        <S.SerachWrap>
            <S.SearchConatiner>

                {/* 검색 결과 갯수 */}
                <S.Result>
                    <h1>검색 결과</h1>
                    <span>0 개 입니다. {/* TODO : console.log 로 length 가 0개 나오는지 확인하기 */}</span>
                </S.Result>

                {/* 검색 결과 X */}
                <S.Main>
                    <S.Window>
                        <S.Font>
                            아쉽지만 찾으시는 영화에 대한 결과가 없습니다 😢 <br/><br/> 다른 검색어를 입력해주세요 !
                            {/* 아쉽지만 '{value}'에 대한 결과가 없습니다 😢 <br/><br/> 다른 검색어를 입력해주세요 ! */}
                        </S.Font>
                        <img src ='/assets/Character.png' className='character' alt="" />
                    </S.Window>
                </S.Main>

                {isLogin ?
                (<ButtonForm to='/alltimechat'>게시판</ButtonForm>)
                : 
                (<ButtonForm to='/login'>게시판</ButtonForm>) } 
                
            </S.SearchConatiner>
        </S.SerachWrap>
    )
};

export default SearchNull;