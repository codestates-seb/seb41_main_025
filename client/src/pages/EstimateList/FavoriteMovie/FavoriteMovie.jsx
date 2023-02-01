import * as S from "./styled";
import SeleteItem from "../../../components/item/SelectItem/SeleteItem";
import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Empty from "../../../components/Empty/Empty";
import { useCustomQuery } from "../../../components/util/useCustomQuery";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error/Error"


const FavoriteMovie = (props) =>{

  const memberId = localStorage.getItem("memberId");
  const [nickName, setNickName] = useState("")

  //검색기능
  const Navigate = useNavigate();
  const [searchMovie, setSearchMovie] = useState("");

  const onChange = (e) => {
      setSearchMovie(e.currentTarget.value);
  }
  const onKeyPressEnter = (e) => {
      if(e.key === "Enter") sendSerachResult();
  }
  const sendSerachResult = () => {
      props.getSearchResult(searchMovie);
      Navigate('/searchResult')
  }

  // useEffect(() => {
  //   if (!isLogin) return navigate("/error");
  //   axios
  //   .get(`http://whatu1.kro.kr:8080/members/${memberId}/favorite`,
  //   {
  //     headers: {
  //       "Content-Type": "application/json;charset=UTF-8",
  //       Accept: "application/json",
  //       "AutHorization" : localStorage.getItem("accessToken"),
  //     },
  //   })
  //   .then((res) => {
  //     setFavoriteContent(res.data.data);
  //     // console.log(res.data.data)
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // },[]);

  useEffect(() => {
    axios
      .get(`http://whatu1.kro.kr:8080/members/${memberId}`,
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          "AutHorization" : localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        setNickName(res.data.data.nickName);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

    const { data, isLoading, error, refetch } = useCustomQuery(
      `/members/${memberId}/favorite`,
      `memberId=${memberId}/favorite`
    );
  
    if (isLoading) return <Loading />;
    if (error) return <Error/>;
    
    const favoriteMovieList = data.data;


    return (
        <S.MainWarp>
            <S.MainContainer>
                <S.Title>
                    <span className="title">"{nickName}"님의 인생작품</span>
                    {/* 만약 Item 길이가 3개가 아니라면 검색 창 뜨게하기 */}
                    {favoriteMovieList.length !== 3 ? (
                      <S.FavoriteSearch>
                        <input 
                          type="text"
                          placeholder="검색을 통해 인생 작품 BEST 3를 선택해주세요 :)"
                          value={searchMovie}
                          onChange={onChange}
                          onKeyPress={onKeyPressEnter}
                          ></input>
                      </S.FavoriteSearch>) : null}
                </S.Title>
                  {favoriteMovieList.length === 0 ? <Empty/> : (

                  <S.Items>
                  {favoriteMovieList && favoriteMovieList.map((favorite) => {
  
                    return (
                      <SeleteItem 
                      dataId = {favorite.favoriteId}
                      Poster = {favorite.contentResponseMinDto.contentPoster}
                      Id = {favorite.contentResponseMinDto.contentId}
                      Score={favorite.contentResponseMinDto.contentScore}
                      Title= {favorite.contentResponseMinDto.contentTitle}
                      refetch= {refetch}
                      />
                      )
                    })}
                  </S.Items>
                  )}

            </S.MainContainer>
        </S.MainWarp>
    )
};

export default FavoriteMovie;
