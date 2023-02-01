import React, { useState } from "react";
import * as S from "./styled";
import Tving from "../ChatBoard/Tving";
import Watcha from "../ChatBoard/Watcha";
import Wavve from "../ChatBoard/Wavve";

const AllTimeChat = () => {
  const [currentTab, setCurrentTab] = useState(0);

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

  return (
    <S.RecommendDiv>
      <S.TitleDiv>
        <h1>게시판</h1>
      </S.TitleDiv>
      <S.Introduce>
        각 OTT에 대해서 자유롭게 이야기 나눌 수 있는 곳 :)
      </S.Introduce>

      <S.ButtonDiv>
        {tabList.map((el, idx) => (
          <div key = {idx}
            className={idx === currentTab ? "active" : "none"}
            onClick={() => selectMenuHandler(idx)}
          >
            {el.name}
          </div>
        ))}
      </S.ButtonDiv>
      <S.CommentList>
        <S.CommentItem>{tabList[currentTab].content}</S.CommentItem>
      </S.CommentList>
    </S.RecommendDiv>
  );
};

export default AllTimeChat;
