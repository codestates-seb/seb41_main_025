import { useState } from "react";
import * as S from "./styled";
import Item from "../../components/item/Item/item";

const SearchResult = () => {
  const [searchItem, setSearchItem] = useState("");

  // const serached = 

  return (
    <S.Wrap>
      <S.Container>

        {/* 검색 결과 갯수 */}
        <S.Result>
          <h1>검색 결과</h1>
          <span>2 개 입니다. {/* 일치하는 갯수 */}</span>
        </S.Result>

        {/* mapping 으로 검색 결과에 맞는 영화 가져오기 */}
        <S.ItemList>
          <Item />
        </S.ItemList>
      </S.Container>
    </S.Wrap>
  )
}

export default SearchResult;