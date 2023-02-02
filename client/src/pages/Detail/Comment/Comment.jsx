import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as S from "./styled";
import axios from "axios";
import { toast } from "react-toastify";
import CommentBox from "../CommentBox/CommentBox";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading/Loading"
import { useCustomMutation } from "../../../components/util/useMutation";

const fetchPostList = async (pageParam) => {
  const res = await axios.get(
    `http://whatu1.kro.kr:8080/comments?page=${pageParam}&size=10`
    );
    
    const posts = res.data.data;
    const isLast = res.data.pageInfo.totalPages;
    return { posts, nextPage: pageParam + 1, isLast };
  };
  
  const Comment = () => {
  const [comment, setComment] = useState("");
  const { contentId } = useParams();
  //창 뷰트 들어오고 나갈 때  요소의 가시성 추적
  const [ref, inView] = useInView();
  let isLogin = localStorage.getItem("isLogin");
  const navigate = useNavigate();

  //밑으로 내리면 true 반환
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    //query KEY
    ['posts'],
    ({ pageParam = 1 }) => fetchPostList(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
      getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor
    }
  );

  const { mutate, refetch } = useCustomMutation(
    `/contents/${contentId}/comments`,
    `contentId=${contentId}`,
    "POST"
  );

  useEffect(() => {
    if (inView && !isFetchingNextPage) fetchNextPage();
  }, [inView]);


  if (status === "loading") return <Loading/>;


  //한 줄 평 입력
  const submitcommit = () => {
    if (!isLogin) return navigate("/login");
    if (comment === "") return toast.error("한줄평 내용을 입력하세요");
      mutate({commentBody: comment})
      toast.success("한줄평 내용이 입력되었습니다");
      setComment("")
      refetch();
  };

  //enter치면 submitcommit 함수 실행
  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      submitcommit();
    }
  };

  return (
    <>
      {true && (
          <S.DetailCommentList>
            <S.InputDiv>
              <input
                className="recommendInput"
                autoComplete="off"
                name="recommend"
                type="text"
                // maxLength="35"
                value={comment}
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
          {data.pages &&
            data.pages.map((comment) => (
              <div key={comment.commentId}>
                {comment.posts && comment.posts.map ((body) => (
                  <div>
                    {Number(body.contentId) === Number(contentId) ? 
                    (
                      <S.DetailCommentItem key={body.commentId}>
                        <CommentBox comment={body} />
                      </S.DetailCommentItem>
                  ):null}
                  </div>
                ))}
              </div>
            ))}
          <div ref={ref}></div>
        </S.DetailCommentList>
    </>
  );
};

export default Comment;