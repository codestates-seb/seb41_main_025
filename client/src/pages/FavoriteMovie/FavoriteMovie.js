import * as S from "./styled";
// import GreenButton from "../components/item/Button";
import SeleteItem from "../../components/item/SelectItem/SeleteItem";
import { MainWarp, MainContainer} from "../Main/styled"
// import useFetch from "../../components/util/useFetch";
import axios from "axios";
import { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const FavoriteMovie = (props) =>{

  
  const memberId = localStorage.getItem("memberId");
  const [nickName, setNickName] = useState("")
  const [favoriteContent, setFavoriteContent] = useState([]);

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

  // const request = {
  //   method : "get",
  //   headers : {
  //     "Content-Type" : "application/json",
  //     "AutHorization" : localStorage.getItem("accessToken")}
  // }
  // const [favorite] = useFetch(`http://whatu1.kro.kr:8080/members/${memberId}`,request)
  // console.log(favorite)
  useEffect(() => {
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
        // console.log(nickName)
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);

    console.log(favoriteContent)
    return (
        <MainWarp>
            <MainContainer>
                <S.Title>
                    <span className="title">"{nickName}"님의 인생작품</span>
                    {/* 만약 Item 길이가 3개가 아니라면 검색 창 뜨게하기 */}
                    {favoriteContent.length !== 3 ? (
                      <S.FavoriteSearch>
                        {/* TODO : POST */}
                        <input 
                          type="text"
                          placeholder="검색을 통해 인생 작품 BEST 3를 선택해주세요 :)"
                          value={searchMovie}
                          onChange={onChange}
                          onKeyPress={onKeyPressEnter}
                          ></input>
                      </S.FavoriteSearch>) : null}
                </S.Title>
                    {/*TODO: 인생 영화 값이 true인 것들을 filter 해서 뿌려주기 */}
                <S.Items>
                  {favoriteContent && favoriteContent.map((favorite) => {
                    console.log(favorite.contentResponseMinDto.contentTitle)
                    return (
                    // <Link to = {`/contents/${favorite.contentResponseMinDto.contentId}`} key={favorite.contentResponseMinDto.contentId}>
                    <SeleteItem 
                      Poster = {favorite.contentResponseMinDto.contentPoster}
                      Id = {favorite.contentResponseMinDto.contentId}
                      Score={favorite.contentResponseMinDto.contentScore}
                      Title= {favorite.contentResponseMinDto.contentTitle}
                      />
                    // </Link>
                    )
                  })}
                  
                </S.Items>

            </MainContainer>
        </MainWarp>
    )
};

export default FavoriteMovie;
