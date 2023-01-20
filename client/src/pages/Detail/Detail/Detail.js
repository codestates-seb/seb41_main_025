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
import { useParams, useLocation } from "react-router-dom";
import useFetch from "../../../components/util/useFetch";
import { useState, useEffect } from "react";
import Comment from "../Comment/Comment";
import axios from "axios";

const Detail = () => {
  const { contentId } = useParams();

  const request = {
    method: "get",
    headers: { "Content-Type": "application/json" },
  };

  const [movies] = useFetch(
    `http://whatu1.kro.kr:8080/contents/${contentId}`,
    request
  );

  const [isrecommend, setIsRecommend] = useState(false);
  const [isrecommendId, setIsRecommendId] = useState();
  // console.log(isrecommendId)
  const [recommendCounts, setRecommendCounts] = useState();

  const [isdeprecate, setIsDeprecate] = useState("");
  const [deprecateCounts, setDeprecateCounts] = useState();

  const [ischoice, setIsChoice] = useState("");
  const [isFavorite, setIsFavorite] = useState("");

  //추천
  const handleRecommend = async () => {
    await axios
      .post(
        `http://whatu1.kro.kr:8080/contents/${contentId}/recommend`,
        JSON.stringify({}),
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setIsRecommend(res.data.data.recommendSelected);
        setRecommendCounts(res.data.data.recommendCount + 1);
        setIsRecommendId(res.data.data.recommendId);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //비추천
  const handleDecommend = async () => {
    await axios
      .post(
        `http://whatu1.kro.kr:8080/contents/${contentId}/deprecate`,
        JSON.stringify({}),
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setIsDeprecate(res.data.data.deprecateSelected);
        setDeprecateCounts(res.data.data.deprecateCount + 1);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //찜하기
  const handleChoose = async () => {
    await axios
      .post(
        `http://whatu1.kro.kr:8080/contents/${contentId}/choice`,
        JSON.stringify({}),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setIsChoice(res.data.data.choiceSelected);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //인생작
  const handleFavorite = () => {
    axios
      .post(
        `http://whatu1.kro.kr:8080/contents/${contentId}/favorite`,
        JSON.stringify({}),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        setIsFavorite(res.data.data.favoriteSelected);
        console.log(res.data.data.favoriteSelected)
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //* url에 있는 contentid 값을 가져와서 각각의 get 요청 보냈을 때 selected true 만 나오니깐
  //* get 요청의 응답 값 중에 해당 contentid가 있는지 판단 -> 있으면 true, 없으면 false

  const locationHook = useLocation();

  const [currentLastUrl, setCurrentLastUrl] = useState(null);
  const [location, setLocation] = useState({}); // 현재 페이지의 contentid 값을 경로로 선언

  useEffect(() => {
      const splitUrl = locationHook?.pathname?.split('/') ?? null;
      const loca =
          splitUrl?.length > 1 ? splitUrl[splitUrl.length - 1] : null;
      setCurrentLastUrl(loca);
      setLocation(Number(loca)) // 생성
      // console.log(loca)
  }, [locationHook]);

  // console.log(loca); 
  
  
  //좋아요
  const memberId = localStorage.getItem("memberId");
  const [recommend, setRecommend] = useState([]);

  //*recommend
  useEffect(() => {
    axios
      .get(`http://whatu1.kro.kr:8080/members/${memberId}/recommend`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          AutHorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setRecommend(res.data.data);
        // console.log(res.data.data);
    
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(recommend);

  const recommendRes = recommend.some((id) => id.contentId === location)
  // console.log(recommendRes);   

  // *deprecate
  const [deprecate, setDeprecate] = useState([]);

  useEffect(() => {
    axios
      .get(`http://whatu1.kro.kr:8080/members/${memberId}/deprecate`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          AutHorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setDeprecate(res.data.data);
        // console.log(res.data.data);
    
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deprecateRes = deprecate.some((id) => id.contentId === location)
  // console.log(deprecateRes);   

    //*choice
    const [choice, setChoice] = useState([]);

    useEffect(() => {
      axios
        .get(`http://whatu1.kro.kr:8080/members/${memberId}/choice`, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "application/json",
            AutHorization: localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          setChoice(res.data.data);
          // console.log(res.data.data);
      
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);
  
    const choiceRes = choice.some((id) => id.contentId === location)
    // console.log(choiceRes);  


  //*FAVORITE
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    axios
      .get(`http://whatu1.kro.kr:8080/members/${memberId}/favorite`, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          AutHorization: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setFavorite(res.data.data);
        // console.log(res.data.data);
    
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const favoriteRes = favorite.some((id) => id.contentId === location)
  // console.log(favoriteRes);   





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
          <S.DetailItem>
            {/*아이콘 박스*/}
            <div className="itemIcon" onClick={handleRecommend}>
              {recommendRes === true ? (
                <AiTwotoneLike size="48" color="#58BFAD" />
              ) : (
                <AiOutlineLike size="48" />
              )}
              {movies.recommendCount}
            </div>
            <div className="itemIcon" onClick={handleDecommend}>
              {deprecateRes === true ? (
                <AiTwotoneDislike size="48" color="#58BFAD" />
              ) : (
                <AiOutlineDislike size="48" />
              )}
              {movies.deprecateCount}
            </div>
            <div className="itemIcon" onClick={handleChoose}>
              {choiceRes === true ? (
                <FcLike size="48" />
              ) : (
                <FcLikePlaceholder size="48" />
              )}
              찜하기
            </div>
            <div className="itemIcon" onClick={handleFavorite}>
              {favoriteRes ? (
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
