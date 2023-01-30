import SeleteItem from "../../../components/item/SelectItem/SeleteItem";
import * as S from "./styled"
import Empty from "../../Empty/Empty";
import { useCustomQuery } from "../../../components/util/useCustomQuery";

const Recommend = () => {
  //새로고침을 해줘야 업데이트됨
  const memberId = localStorage.getItem("memberId");


  const { data, isLoading, error, refetch } = useCustomQuery(
    `/members/${memberId}/recommend`,
    `memberId=${memberId}/recommend`
  );
    // TODO: 로딩 컴포넌트
    if (isLoading) return <></>;
    // if (loading) return <></>;
    // TODO: error 컴포넌트
    if (error) return <>error 발생</>;

  const recommendMovieList = data.data;
    return(
      <>
      {recommendMovieList.length === 0 ? <Empty/> : (
        <S.Items>
        {recommendMovieList && recommendMovieList.map((recommend) => {
          return (
            <SeleteItem key = {recommend.contentResponseMinDto.recommendId}
            dataId = {recommend.recommendId}
            Poster = {recommend.contentResponseMinDto.contentPoster}
            Id = {recommend.contentResponseMinDto.contentId}
            Score={recommend.contentResponseMinDto.contentScore}
            Title= {recommend.contentResponseMinDto.contentTitle}
            refetch={refetch}
            />
            )
          })}
          </S.Items>
          )}
      </>
  );

}
    export default Recommend;