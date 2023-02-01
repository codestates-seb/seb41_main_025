import React, { useState, useEffect } from "react";
import * as S from "./styled";
import { MainWarp } from "../../Main/styled";
import { Title } from "../../EstimateList/FavoriteMovie/styled";
import axios from "axios";
import SeleteItem from "../../../components/item/SelectItem/SeleteItem"
import Empty from "../../../components/Empty/Empty";
import { useCustomQuery } from "../../../components/util/useCustomQuery";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error/Error"

const Choose = () => {
  const memberId = localStorage.getItem("memberId");
  const [nickName, setNickName] = useState("");

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
    `/members/${memberId}/choice`,
    `memberId=${memberId}/choice`
  );

    if (isLoading) return <Loading />;
    if (error) return <Error/>

  const choiceMovieList = data.data;

  return (
    <MainWarp>
        <S.MainContainer>
            <Title>
                <span className="title">"{nickName}"님의 찜한 목록</span>
            </Title>
            {choiceMovieList && choiceMovieList.length === 0 ? <Empty/> : (
              <S.Items>
              {choiceMovieList && choiceMovieList.map((choice) => {
                return (
                  <SeleteItem key={choice.choiceId}
                  dataId = {choice.choiceId}
                  Poster = {choice.contentResponseMinDto.contentPoster}
                  Id = {choice.contentResponseMinDto.contentId}
                  Score={choice.contentResponseMinDto.contentScore}
                  Title= {choice.contentResponseMinDto.contentTitle}
                  refetch= {refetch}
                  />
                  )
                })}
              </S.Items>
              )}
        </S.MainContainer>
    </MainWarp>
)
};
export default Choose;
