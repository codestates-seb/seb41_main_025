import styled from "styled-components";

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 240px;
  /* height: 400px; */

  .posterWrap {
    width: 240px;
    height: 336px;
    border-radius: 10px;
    background-color: #f7f7f7;
    background-image: url("");
    background-size: contain;
  }
  .poster {
    width: 240px;
    height: 336px;
    border-radius: 10px;
  }
`;

export const Contents = styled.div`
  color: #000000;

  .title {
    font-size: 20px;
  }
  .comeout,
  .score {
    font-size: 13px;
  }
`;
