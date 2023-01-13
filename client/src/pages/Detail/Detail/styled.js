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
`;

export const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  padding-left: 50px;
  justify-content: space-around;
  .title {
    font-size: 35px;
  }
  .comeout {
    margin-top: 10px;
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
  }
`; //아이콘 박스