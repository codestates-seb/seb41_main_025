import * as S from "./styled";
import {
  AiTwotoneLike,
  AiTwotoneDislike,
  AiFillStar,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineStar,
  AiOutlineHeart,
  AiFillHeart
} from "react-icons/ai";
import { ButtonForm } from "../../../components/item/Button/styled";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Comment from "../Comment/Comment";
import axios from "axios";
import { useCustomQuery } from "../../../components/util/useCustomQuery";
import { toast } from "react-toastify";

const apiCall = async (url) => {
  return await axios
    .get(`http://whatu1.kro.kr:8080${url}`, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        AutHorization: localStorage.getItem("accessToken"),
      },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      if (error) return false;
    });
};

const Detail = () => {

  const { contentId } = useParams();
  const navigate = useNavigate();

  const [deprecate, setDeprecate] = useState(false);
  const [recommend, setRecommend] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [choice, setChoice] = useState(false);
  const [loading, setLoading] = useState(true);
  let isLogin = localStorage.getItem("isLogin");
  const contentRef = useRef(null);
  const [isHide, setIsHide] = useState(false);
  console.log(isHide)

  const memberId = localStorage.getItem("memberId");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token){
      Promise.all([
        apiCall(`/members/${memberId}/recommend`),
        apiCall(`/members/${memberId}/deprecate`),
        apiCall(`/members/${memberId}/choice`),
        apiCall(`/members/${memberId}/favorite`),
      ])
      .then(([data1, data2, data3, data4]) => {
        const numContentId = parseInt(contentId);
        if (data1[0]) {
          if (data1.length > 0) {
            for (let i = 0; i < data1.length; i++) {
              if (data1[i].contentId === numContentId) setRecommend(true);
            }
          } else {
            setRecommend(data1[0].contentId === numContentId);
          }
        }
        if (data2[0]) {
          if (data2.length > 0) {
            for (let i = 0; i < data2.length; i++) {
              if (data2[i].contentId === numContentId) setDeprecate(true);
            }
          } else {
            setDeprecate(data2[0].contentId === numContentId);
          }
        }
        if (data3[0]) {
          if (data3.length > 0) {
            for (let i = 0; i < data3.length; i++) {
              if (data3[i].contentId === numContentId) setChoice(true);
            }
          } else {
            setChoice(data3[0].contentId === numContentId);
          }
        }
        if (data4[0]) {
          if (data4.length > 0) {
            for (let i = 0; i < data4.length; i++) {
              if (data4[i].contentId === numContentId) setFavorite(true);
            }
          } else {
            setFavorite(data4[0].contentId === numContentId);
          }
        }
      })
      .then(() => {
        setLoading(false);
      })
    } else{
        setLoading(false);
        }
  }, []);
  
  const { data, isLoading, error, refetch } = useCustomQuery(
    `/contents/${contentId}`,
    `contents=${contentId}`
  );

  // TODO: 로딩 컴포넌트
  if (isLoading) return <></>;
  if (loading) return <></>;
  // TODO: error 컴포넌트
  if (error) return <>error 발생</>;
  const movies = data.data;
  const ottlist = data.ottList;

  console.log(ottlist)

  //추천
  const handleRecommend = async () => {
    if(!isLogin) return navigate('/login')
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
      .then(() => {
        if (deprecate) {
          setDeprecate(!deprecate);
        }
        setRecommend(!recommend);
        refetch();
        // toast.success("추천이 완료되었습니다");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //비추천
  const handleDecommend = async () => {
    if(!isLogin) return navigate('/login')
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
      .then(() => {
        if (recommend) {
          setRecommend(!recommend);
        }
        setDeprecate(!deprecate);
        refetch();
        // toast.success("비추천이 완료되었습니다");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //찜하기
  const handleChoose = async () => {
    if(!isLogin) return navigate('/login')
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
      .then(() => {
        setChoice(!choice);
        refetch();
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //인생작
  const handleFavorite = () => {
    if(!isLogin) return navigate('/login')
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
      .then(() => {
        setFavorite(!favorite);
        refetch();
        // toast.success("인생작품에 추가되었습니다");
      })
      .catch((err) => {
        toast.error("인생작품은 3개만 선택이 가능합니다");
        console.log(err);
      });
    };
  
  const onClick = (e) => {
    setIsHide(!isHide);
    // 숨겨진 멘트가 다 출력된다
    isHide ? ( 
    contentRef.current.classList.remove("show") ) : (
    contentRef.current.classList.add("show") )  
   
    // 더보기 버튼이 숨겨진다
    // e.currentTarget.classList.add("show");
  };

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
              {/* TODO : 글씨 크기 title : 과 내용 크기를 다르게 주고 싶음 */}
              <div className="title">{movies && movies.contentTitle}</div>
              <div className="content">공개일 : {movies && movies.contentOpenAt}</div>
              {/* <div className="content">공개 OTT : </div> */}
              {console.log(movies)}
              <div className="content">평점 : {movies && movies.contentScore}</div>
              <div className="content">장르 : {movies && movies.contentGenre}</div>
              <S.Ellipsis ref={contentRef}>
                영화설명 : {movies && movies.contentBody}
                <S.Button onClick={onClick}>{isHide ? "[숨기기]": "...[더보기]" }</S.Button>
              </S.Ellipsis>
            </div>
          </>
          <S.DetailItem>
            {/*아이콘 박스*/}
            <div className="itemIcon" onClick={handleRecommend}>
              {recommend ? (
                <AiTwotoneLike size="48" color="#58BFAD" />
              ) : (
                <AiOutlineLike size="48" />
              )}
              {movies.recommendCount}
            </div>
            <div className="itemIcon" onClick={handleDecommend}>
              {deprecate ? (
                <AiTwotoneDislike size="48" color="#58BFAD" />
              ) : (
                <AiOutlineDislike size="48" />
              )}
              {movies.deprecateCount}
            </div>
            <div className="itemIcon" onClick={handleChoose}>
              {choice ? <AiFillHeart size="48" color="red"/> : <AiOutlineHeart size="48" />}
              찜하기
            </div>
            <div className="itemIcon" onClick={handleFavorite}>
              {favorite ? (
                <AiFillStar size="48" color="#167E6C" />
              ) : (
                <AiOutlineStar size="48" />
              )}
              인생 작품
              <span style={{"fontSize" : "12px"}}>BEST 3</span>
            </div>
          </S.DetailItem>
        </S.DetailContent>
        {isLogin ?
          (<ButtonForm to='/alltimechat'>게시판</ButtonForm>) : 
          (<ButtonForm to='/login'>게시판</ButtonForm>) } 
      </S.DetailHeader>
      <Comment />
    </S.DetailContainer>
  );
};

export default Detail;
