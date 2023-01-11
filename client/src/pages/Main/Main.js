import styled from "styled-components";

const MainWarp = styled.div`
  width: 100%;
`

const MainContainer = styled.div`
  width: 1440px;
  height: 1000px;
  margin: 0 auto;
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