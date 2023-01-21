import * as S from "./styled";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const Item = ({  Poster, Id, Score ,Title }) => {

  const params = useLocation()
  // console.log(params.pathname)

  //favorite 삭제
  const handleDelete = async (Id) => {
    console.log("clicked")
    await axios
      .post(
        `http://whatu1.kro.kr:8080/contents/${Id}${params.pathname}`,
        JSON.stringify({}),
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <S.EachItem>
    <img src ={Poster} className='poster' alt="" />
      <S.Details>
        <S.DetailFont>
          <S.MovieTitle to ={`/contents/${Id}`}>{Title}</S.MovieTitle>
          <h4 className="movieTitle">평점 : {Score}</h4>
        </S.DetailFont>
      {/* <S.DeleteBtn onclick = {() => handleDelete(comment.commentId)}>X</S.DeleteBtn> */}
      <S.DeleteBtn onClick = {() => handleDelete(Id, )}>X</S.DeleteBtn>
      </S.Details>
    </S.EachItem>
  )
}

export default Item;

