import styled from "styled-components";
import ItemContainer from "../../components/item/itemContainer";
import useFetch from "../../components/util/useFetch";


export const MainWarp = styled.div`
  padding: 60px 60px;
  width: 100%;
`

export const MainContainer = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 0 60px;
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