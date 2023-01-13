import React from "react";
import styled from "styled-components";
import { AiTwotoneLike, AiTwotoneDislike, AiFillStar, AiOutlineLike, AiOutlineDislike, AiOutlineStar } from "react-icons/ai";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { ButtonForm } from "../../components/item/Button";
import { useParams } from "react-router-dom";
import useFetch from "../../components/util/useFetch";
import { useState } from "react";
import Comment from "./Comment";

const DetailContainer = styled.div`
  /* width: 1440px; */
  height: 1800px;
  margin-bottom: 30px;
  padding: 60px 60px 0px;
  margin: 0 auto;
  @media only screen and (max-width: ${'600px'}) {
    display: grid;
    
  }
`;
const DetailHeader = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 40px 0px;
  @media only screen and (max-width: ${'600px'}) {
    display: grid;
    height: 0;
    }
  .posterWrap {
    width: 240px;
    height: 346px;
    border-radius: 10px;
    background-size: contain;
  }
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


const Detail = () => {

  const {contentId} = useParams()
  // console.log(params.data)

  const request = {
    method : "get",
    headers : {"Content-Type" : "application/json"}
  }

  const [movies] = useFetch(`http://whatu1.kro.kr:8080/contents/${contentId}`,request)
  const [recommend] = useFetch(`http://whatu1.kro.kr:8080/contents/1/recommend`,request)
  console.log(recommend)

  const [recommendConts, setRecommend] = useState(movies.recommend)
  const [recommendCounts, setRecommendCounts] = useState(movies && movies.recommendCounts)
  // console.log(typeof(Number(recommendCounts)))
  const [decommend, setDecommend] = useState (false)
  const [decommendCounts, setDecommendCounts] = useState (movies && movies.deprecateCount)
  // console.log(typeof(decommendCounts))
  const [contentOttRanks, setContentOttRank] = useState (movies && movies.contentOttRank)
  // console.log(typeof(contentOttRanks))
  const [favorite, setFavorite] = useState(movies && movies.favorite)
  const [choose, setChoose] = useState(false)

  // console.log(movies.contentId)
  // console.log(movies.recommendCount)
  // console.log(recommendCounts)

  const handleRecommend = () => {
      setRecommend(!recommend)
      setRecommendCounts(recommend === true ? recommendCounts + 1 : recommendCounts)
      // FIXME : recommendCounts 가 number 로 따로 변환해 줘야 함
    }
    
  const handleDecommend = () => {
    setDecommend(!decommend)
    setDecommendCounts(decommend === true ? Number(decommendCounts) + 1 : decommendCounts)
  }
  const handleFavorite = () => {
       const updateRequest = {
        method : "POST",
        body : JSON.stringify({...favorite,choiceSelected : !favorite}),
        headers: {
          "Content-Type": 'application/json',
          // "Authorization": localStorage.getItem("accessToken"),
          // "Refresh": localStorage.getItem("refreshToken")
        }
      }
      fetch(`http://whatu1.kro.kr:8080/contents/${contentId}/choice`, updateRequest)
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
              {movies.recommendCount}
            </div>
            <div className="itemIcon" onClick={handleDecommend}>
              {decommend === true ? <AiTwotoneDislike size="48" color="#58BFAD" /> : 
              <AiOutlineDislike size="48" />}
              {movies.deprecateCount}
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
      <Comment/>
    </DetailContainer>
  
  );
};

export default Detail;
