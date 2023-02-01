import styled from "styled-components";

export const SerachWrap = styled.div`
  width: 100%;
  padding-top: 60px;
  /* @media only screen and (max-width: ${"350px"}) {
    width: 300px;
    } */
`;
export const SearchConatiner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 60px;
  /* @media only screen and (max-width: ${"350px"}) {
    width: 300px;
    }
     */
  a {
    margin: 0 auto;
  }
`;

export const Result = styled.div`
  @media only screen and (max-width: ${"350px"}) {
    font-size: 13px;
    margin-bottom: 20px;
  }
`;

export const Main = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  margin: 4% 5% 5% 5%;
  padding-bottom: 50px;
  /* @media only screen and (max-width: ${"350px"}) {
    display: flex;
    } */
`;

export const Window = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  width: 700px;
  height: 400px;
  border-radius: 20px;
  font-size: 20px;
  font-weight: 800;
  background-color: #4ba6b2;
  color: white;
  opacity: 0.9;
  @media only screen and (max-width: ${"350px"}) {
    width: 300px;
    flex-direction: column;
  }
  .character {
    width: 230px;
    height: 230px;
    margin-top: 150px;
    margin-right: 20px;
    @media only screen and (max-width: ${"350px"}) {
      width: 160px;
      height: 160px;
      margin-top: 0px;
      margin-left: 40%;
    }
  }
`;

export const Font = styled.span`
  margin: auto;
  @media only screen and (max-width: ${"350px"}) {
    font-size: 13px;
  }
`;
