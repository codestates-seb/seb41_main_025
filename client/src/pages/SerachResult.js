import styled from "styled-components";
import Item from "../components/item/item";

const Wrap = styled.div`
  width: 100%;
  padding-top: 60px;
`

const Container = styled.div`
  width: 1440px;
  height: calc(100vh - 378px);
  margin: 0 auto;
  padding: 60px;
`

const Result = styled.div`
  margin-bottom: 60px;
`

const ItemList = styled.div`
  display: flex;

  * { margin-right: 30px; }
`

const SearchResult = () => {
  
  return (
    <Wrap>
      <Container>

        {/* 검색 결과 갯수 */}
        <Result>
          <h1>검색 결과</h1>
          <span>2 개 입니다. {/* 일치하는 갯수 */}</span>
        </Result>

        {/* mapping 으로 검색 결과에 맞는 영화 가져오기 */}
        <ItemList>
          <Item />
          <Item />
        </ItemList>
      </Container>
    </Wrap>
  )
}

export default SearchResult;