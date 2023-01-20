import React, { useState, useEffect } from "react";
import * as S from "./styled";
import { MainWarp, MainContainer } from "../Main/styled";
import { Title } from "../FavoriteMovie/styled";
import { Details, DetailFont, MovieTitle } from "../../components/item/SelectItem/styled";
import axios from "axios";

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

  console.log(choice);
  
  
  //todo: contentid 값을 다 받아와서 새로운 배열을 생성하고 그걸로 다시  get 요청 보내기
  // const Id = choice.map(el => el.contentId)
  // console.log(Id);
  

 
  //   const [content, setContent] = useState([])


  //   //content
  //   useEffect(() => {
  //   axios
  //   .get(`http://whatu1.kro.kr:8080/contents/${Id}`, {
  //     headers: {
  //       "Content-Type": "application/json;charset=UTF-8",
  //       Accept: "application/json",
  //       AutHorization: localStorage.getItem("accessToken"),
  //     },
  //   })
  //   .then((res) => {
  //     setContent(res.data.data)
  //     // setNickName(res.data.data.nickName);
  //     console.log(setContent);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }, [Id]);

  // console.log(content);

  return (
    
    <MainWarp>
      <MainContainer>
        <Title>
          <span className="title">{nickName}님의 찜한 목록</span>
        </Title>
        {/*TODO: 인생 영화 값이 true인 것들을 filter 해서 뿌려주기 */}
        <S.Items>
          <img src="/assets/avatar2.jpeg" className="poster" alt="" />
          <S.Details>
            <S.DetailFont>
              <MovieTitle to="/Moviedetail">Avatar 2 : 물의 길</MovieTitle>
              <h3 className="movieTitle">미국, 2022</h3>
              <h4 className="movieTitle">평점 : 8.4</h4>
            </S.DetailFont>
            <S.DeleteBtn>X</S.DeleteBtn>
          </S.Details>
        </S.Items>
        {/* <ChangeBtn>
          <GreenButton name={"수정하기"}/>
        </ChangeBtn> */}
      </MainContainer>
    </MainWarp>
  );
};
export default Choose;
