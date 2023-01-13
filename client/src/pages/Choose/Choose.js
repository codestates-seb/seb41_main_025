import React from "react";
import * as S from "./styled";
import { MainWarp, MainContainer } from "../Main/styled";
import { Title } from "../FavoriteMovie/styled";

const Choose = () => {
  return (
    <MainWarp>
      <MainContainer>
        <Title>
          <span className="title">00님의 찜한 목록</span>
          {/* <Item/>
                    TODO : 만약 길이가 3개가 아니라면 검색 창 뜨게하기 */}
        </Title>
        {/*TODO: 인생 영화 값이 true인 것들을 filter 해서 뿌려주기 */}
        <S.Items>
          <S.Item>
            <img src="/assets/avatar2.jpeg" className="poster" alt="" />
            <S.Details>
              <S.DetailFont>
                <h2 className="movieTitle">Avatar 2 : 물의 길</h2>
                <h3 className="movieTitle">미국, 2022</h3>
                <h4 className="movieTitle">평점 : 8.4</h4>
              </S.DetailFont>
              <S.DeleteBtn>X</S.DeleteBtn>
            </S.Details>
          </S.Item>
          <S.Item>
            <img src="/assets/avatar2.jpeg" className="poster" alt="" />
            <S.Details>
              <S.DetailFont>
                <h2 className="movieTitle">영화 제목</h2>
                <h3 className="movieTitle">국가, 개봉년도</h3>
                <h4 className="movieTitle">평점</h4>
              </S.DetailFont>
              <S.DeleteBtn>X</S.DeleteBtn>
            </S.Details>
          </S.Item>
          <S.Item>
            <img src="/assets/avatar2.jpeg" className="poster" alt="" />
            <S.Details>
              <S.DetailFont>
                <h2 className="movieTitle">영화 제목</h2>
                <h3 className="movieTitle">국가, 개봉년도</h3>
                <h4 className="movieTitle">평점</h4>
              </S.DetailFont>
              <S.DeleteBtn>X</S.DeleteBtn>
            </S.Details>
          </S.Item>
        </S.Items>
        {/* <ChangeBtn>
          <GreenButton name={"수정하기"}/>
        </ChangeBtn> */}
      </MainContainer>
    </MainWarp>
  );
};
export default Choose;
