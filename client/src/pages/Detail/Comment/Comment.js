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
  

    const [comment, setComment] = useState('');

    console.log(comment)

    // TODO : 로그인 하면 작성자 정보 나타나도록 
  const commitModification = (e) => {
    // if(comment === '') return alert("내용을 입력하세요")
    // const updateRequest = {
    //   method : "POST",
    //   body : JSON.stringify({comment}),
    //   headers: {
    //     "Content-Type":'application/json'
    //   }
    // }
    // fetch(`http://localhost:3000/contents/${contentId}/comments`,JSON.stringify(comment),updateRequest)
    // .then (() => {
    //   window.location.reload()
    // })
    // .catch(err => {
    //   console.log(err)
    // })
    // console.log(e.target.value)
  }

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

  const onAnswerEditHandler = (commentMemberId) => {
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

  const commitDelete = () => {
    const updateRequest = {
      method : "DELETE",
      body : JSON.stringify({comment}),
      headers: {
        "Content-Type":'application/json'
      }
    }
    fetch(`http://localhost:3000/contents/${contentId}/comments`,JSON.stringify(comment),updateRequest)
    .then (() => {
      window.location.reload()
    })
    .catch(err => {
      console.log(err)
    })
  }

    return (
        <>
        {/* 한 줄 평 작성 */}

        {comments && comments.length !== null ? (
            <S.DetailCommentList>
                { comments && comments.map(comment => (
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
                    <S.InputButton defaultValue={comment.commentBody} onClick={() => onAnswerEditHandler(comment.commentId)}>수정</S.InputButton>
                    <S.InputButton>삭제</S.InputButton>
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
            {/*  TODO:삭제, 수정 기능 만들기 */}
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
                <S.InputButton onClick={commitModification}>수정</S.InputButton>
                <S.InputButton onClick={commitDelete}>삭제</S.InputButton>
            </S.Buttons>
            {/* TODO:삭제, 수정 기능 만들기 */}
        </S.DetailCommentList>
        )}
        </>
    )};

export default Comment;