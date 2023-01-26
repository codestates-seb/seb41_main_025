import React, { useState } from "react";
import * as S from "./styled";
import Netflix from "../Netfilx/Netflix";
import Tving from "../Tving/Tving";
import Watcha from "../Watcha/Watcha";
import Wavve from "../Wavve/Wavve";

const AllTimeChat = () => {
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
  ];

  // const selectMenuHandler = (idx) => {
  //   setCurrentTab(idx);
  // };

  return (
    <S.RecommendDiv>
      <S.TitleDiv>
        <h1>게시판</h1>
      </S.TitleDiv>
        <div>각 OTT에 대해서 자유롭게 이야기 나눌 수 있는 곳 :)</div>

      <S.ButtonDiv>
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
      </S.ButtonDiv>

      <S.CommentList>
        <S.CommentItem>{tabList[currentTab].content}</S.CommentItem>

        {/* <input
          className="recommendInput"
          autoComplete="off"
          name="recommend"
          type="text"
          // maxLength="35"
          placeholder="작품에 대해서 자유롭게 입력해주세요"
        ></input> */}
      </S.CommentList>
    </S.RecommendDiv>
  );
};

export default AllTimeChat;
