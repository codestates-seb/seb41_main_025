import * as S from "./styled";

const Item = () => {
  return (
    <S.EachItem>
    <img src ='/assets/avatar2.jpeg' className='poster' alt="" />
      <S.Details>
        <S.DetailFont>
          <S.MovieTitle to ='/Moviedetail'>Avatar 2 : 물의 길</S.MovieTitle>
          <h3 className="movieTitle">미국, 2022</h3>
          <h4 className="movieTitle">평점 : 8.4</h4>
        </S.DetailFont>
      <S.DeleteBtn>X
      </S.DeleteBtn>
      </S.Details>
    </S.EachItem>
  )
}

export default Item;

