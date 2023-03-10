import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useCustomQuery } from "../../../components/util/useCustomQuery";
import {
  ContentList,
  ContentItem,
  ContentItemMe,
  ButtonDiv,
  InputDivs,
} from "./styled";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error/Error";
import { useCustomMutation } from "../../../components/util/useMutation";

const Watcha = () => {
  const [comment, setComment] = useState("");
  const memberId = localStorage.getItem("memberId");

  const { data, isLoading, error, refetch } = useCustomQuery(
    `/boards/watcha?page=1&size=100`,
    `boards=watcha`
  );

  const { mutate } = useCustomMutation(
    `/boards/watcha`,
    `boards=watcha`,
    "POST"
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

    if (comment === "") return toast.error("한줄평 내용을 입력하세요");
    mutate({watchaBoardBody: comment})
    toast.success("내용이 입력되었습니다");
    setComment("")
    refetch();
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      submitcommit();
    }
  };

  //게시판 삭제
  const deleteBoard = async (watchaBoardId) => {
    await axios
      .delete(`http://whatu1.kro.kr:8080/boards/watcha/${watchaBoardId}`, {
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
      <ContentList>
        {data &&
          data.data.map((item) => {
            return Number(memberId) === Number(item.memberId) ? (
              <ContentItemMe key={item.watchaBoardId}>
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
                  <div className="content">{item.watchaBoardBody}</div>
                  <button
                    className="deleteChat"
                    onClick={() => {
                      deleteBoard(item.watchaBoardId);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </ContentItemMe>
            ) : (
              <ContentItem key={item.watchaBoardId}>
                <div className="userInfo">
                  <img
                    src={item.memberPicture}
                    className="memberPicture"
                    alt="사용자 이미지"
                    style={{}}
                  ></img>
                  {item.nickName}
                </div>
                <div className="content">{item.watchaBoardBody}</div>
                {timeForToday(item.createAt)}
              </ContentItem>
            );
          })}
      </ContentList>
      <InputDivs>
        <input
          className="recommendInput"
          autoComplete="off"
          name="recommend"
          type="text"
          value={comment}
          // maxLength="35"
          placeholder="Watcha 작품에 대해서 자유롭게 입력해주세요"
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={handleKeypress}
        ></input>
        <ButtonDiv>
          <button type="submit" className="submit" onClick={submitcommit}>
            등록
          </button>
        </ButtonDiv>
      </InputDivs>
    </>
  );
};

export default Watcha;
