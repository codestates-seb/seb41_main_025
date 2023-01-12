import React from "react";
import styled from "styled-components";
import { MainWarp, MainContainer } from "./Main/Main";
import { Title } from "./FavoriteMovie";

const Items = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px;
  @media only screen and (max-width: ${'600px'}) {
    width: 100%;
    height: 100%;
    display: grid;
  } 
`;

// const Title = styled(MainContainer)`
//   width: 500px;
//   height: 100px;
//   margin: 100px; 
//   .title {
//     font-size: 30px;
//     text-decoration: underline #167e6c;
//     text-decoration-thickness: 4px;
//     text-underline-offset: 20px;
//     @media only screen and (max-width: ${'600px'}) {
//       font-size: 25px;
//     }
//   } 
//   @media only screen and (max-width: ${'600px'}) {
//     margin: 60px 0 -20px -120px;
//     width: 400px;
//   height: 100px;
// }
// `;
const Item = styled.div`
  margin: 70px 90px 90px 60px;
  .poster {
    width: 300px;
    height: 350px;
    border-radius: 40px;
  }
  .movieTitle {
    margin: 10px 0 0 20px;
  }
`;

const Details = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const DeleteBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  color: #167e6c;
  border: 0ch;
  :active {
    background-color: #167e6c;
    color: white;
  }
`;

const DetailFont = styled.div``;

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
        <Items>
          <Item>
            <img src="/assets/avatar2.jpeg" className="poster" alt="" />
            <Details>
              <DetailFont>
                <h2 className="movieTitle">Avatar 2 : 물의 길</h2>
                <h3 className="movieTitle">미국, 2022</h3>
                <h4 className="movieTitle">평점 : 8.4</h4>
              </DetailFont>
              <DeleteBtn>X</DeleteBtn>
            </Details>
          </Item>
          <Item>
            <img src="/assets/avatar2.jpeg" className="poster" alt="" />
            <Details>
              <DetailFont>
                <h2 className="movieTitle">영화 제목</h2>
                <h3 className="movieTitle">국가, 개봉년도</h3>
                <h4 className="movieTitle">평점</h4>
              </DetailFont>
              <DeleteBtn>X</DeleteBtn>
            </Details>
          </Item>
          <Item>
            <img src="/assets/avatar2.jpeg" className="poster" alt="" />
            <Details>
              <DetailFont>
                <h2 className="movieTitle">영화 제목</h2>
                <h3 className="movieTitle">국가, 개봉년도</h3>
                <h4 className="movieTitle">평점</h4>
              </DetailFont>
              <DeleteBtn>X</DeleteBtn>
            </Details>
          </Item>
        </Items>
        {/* <ChangeBtn>
                        <GreenButton name={"수정하기"}/>
                    </ChangeBtn> */}
      </MainContainer>
    </MainWarp>
  );
};
export default Choose;
