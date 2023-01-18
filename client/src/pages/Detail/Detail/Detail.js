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
  const { contentId } = useParams();
  const { deprecateId } = useParams();
  // console.log(params.data)

  const request = {
    method: "get",
    headers: { "Content-Type": "application/json" },
  };

  const [movies] = useFetch(
    `http://whatu1.kro.kr:8080/contents/${contentId}`,
    request
  );

  // const [recommend] = useFetch(`http://whatu1.kro.kr:8080/recommend/${deprecateId}`,request)
  // console.log(recommend)

  const [recommendConts, setRecommend] = useState(movies.recommend);
  const [recommendCounts, setRecommendCounts] = useState(
    movies && movies.recommendCounts
  );
  // console.log(typeof(Number(recommendCounts)))
  const [decommend, setDecommend] = useState(false);
  const [decommendCounts, setDecommendCounts] = useState(
    movies && movies.deprecateCount
  );
  // console.log(typeof(decommendCounts))
  const [contentOttRanks, setContentOttRank] = useState(
    movies && movies.contentOttRank
  );
  // console.log(typeof(contentOttRanks))
  const [favorite, setFavorite] = useState(movies && movies.favorite);
  const [choose, setChoose] = useState(false);

  // console.log(movies.contentId)
  // console.log(movies.recommendCount)
  // console.log(recommendCounts)

  // const handleRecommend = () => {
  //     setRecommend(!recommend)
  //     setRecommendCounts(recommend === true ? recommendCounts + 1 : recommendCounts)
  //     // FIXME : recommendCounts 가 number 로 따로 변환해 줘야 함
  //   }

  const handleDecommend = () => {
    setDecommend(!decommend);
    setDecommendCounts(
      decommend === true ? Number(decommendCounts) + 1 : decommendCounts
    );
  };
  const handleFavorite = () => {
    const updateRequest = {
      method: "POST",
      body: JSON.stringify({ ...favorite, choiceSelected: !favorite }),
      headers: {
        "Content-Type": "application/json",
        // "Authorization": localStorage.getItem("accessToken"),
        // "Refresh": localStorage.getItem("refreshToken")
      },
    };
    fetch(
      `http://whatu1.kro.kr:8080/contents/${contentId}/choice`,
      updateRequest
    )
      .then(() => {
        setFavorite(!favorite);
        console.log(movies.favorite.choiceSelected);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChoose = () => {
    setChoose(!choose);
  };

  // post

  const [data, setData] = useState([]);

  const token = localStorage.getItem("accessToken");
  // console.log(token);

  useEffect(() => {
    axios
      .post(
        `http://whatu1.kro.kr:8080/contents/${contentId}/recommend`,
        // { withCredentials: true },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console(res);
        setData(res);

        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          <S.DetailItem>
            {/*아이콘 박스*/}
            <div className="itemIcon">
              <AiTwotoneLike size="48" color="#58BFAD" />
              <AiOutlineLike size="48" />
              {movies.recommendCount}
            </div>
            <div className="itemIcon" onClick={handleDecommend}>
              {decommend === true ? (
                <AiTwotoneDislike size="48" color="#58BFAD" />
              ) : (
                <AiOutlineDislike size="48" />
              )}
              {movies.deprecateCount}
            </div>
            <div className="itemIcon" onClick={handleChoose}>
              {choose === true ? (
                <FcLike size="48" />
              ) : (
                <FcLikePlaceholder size="48" />
              )}
              찜하기
            </div>
            <div className="itemIcon" onClick={handleFavorite}>
              {favorite ? (
                <AiFillStar size="48" color="#167E6C" />
              ) : (
                <AiOutlineStar size="48" />
              )}
              나의 인생 작품
            </div>
          </S.DetailItem>
        </S.DetailContent>
        <ButtonForm to="/alltimechat">실시간 채팅</ButtonForm>
      </S.DetailHeader>
      <Comment />
    </S.DetailContainer>
  );
};

export default Detail;
