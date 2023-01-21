import React, { useState, useEffect } from "react";
import * as S from "./styled";
import { MainWarp, MainContainer } from "../Main/styled";
import { Title } from "../FavoriteMovie/styled";
import axios from "axios";
import { Link } from "react-router-dom";
import SeleteItem from "../../components/item/SelectItem/SeleteItem"

const Choose = () => {
  const memberId = localStorage.getItem("memberId");
  const [nickName, setNickName] = useState("");
  const [choice, setChoice] = useState([]);

  //Choice
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
      setChoice(res.data.data)
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

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

  return (
    <MainWarp>
        <MainContainer>
            <Title>
                <span className="title">"{nickName}"님의 찜한 목록</span>
            </Title>
            <S.Items>
              {choice && choice.map((choice) => {
                console.log(choice.contentResponseMinDto.contentTitle)
                return (
                <Link to = {`/contents/${choice.contentResponseMinDto.contentId}`} key={choice.contentResponseMinDto.contentId}>
                <SeleteItem 
                  favoritePoster = {choice.contentResponseMinDto.contentPoster}
                  favoriteId = {choice.contentResponseMinDto.contentId}
                  favoriteScore={choice.contentResponseMinDto.contentScore}
                  favoriteTitle= {choice.contentResponseMinDto.contentTitle}
                  />
                </Link>
                )
              })}
              
            </S.Items>

        </MainContainer>
    </MainWarp>
)
};
export default Choose;
