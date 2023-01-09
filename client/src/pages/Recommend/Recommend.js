import React, { useState } from "react";
import styled from "styled-components";
import Netflix from "./Netflix";
import Tving from "./Tving";
import Watcha from "./Watcha";
import Wavve from "./Wavve";

const RecommendDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 1440px;
  height: 655x;
  margin-bottom: 30px;
`;

const TitleDiv = styled.div`
  display: flex;
  align-content: flex-start;
  width: 1120px;
  margin: 80px;

  h1 {
    font-size: 32px;
    border-bottom: 2px solid #167e6c;
  }
`;

const ButtonDiv = styled.div`
  width: 1120px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  /* height: 85px; */
  /* background-color: #167e6c; */
  font-size: 28px;
  color: black;
  border: none;
  border-bottom: 1px solid #898989;

  .active {
    width: calc(100% / 4);
    border-bottom: 2px solid #000000;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  width: 1120px;
  height: 100%;
  margin-top: 20px;
  background: #bcede4;
  padding-bottom: 30px;

  .inputDiv {
    width: 80%;
  }
  .recommendInput {
    width: 70%;
    height: 100px;
    background-color: #58bfad;
    color: #ffffff;
    border: none;
    &:active {
      border: none;
    }

    ::placeholder {
      padding-left: 30px;
      color: #ffffff;
    }
  }
`;

const CommentItem = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const Recommend = () => {
  //TODO: 탭 메뉴 구현하기

  //! 첫번째 방법 - 단순한 탭 메뉴로 구현
  //? 데이터를 받아와서 map 돌릴 때, 데이터 정렬의 문제 -> 부모 컴포넌트에서 돌리면 되는지
  const [currentTab, setCurrentTab] = useState(0);

  // const tabArray = [
  //   { name: "왓챠", userInfo: "userinfo", content: "왓챠 content" },
  //   { name: "웨이브", userInfo: "userinfo", content: "웨이브 content" },
  //   { name: "티빙", userInfo: "userinfo", content: "티빙 content" },
  // ];

  const selectMenuHandler = (idx) => {
    setCurrentTab(idx);
  };

  //! 두번째 방법 - tabList 를 컴포넌트로 구성
  //? 받아오는 데이터 말고 전체적인 화면 구성은 동일한데 컴포넌트를 여러개 분리시키면 비효율적이진 않은지
  //  const [currentTab, setCurrentTab] = useState(0);
  const tabList = [
    { name: "Watcha", content: <Watcha /> },
    { name: "Tving", content: <Tving /> },
    { name: "Wavve", content: <Wavve /> },
    { name: "Netflix", content: <Netflix /> },
  ];

  // const selectMenuHandler = (idx) => {
  //   setCurrentTab(idx);
  // };

  return (
    <RecommendDiv>
      <TitleDiv>
        <h1>실시간 채팅</h1>
      </TitleDiv>

      <ButtonDiv>
        {/* {tabArray.map((el, idx) => (
          <li
            className={idx === currentTab ? "active" : ""}
            onClick={() => selectMenuHandler(idx)}
          >
            {el.name}
          </li>
        ))} */}

        {tabList.map((el, idx) => (
          <li
            className={idx === currentTab ? "active" : ""}
            onClick={() => selectMenuHandler(idx)}
          >
            {el.name}
          </li>
        ))}

        {/* <button className="btn">왓챠</button>
        <button className="btn">웨이브</button>
        <button className="btn">티빙</button>
        <button className="btn">넷플릭스</button> */}
      </ButtonDiv>

      <CommentList>
        <CommentItem>{tabList[currentTab].content}</CommentItem>

        <input
          className="recommendInput"
          autoComplete="off"
          name="recommend"
          type="text"
          // maxLength="35"
          placeholder="한줄평을 입력해주세요"
        ></input>
      </CommentList>
    </RecommendDiv>
  );
};

export default Recommend;
