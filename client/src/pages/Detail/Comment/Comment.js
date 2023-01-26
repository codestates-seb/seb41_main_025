import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../components/util/useFetch";
import { useState } from "react";
import * as S from "./styled";
import axios from "axios";
import { toast } from "react-toastify";
import CommentBox from "../CommentBox/CommentBox";

const Comment = () => {
  const { contentId } = useParams();

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
  // console.log(comment)

    // const getMoreComment = async () => {
    //   const res = await fetch(
    //     `http://whatu1.kro.kr:8080/comments?page=${page+1}&size=6`
    //   );
    //   const newPosts = await res.json();
    //   setPage((post) => [...post, ...newPosts]);
    // };

  //한 줄 평 입력
  const submitcommit = async (e) => {

    // if(!isLogin) return navigate('/login')
    if(comment === '') return toast.error("한줄 평 내용을 입력해주세요");

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

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      submitcommit();
    }
  };

  const moviecomment = comments.filter(
    (comments) => movies.contentId === comments.contentId
  );

  //todo: 클릭한 commentid 값에 해당하는 것만 input창으로 변경

  console.log(moviecomment);

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
            moviecomment.map((comment) => (
              <S.DetailCommentItem key={comment.commentId}>
                <CommentBox comment={comment}/>
              </S.DetailCommentItem>
            ))}
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
