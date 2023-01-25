import * as S from "./styled";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";

const EachComment = (comment) => {

    const member = localStorage.getItem("memberId");
    const {contentId} = useParams()

    console.log(comment.comment)
    const [isModify, setIsModify] = useState(false);
    const [comments, setComments] = useState('');
    console.log(isModify)

      // 수정 후 등록
    const onCommentEditHandler = (commentMemberId) => {
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
    
      const commentEditButton = (commentMemberId) => {
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
          setIsModify(!isModify)
          console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
          setIsModify(isModify)
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
            onCommentEditHandler();
        }
      };

    return (
        <S.DetailCommentList>
            {isModify === true ? (
                <S.InputDiv>
                <input
                  className="recommendInput"
                  autoComplete="off"
                  name="recommend"
                  type="text"
                  // maxLength="35"
                  placeholder="한줄평을 입력해주세요"
                  onChange = {(e) => setComments(e.target.value)}
                  onKeyPress={handleKeypress}
                  defaultValue={comment.comment.commentBody}
                ></input>
                <div className="buttonDiv">
                <button 
                    type="submit"
                    className="submit" 
                    onClick={onCommentEditHandler(comment.comment.commentId)}>
                  수정
                </button>
                </div>
              </S.InputDiv> 
            ) : (
        <S.DetailCommentItem key={comment.comment.commentId}>
        <div className="userInfo">
        <img
        src={comment.comment.memberPicture}
        className="memberPicture"
        alt="사용자 이미지"
        style={{"width" : "40px", "height" : "40px"}}
        ></img>
        <div className="name">{comment.comment.nickName}</div>
        {Number(comment.comment.memberId) === Number(member) ? (
          <S.Buttons>
          <S.InputButton 
          // onClick={() => onCommentEditHandler(comment.commentId)}
          onClick={() => commentEditButton(comment.comment.commentId)}
        // onClick={setIsModify(!isModify)}
          > 수정
          </S.InputButton>
          <S.InputButton
          onClick={() => onCommentDeleteHandler(comment.comment.commentId)}>
          삭제
          </S.InputButton>
          </S.Buttons>
          ) : null}
          </div>
          <div className="content">{comment.comment.commentBody}</div>
        </S.DetailCommentItem>
        )}
        </S.DetailCommentList>)
}

export default EachComment