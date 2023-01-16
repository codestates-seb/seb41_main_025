import * as S from "./styled";
import ItemContainer from "../../components/item/ItemContainer/itemContainer";

const Main = () => {

  return (
    <S.MainWarp>
      <S.MainContainer>

        <ItemContainer />
        <ItemContainer />
        <ItemContainer />

      </S.MainContainer>
    </S.MainWarp>
  )
}

export default Main;