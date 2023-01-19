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
  @media only screen and (max-width: ${"1200px"}) {
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
  @media only screen and (max-width: ${"1200px"}) {
  padding-left: 0;
  }
  .title {
    font-size: 35px;
    @media only screen and (max-width: ${"600px"}) {
    font-size: 25px;
  }
  }
  .content {
    margin-top: 10px;
  }
  .contents{
    @media only screen and (max-width: ${"600px"}) {
      width: 90%;
      margin-top: 20px;
    }
    @media only screen and (max-width: ${"1200px"}) {
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
  @media only screen and (max-width: ${"600px"}) {
  margin: 20px 0 20px 0;
    }
  @media only screen and (max-width: ${"1200px"}) {
  margin: 20px 0;
  }
`; //아이콘 박스