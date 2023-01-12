import styled from "styled-components";
import ItemContainer from "../../components/item/itemContainer";


export const MainWarp = styled.div`
  padding: 60px 60px;
  width: 100%;
  @media only screen and (max-width: ${'1400px'}) {
    background-color: aliceblue;
  }@media only screen and (max-width: ${'600px'}) {
    background-color: beige;
  } 
`

export const MainContainer = styled.div`
  /* width: 1440px; */
  margin: 0 auto;
  padding: 0 60px;
  @media only screen and (max-width: ${'1400px'}) {
    background-color: aliceblue;
  }@media only screen and (max-width: ${'600px'}) {
    background-color: beige;
  } 
`

const Main = () => {


  return (
    <MainWarp>
      <MainContainer>
 
        <ItemContainer />
        <ItemContainer />
        <ItemContainer />

      </MainContainer>
    </MainWarp>
  )
}

export default Main;