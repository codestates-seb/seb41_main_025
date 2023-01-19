import React from "react";
import * as S from "./styled";
import {
  AiTwotoneLike,
  AiTwotoneDislike,
  AiFillStar,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineStar,
} from "react-icons/ai";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { ButtonForm } from "../../../components/item/Button/styled";
import { useParams } from "react-router-dom";
import useFetch from "../../../components/util/useFetch";
import { useState, useEffect } from "react";
import Comment from "../Comment/Comment";
import axios from "axios";


const Detail = () => {

  const {contentId} = useParams()

  const request = {
    method: "get",
    headers: { "Content-Type": "application/json" },
  };

  const [movies] = useFetch(`http://whatu1.kro.kr:8080/contents/${contentId}`,request)


  const [isrecommend, setIsRecommend] = useState([
    {
      recommendId: 0,
      memberId: 0,
      contentId: 0,
      recommendSelected : false,
      recommendCount: 0,
      createdAt: ""
  }
  ])
  const [isrecommendId, setIsRecommendId] = useState()
  console.log(isrecommendId)
  const [recommendCounts, setRecommendCounts] = useState()
  
  const [isdeprecate, setIsDeprecate] = useState('')
  const [deprecateCounts, setDeprecateCounts] = useState()
  
  const [ischoice, setIsChoice] = useState('')
  const [isFavorite, setIsFavorite] = useState('')


  //추천
  const handleRecommend = async () => {
    await axios.post(`http://whatu1.kro.kr:8080/contents/${contentId}/recommend`,JSON.stringify({}),
      {
      headers: {
        Authorization : localStorage.getItem("accessToken")
      }
    })
      .then ((res) => {
        setIsRecommend(res.data.data.recommendSelected)
        setRecommendCounts(res.data.data.recommendCount + 1)
        setIsRecommendId(res.data.data.recommendId)
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
      axios.get(`http://whatu1.kro.kr:8080/recommend/${isrecommendId}`,
      {
      headers: {
        Authorization : localStorage.getItem("accessToken")
      }
    })
      .then ((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  
  //비추천
  const handleDecommend = async () => {
    await axios.post(`http://whatu1.kro.kr:8080/contents/${contentId}/deprecate`,JSON.stringify({}),
      {
      headers: {
        "Authorization": localStorage.getItem("accessToken"),
      }
      })
      .then ((res) => {
        setIsDeprecate(res.data.data.deprecateSelected)
        setDeprecateCounts(res.data.data.deprecateCount + 1)
      })
      .catch((err) => {
        console.log(err);
      });       
  };
          
  //찜하기
  const handleChoose = async () => {
    await axios.post(`http://whatu1.kro.kr:8080/contents/${contentId}/choice`,JSON.stringify({}),
      {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": localStorage.getItem("accessToken")
        }
      })
      .then ((res) => {
        setIsChoice(res.data.data.choiceSelected)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //인생작
  const handleFavorite = () => {
    axios.post(`http://whatu1.kro.kr:8080/contents/${contentId}/favorite`,JSON.stringify({}),
      {
      headers: {
        "Content-Type": 'application/json',
        "Authorization": localStorage.getItem("accessToken"),
      }
      })
      .then ((res) => {
        setIsFavorite(res.data.data.favoriteSelected)
      })
      .catch((err) => {
        console.log(err);
      });
    }
    // FIXME : recommendCounts 가 number 로 따로 변환해 줘야 함         
          
    let isLogin = localStorage.getItem("isLogin");

  return (
    <S.DetailContainer>
      <S.DetailHeader>
        <img
          className="posterWrap"
          src={movies && movies.contentPoster}
          alt="moviePoster"
        ></img>
        <S.DetailContent>
          <>
            <div className="contents">
              <div className="title">{movies && movies.contentTitle}</div>
              <div className="content">
                공개일 : {movies && movies.contentOpenAt}
              </div>
              <div className="content">
                평점 : {movies && movies.contentScore}
              </div>
              <div className="content">
                장르 : {movies && movies.contentGenre}
              </div>
              <div className="content">
                영화설명 : {movies && movies.contentBody}
              </div>
            </div>
          </>
          {isLogin? (
          <S.DetailItem>
            {/*아이콘 박스*/}
            <div className="itemIcon" onClick={handleRecommend}>
              {isrecommend === true ? <AiTwotoneLike size="48" color="#58BFAD" /> : 
              <AiOutlineLike size="48" />}
              {movies.recommendCount}
            </div>
            <div className="itemIcon" onClick={handleDecommend}>
              {isdeprecate === true ? <AiTwotoneDislike size="48" color="#58BFAD" /> : 
              <AiOutlineDislike size="48" />}
              {movies.deprecateCount}
            </div>
            <div className="itemIcon" onClick={handleChoose}>
              {ischoice === true ? (
                <FcLike size="48" />
              ) : (
                <FcLikePlaceholder size="48" />
              )}
              찜하기
            </div>
            <div className="itemIcon" onClick={handleFavorite}>
              {isFavorite ? (
                <AiFillStar size="48" color="#167E6C" />
              ) : (
                <AiOutlineStar size="48" />
              )}
              나의 인생 작품
            </div>
          </S.DetailItem>) : null }
        </S.DetailContent>
        <ButtonForm to="/alltimechat">실시간 채팅</ButtonForm>
      </S.DetailHeader>
      <Comment />
    </S.DetailContainer>
  );
};

export default Detail;
