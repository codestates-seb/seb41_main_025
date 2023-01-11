import styled from "styled-components";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 240px;
  height: 400px;

  .posterWrap {
    width: 240px;
    height: 346px;
    border-radius: 10px;
    background-color: red;
    background-image: url("");
    background-size: contain;
  }
  .poster {
    width: 240px;
    height: 346px;
    border-radius: 10px;
  }
`;

const Contents = styled.div`
  color: #000000;

  .title {
    font-size: 20px;
  }
  .comeout,
  .score {
    font-size: 13px;
  }
`;

const Item = ( { contentTitle, contentPoster, contentOpenAt } ) => {

  // { contentTitle, contentPoster, contentOpenAt }
  // const movies = { contentTitle };

  return (

    <ItemContainer>
      <div className="posterWrap">
        <img
          src={contentPoster}
          alt="포스터 이미지"
          className="poster"
        ></img>
      </div>
      <Contents>
        <div className="title">
          {/* 영화제목 */}
          {contentTitle}
        </div>
        <div className="comeout">
          국가 / {contentOpenAt}
          {/* 국가/개봉년도 */}
        </div>
        <div className="score">평점 {/* 평점 */}</div>
      </Contents>
    </ItemContainer>
  );
};
export default Item;
