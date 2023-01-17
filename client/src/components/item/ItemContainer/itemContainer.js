import * as S from "./styled"
import Item from "../Item/item"
import { useRef, useCallback } from "react";
import { Link } from "react-router-dom";

// slide
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ItemContainer = ( {movies, ottName} ) => {
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

  return (
    <S.Container>
      <h2 className="title">{ottName} 순위</h2>
      <Slider className="items" ref={slickRef} {...settings}>

        {movies &&
          movies.map((movie) => {
            return (
              <Link to={`/contents/${movie.contentId}`} key={movie.ottRank}>
                <Item contentTitle={movie.contentTitle} contentPoster={movie.contentPoster} contentOpenAt={movie.contentOpenAt} contentCountry={movie.contentCountry}/>
              </Link>
            );
          })}

      </Slider>
      <S.PrevButton onClick={previous}>
        <img src="/assets/ArrowPrev.svg" alt="이전" />
      </S.PrevButton>
      <S.NextButton onClick={next}>
        <img src="/assets/ArrowNext.svg" alt="다음" />
      </S.NextButton>
    </S.Container>
  );
};

export default ItemContainer;
