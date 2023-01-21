import SeleteItem from "../../../components/item/SelectItem/SeleteItem";
import * as S from "./styled"
import {useState,useEffect} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Deprecate = () => {

  const memberId = localStorage.getItem("memberId");
  const [deprecateContent, setDeprecateContent] = useState([])

  useEffect(() => {
    axios
    .get(`http://whatu1.kro.kr:8080/members/${memberId}/deprecate`,
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        "AutHorization" : localStorage.getItem("accessToken"),
      },
    })
    .then((res) => {
        setDeprecateContent(res.data.data);
      // console.log(res.data.data)
    })
    .catch((error) => {
      console.log(error);
    });
  },[]);
    return(
    <S.Items>
      {/* //TODO : deprecate 리렌더링 후 다시 recommend 창으로 돌아가는 현상 */}
      {deprecateContent && deprecateContent.map((deprecate) => {
        console.log(deprecate.contentResponseMinDto.contentTitle)
        return (
          // <Link to = {`/contents/${deprecate.contentResponseMinDto.contentId}`} key={deprecate.contentResponseMinDto.contentId}>
          <SeleteItem 
            Poster = {deprecate.contentResponseMinDto.contentPoster}
            Id = {deprecate.contentResponseMinDto.contentId}
            Score={deprecate.contentResponseMinDto.contentScore}
            Title= {deprecate.contentResponseMinDto.contentTitle}
            />
        // </Link>
        )
      })}
    </S.Items>

  );

}
    export default Deprecate;