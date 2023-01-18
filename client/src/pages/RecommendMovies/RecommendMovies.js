import * as S from "./styled";
import { MainWarp, MainContainer } from "../Main/styled";
import { Items, Title } from "../FavoriteMovie/styled";
import SeleteItem from "../../components/item/SelectItem/SeleteItem" 
import { useState } from "react";


const RecommendMovies = () => {

    const [state, SetState] = useState(true);

    const ButtonHandleClick = () => {
        SetState(!state);
    }

    return (
        <MainWarp>
            <MainContainer>
                <Title style={{"marginBottom" : 0}}>
                    <span className="title">00님이 추천/비추천 한 작품</span>
                </Title>
                <S.RecommendButton onClick={ButtonHandleClick}>{state ? "내가 추천한 작품" : " 내가 비 추천한 작품" }</S.RecommendButton>
                {state ? (
                    <Items>
                        {/*TODO: 추천 값이 true인 것들을 filter 해서 뿌려주기 */}
                        <SeleteItem />
                        <SeleteItem />
                        <SeleteItem />
                    </Items>
                ) : (
                    <Items>
                        {/*TODO: 추천 값이 true인 것들을 filter 해서 뿌려주기 */}
                        <SeleteItem />
                        <SeleteItem />
                    </Items>
                )}
            </MainContainer>
        </MainWarp>
    )
};

export default RecommendMovies;