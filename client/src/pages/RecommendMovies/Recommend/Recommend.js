import SeleteItem from "../../../components/item/SelectItem/SeleteItem";
import * as S from "./styled"
import {useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Recommend = () => {

  const memberId = localStorage.getItem("memberId");
  const [recommendContent, setRecommendContent] = useState([])

  useEffect(() => {
    axios
    .get(`http://whatu1.kro.kr:8080/members/${memberId}/recommend`,
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        "AutHorization" : localStorage.getItem("accessToken"),
      },
    })
    .then((res) => {
      setRecommendContent(res.data.data);
      // console.log(res.data.data)
    })
    .catch((error) => {
      console.log(error);
    });
  },[]);
    return(
    <S.Items>
      {recommendContent && recommendContent.map((recommend) => {
        console.log(recommend.contentResponseMinDto.contentTitle)
        return (
          <Link to = {`/contents/${recommend.contentResponseMinDto.contentId}`} key={recommend.contentResponseMinDto.contentId}>
          <SeleteItem 
            favoritePoster = {recommend.contentResponseMinDto.contentPoster}
            favoriteId = {recommend.contentResponseMinDto.contentId}
            favoriteScore={recommend.contentResponseMinDto.contentScore}
            favoriteTitle= {recommend.contentResponseMinDto.contentTitle}
            />
        </Link>
        )
      })}
    </S.Items>

  );

}
    export default Recommend;