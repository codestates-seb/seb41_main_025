import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as S from "./styled";
import axios from "axios";
import { toast } from "react-toastify";
import CommentBox from "../CommentBox/CommentBox";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading"

const fetchPostList = async (pageParam) => {
  const res = await axios.get(
    `http://whatu1.kro.kr:8080/comments?page=${pageParam}&size=10`
  );

  // const { posts, isLast } = res.data;
  const posts = res.data.data;
  const isLast = res.data.pageInfo.totalPages;
  return { posts, nextPage: pageParam + 1, isLast };
};

const Comment = () => {
  const { contentId } = useParams();
  //창 뷰트 들어오고 나갈 때  요소의 가시성 추적
  const [ref, inView] = useInView();

  //밑으로 내리면 true 반환
  console.log("inview : ", inView);
  // const {
  //   fetchNextPage, // 다음 페이지 데이터를 불러올 수 있는 함수
  //   fetchPreviousPage, // 이전 페이지 데이터를 불러올 수 있는 함수
  //   hasNextPage, // 다음 페이지가 존재하는지 구분할 수 있는 식별자
  //   hasPreviousPage, // 이전 페이지가 존재하는지 구분할 수 있는 식별자
  //   isFetchingNextPage, // 다음 페이지를 불러오고 있는 중인지 구분할 수 있는 식별자
  //   isFetchingPreviousPage, // 이전 데이터를 불러오고 있는 중인지 구분할 수 있는 식별자
  //   ...result // etc...
  // } = useInfiniteQuery(queryKey, ({ pageParam = 1 }) => fetchPage(pageParam), {
  //   ...options,
  //   getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
  //   getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
  // })
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    //query KEY
    ['posts'],
    ({ pageParam = 1 }) => fetchPostList(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    }
  );

  console.log("data : ", data);

  useEffect(() => {
    if (inView && !isFetchingNextPage) fetchNextPage();
  }, [inView]);

  const [comment, setComment] = useState("");

  if (status === "loading") return <Loading/>;

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
  };

  //enter치면 submitcommit 함수 실행
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      submitcommit();
    }
  };

  // const moviecomment = comments.filter(
  //   (comments) => contentId == comments.contentId
  // );

  const moviecomment = data.pages[0].posts.filter(
    (comments) => contentId == comments.contentId
  );

  return (
    <>
      {true && (
        // {data?.pages.map ((page,index)=> (

        // ))}
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
          )}{" "}
        <S.DetailCommentList>
          {moviecomment &&
            moviecomment.map((comment) => (
              <S.DetailCommentItem key={comment.commentId}>
                <CommentBox comment={comment} />
              </S.DetailCommentItem>
            ))}
          {/* TODO:Loading 화면 구현 */}
          {/* {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>} */}
          {/* {isFetchingNextPage ? '로딩' : <div ref={ref}></div>} */}
          <div ref={ref}>나를 봤다면, 이벤트 실행!!</div>
        </S.DetailCommentList>
    </>
  );
};

export default Comment;