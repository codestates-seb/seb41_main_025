import styled, { css } from "styled-components";
import ItemContainer from "../../components/item/itemContainer";

export const MainWarp = styled.div`
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