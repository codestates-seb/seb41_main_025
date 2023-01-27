import * as S from "./styled";
import Item from "../../components/item/Item/item";
import useFetch from "../../components/util/useFetch";
import { Link, useParams } from "react-router-dom";
import SearchNull from "../SearchNull/SearchNull";
import { useCustomQuery } from "../../components/util/useCustomQuery";

const SearchResult = ({ searchResult }) => {

  // const { contentId } = useParams();
  const [movies] = useFetch("http://whatu1.kro.kr:8080/contents");
  // const { data, isLoading, error, refetch } = useCustomQuery(
  //   `/contents/${contentId}`,
  //   `contents=${contentId}`
  // );

  // TODO: 로딩 컴포넌트
  // if (isLoading) return <></>;
  // if (loading) return <></>;
  // TODO: error 컴포넌트
  // if (error) return <>error 발생</>;
  // const movies = data.data;
  console.log(searchResult); // 입력값 제대로 오는지 확인

  // 검색 값과 영화 리스트를 filter 로 걸러낸다.
  const resultFilter = movies.filter((e) => {
    return e.contentTitle
      .toLocaleLowerCase()
      .includes(searchResult.toLocaleLowerCase());
  });
  console.log(resultFilter.length);

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
