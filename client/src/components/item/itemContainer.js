import styled, { css } from "styled-components";
import Item from "./item";
import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";
// import axios from 'axios';
import useFetch from "../../components/util/useFetch";

// slide
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 40px;

  h2.title {
    margin-bottom: 14px;
  }
  /* .items {
    display: flex;
    overflow: hidden;
  } */

  .item {
    margin-right: 30px;
  }
`;

const defaultButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(50% - 30px);
  translate: (-50%, -50%);
  padding: 0;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 100%;
  background: #d9d9d9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

const PrevButton = styled.button`
  ${defaultButtonStyle}
  left: -1.5%;
`;

const NextButton = styled.button`
  ${defaultButtonStyle}
  right: 0;
`;

const ItemContainer = () => {
  //React-slick
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    //autoplay: true,
    autoplayspeed: 1000,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  // prev, next
  const slickRef = useRef(null);
  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);


  const [movies] = useFetch('http://whatu1.kro.kr:8080/contents')
  console.log(movies)


  // let [movieList] = useFetch("data/db.json");
  // const movies = movieList.contents;
  // const [movie, setMovie] = useState(movies);
  


  //   const DataList = async () => {
  //     await axios({
  //         method: "GET",
  //         url: `http://localhost:3000/contents`,
  //         headers: {
  //             "Content-Type": 'application/json',
  //         },
  //         .then(data) {
  //           console.log(data)
  //         }
  //     });
  // }
  
  

  return (
    // ? 1. 콘솔이 두번 찍히는 이유
    // ? 2. item 컴포넌트가 하나 더 있어야 리랜더링이 되어도 데이터가 남아있는 이유 
    // *    -> 반대로 map 밖의 item 컴포넌트가 하나 더 없으면 데이터 출력 안됨

    <Container>
      <h2 className="title">박스오피스 순위</h2>
      <Slider className="items" ref={slickRef} {...settings}>

        {movies &&
          movies.map((movie) => {
            return (
              <Link to={`/contents/${movie.contentId}`} key={movie.ottRank}>
                <Item contentTitle={movie.contentTitle} contentPoster={movie.contentPoster} contentOpenAt={movie.contentOpenAt}/>
              </Link>
            );
          })}
        {/* key={movies.contentId}*/}
        {/*contentTitle={movies.contentTitle} contentPoster={movies.contentPoster} contentOpenAt={movies.contentOpenAt} */}
          {/* <Link to={'/detail'}><Item /></Link> */}


      </Slider>
      <PrevButton onClick={previous}>
        <img src="/assets/ArrowPrev.svg" alt="이전" />
      </PrevButton>
      <NextButton onClick={next}>
        <img src="/assets/ArrowNext.svg" alt="다음" />
      </NextButton>
    </Container>
  );
};

export default ItemContainer;
