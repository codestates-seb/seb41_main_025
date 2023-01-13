import styled from "styled-components";

export const Items = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px;
 
  @media only screen and (max-width: ${'1200px'}) {
  
  } 
  @media only screen and (max-width: ${'600px'}) {
    width: 100%;
    height: 100%;
    display: grid;
  } 
`;

export const Item = styled.div`
  margin: 70px 90px 90px 60px;
  .poster {
    width: 100%;
    height: auto;
    border-radius: 40px;
    @media only screen and (max-width: ${'1200px'}) {
    min-height: 250px;
    min-width: 200px;
  }
  @media only screen and (max-width: ${'600px'}) {
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