import axios from "axios";
import * as S from "./styled"
import Empty from "../../../components/Empty/Empty";
import { useCustomQuery } from "../../../components/util/useCustomQuery";
import { toast } from "react-toastify";

const Deprecate = () => {

  const memberId = localStorage.getItem("memberId");

  const { data, isLoading, error, refetch } = useCustomQuery(
    `/members/${memberId}/deprecate`,
    `memberId=${memberId}/deprecate`
  );
    // TODO: 로딩 컴포넌트
    if (isLoading) return <></>;
    // if (loading) return <></>;
    // TODO: error 컴포넌트
    if (error) return <>error 발생</>;

    const deprecateMovieList = data.data;

    const handleDelete = async (dataId) => {
      console.log("clicked")
      await axios
        .delete(
          `http://whatu1.kro.kr:8080/deprecate/${dataId}`,
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          console.log(res)
          refetch()
          toast.success("삭제가 완료되었습니다");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    return(
      <>
      {deprecateMovieList.length === 0 ? <Empty/> : (    
        <S.Items>
          {/* //TODO : deprecate 리렌더링 후 다시 recommend 창으로 돌아가는 현상 */}
          {deprecateMovieList && deprecateMovieList.map((deprecate) => {
            console.log(deprecate.contentResponseMinDto.contentTitle)
            return (
              <S.EachItem>
                {console.log(deprecate.deprecateId)}
              <a href={`/contents/${deprecate.contentId}`}>
                <img src ={deprecate.contentResponseMinDto.contentPoster} className='poster' alt="" />
              </a>
              <S.Details>
                <S.DetailFont>
                  <S.MovieTitle to ={`/contents/${deprecate.contentId}`}>{deprecate.contentResponseMinDto.contentTitle}</S.MovieTitle>
                  <h4 className="movieTitle"> 평점 : {deprecate.contentResponseMinDto.contentScore}</h4>
                </S.DetailFont>
              <S.DeleteBtn onClick = {() => handleDelete(deprecate.deprecateId)}>X</S.DeleteBtn>
              </S.Details>
            </S.EachItem>
              )
            })}
        </S.Items>
      )}
      </>

  );

}
    export default Deprecate;