import * as S from "./styled";
import { MainWarp, MainContainer } from "../Main/styled";
import { Items, Title } from "../FavoriteMovie/styled";
import SeleteItem from "../../components/item/SelectItem/SeleteItem" 
import { useState } from "react";
import useFetch from "../../components/util/useFetch";
import { useParams } from "react-router-dom";


const RecommendMovies = () => {
    const {memberId} = useParams()
  // console.log(params.data)

  const request = {
    method : "get",
    headers : {
        "Authorization" : localStorage.getItem("accessToken")
    }
  }

    const [member] = useFetch(`http://whatu1.kro.kr:8080/members/${memberId}`, request)
    console.log(member)

    const [state, SetState] = useState(true);
    // const moviecomment = comments.filter (comments => movies.contentId === comments.contentId)
    const ButtonHandleClick = () => {
        SetState(!state);
    }

    return (
        <MainWarp>
            <MainContainer>
                <Title style={{"marginBottom" : 0}}>
                    <span>{member.nicName}님이 </span><br/>
                    <span className="title">추천/비추천 한 작품</span>
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