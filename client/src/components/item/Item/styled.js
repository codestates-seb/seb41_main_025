import styled from "styled-components";

export const ItemContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  width: 240px;
  /* height: 400px; */
  .active { background: rgba(0, 0, 0, 0.7); }

  .posterWrap {
    width: 240px;
    height: 336px;
    border-radius: 10px;
    background-color: #f7f7f7;
    background-image: url("");
    background-size: contain;
    margin-bottom: 10px;
    @media only screen and (max-width: ${'350px'}) {
    width: 200px;
    height: 250px;
  } 
  }
  .poster {
    width: 240px;
    height: 336px;
    border-radius: 10px;
    @media only screen and (max-width: ${'350px'}) {
    width: 200px;
    height: 250px;
  } 
  }
  `;

export const Rank = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 26px;
  height: 26px;
  margin: 5px 0px 0px 5px;
  color: #ffffff;
  border-radius: 5px;
`

export const Contents = styled.div`
  color: #000000;

  .title {
    font-size: 20px;
    @media only screen and (max-width: ${'350px'}) {
    font-size: 17px;
  } 
  }
  .comeout,
  .score {
    font-size: 13px;
  }
`;
