import * as S from "./styled";
import axios from "axios";

const Item = ({  favoritePoster,favoriteId, favoriteScore ,favoriteTitle }) => {

  const memberId = localStorage.getItem("memberId");
  const handleDelete = async (favoriteId) => {
    await axios
      .post(
        `http://whatu1.kro.kr:8080/members/${memberId}/favorite`,
        JSON.stringify({}),
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        console.log(favoriteId)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <S.EachItem>
    <img src ={favoritePoster} className='poster' alt="" />
      <S.Details>
        <S.DetailFont>
          <S.MovieTitle to ={`/contents/${favoriteId}`}>{favoriteTitle}</S.MovieTitle>
          <h4 className="movieTitle">평점 : {favoriteScore}</h4>
        </S.DetailFont>
      {/* <S.DeleteBtn onclick = {() => handleDelete(comment.commentId)}>X</S.DeleteBtn> */}
      <S.DeleteBtn onclick = {() => handleDelete(favoriteId)}>X</S.DeleteBtn>
      </S.Details>
    </S.EachItem>
  )
}

export default Item;

