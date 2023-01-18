import * as S from "./styled";
import useFetch from "../../components/util/useFetch";
import ItemContainer from "../../components/item/ItemContainer/itemContainer";

const Main = () => {
  const [movies] = useFetch('http://whatu1.kro.kr:8080/contents');
  
  const Watcha = movies.filter( movie => movie.contentOttName === "watcha" );
  const Tving = movies.filter( movie => movie.contentOttName === "tving" );
  const Wavve = movies.filter( movie => movie.contentOttName === "wavve" );
  
  return (
    <S.MainWarp>
      <S.MainContainer>
        <ItemContainer movies={Watcha} ottName={`Watcha`} />
        <ItemContainer movies={Tving} ottName={`Tving`} />
        <ItemContainer movies={Wavve} ottName={`Wavve`} />
      </S.MainContainer>
    </S.MainWarp>
  )
}

export default Main;