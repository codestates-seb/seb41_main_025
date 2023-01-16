import { useParams } from "react-router-dom";
import useFetch from "../../../components/util/useFetch";
import { useState } from "react";
import * as S from "./styled";
import axios from "axios";

const Comment = () => {
  const {contentId} = useParams()
  // console.log(params.data)

  const request = {
    method : "get",
    headers : {"Content-Type" : "application/json"}
  }

  const [comments] = useFetch('http://whatu1.kro.kr:8080/comments?page=1&size=10',request);
  const [movies] = useFetch(`http://whatu1.kro.kr:8080/contents/${contentId}`,request)
  
    const [comment, setComment] = useState('');
    // console.log(comment)

  //한 줄 평 입력
  const submitcommit = async (e) => {
    if(comment === '') return alert('내용을 입력하세요')

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

  //한줄 평 수정
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

  const moviecomment = comments.filter (comments => movies.contentId === comments.contentId)

    return (
        <>
        {moviecomment && moviecomment.length !== null ? (
            <S.DetailCommentList>
                { moviecomment && moviecomment.map(comment => (
                <S.DetailCommentItem key={comment.commentId}>
                <div className="userInfo">
                    <img
                    src={comment.memberPicture}
                    className="memberPicture"
                    alt="사용자 이미지"
                    style={{"width" : "40px", "height" : "40px"}}
                    ></img>
                    <div className="name">{comment.nickName}</div>
                </div>
                <div className="content">{comment.commentBody}</div>
                <S.Buttons>
                  {/* css 수정하기 */}
                    <S.InputButton defaultValue={comment.commentBody} onClick={() => oncommentEditHandler(comment.commentId)}>수정</S.InputButton>
                    <S.InputButton onClick={() => onCommentDeleteHandler(comment.commentId)}>삭제</S.InputButton>
                </S.Buttons>
              </S.DetailCommentItem>
        ))}  
            <S.InputDiv>
                <input
                className="recommendInput"
                autoComplete="off"
                name="recommend"
                type="text"
                // maxLength="35"
                placeholder="한줄평을 입력해주세요"
                onChange = {(e) => setComment(e.target.value)}
                ></input>
                <div className="buttonDiv">
                    <button type="submit" className="submit" onClick={submitcommit}>
                    등록
                    </button>
                </div>
            
            </S.InputDiv>
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
                onChange = {(e) => setComment(e.target.value)}
                ></input>
                <div className="buttonDiv">
                    <button type="submit" className="submit" onClick={submitcommit} >
                    등록
                    </button>
                </div>
            </S.InputDiv>
            <S.Buttons>
              <S.InputButton defaultValue={comment.commentBody} onClick={() => oncommentEditHandler(comment.commentId)}>수정</S.InputButton>
              <S.InputButton onClick={() => onCommentDeleteHandler(comment.commentId)}>삭제</S.InputButton>
            </S.Buttons>
        </S.DetailCommentList>
        )}
        </>
    )};

export default Comment;