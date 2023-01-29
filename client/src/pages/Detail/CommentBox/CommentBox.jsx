import React, { useState } from "react";
import * as S from "./styled";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const CommentBox = ({ comment }) => {
  const [toggle, setToggle] = useState(false);
  const [editComment, setEditComment] = useState("");
  const onEdit = (e) => {
    setToggle(!toggle);
  };
  const member = localStorage.getItem("memberId");
  const { contentId } = useParams();

  //한줄 평 수정
  const oncommentEditHandler = (commentMemberId) => {
    if (editComment === "") return toast.info("수정할 내용을 입력하세요");

    const bodyJSON = JSON.stringify({
      commentBody: editComment,
    });

    axios
      .patch(
        `http://whatu1.kro.kr:8080/contents/${contentId}/comments/${commentMemberId}`,
        bodyJSON,
        {
          headers: {
            "Content-Type": "application/json",
            AutHorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        window.location.reload();
        setTimeout(() => {
          return toast.success("수정이 완료되었습니다");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //한줄 평 삭제
  const onCommentDeleteHandler = async (commentMemberId) => {
    await axios({
      method: "DELETE",
      url: `http://whatu1.kro.kr:8080/comments/${commentMemberId}`,
      headers: {
        "Content-Type": "application/json",
        AutHorization: localStorage.getItem("accessToken"),
      },
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <S.CommentBoxDiv>
      <div className="userInfo">
        <img
          src={comment.memberPicture}
          className="memberPicture"
          alt="사용자 이미지"
        ></img>
        <div className="name">{comment.nickName}</div>
      </div>
      <div className="content">
        {toggle ? (
          <input
            defaultValue={comment.commentBody}
            onChange={(e) => {
              setEditComment(e.target.value);
            }}
            onClick={() => oncommentEditHandler(comment.commentId)}
          ></input>
        ) : (
          comment.commentBody
        )}
      </div>
      {/* css 수정하기 */}
      {Number(comment.memberId) === Number(member) ? (
        <S.Buttons>
          {toggle ? (
            <S.Buttons>
              <S.InputButton
                onClick={() => oncommentEditHandler(comment.commentId)}
              >
                완료
              </S.InputButton>
              <S.InputButton onClick={onEdit}>취소</S.InputButton>
            </S.Buttons>
          ) : (
            <S.Buttons>
              <S.InputButton onClick={onEdit}>수정</S.InputButton>
              <S.InputButton
                onClick={() => onCommentDeleteHandler(comment.commentId)}
              >
                삭제
              </S.InputButton>
            </S.Buttons>
          )}
        </S.Buttons>
      ) : null}
    </S.CommentBoxDiv>
  );
};

export default CommentBox;
