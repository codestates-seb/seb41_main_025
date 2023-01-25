import styled from "styled-components";

export const DetailContainer = styled.div`
  max-width: 1440px;
  height: 1800px;
  margin-bottom: 30px;
  padding: 60px 60px 0px;
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
  max-width: 600px;
  padding-left: 50px;
  justify-content: space-around;
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
  .contents{
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
    justify-content: space-between;
    width: 100px;
    height: 80px;
    cursor: pointer;
  }
  @media only screen and (max-width: ${"350px"}) {
  margin: 20px 0 20px 0;
  font-size: 15px;
  }
  @media only screen and (max-width: ${"700px"}) {
  margin: 20px 0;
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
  padding-left: 20px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 18%
  );
  &.hide {
    display: none;
  }
`;
