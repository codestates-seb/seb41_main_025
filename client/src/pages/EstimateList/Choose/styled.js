import styled from "styled-components";

export const Items = styled.div`
  display: flex;
  margin: 20px;
  flex-wrap: wrap;

  @media only screen and (max-width: ${'700px'}) {
  
  } 
  @media only screen and (max-width: ${'350px'}) {
    width: 100%;
    height: 100%;
    display: grid;
  } 
`;

export const MainContainer = styled.div`
  max-width: 1440px;
  min-height: 1000px;
  margin: 0 auto;
  padding: 0 60px;
`

export const Item = styled.div`
  margin: 70px 90px 90px 60px;
  .poster {
    width: 100%;
    height: auto;
    border-radius: 40px;
    @media only screen and (max-width: ${'700px'}) {
    min-height: 250px;
    min-width: 200px;
  }
  @media only screen and (max-width: ${'350px'}) {
    min-height: 350px;
    min-width: 300px;
  } 
  }
  .movieTitle {
    margin: 10px 0 0 20px;
  }

`;

export const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

`;

export const DeleteBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  color: #167e6c;
  border: 0ch;
  :active {
    background-color: #167e6c;
    color: white;
  }
`;

export const DetailFont = styled.div``;