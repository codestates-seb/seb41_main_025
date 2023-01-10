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
    background-image: url('');
    background-size: contain;
  }
`

const Contents = styled.div`
  color: #000000;

  .title {
    font-size: 20px;
  }
  .comeout, .score {
    font-size: 13px;
  }
`

const Item = ({movies}) => {
  // console.log(movies);
  // console.log(movies.contentPoster);
  // console.log(movies.contentOpenAt);
  return (
    // <ItemContainer className="item" key={movies.id}>
    
    //   <div className="posterWrap"></div>
    //   <Contents>
    //     <div className="title">영화 제목{/* 영화제목 */}</div>
    //     <div className="comeout">국가 / 개봉년도{/* 국가/개봉년도 */}</div>
    //     <div className="score">평점 {/* 평점 */}</div>
    //   </Contents>
 
    // </ItemContainer>
    <ItemContainer>
      <div className="posterWrap"></div>
      <Contents>
        <div className="title">영화 제목{/* 영화제목 */}</div>
        <div className="comeout">국가 / 개봉년도{/* 국가/개봉년도 */}</div>
        <div className="score">평점 {/* 평점 */}</div>
      </Contents>
 
    </ItemContainer>

  )
}
export default Item;