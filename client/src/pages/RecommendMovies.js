import styled from "styled-components";
import { MainWarp, MainContainer } from "./Main/Main";
import { Items, Title } from "./FavoriteMovie";
import SeleteItem from "../components/item/SeleteItem" 
import { ButtonForm } from "../components/item/Button";
import { useState } from "react";

const Nev = styled.div`
    display: flex;
    justify-content: left;
    margin: 40px;
`

const RecommendButton = styled.button`
    display: grid;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 60px;
    margin-bottom: 20px;
    margin-left: 60px;
    background-color: #167E6C;
    border-radius: 15px;
    color: white;
    font-size: 20px;
    border: 0;
    :active {
        color: #167E6C;
        background-color: whitesmoke;
    }
`

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
                    <RecommendButton onClick={ButtonHandleClick}>{state ? "내가 추천한 작품" : " 내가 비 추천한 작품" }</RecommendButton>
                    {state ? (
                    <Items>
                        {/*TODO: 추천 값이 true인 것들을 filter 해서 뿌려주기 */}
                        <SeleteItem/>
                        <SeleteItem/>
                        <SeleteItem/>
                    </Items>
                ) : (
                    <Items>
                        {/*TODO: 추천 값이 true인 것들을 filter 해서 뿌려주기 */}
                        <SeleteItem/>
                        <SeleteItem/>
                    </Items>
                )}
            </MainContainer>
        </MainWarp>
    )
};

export default RecommendMovies;