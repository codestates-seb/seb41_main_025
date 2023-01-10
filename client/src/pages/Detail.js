import React from "react";
import styled from "styled-components";
import { AiTwotoneLike, AiTwotoneDislike, AiFillStar } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { ModifyBtn } from "./Mypage/Mypage";
import dummy from "./AllTimeChat/dummydata";
import { ButtonForm } from "../components/item/Button";

const DetailContainer = styled.div`
  width: 1440px;
  height: 1800px;
  margin-bottom: 30px;
  padding: 60px 60px 0px;
  margin: 0 auto;
`;
const DetailHeader = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 40px 0px;
  .posterWrap {
    width: 240px;
    height: 346px;
    border-radius: 10px;
    background-color: red;
    background-image: url("");
    background-size: contain;
  }
`;
const DetailCommentList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  padding-left: 50px;
  justify-content: space-around;
  .title {
    font-size: 35px;
  }
`;
const DetailItem = styled.div`
  display: flex;
  .itemIcon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100px;
    height: 80px;
  }
`; //아이콘 박스

const DetailCommentItem = styled.div`
  width: 1220px;
  height: 100px;
  padding: 10px;
  background: #58bfad;
  margin-bottom: 10px;
  font-size: 13px;
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
  .recommendInput {
    width: 100%;
    height: 100px;
    padding-left: 30px;
    background-color: #58bfad;
    color: #ffffff;
    border: none;
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
  }
  .submit {
    width: 48px;
    height: 38px;
    color: #ffffff;
    background-color: #58bfad;
    border: none;
    border-radius: 10px;
  }
`;

const Detail = () => {
  return (
    <DetailContainer>
      <DetailHeader>
        <div className="posterWrap"></div>
        <DetailContent>
          <div className="title">영화 제목{/* 영화제목 */}</div>
          <div className="comeout">국가 / 개봉년도{/* 국가/개봉년도 */}</div>
          <div className="score">평점 {/* 평점 */}</div>
          <div className="comments">영화설명 {/* 영화설명*/}</div>
          <DetailItem>
            {/*아이콘 박스*/}
            <div className="itemIcon">
              <AiTwotoneLike size="48" color="#58BFAD" />
              100
            </div>
            <div className="itemIcon">
              <AiTwotoneDislike size="48" color="#58BFAD" />
              100
            </div>
            <div className="itemIcon">
              <FcLike size="48" />
              찜하기
            </div>
            <div className="itemIcon">
              {/* 별 모양 색 찾기*/}
              <AiFillStar size="48" color="#167E6C" />
              나의 인생 작품
            </div>
          </DetailItem>
        </DetailContent>
        {/* <ModifyBtn  style={{margin:"130px 0px"}}> 실시간 채팅 </ModifyBtn> */}
        <ButtonForm to='/alltimechat'>실시간 채팅</ButtonForm>
      </DetailHeader>

      <DetailCommentList>
        {dummy.map((item) => {
          return (
            <DetailCommentItem key={item.id}>
              <div className="userInfo">
                <img
                  src={item.memberPicture}
                  className="memberPicture"
                  alt="사용자 이미지"
                  style={{}}
                ></img>
                <div className="name">{item.name}</div>
              </div>
              <div className="content">{item.commentBody}</div>
            </DetailCommentItem>
          );
        })}
        <InputDiv>
          <input
            className="recommendInput"
            autoComplete="off"
            name="recommend"
            type="text"
            // maxLength="35"
            placeholder="한줄평을 입력해주세요"
          ></input>
          <div className="buttonDiv">
            <button type="submit" className="submit">
              등록
            </button>
          </div>
        </InputDiv>
      </DetailCommentList>
    </DetailContainer>
  );
};

export default Detail;
