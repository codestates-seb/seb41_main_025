import * as S from "./styled"
import Item from "../Item/item"
import { useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

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
    slidesToScroll: 1,
  };

  // window.width
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.addEventListener('resize', handleResize);
    }
  }, []);

  // prev, next
  const slickRef = useRef(null);
  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);
  
  return (
    <S.Container>
      <h2 className="title">{ottName} 순위</h2>
      <Slider 
      className="items" 
      ref={slickRef} 
      {...settings}
      slidesToShow={
        windowSize >= 1440 
        ? 5 : ( windowSize >= 1320
          ? 4 : ( windowSize >= 1000
            ? 3 : ( windowSize >= 720
              ? 2 : ( windowSize >= 300
                ? 1 : null))))
      }
      >

        {movies &&
          movies.map((movie) => {
            return (
              <Link to={`/contents/${movie.contentId}`} key={movie.contentId}>
                <Item contentTitle={movie.contentTitle} contentPoster={movie.contentPoster} contentOpenAt={movie.contentOpenAt} contentCountry={movie.contentCountry} contentScore={movie.contentScore} contentOttRank={movie.contentOttRank}/>
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
