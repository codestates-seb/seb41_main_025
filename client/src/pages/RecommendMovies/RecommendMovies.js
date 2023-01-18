import * as S from "./styled";
import { MainWarp, MainContainer } from "../Main/styled";
import { Items, Title } from "../FavoriteMovie/styled";
import SeleteItem from "../../components/item/SelectItem/SeleteItem" 
import { useState, useEffect } from "react";
import axios from "axios";


const RecommendMovies = () => {

    const [state, SetState] = useState(true);

    const [recommend, setRecommend] = useState('');

    // recommendid -> 내가 선택한 순서대로 (contentid)
    // mypage 
    // CONTENTID를 받기 위해서 한번 get 요청 보내고
    // id 값이 오면 그걸 또 저장해서 post 보내고
    // get 요청으로 데이터 
    // memberid/recommend


    // useEffect(() => {
    //     axios
    //       .post(`http://whatu1.kro.kr:8080/contents/${contentId}/recommend`,{},
    //       {
    //         headers: {
    //           "Content-Type": "application/json;charset=UTF-8",
    //           Accept: "application/json",
    //           "AutHorization" : localStorage.getItem("accessToken"),
    //         },
    //       })
    //       .then((res) => {
    //         setRecommend(res.data.data);
    //         console.log(res.data.data);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }, []);

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