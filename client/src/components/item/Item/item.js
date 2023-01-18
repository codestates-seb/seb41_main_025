import * as S from "./styled";

const Item = ( { contentTitle, contentPoster, contentOpenAt, contentCountry, contentScore } ) => {

  // { contentTitle, contentPoster, contentOpenAt }
  // const movies = { contentTitle };


  return (
    <S.ItemContainer>
      <div className="posterWrap">
        <img
          src={contentPoster}
          alt="포스터 이미지"
          className="poster"
        ></img>
      </div>
      <S.Contents>
        <div className="title">
          {/* 영화제목 */}
          {contentTitle}
        </div>
        <div className="comeout">
          {contentCountry} / {contentOpenAt}
          {/* 국가/개봉년도 */}
        </div>
        <div className="score">평점 {contentScore}</div>
      </S.Contents>
    </S.ItemContainer>
  );
};
export default Item;
