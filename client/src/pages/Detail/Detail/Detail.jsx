import * as S from "./styled";
import {
  AiTwotoneLike,
  AiTwotoneDislike,
  AiFillStar,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineStar,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { ButtonForm } from "../../../components/item/Button/styled";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Comment from "../Comment/Comment";
import axios from "axios";
import { useCustomQuery } from "../../../components/util/useCustomQuery";
import { toast } from "react-toastify";
import Error from "../../../components/Error/Error";
import Loading from "../../../components/Loading/Loading";
import { useCustomMutation } from "../../../components/util/useMutation";

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

  const memberId = localStorage.getItem("memberId");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
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
        });
    } else {
      setLoading(false);
    }
  }, []);


  const { data, isLoading, error, refetch } = useCustomQuery(
    `/contents/${contentId}`,
    `contents=${contentId}`
  );

//   const { mutate } = useCustomMutation(`/contents/${contentId}/recommend`,`contents=${contentId}`, "POST", {
//     onMutate:(value) => {
//       console.log(value)
//     },
//     onSuccess:(data, variables, context) => {
//       console.log('onsuccess',data, variables, context)
//       if (deprecate) {
//         setDeprecate(!deprecate);
//       }
//       setRecommend(!recommend);
//       refetch();
//     },
//     onError : (err) => {
//       console.log(err)
//     }
    
//   })
//   const handleRecommend = () => {
//     mutate({})
// }

  if (error) return <Error/>;
  if (isLoading) return <Loading />;
  if (loading) return <Loading />;
  const movies = data.data;

  // data
  const otts = data.ottList;

  //??????
  const handleRecommend = async () => {
    if (!isLogin) return navigate("/login");
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
      })
      .catch((err) => {
        console.log(err);
      });
  };


  //?????????
  const handleDecommend = async () => {
    if (!isLogin) return navigate("/login");
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
        // toast.success("???????????? ?????????????????????");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //?????????
  const handleChoose = async () => {
    if (!isLogin) return navigate("/login");
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

  //?????????
  const handleFavorite = () => {
    if (!isLogin) return navigate("/login");
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
        // toast.success("??????????????? ?????????????????????");
      })
      .catch((err) => {
        toast.error("??????????????? 3?????? ????????? ???????????????");
        console.log(err);
      });
  };
  

  const onClick = (e) => {
    
    setIsHide(!isHide);
    // console.log(contentRef.current)
    // ????????? ????????? ??? ????????????
    isHide
      ? contentRef.current.classList.remove("show")
      : contentRef.current.classList.add("show");

    // ????????? ????????? ????????????
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
              {/* TODO : ?????? ?????? title : ??? ?????? ????????? ????????? ?????? ?????? */}
              <div className="title">{movies && movies.contentTitle}</div>
              <div className="content">
                ????????? : {movies && movies.contentOpenAt}
              </div>
              <div className="content">
                ?????? : {movies && movies.contentScore}
              </div>
              <div className="content">
                ?????? : {movies && movies.contentGenre}
              </div>
              <S.Ellipsis ref={contentRef}>
                ???????????? : {movies && movies.contentBody}
              </S.Ellipsis>
                <S.Button onClick={onClick}>
                  {isHide ? "[?????????]" : "...[?????????]"}
                </S.Button>
            </div>
          </>
          <S.DetailItem>
            {/*????????? ??????*/}
            <div className="itemIcon" onClick={handleRecommend}>
              {recommend ? (
                <AiTwotoneLike size="48" color="#4BA6B2" />
              ) : (
                <AiOutlineLike size="48" />
              )}
              <div className="itemIconText recommend">{movies.recommendCount}</div>
            </div>
            <div className="itemIcon" onClick={handleDecommend}>
              {deprecate ? (
                <AiTwotoneDislike size="48" color="#4BA6B2" />
              ) : (
                <AiOutlineDislike size="48" />
              )}
              <div div className="itemIconText deprecate">
                {movies.deprecateCount}
              </div>
            </div>
            <div className="itemIcon" onClick={handleChoose}>
              {choice ? (
                <AiFillHeart size="48" color="red" />
              ) : (
                <AiOutlineHeart size="48" />
              )}
              <div div className="itemIconText choice">
                {movies.choiceCount}
              </div>
            </div>
            <div className="itemIcon" onClick={handleFavorite}>
              {favorite ? (
                <AiFillStar size="48" color="#4BA6B2" />
              ) : (
                <AiOutlineStar size="48" />
              )}
              <div className="itemIconText best">
                {movies.favoriteCount}
              </div>
            </div>
          </S.DetailItem>
        </S.DetailContent>
        {isLogin ? (
          <ButtonForm to="/alltimechat">?????????</ButtonForm>
        ) : (
          <ButtonForm to="/login">?????????</ButtonForm>
        )}
      </S.DetailHeader>
      <S.OttList>
        <h2>?????? ?????? ?????? OTT</h2>
      </S.OttList>
      <S.OttList>
        {otts.map((otts) => {
          return (
            <>
              {otts === "??????" ? (
                <a href="https://www.tving.com/">
                  <img src="/assets/tving.png" alt="?????????" />
                </a>
              ) : null}
              {otts === "????????????" ? (
                <a href="https://www.netflix.com/">
                  <img src="/assets/netflix.png" alt="?????????" />
                </a>
              ) : null}
              {otts === "??????" ? (
                <a href="https://watcha.com/">
                  <img src="/assets/watcha.png" alt="?????????" />
                </a>
              ) : null}
              {otts === "?????????" ? (
                <a href="https://www.wavve.com/">
                  <img src="/assets/wavve.png" alt="?????????" />
                </a>
              ) : null}
            </>
          );
        })}
      </S.OttList>
      <Comment refetch={refetch}/>
    </S.DetailContainer>
  );
};

export default Detail;
