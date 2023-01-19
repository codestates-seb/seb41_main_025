import * as S from "./styled";
// import GreenButton from "../components/item/Button";
import SeleteItem from "../../components/item/SelectItem/SeleteItem";
import { MainWarp, MainContainer} from "../Main/styled"
import useFetch from "../../components/util/useFetch";
import axios from "axios";
import { useState } from "react";

const FavoriteMovie = () =>{

    const [favorite] = useFetch('http://whatu1.kro.kr:8080/contents/1/recommend')
    console.log(favorite)

    const memberId = localStorage.getItem("memberId");
    const [nickName, setNickName] = useState("")

    axios
      .get(`http://whatu1.kro.kr:8080/members/${memberId}`,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          "AutHorization" : localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setNickName(res.data.data.nickName);
        console.log(nickName)
      })
      .catch((error) => {
        console.log(error);
      });

    return (
        <MainWarp>
            <MainContainer>
                <S.Title>
                    <span className="title">"{nickName}"님의 인생작품</span>
                    {/* <Item/>
                    TODO : 만약 길이가 3개가 아니라면 검색 창 뜨게하기 */}
                    <S.FavoriteSearch>
                        {/* TODO : POST */}
                        <input type="text" placeholder="검색할 내용을 입력하세요."></input>
                        {/* 인생 작품 3가지를 추천해주세요 ! */}
                    </S.FavoriteSearch>
                </S.Title>
                    {/*TODO: 인생 영화 값이 true인 것들을 filter 해서 뿌려주기 */}
                <S.Items>
                    <SeleteItem/>
                    <SeleteItem/>
                    <SeleteItem/>
                </S.Items>
                    {/* <ChangeBtn>
                        <GreenButton name={"수정하기"}/>
                    </ChangeBtn> */}
            </MainContainer>
        </MainWarp>
    )
};

export default FavoriteMovie;
