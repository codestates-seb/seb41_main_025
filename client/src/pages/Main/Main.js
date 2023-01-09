import styled from "styled-components";
import Item from "../../components/item/item";

export const MainWarp = styled.div`
  width: 100%;
`

export const MainContainer = styled.div`
  width: 1440px;
  height: 1000px;
  margin: auto;
`

const Main = () => {
  return (
    <MainWarp>
      <MainContainer>
        <Item />
      </MainContainer>
    </MainWarp>
  )
}

export default Main;