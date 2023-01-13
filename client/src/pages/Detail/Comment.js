import { useParams } from "react-router-dom";
import useFetch from "../../components/util/useFetch";
import { useState } from "react";
import styled from "styled-components";


const DetailCommentList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

`;

const DetailCommentItem = styled.div`
  width: 1220px;
  height: 100px;
  padding: 10px;
  background: #58bfad;
  margin-bottom: 10px;
  font-size: 13px;
  border-radius: 10px;
  .userInfo {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    color: #ffffff;
    .name {
      padding-left: 10px;
    }
  }
  .content {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    color: #ffffff;
    font-size: 17px;
    border-radius: 30px;
  }
  .memberPicture {
    border-radius: 30px;
    width: 48px;
  }
`;
const InputDiv = styled.div`
  display: flex;
  width: 80%;
  margin-top: 20px;
  .recommendInput {
    width: 100%;
    height: 100px;
    padding-left: 30px;
    background-color: #58bfad;
    color: #ffffff;
    font-size: 20px;
    border: none;
    border-radius: 10px;
    &:focus {
      outline: none;
    }
    ::placeholder {
      color: #ffffff;
    }
  }
  .buttonDiv {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 100px;
    background-color: #d9d9d9;
    border-radius: 10px;
  }
  .submit {
    width: 48px;
    height: 28px;
    color: #ffffff;
    background-color: #58bfad;
    border: none;
    border-radius: 10px;
  }
`;

const InputButton = styled.button`
    width: 30px;
    height: 30px;
`

const Buttons = styled.div`
    display: grid;
`

const Comment = () => {
  const {contentId} = useParams()
  // console.log(params.data)

  const request = {
    method : "get",
    headers : {"Content-Type" : "application/json"}
  }

  const [comments] = useFetch('http://whatu1.kro.kr:8080/comments?page=1&size=10',request)
  

    const [comment, setComment] = useState('')

    console.log(comments)

    // TODO : 로그인 하면 작성자 정보 나타나도록 
  const submitcommit = (e) => {
    if(comment === '') return alert("내용을 입력하세요")
    const updateRequest = {
      method : "POST",
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
    console.log(e.target.value)
  }

  const commitModification = (e) => {
    const updateRequest = {
      method : "POST",
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
    console.log(e.target.value)
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
            <DetailCommentList>
                { comments && comments.map(comment => (
                    <DetailCommentItem key={comment.commentId}>
                <div className="userInfo">
                    <img
                    src={comment.memberPicture}
                    className="memberPicture"
                    alt="사용자 이미지"
                    style={{"width" : "40px", "height" : "40px"}}
                    ></img>
                    <div className="name">{comment.memberNickName}</div>
                </div>
                <div className="content">{comment.commentBody}</div>
            </DetailCommentItem>
        ))}  
            <InputDiv>
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
                <Buttons>
                    <InputButton>수정</InputButton>
                    <InputButton>삭제</InputButton>
                </Buttons>
            
            </InputDiv>
            {/*  TODO:삭제, 수정 기능 만들기 */}
        </DetailCommentList>
        ) : (
        <DetailCommentList>
            <InputDiv>
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
            </InputDiv>
            <Buttons>
                <InputButton onClick={commitModification}>수정</InputButton>
                <InputButton onClick={commitDelete}>삭제</InputButton>
            </Buttons>
            {/* TODO:삭제, 수정 기능 만들기 */}
        </DetailCommentList>
        )}
        </>
    )};

export default Comment;