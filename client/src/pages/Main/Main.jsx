import * as S from "./styled";
import ItemContainer from "../../components/item/ItemContainer/itemContainer";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const Main = () => {
  const { data, isLoading, error, refetch } = useCustomQuery(
    `/contents`,
  );
  
  if (error) return <Error/>;
  if (isLoading) return <Loading />;
  
  const movies = [data];

  const Watcha = movies[0].data.filter( movie => movie.contentOttName === "watcha" );
  const Tving = movies[0].data.filter( movie => movie.contentOttName === "tving" );
  const Wavve = movies[0].data.filter( movie => movie.contentOttName === "wavve" );
  
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