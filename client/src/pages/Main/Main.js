import styled, { css } from "styled-components";
import React, { Component } from "react";
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


// const Main = () => {
//   //React-slick
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 1000,
//     //autoplay: true,
//     autoplayspeed: 1000,
//     arrows: false,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//   };

//   // prev, next
//   const slickRef = useRef(null);
//   const previous = useCallback(() => slickRef.current.slickPrev(), []);
//   const next = useCallback(() => slickRef.current.slickNext(), []);

//   return (
//     <MainWarp>
//       <MainContainer>
//         <ItemContainer>
//           <h2 className="title">박스오피스 순위</h2>
//           <Slider className="items" ref={slickRef} {...settings}>
//             {/* item.map(item => ()) */}
//             <Item />
//             <Item />
//             <Item />
//             <Item />
//             <Item />
//             <Item />
//             <Item />
//             <Item />
//             <Item />
//             <Item />
//             <Item />
//             <Item />
//           </Slider>
//           <PrevButton onClick={previous}>
//             <img src="/assets/ArrowPrev.svg" alt=""/>
//           </PrevButton>
//           <NextButton onClick={next}>
//             <img src="/assets/ArrowNext.svg" alt=""/>
//           </NextButton>
//         </ItemContainer>   
//       </MainContainer>
//     </MainWarp>
//   )
// }


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "black" }}
      onClick={onClick}
    />
  );
}

export default class AsNavFor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  render() {

    // const slickRef = useRef(null);
    // const previous = useCallback(() => slickRef.current.slickPrev(), []);
    // const next = useCallback(() => slickRef.current.slickNext(), []);
    
    const settings = {
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    }
    return (
    <MainWarp>
      <MainContainer>
        <ItemContainer>
        <h2 className="title">박스오피스 순위</h2>
        <Slider
          ref={slider => (this.slider1 = slider)}
          slidesToShow={5}
          swipeToSlide={true}
          focusOnSelect={true}
          {...settings}
        >
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </Slider>
        <h2 className="title">넷플릭스 순위</h2>
        <Slider
          // asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={5}
          swipeToSlide={true}
          focusOnSelect={true}
          {...settings}
        >
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </Slider>
          {/* <PrevButton onClick={previous}>
             <img src="/assets/ArrowPrev.svg" alt=""/>
          </PrevButton>
           <NextButton onClick={next}>
             <img src="/assets/ArrowNext.svg" alt=""/>
           </NextButton> */}
      </ItemContainer>
    </MainContainer>
  </MainWarp>
    );
  }
}

// export default Main;
// import styled from "styled-components";
// import Item from "../../components/item/item";

// export const MainWarp = styled.div`
//   width: 100%;
// `

// export const MainContainer = styled.div`
//   width: 1440px;
//   height: 1000px;
//   margin: auto;
// `

// const Main = () => {
//   return (
//     <MainWarp>
//       <MainContainer>
//         <Item />
//       </MainContainer>
//     </MainWarp>
//   )
// }

// export default Main;