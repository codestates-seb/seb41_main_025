import React from "react";
import * as S from "./styled";
import { useState } from "react";
import axios from "axios";
import { useCustomQuery } from "../../../components/util/useCustomQuery";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error/Error";
import { useCustomMutation } from "../../../components/util/useMutation";
import { toast } from "react-toastify";

const Tving = () => {
  const [comment, setComment] = useState("");
  const memberId = localStorage.getItem("memberId");
  const { data, isLoading, error, refetch } = useCustomQuery(
    `/boards/tving?page=1&size=100`,
    `boards=tving`
  );

  const { mutate } = useCustomMutation(
    "/boards/tving",
    "boards=tving",
    "POST",
    {
      onMutate: (value) => {
        console.log(value);
      },
      onSuccess: (data, variables, context) => {
        console.log("onsuccess", data, variables, context);
        refetch();
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  if (isLoading) return <Loading/>;
  if (error) return <Error/>;

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

  const submitcommit = () => {
    if (comment === "") return toast.error("내용을 입력하세요");
    mutate({ tvingBoardBody: comment });
    toast.success("내용이 입력되었습니다");
    setComment("")
    refetch();
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
        toast.success("선택하신 내용이 삭제되었습니다");
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
            return Number(memberId) === Number(item.memberId) ? (
              <S.ContentItemMe key={item.tvingBoardId}>
                <div className="userInfo">
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
                  <button
                    className="deleteChat"
                    onClick={() => {
                      deleteBoard(item.tvingBoardId);
                      console.log(item.tvingBoardId);
                    }}
                  >
                    삭제
                  </button>
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
          value={comment}
          autoComplete="off"
          name="recommend"
          type="text"
          placeholder="TVING 작품에 대해서 자유롭게 입력해주세요"
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeypress}
        ></input>
        <S.ButtonDiv>
          <button type="submit" className="submit" onClick={submitcommit}>
            등록
          </button>
        </S.ButtonDiv>
      </S.InputDivs>
    </>
  );
};

export default Tving;
