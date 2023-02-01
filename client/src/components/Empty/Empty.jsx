import * as S from "./styled";

const Empty = () => {

    return (
        <S.SerachWrap>
            <S.SearchConatiner>
                <S.Main>
                    <S.Window>
                        <S.Font>선택한 작품이 없습니다. 목록을 추가해주세요 !</S.Font>
                        <img src ='/assets/Character.png' className='character' alt="" />
                    </S.Window>
                </S.Main>
            </S.SearchConatiner>
        </S.SerachWrap>
    )
};

export default Empty;