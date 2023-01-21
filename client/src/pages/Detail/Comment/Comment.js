import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../../components/util/useFetch";
import { useState } from "react";
import * as S from "./styled";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

const Comment = () => {
  const {contentId} = useParams()
  // console.log(params.data)
  let isLogin = localStorage.getItem("isLogin");

  const request = {
    method : "get",
    headers : {"Content-Type" : "application/json"}
  }
  const [page, setPage] = useState(1)
  const [comments] = useFetch(`http://whatu1.kro.kr:8080/comments?page=${page}&size=6`,request);
  const [movies] = useFetch(`http://whatu1.kro.kr:8080/contents/${contentId}`,request);
  
  const navigate = useNavigate();

    console.log(comments);
    const [comment, setComment] = useState('');
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
    if(!isLogin) return navigate('/login')
    if(comment === '') return toast.error("한줄 평 내용을 입력해주세요");

    const bodyJSON =  JSON.stringify({
      commentBody: comment,
    });

    await axios.post(`http://whatu1.kro.kr:8080/contents/${contentId}/comments`,bodyJSON,{
      headers: {
        "Content-Type":'application/json',
        "Authorization": localStorage.getItem("accessToken")
      }
    })
    .then (() => {
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
    })
    console.log(e.target.value)
  }
  const [isModify, setIsModify] = useState(false)
  console.log(isModify)
  //한줄 평 수정

  const commentEditButton = (commentMemberId) => {
  //   const bodyJSON =  JSON.stringify({
  //   commentBody: comment,
  // });

  // axios
  // .patch(`http://whatu1.kro.kr:8080/contents/${contentId}/comments/${commentMemberId}`, bodyJSON, {
  //   headers: {
  //     "Content-Type": 'application/json',
  //     "AutHorization": localStorage.getItem("accessToken"),
  //   }
  // })
  // .then((res) => {
  //   setIsModify(!isModify)
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
    setIsModify(isModify)
  }
  const oncommentEditHandler = (commentMemberId) => {
    const bodyJSON =  JSON.stringify({
      commentBody: comment,
    });

    axios
    .patch(`http://whatu1.kro.kr:8080/contents/${contentId}/comments/${commentMemberId}`, bodyJSON, {
      headers: {
        "Content-Type": 'application/json',
        "AutHorization": localStorage.getItem("accessToken"),
      }
    })
    .then((res) => {
      alert("Answer edited!");
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //한줄 평 삭제
  const onCommentDeleteHandler = async (commentMemberId) => {
      await axios({
        method: "DELETE",
        url:`http://whatu1.kro.kr:8080/comments/${commentMemberId}`,
        headers: {
        "Content-Type":'application/json',
        "AutHorization": localStorage.getItem("accessToken")
      }
    })
    .then (() => {
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
    })
  }
  const handleKeypress = e => {
    if (e.key === "Enter") {
      submitcommit();
    }
  };

  const moviecomment = comments.filter (comments => movies.contentId === comments.contentId)
  const member = localStorage.getItem("memberId")

    return (
      <div>
        {/* 한줄 평 input창  */}
        <S.InputDiv>
          <input
            className="recommendInput"
            autoComplete="off"
            name="recommend"
            type="text"
            // maxLength="35"
            placeholder="한줄평을 입력해주세요"
            onChange = {(e) => setComment(e.target.value)}
            onKeyPress={handleKeypress}
          ></input>
          <div className="buttonDiv">
          <button type="submit" className="submit" onClick={submitcommit}>
            등록
          </button>
          </div>
        </S.InputDiv>

        {moviecomment && moviecomment.length !== null ? (
          <>
            {/* <InfiniteScroll
            dataLength={moviecomment.length} //This is important field to render the next data
            next={getMoreComment}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
            }
            >
            </InfiniteScroll> */}
            <S.DetailCommentList>
              { moviecomment && moviecomment.map(comment => (
                isModify === true ? (
                  <S.InputDiv>
                  <input
                    className="recommendInput"
                    autoComplete="off"
                    name="recommend"
                    type="text"
                    // maxLength="35"
                    placeholder="한줄평을 입력해주세요"
                    onChange = {(e) => setComment(e.target.value)}
                    onKeyPress={handleKeypress}
                    defaultValue={moviecomment.commentBody}
                  ></input>
                  <div className="buttonDiv">
                  <button type="submit" className="submit" onClick={oncommentEditHandler(comment.commentId)}>
                    수정
                  </button>
                  </div>
                </S.InputDiv>
                ) : (
                  <S.DetailCommentItem key={comment.commentId}>
                  <div className="userInfo">
                  <img
                  src={comment.memberPicture}
                  className="memberPicture"
                  alt="사용자 이미지"
                  style={{"width" : "40px", "height" : "40px"}}
                  ></img>
                  <div className="name">{comment.nickName}</div>
                  {Number(comment.memberId) === Number(member) ? (
                    <S.Buttons>
                    <S.InputButton 
                    // onClick={() => oncommentEditHandler(comment.commentId)}
                    onClick={() => commentEditButton(comment.commentId)}
                    > 수정
                    </S.InputButton>
                    <S.InputButton
                    onClick={() => onCommentDeleteHandler(comment.commentId)}>
                    삭제
                    </S.InputButton>
                    </S.Buttons>
                    ) : null}
                    </div>
                    <div className="content">{comment.commentBody}</div>
                    </S.DetailCommentItem>
                    )
                    ))}
          </S.DetailCommentList>
        </>
        ) : null}
      </div>
    )};

export default Comment;