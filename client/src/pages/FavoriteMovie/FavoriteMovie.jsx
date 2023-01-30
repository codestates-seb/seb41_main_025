import * as S from "./styled";
import SeleteItem from "../../components/item/SelectItem/SeleteItem";
import axios from "axios";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Empty from "../Empty/Empty";

const FavoriteMovie = (props) =>{

  let isLogin = localStorage.getItem("isLogin");
  const memberId = localStorage.getItem("memberId");
  const [nickName, setNickName] = useState("")
  const [favoriteContent, setFavoriteContent] = useState([]);
  const navigate = useNavigate();

  //검색기능
  const Navigate = useNavigate();
  const [searchMovie, setSearchMovie] = useState("");

  const onChange = (e) => {
      setSearchMovie(e.currentTarget.value);
      // console.log(e.currentTarget.value)
  }
  const onKeyPressEnter = (e) => {
      if(e.key === "Enter") sendSerachResult();
  }
  const sendSerachResult = () => {
    console.log(props.getSearchResult)
      props.getSearchResult(searchMovie);
      Navigate('/searchResult')
  }

  useEffect(() => {
    if (!isLogin) return navigate("/error");
    axios
    .get(`http://whatu1.kro.kr:8080/members/${memberId}/favorite`,
    {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
        "AutHorization" : localStorage.getItem("accessToken"),
      },
    })
    .then((res) => {
      setFavoriteContent(res.data.data);
      // console.log(res.data.data)
    })
    .catch((error) => {
      console.log(error);
    });
  },[]);

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

    console.log(favoriteContent)
    return (
        <S.MainWarp>
            <S.MainContainer>
                <S.Title>
                    <span className="title">"{nickName}"님의 인생작품</span>
                    {/* 만약 Item 길이가 3개가 아니라면 검색 창 뜨게하기 */}
                    {favoriteContent.length !== 3 ? (
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
                {console.log(typeof(nickName))}
                  {favoriteContent.length === 0 ? <Empty/> : (
                    // FIXME : porps로 nickname을 내려주면 오류 발생
                  <S.Items>
                  {favoriteContent && favoriteContent.map((favorite) => {
                    console.log(favorite.contentResponseMinDto.contentTitle)
                    return (
                      <SeleteItem 
                      dataId = {favorite.favoriteId}
                      Poster = {favorite.contentResponseMinDto.contentPoster}
                      Id = {favorite.contentResponseMinDto.contentId}
                      Score={favorite.contentResponseMinDto.contentScore}
                      Title= {favorite.contentResponseMinDto.contentTitle}
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
