import React from "react";
import styled from "styled-components";

const ContentList = styled.div`
  width: 100%;
  height: 100vh;
`;

const ContentItemDiv = styled.div`
  width: 100%;
  height: auto;
  padding-top: 10px;
`;

const ContentItem = styled.div`
  padding: 20px;
  .userInfo {
    text-align: left;
    padding-bottom: 10px;
  }
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 356px;
    height: 50px;
    color: #ffffff;
    background: #58bfad;
    border-radius: 30px;
  }
`;

const Netflix = () => {
  return (
    <ContentList>
      <ContentItemDiv>
        <ContentItem>
          <div className="userInfo">김희진</div>
          <div className="content">넷플릭스 “에밀리 파리에 가다" 추천해요!</div>
        </ContentItem>
      </ContentItemDiv>
      <ContentItemDiv>
        <ContentItem>
          <div className="userInfo">강성심</div>
          <div className="content">넷플릭스 “더 글로리" 꿀 잼</div>
        </ContentItem>
      </ContentItemDiv>
      <ContentItemDiv>
        <ContentItem>
          <div className="userInfo">이영우</div>
          <div className="content">넷플릭스 “외계+인 1부" 별로에요...</div>
        </ContentItem>
      </ContentItemDiv>
      <ContentItemDiv>
        <ContentItem>
          <div className="userInfo">장한나</div>
          <div className="content">
            넷플릭스 “에밀리 파리에 가다" 추천해요!{" "}
          </div>
        </ContentItem>
      </ContentItemDiv>
      <ContentItemDiv>
        <ContentItem>
          <div className="userInfo">박금비</div>
          <div className="content">
            넷플릭스 “시스피라시” 문제작... 꼭 보세요{" "}
          </div>
        </ContentItem>
      </ContentItemDiv>
      <ContentItemDiv>
        <ContentItem>
          <div className="userInfo">강신찬</div>
          <div className="content">
            넷플릭스 “오징어 게임” 내년에 공개한데요 !
          </div>
        </ContentItem>
      </ContentItemDiv>
    </ContentList>
  );
};
export default Netflix;