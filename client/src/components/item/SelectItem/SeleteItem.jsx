import * as S from "./styled";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Item = ({  dataId, Poster, Id, Score ,Title, refetch }) => {

  const params = useLocation()

  //list 삭제
  const handleDelete = async (dataId) => {
    await axios
      .delete(
        `http://whatu1.kro.kr:8080${params.pathname}/${dataId}`,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        refetch()
        // window.location.reload();
        toast.success("삭제가 완료되었습니다");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <S.EachItem>
      <a href={`/contents/${Id}`}>
        <img src ={Poster} className='poster' alt="" />
      </a>
      <S.Details>
        <S.DetailFont>
          <S.MovieTitle to ={`/contents/${Id}`}>{Title}</S.MovieTitle>
          <h4 className="movieTitle"> 평점 : {Score}</h4>
        </S.DetailFont>
      <S.DeleteBtn onClick = {() => handleDelete(dataId)}>X</S.DeleteBtn>
      </S.Details>
    </S.EachItem>
  )
}

export default Item;

