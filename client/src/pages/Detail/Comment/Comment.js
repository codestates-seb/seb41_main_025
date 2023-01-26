import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../components/util/useFetch";
import { useState, useEffect } from "react";
import * as S from "./styled";
import axios from "axios";
import { toast } from "react-toastify";
import CommentBox from "../CommentBox/CommentBox";
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from "react-query";

const fetchPostList = async (pageParam) => {
  const res = await axios.get(
    `http://whatu1.kro.kr:8080/comments?page=${pageParam}&size=10`
  );
  // console.log(res.data)
  // const { posts, isLast } = res.data;
  const posts = res.data.data;
  const isLast = res.data.pageInfo.totalPages;
  console.log(isLast)
  return { posts, nextPage: pageParam + 1, isLast };
};
// console.log(fetchPostList)

const Comment = () => {
  const { contentId } = useParams();
  //창 뷰트 들어오고 나갈 때  요소의 가시성 추적
  const [ ref, inView ] = useInView();
  //밑으로 내리면 true 반환
  console.log(inView)
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    //query KEY
    "posts",
    ({ pageParam = 1 }) => fetchPostList(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    }
  );

  useEffect(() => {
    if (inView && isFetchingNextPage) fetchNextPage();
  }, [inView]);


  const request = {
    method: "get",
    headers: { "Content-Type": "application/json" },
  };

  const [comments] = useFetch(
    "http://whatu1.kro.kr:8080/comments?page=1&size=100",
    request
  );
  const [movies] = useFetch(
    `http://whatu1.kro.kr:8080/contents/${contentId}`,
    request
  );

  const [comment, setComment] = useState("");

  //한 줄 평 입력
  const submitcommit = async (e) => {
    if (comment === "") return toast.info("한줄평 내용을 입력하세요");

    const bodyJSON = JSON.stringify({
      commentBody: comment,
    });

    await axios
      .post(
        `http://whatu1.kro.kr:8080/contents/${contentId}/comments`,
        bodyJSON,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(e.target.value);
  };

  //enter치면 submitcommit 함수 실행
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      submitcommit();
    }
  };

  const moviecomment = comments.filter(
    (comments) => movies.contentId === comments.contentId
  );

  return (
    <>
      <S.InputDiv>
        <input
          className="recommendInput"
          autoComplete="off"
          name="recommend"
          type="text"
          // maxLength="35"
          placeholder="한줄평을 입력해주세요"
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeypress}
          defaultValue={moviecomment.commentBody}
        ></input>
        <div className="buttonDiv">
          <button type="submit" className="submit" onClick={submitcommit}>
            등록
          </button>
        </div>
      </S.InputDiv>
      {moviecomment && moviecomment.length !== null ? (
        <S.DetailCommentList>
          {moviecomment &&
            moviecomment.map((comment, index) => (
              <S.DetailCommentItem key={comment.commentId}>
                <CommentBox comment={comment}/>
              </S.DetailCommentItem>
            ))}
            {/* TODO:Loading 화면 구현 */}
        {/* {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>} */}
        {isFetchingNextPage ? '로딩' : <div ref={ref}></div>}
        <div ref={ref}></div>
        </S.DetailCommentList>
      ) : (
        <S.DetailCommentList>
          <S.InputDiv>
            <input
              className="recommendInput"
              autoComplete="off"
              name="recommend"
              type="text"
              // maxLength="35"
              placeholder="한줄평을 입력해주세요"
              onChange={(e) => setComment(e.target.value)}
              onKeyPress={handleKeypress}
            ></input>
            <div className="buttonDiv">
              <button type="submit" className="submit" onClick={submitcommit}>
                등록
              </button>
            </div>
          </S.InputDiv>
        </S.DetailCommentList>
      )}
    </>
  );
};

export default Comment;
