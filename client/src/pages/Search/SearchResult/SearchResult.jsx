import * as S from "./styled";
import { Link } from "react-router-dom";
import SearchNull from "../SearchNull/SearchNull";
import { useCustomQuery } from "../../../components/util/useCustomQuery";
import Item from "../../../components/item/Item/item";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error/Error";

const SearchResult = ({ searchResult }) => {

  const { data, isLoading, error, refetch } = useCustomQuery(
    `/contents`,
  );
  
  if (error) return <Error/>;
  if (isLoading) return <Loading />;
  
  const movies = [data];

  // if (isLoading) return <></>;
  // if (error) return <>error 발생</>;
  // const movies = data.data;


  // 검색 값과 영화 리스트를 filter 로 걸러낸다.
  const resultFilter = movies[0].data.filter((e) => {
    return e.contentTitle
      .toLocaleLowerCase()
      .includes(searchResult.toLocaleLowerCase());
  });

  return (
    <S.Wrap>
      {resultFilter.length === 0 ? (
        <SearchNull />
      ) : (
        <S.Container className={resultFilter.length <= 5 ? "active" : null}>
          {/* 검색 결과 갯수 */}

          <S.Result>
            <h1>검색 결과</h1>
            <span>
              {resultFilter.length} 개 입니다. {/* 일치하는 갯수 */}
            </span>
          </S.Result>

          {/* mapping 으로 검색 결과에 맞는 영화 가져오기 */}
          <S.ItemList>
            {resultFilter.map((movie) => {
              return (
                <Link to={`/contents/${movie.contentId}`} key={movie.ottRank}>
                  <Item
                    contentTitle={movie.contentTitle}
                    contentPoster={movie.contentPoster}
                    contentOpenAt={movie.contentOpenAt}
                    contentCountry={movie.contentCountry}
                    contentScore={movie.contentScore}
                  />
                </Link>
              );
            })}
          </S.ItemList>
        </S.Container>
      )}
    </S.Wrap>
  );
};

export default SearchResult;
