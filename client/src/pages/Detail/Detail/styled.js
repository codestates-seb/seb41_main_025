import styled from "styled-components";

export const DetailContainer = styled.div`
  max-width: 1440px;
  min-height: 1800px;
  margin-bottom: 30px;
  padding: 60px 60px 50px;
  margin: 0 auto;
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 40px 0px;
  .posterWrap {
    width: 240px;
    height: 346px;
    border-radius: 10px;
    background-size: contain;
  }
  @media only screen and (max-width: ${"700px"}) {
    flex-direction: column;
    justify-content: center;
  }
`;

export const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 600px;
  max-height: 590px;
  padding-left: 50px;
  @media only screen and (max-width: ${"700px"}) {
    padding-left: 0;
  }
  .title {
    font-size: 35px;
    @media only screen and (max-width: ${"350px"}) {
      font-size: 20px;
    }
  }
  .content {
    margin-top: 10px;
  }
  .contents {
    @media only screen and (max-width: ${"350px"}) {
      width: 90%;
      margin-top: 20px;
      font-size: 10px;
    }
    @media only screen and (max-width: ${"700px"}) {
      margin-top: 20px;
    }
  }
`;

export const DetailItem = styled.div`
  display: flex;
  .itemIcon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100px;
    height: 90px;
    cursor: pointer;
  }
  @media only screen and (max-width: ${"350px"}) {
    margin: 20px 0 20px 0;
    font-size: 15px;
  }
  @media only screen and (max-width: ${"700px"}) {
    margin: 20px 0;
  }
  .itemIconText {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    padding-top: 5px;
    @media only screen and (max-width: ${"350px"}) {
    font-size: 10px;
  }
  }
`; //아이콘 박스

export const Ellipsis = styled.div`
  position: relative;
  display: -webkit-box;
  max-height: 6rem;
  line-height: 2rem;
  overflow: hidden;
  -webkit-line-clamp: 3;
  &.show {
    display: block;
    max-height: none;
    overflow: auto;
    -webkit-line-clamp: unset;
  }
`;

export const Button = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  border: 0;
  max-height: 2rem;
  line-height: 2rem;
  margin-top: 40px;
  padding-left: 20px;
  background: #f9f9f9;

  &.hide {
    display: none;
  }
`;

export const OttList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px 30px;
  margin: 30px 0px 30px 0px;
  @media only screen and (max-width: ${"350px"}) {
    /* flex-direction: column; */
  }
  h2 {
    @media only screen and (max-width: ${"350px"}) {
      font-size: 15px;
    }
  }

  img {
    width: 50px;
    height: 50px;
    @media only screen and (max-width: ${"350px"}) {
      width: 50px;
      height: 50px;
    }
  }
`;
