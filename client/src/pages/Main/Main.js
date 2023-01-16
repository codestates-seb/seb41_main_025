import * as S from "./styled";
import ItemContainer from "../../components/item/ItemContainer/itemContainer";

const Main = () => {

  return (
    <S.MainWarp>
      <S.MainContainer>

        {/* TODO : OTT별로 데이터 받아와야한다. */}
        <ItemContainer lankName={`Watcha`} />
        <ItemContainer lankName={`Wavve`} />
        <ItemContainer lankName={`Tving`} />

      </S.MainContainer>
    </S.MainWarp>
  )
}

export default Main;