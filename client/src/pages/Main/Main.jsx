import * as S from "./styled";
import ItemContainer from "../../components/item/ItemContainer/itemContainer";
import { useCustomQuery } from "../../components/util/useCustomQuery";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
const Main = () => {
  const { data, isLoading, error } = useCustomQuery(`/contents`);

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  const movies = [data];

  const watchaMovies = movies[0].data.filter(
    (movie) => movie.contentOttName === "watcha"
  );
  const tvingMovies = movies[0].data.filter(
    (movie) => movie.contentOttName === "tving"
  );
  const wavveMovies = movies[0].data.filter(
    (movie) => movie.contentOttName === "wavve"
  );


  const Watcha = watchaMovies.filter((watchMovie, index) => {
    return (
      watchaMovies.findLastIndex((watchMovie2, j) => {
        return watchMovie.contentOttRank === watchMovie2.contentOttRank;
      }) === index
    );
  });

  const WatchaResult = Watcha.sort((a, b) => {
    return a.contentOttRank - b.contentOttRank;
  });

  const Tving = tvingMovies.filter((tivingmovie, index) => {
    return (
      tvingMovies.findLastIndex((tivingmovie2, j) => {
        return tivingmovie.contentOttRank === tivingmovie2.contentOttRank;
      }) === index
    );
  });

  const TvingResult = Tving.sort((a, b) => {
    return a.contentOttRank - b.contentOttRank;
  });

  const Wavve = wavveMovies.filter((wavveMovie, index3) => {
    return (
      wavveMovies.findLastIndex((wavveMovie2, j) => {
        return wavveMovie.contentOttRank === wavveMovie2.contentOttRank;
      }) === index3
    );
  });

  const WavveResult = Wavve.sort((a, b) => {
    return a.contentOttRank - b.contentOttRank;
  });
  console.log("Wavve",Wavve)
  console.log("WavveResult", WavveResult)


  return (
    <S.MainWarp>
      <S.MainContainer>
        <ItemContainer movies={WatchaResult} ottName={`Watcha`} />
        <ItemContainer movies={TvingResult} ottName={`Tving`} />
        <ItemContainer movies={WavveResult} ottName={`Wavve`} />
      </S.MainContainer>
    </S.MainWarp>
  );
};

export default Main;
