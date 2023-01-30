import React from "react";
import * as S from "./styled";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useCustomQuery } from "../../../components/util/useCustomQuery";
import Loading from "../../../components/Loading/Loading";

const Tving = () => {
  const [comment, setComment] = useState("");
  const memberId = localStorage.getItem("memberId");
  // console.log(memberId);

  const [commentOTT, setCommentOTT] = useState("");

  const { data, isLoading, error, refetch } = useCustomQuery(
    `/boards/tving?page=1&size=100`,
    `boards=tving`
  );

  const timeForToday = (time) => {
    const today = new window.Date();
    const timeValue = new window.Date(time);
    const betweenTimeMin = Math.floor(
      (today.getTime() - timeValue.getTime()) / 1000 / 60
    );
    const betweenTimeHour = Math.floor(betweenTimeMin / 60);
    const betweenTimeDay = Math.floor(betweenTimeMin / 60 / 24);

    if (betweenTimeMin < 1) return "방금 전";
    if (betweenTimeMin < 60) return `${betweenTimeMin}분전`;
    if (betweenTimeHour < 24) return `${betweenTimeHour} hours ago`;
    if (betweenTimeDay < 365) return `${betweenTimeDay} days ago`;

    return `${Math.floor(betweenTimeDay / 365)} years ago`;
  };

  //게시판 댓글 작성시 새 글이 밑으로 쌓여야 하는데 위로 쌓임
  const submitcommit = async (e) => {
    if (comment === "") return toast.error("한줄 평 내용을 입력해주세요");

    const bodyJSON = JSON.stringify({
      tvingBoardBody: comment,
    });

    await axios
      .post(`http://whatu1.kro.kr:8080/boards/tving`, bodyJSON, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        refetch();
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

  const deleteBoard = async (tvingBoardId) => {
    await axios
      .delete(`http://whatu1.kro.kr:8080/boards/tving/${tvingBoardId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        refetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {isLoading ? <Loading /> : null}
      <S.ContentList>
        {data &&
          data.data.map((item) => {
            // console.log("local", memberId);
            // console.log(item.memberId);

            return Number(memberId) === Number(item.memberId) ? (
              <S.ContentItemMe key={item.tvingBoardId}>
                <div className="userInfo">
                  <button
                    className="deleteChat"
                    onClick={() => {
                      deleteBoard(item.tvingBoardId);
                    }}
                  >
                    삭제
                  </button>
                  <span className="userInfText">
                    {timeForToday(item.createAt)}
                  </span>
                  <span className="userInfText">{item.nickName}</span>

                  <img
                    src={item.memberPicture}
                    className="memberPicture"
                    alt="사용자 이미지"
                    style={{}}
                  ></img>
                  <div className="content">{item.tvingBoardBody}</div>
                </div>
              </S.ContentItemMe>
            ) : (
              <S.ContentItem key={item.tvingBoardId}>
                <div className="userInfo">
                  <img
                    src={item.memberPicture}
                    className="memberPicture"
                    alt="사용자 이미지"
                    style={{}}
                  ></img>
                  {item.nickName}
                </div>
                <div className="content">{item.tvingBoardBody}</div>
                <div className="userInfText">{timeForToday(item.createAt)}</div>
              </S.ContentItem>
            );
          })}
      </S.ContentList>
      <S.InputDivs>
        <input
          className="recommendInput"
          autoComplete="off"
          name="recommend"
          type="text"
          placeholder="TVING 작품에 대해서 자유롭게 입력해주세요"
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeypress}
        ></input>
        <div className="buttonDiv">
          <button type="submit" className="submit" onClick={submitcommit}>
            등록
          </button>
        </div>
      </S.InputDivs>
    </>
  );
};

export default Tving;
