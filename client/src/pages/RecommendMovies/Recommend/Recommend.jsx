import SeleteItem from "../../../components/item/SelectItem/SeleteItem";
import * as S from "./styled"
import {useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Empty from "../../Empty/Empty";

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
      <>
      {recommendContent.length === 0 ? <Empty/> : (
        <S.Items>
        {recommendContent && recommendContent.map((recommend) => {

          return (
            <SeleteItem 
            Poster = {recommend.contentResponseMinDto.contentPoster}
            Id = {recommend.contentResponseMinDto.contentId}
            Score={recommend.contentResponseMinDto.contentScore}
            Title= {recommend.contentResponseMinDto.contentTitle}
            />
            )
          })}
          </S.Items>
          )}
      </>
  );

}
    export default Recommend;