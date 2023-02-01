import * as S from "./styled";
import ItemContainer from "../../components/item/ItemContainer/itemContainer";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const Main = () => {
  const { data, isLoading, error } = useCustomQuery(
    `/contents`,
  );
  
  if (error) return <Error/>;
  if (isLoading) return <Loading />;
  
  const movies = [data];
  //만약에 ottrank의 같은 값이 존재한다면 modify가 최근 인걸로 출력

  const watchaMovies = movies[0].data.filter( movie => movie.contentOttName === "watcha" );
  const tvingMovies = movies[0].data.filter( movie => movie.contentOttName === "tving" );
  const wavveMovies = movies[0].data.filter( movie => movie.contentOttName === "wavve" );
console.log(movies[0].data)
  const Watcha = watchaMovies.filter((watchMovie, index) =>
  { 
    // console.log("index", index)
    return ( 
      watchaMovies.findIndex((watchMovie2,j) => 
    { 
    return (
      watchMovie.contentOttRank === watchMovie2.contentOttRank )
    }) === index
    )
  });
  console.log(Watcha)

  const Tving = tvingMovies.filter((tivingmovie, index) =>
  { 
    return ( 
      tvingMovies.findIndex((tivingmovie2,j) => 
      { 
      return (
        tivingmovie.contentOttRank === tivingmovie2.contentOttRank  )
      }) === index
    )
  });

  
  
  const Wavve = wavveMovies.filter((wavveMovie, index3) =>
  { 
    // console.log("index3", index3)
    return ( 
      wavveMovies.findIndex((wavveMovie2,j) => 
    { 
    return (
      wavveMovie.contentOttRank === wavveMovie2.contentOttRank )
    }) === index3
    )
  });
  console.log(Wavve)

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