import React from "react";
import * as S from "./styled";
import { AiTwotoneLike, AiTwotoneDislike, AiFillStar, AiOutlineLike, AiOutlineDislike, AiOutlineStar } from "react-icons/ai";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { ButtonForm } from "../../../components/item/Button/styled";
import { useParams } from "react-router-dom";
import useFetch from "../../../components/util/useFetch";
import { useState } from "react";
import Comment from "../Comment/Comment";

const Detail = () => {

  const { id } = useParams()

  const request = {
    method : "get",
    headers : {"Content-Type" : "application/json"}
  }

  const [movies] = useFetch(`http://localhost:3000/contents/${id}`,request)

  const [recommend, setRecommend] = useState(movies.recommend)
  console.log(recommend)
  const [recommendCounts, setRecommendCounts] = useState(movies.recommendCounts)
  console.log(recommendCounts)
  const [decommend, setDecommend] = useState (false)
  const [decommendCounts, setDecommendCounts] = useState (movies && movies.decommendCount)
  const [favorite, setFavorite] = useState(movies && movies.favorite)
  const [choose, setChoose] = useState(false)



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
        method : "POST",
        body : JSON.stringify({...favorite,choiceSelected : !favorite}),
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


  return (
    <S.DetailContainer>
      <S.DetailHeader>
        <img className="posterWrap" src={movies && movies.contentPoster} alt='moviePoster'></img>
        <S.DetailContent>
            <>
                <div className="contents">
                  <div className="title">{movies && movies.contentTitle}</div>
                  <div className="comeout">{movies && movies.contentOpenAt}</div>
                  <div className="score">평점 {/* 평점 */}</div>
                  <div className="comments">영화설명 {movies && movies.contentBody}</div>
                </div>
            </>
          <S.DetailItem>
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
          </S.DetailItem>
        </S.DetailContent>
        <ButtonForm to='/alltimechat'>실시간 채팅</ButtonForm>
      </S.DetailHeader>
      <Comment/>
    </S.DetailContainer>
  
  );
};

export default Detail;
