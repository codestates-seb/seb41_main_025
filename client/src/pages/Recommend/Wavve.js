import React from "react";
import styled from "styled-components";
import dummy from "./dummydata";

const ContentList = styled.div`
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
  .memberPicture {
    border-radius: 30px;
    width: 48px;
  }
`;

const Wavve = () => {
  return (
    <ContentList>
      {dummy.map((item) => {
        return (
          <ContentItem key={item.id}>
            <div className="userInfo">
              <img
                src={item.memberPicture}
                className="memberPicture"
                alt="사용자 이미지"
                style={{}}
              ></img>
              {item.name}
            </div>
            <div className="content">{item.commentBody}</div>
          </ContentItem>
        );
      })}
    </ContentList>
  );
};

export default Wavve;
