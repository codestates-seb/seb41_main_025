import * as S from "./styled";
import useFetch from "../../components/util/useFetch";
import ItemContainer from "../../components/item/ItemContainer/itemContainer";

const Main = () => {
  const [movies] = useFetch('http://whatu1.kro.kr:8080/contents');
  
  const Watcha = movies.filter( movie => movie.contentOttName === "watcha" );
  console.log(Watcha);
  const Tving = movies.filter( movie => movie.contentOttName === "tving" );
  console.log(Tving);
  const Wavve = movies.filter( movie => movie.contentOttName === "wavve" );
  console.log(Wavve);

  return (
    <S.MainWarp>
      <S.MainContainer>

        {/* TODO : filter 를 이용해서 OTT별 자료가져오기 */}
        <ItemContainer movies={Watcha} ottName={`Watcha`} />
        <ItemContainer movies={Tving} ottName={`Tving`} />
        <ItemContainer movies={Wavve} ottName={`Wavve`} />

      </S.MainContainer>
    </S.MainWarp>
  )
}

export default Main;