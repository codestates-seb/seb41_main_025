import * as S from "./styled";
import { MainWarp, MainContainer } from "../Main/styled";
import { Items, Title } from "../FavoriteMovie/styled";
import SeleteItem from "../../components/item/SelectItem/SeleteItem" 
import { useState } from "react";
import axios from "axios";
import Deprecate from "./Deprecate/Deprecate";
import Recommend from "./Recommend/Recommend";


const RecommendMovies = () => {

    const memberId = localStorage.getItem("memberId");
    const [nickName, setNickName] = useState("")

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
        console.log(nickName)
      })
      .catch((error) => {
        console.log(error);
      });


    // const [state, SetState] = useState(true);
    // const moviecomment = comments.filter (comments => movies.contentId === comments.contentId)
    // const ButtonHandleClick = () => {
    //     SetState(!state);
    // }
    const [currentTab, setCurrentTab] = useState(0);

    const selectMenuHandler = (idx) => {
      setCurrentTab(idx);
      console.log(idx)
    };
  
    const tabList = [
      { name: "추천한 작품", content: <Recommend /> },
      { name: "비추천한 작품", content: <Deprecate /> },
    ];
  
    return (
        <MainWarp>
            <MainContainer>
                <Title style={{"marginBottom" : 0}}>
                    <S.RecommendDiv>
                        <S.TitleDiv>
                            <span className="title">"{nickName}"님이 <br/><br/></span>
                        </S.TitleDiv>
                        <S.ButtonDiv>
                        {tabList.map((el, idx) => (
                        <li
                            className={idx === currentTab ? "active" : ""}
                            onClick={() => selectMenuHandler(idx)}
                        >
                        {el.name}
                        </li>
                        ))}
                        </S.ButtonDiv>
                        <S.CommentItem>{tabList[currentTab].content}</S.CommentItem>
                    </S.RecommendDiv>
                </Title>
            </MainContainer>
        </MainWarp>
    )
};

export default RecommendMovies;