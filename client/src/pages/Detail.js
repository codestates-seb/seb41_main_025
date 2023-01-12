import React from "react";
import styled from "styled-components";
import { AiTwotoneLike, AiTwotoneDislike, AiFillStar, AiOutlineLike, AiOutlineDislike, AiOutlineStar } from "react-icons/ai";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { ButtonForm } from "../components/item/Button";
import { useParams } from "react-router-dom";
import useFetch from "../components/util/useFetch";
import { useState } from "react";

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
  .comeout {
    margin-top: 10px;
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

const Detail = () => {


  const { id } = useParams()

  const request = {
    method : "get",
    headers : {"Content-Type" : "application/json"}
  }

  const [movies] = useFetch(`http://localhost:3000/contents/${id}`,request)

  const [recommend, setRecommend] = useState (movies && movies.recommend)
  const [recommendCounts, setRecommendCounts] = useState(movies && movies.recommendCount)
  const [decommend, setDecommend] = useState (false)
  const [decommendCounts, setDecommendCounts] = useState (movies && movies.decommendCount)
  const [favorite, setFavorite] = useState(movies && movies.favorite.choiceSelected)
  const [choose, setChoose] = useState(false)
  const [comment, setComment] = useState('')


  console.log(movies.recommendCount)
  console.log(recommendCounts)

  const handleRecommend = () => {
      setRecommend(!recommend)
      setRecommendCounts(recommend === true ? Number(recommendCounts) + 1 : recommendCounts)
      // FIXME : recommendCounts 가 number 로 따로 변환해 줘야 함
    }
  
    // 백엔드 쪽에서 투표 ID 당 한번만 할 수 있게 바꿔줄 수 있는지 확인
    // decommend도 만들어달라고 요청
  const handleDecommend = () => {
    setDecommend(!decommend)
    setDecommendCounts(decommend === true ? Number(decommendCounts) + 1 : decommendCounts)
  }
  const handleFavorite = () => {
       const updateRequest = {
        method : "PUT",
        headers: {
          "Content-Type": 'application/json',
          // "Authorization": localStorage.getItem("accessToken"),
          // "Refresh": localStorage.getItem("refreshToken")
        }
      }
      fetch(`http://localhost:3000/contents/${id}/favorite`, updateRequest)
      .then (() => {
        setFavorite(!favorite)
        console.log(movies.favorite.choiceSelected)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const handleChoose = () => {
    setChoose(!choose)
  }

// TODO : 로그인 하면 작성자 정보 나타나도록 
  const submitcommit = (e) => {
    // if(comment === '') return alert("내용을 입력하세요")
    // const updateRequest = {
    //   method : "POST",
    //   body : JSON.stringify(comment),
    //   headers: {
    //     "Content-Type": 'application/json'
    //     // "Authorization": localStorage.getItem("accessToken"),
    //     // "Refresh": localStorage.getItem("refreshToken")
    //   }
    // }
    // fetch(`http://localhost:3000/contents/${id}/comments`,JSON.stringify(comment),updateRequest)
    // .then (() => {
    //   window.location.reload()
    // })
    // .catch(err => {
    //   console.log(err)
    // })
    console.log(e.target.value)
  }

  return (
    <DetailContainer>
      <DetailHeader>
        <img className="posterWrap" src={movies && movies.contentPoster} alt='moviePoster'></img>
        <DetailContent>
            <>
                <div className="contents">
                  <div className="title">{movies && movies.contentTitle}</div>
                  <div className="comeout">{movies && movies.contentOpenAt}</div>
                  <div className="score">평점 {/* 평점 */}</div>
                  <div className="comments">영화설명 {movies && movies.contentBody}</div>
                </div>
            </>
          <DetailItem>
            {/*아이콘 박스*/}
            <div className="itemIcon" onClick={handleRecommend}>
              {recommend === true ? <AiTwotoneLike size="48" color="#58BFAD" /> : 
              <AiOutlineLike size="48" />}
              {recommendCounts}
            </div>
            <div className="itemIcon" onClick={handleDecommend}>
              {decommend === true ? <AiTwotoneDislike size="48" color="#58BFAD" /> : 
              <AiOutlineDislike size="48" />}
              {decommendCounts}
            </div>
            <div className="itemIcon" onClick={handleChoose}>
              {choose === true ? <FcLike size="48" /> :
              <FcLikePlaceholder size="48" />}
              찜하기
            </div>
            <div className="itemIcon" onClick={handleFavorite}>
              {favorite ? <AiFillStar size="48" color="#167E6C" /> :
              <AiOutlineStar size="48"/>}
              나의 인생 작품
            </div>
          </DetailItem>
        </DetailContent>
        <ButtonForm to='/alltimechat'>실시간 채팅</ButtonForm>
      </DetailHeader>

        {/* 한 줄 평 작성 */}
      {movies && movies.comments.length !== null ? (
        <DetailCommentList>
        { movies && movies.comments.map(comment => (
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
        </InputDiv>
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
      </DetailCommentList>
      )}
    </DetailContainer>
  );
};

export default Detail;
