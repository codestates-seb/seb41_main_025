import styled, { css } from "styled-components";
import Item from "../../components/item/item";
import { useRef, useCallback } from "react";

// slide
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const MainWarp = styled.div`
  width: 100%;
`

export const MainContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 0 60px;
`

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 40px;

  h2.title { 
    margin-bottom: 14px; 
  }
  .items {
    display: flex;
    overflow: hidden;
  }

  .item {
    margin-right: 30px;
  }
`

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
  background: #D9D9D9;
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

const Main = () => {
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
  const slickRef1 = useRef(null);
  const slickRef2 = useRef(null);
  const previous1 = useCallback(() => slickRef1.current.slickPrev(), []);
  const next1 = useCallback(() => slickRef1.current.slickNext(), []);
  const previous2 = useCallback(() => slickRef2.current.slickPrev(), []);
  const next2 = useCallback(() => slickRef2.current.slickNext(), []);

  return (
    <MainWarp>
      <MainContainer>

        <ItemContainer>
          <h2 className="title">박스오피스 순위</h2>
          <Slider className="items" ref={slickRef1} {...settings}>
            {/* item.map(item => ()) */}
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </Slider>
          <PrevButton onClick={previous1}>
            <img src="/assets/ArrowPrev.svg" />
          </PrevButton>
          <NextButton onClick={next1}>
            <img src="/assets/ArrowNext.svg" />
          </NextButton>
        </ItemContainer>

        <ItemContainer>
          <h2 className="title">박스오피스 순위</h2>
          <Slider className="items" ref={slickRef2} {...settings}>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
          </Slider>
          <PrevButton onClick={previous2}>
            <img src="/assets/ArrowPrev.svg" />
          </PrevButton>
          <NextButton onClick={next2}>
            <img src="/assets/ArrowNext.svg" />
          </NextButton>
        </ItemContainer>

      </MainContainer>
    </MainWarp>
  )
}

export default Main;