import React from "react";
import * as S from "./styled";
import useFetch from "../../../components/util/useFetch";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const Wavve = () => {

  const [comment, setComment] = useState('');
  
  const request = {
    method : "get",
    headers :
    {
    "Content-Type" : "application/json",
    "Authorization": localStorage.getItem("accessToken")}
  }

  const [borards] = useFetch(`http://whatu1.kro.kr:8080/boards/wavve?page=1&size=10`, request)
  
  const timeForToday = (time) => {
    const today = new window.Date();
    const timeValue = new window.Date(time);
    const betweenTimeMin = Math.floor((today.getTime() - timeValue.getTime())/ 1000 / 60)
    const betweenTimeHour = Math.floor( betweenTimeMin / 60)
    const betweenTimeDay = Math.floor( betweenTimeMin / 60 / 24)

    if(betweenTimeMin < 1) return "방금 전"
    if(betweenTimeMin < 60) return `${betweenTimeMin}분전`
    if(betweenTimeHour < 24) return `${betweenTimeHour} hours ago`
    if(betweenTimeDay < 365) return `${betweenTimeDay} days ago`
  
    return `${Math.floor(betweenTimeDay / 365)} years ago`
  }

  const submitcommit = async (e) => {
    if(comment === '') return toast.error("한줄 평 내용을 입력해주세요");

    const bodyJSON =  JSON.stringify({
      wavveBoardBody: comment,
    });

    await axios.post(`http://whatu1.kro.kr:8080/boards/wavve`,bodyJSON,{
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

  const handleKeypress = e => {
    if (e.key === "Enter") {
      submitcommit();
    }
  }
  return (
<>
    <S.ContentList>
      {borards.map((item) => {
        return (
          <S.ContentItem key={item.wavveBoardId}>
            <div className="userInfo">
              <img
                src={item.memberPicture}
                className="memberPicture"
                alt="사용자 이미지"
                style={{}}
                ></img>
              {item.nickName}
              {timeForToday(item.createAt)}
            </div>
              <div className="content">{item.wavveBoardBody}
            </div>
          </S.ContentItem>
        );
      })}
    </S.ContentList>
    <>
      <input
        className="recommendInput"
        autoComplete="off"
        name="recommend"
        type="text"
        // maxLength="35"
        placeholder="Wavve 작품에 대해서 자유롭게 입력해주세요"
        onChange = {(e) => setComment(e.target.value)}
        onKeyPress={handleKeypress}
        ></input>
      <button type="submit" className="submit" onClick={submitcommit}>
        등록
      </button>
    </>
  </>
  );
};

export default Wavve;
